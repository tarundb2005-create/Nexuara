"""
Nexura'26 — FastAPI Backend with Payment Portal Integration
Run: uvicorn main:app --reload --port 8000
"""

import os
import uuid
import json
import csv
import io
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

from fastapi import FastAPI, Form, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
import aiofiles

from database import get_db, init_db

# ── Setup ─────────────────────────────────────────────────────
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

app = FastAPI(title="Nexura'26 API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

@app.on_event("startup")
async def startup():
    init_db()


# ── Utils ─────────────────────────────────────────────────────
def generate_reg_id() -> str:
    ts   = hex(int(time.time()))[2:].upper()[-4:]
    rand = uuid.uuid4().hex[:4].upper()
    return f"NXR-{ts}-{rand}"


# ── Registration & Payment Endpoint ───────────────────────────
@app.post("/api/register")
async def register(
    event:          str                   = Form(...),
    name:           str                   = Form(...),
    college:        str                   = Form(...),
    email:          str                   = Form(...),
    phone:          str                   = Form(...),
    team_size:      int                   = Form(1),
    team_members:   str                   = Form("[]"),
    food:           str                   = Form("veg"),
    payment_method: str                   = Form("upi_qr"),
    transaction_id: str                   = Form(""),
    screenshot:     Optional[UploadFile]  = File(None),
):
    # Basic validation
    if not email or "@" not in email:
        raise HTTPException(422, "Invalid email address")
    if not phone.isdigit() or len(phone) != 10:
        raise HTTPException(422, "Phone must be 10 digits")

    # Save screenshot if provided
    save_path_str = None
    if screenshot and screenshot.filename:
        if screenshot.content_type not in ("image/jpeg", "image/png", "image/webp"):
            raise HTTPException(422, "Screenshot must be JPG, PNG, or WEBP")

        ext            = screenshot.filename.rsplit(".", 1)[-1] if "." in screenshot.filename else "jpg"
        filename       = f"{uuid.uuid4().hex}.{ext}"
        save_path      = UPLOAD_DIR / filename

        async with aiofiles.open(save_path, "wb") as f:
            content = await screenshot.read()
            await f.write(content)
        save_path_str = str(save_path)

    # Generate transaction reference ID if missing
    tx_id = transaction_id.strip() or f"TXN-{uuid.uuid4().hex[:8].upper()}"

    # Generate registration ID
    reg_id    = generate_reg_id()
    timestamp = datetime.now(timezone.utc).isoformat()
    pay_status = "verified" if payment_method in ["upi_qr", "card", "netbanking"] else "pending"

    # Save to DB
    conn = get_db()
    try:
        conn.execute(
            """
            INSERT INTO registrations
              (registration_id, timestamp, event, name, college, email, phone,
               team_size, team_members, food, payment_method, transaction_id, screenshot_path, payment_status, reg_status)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """,
            (reg_id, timestamp, event, name.strip(), college.strip(),
             email.strip().lower(), phone.strip(), team_size,
             team_members, food, payment_method, tx_id, save_path_str, pay_status, "verified" if pay_status == "verified" else "pending"),
        )
        conn.commit()
    finally:
        conn.close()

    return {
        "registration_id": reg_id,
        "message":         "Registration submitted successfully!",
        "name":            name,
        "event":           event,
        "email":           email,
        "team_size":       team_size,
        "payment_method":  payment_method,
        "transaction_id":  tx_id,
        "payment_status":  pay_status,
    }


# ── List Registrations (Admin) ─────────────────────────────────
@app.get("/api/registrations")
def list_registrations(event: Optional[str] = None, status: Optional[str] = None):
    conn = get_db()
    query  = "SELECT * FROM registrations WHERE 1=1"
    params = []
    if event:
        query  += " AND event = ?"
        params.append(event)
    if status:
        query  += " AND payment_status = ?"
        params.append(status)
    query += " ORDER BY id DESC"

    rows = conn.execute(query, params).fetchall()
    conn.close()
    return [dict(r) for r in rows]


# ── Update Status (Admin) ──────────────────────────────────────
@app.patch("/api/registrations/{reg_id}/status")
def update_status(reg_id: int, body: dict):
    allowed = {"payment_status", "reg_status"}
    updates = {k: v for k, v in body.items() if k in allowed}
    if not updates:
        raise HTTPException(400, "Nothing to update")

    conn = get_db()
    row  = conn.execute("SELECT id FROM registrations WHERE id=?", (reg_id,)).fetchone()
    if not row:
        conn.close()
        raise HTTPException(404, "Registration not found")

    set_clause = ", ".join(f"{k}=?" for k in updates)
    conn.execute(
        f"UPDATE registrations SET {set_clause} WHERE id=?",
        [*updates.values(), reg_id],
    )
    conn.commit()
    conn.close()
    return {"message": "Updated", "id": reg_id, **updates}


# ── CSV Export (Admin) ─────────────────────────────────────────
@app.get("/api/export")
def export_csv():
    conn = get_db()
    rows = conn.execute("SELECT * FROM registrations ORDER BY id ASC").fetchall()
    conn.close()

    output  = io.StringIO()
    writer  = csv.writer(output)
    headers = [
        "ID", "Registration ID", "Timestamp", "Event", "Name", "College",
        "Email", "Phone", "Team Size", "Team Members", "Food Preference",
        "Payment Method", "Transaction ID", "Screenshot Path", "Payment Status", "Registration Status",
    ]
    writer.writerow(headers)
    for row in rows:
        d = dict(row)
        writer.writerow([
            d.get("id"), d.get("registration_id"), d.get("timestamp"),
            d.get("event"), d.get("name"), d.get("college"),
            d.get("email"), d.get("phone"), d.get("team_size"),
            d.get("team_members"), d.get("food"),
            d.get("payment_method"), d.get("transaction_id"), d.get("screenshot_path"),
            d.get("payment_status"), d.get("reg_status"),
        ])

    output.seek(0)
    filename = f"nexura26_registrations_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


# ── Health ─────────────────────────────────────────────────────
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Nexura'26 API"}
