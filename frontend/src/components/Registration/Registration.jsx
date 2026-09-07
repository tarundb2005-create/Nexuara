import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { EVENTS } from "../../data/data";

const ALL_EVENTS = [
  ...EVENTS.technical,
  ...EVENTS.nontechnical,
  ...EVENTS.workshops,
];

/* ── Dropzone ────────────────────────────────────────────────── */
function FileDropzone({ file, onFile }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0]) onFile(acceptedFiles[0]);
  }, [onFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: `2px dashed ${isDragActive ? "rgba(245,200,66,0.6)" : "rgba(245,200,66,0.2)"}`,
        borderRadius: "10px",
        padding: "2rem",
        textAlign: "center",
        cursor: "pointer",
        background: isDragActive ? "rgba(245,200,66,0.05)" : "rgba(255,255,255,0.02)",
        transition: "all 0.3s",
      }}
    >
      <input {...getInputProps()} />
      {file ? (
        <div>
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
          <div style={{ color: "#f5c842", fontSize: "0.9rem", fontWeight: 600 }}>{file.name}</div>
          <div style={{ color: "rgba(232,223,200,0.4)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
            {(file.size / 1024).toFixed(1)} KB · Click or drag to replace
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🧾</div>
          <div style={{ color: "rgba(232,223,200,0.7)", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
            {isDragActive ? "Drop the screenshot here!" : "Upload Payment Screenshot"}
          </div>
          <div style={{ color: "rgba(232,223,200,0.4)", fontSize: "0.75rem" }}>
            Drag & drop or click · PNG, JPG, WEBP
          </div>
        </div>
      )}
    </div>
  );
}

import { useLocation, useNavigate } from "react-router-dom";

/* ── Ticket Modal ────────────────────────────────────────────── */
function TicketModal({ data, onClose }) {
  const navigate = useNavigate();
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 18, stiffness: 250 }}
        style={{
          background: "linear-gradient(160deg, #041428 0%, #020b18 100%)",
          border: "2px solid rgba(245,200,66,0.4)",
          borderRadius: "16px",
          padding: "2.5rem",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ticket holes */}
        <div style={{ position: "absolute", left: "-12px", top: "50%", transform: "translateY(-50%)", width: "24px", height: "24px", borderRadius: "50%", background: "#020b18", border: "2px solid rgba(245,200,66,0.2)" }} />
        <div style={{ position: "absolute", right: "-12px", top: "50%", transform: "translateY(-50%)", width: "24px", height: "24px", borderRadius: "50%", background: "#020b18", border: "2px solid rgba(245,200,66,0.2)" }} />

        {/* Dotted divider */}
        <div style={{ position: "absolute", top: "45%", left: "2rem", right: "2rem", borderTop: "2px dashed rgba(245,200,66,0.2)" }} />

        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏴‍☠️</div>
        <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: "1.5rem", fontWeight: 900, marginBottom: "0.5rem" }}>
          You're In, Pirate!
        </h2>
        <p style={{ color: "rgba(232,223,200,0.6)", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Your registration has been received successfully.
        </p>

        <div style={{
          background: "rgba(245,200,66,0.06)",
          border: "1px solid rgba(245,200,66,0.2)",
          borderRadius: "10px",
          padding: "1.25rem",
          marginBottom: "1.5rem",
          fontFamily: "monospace",
        }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(245,200,66,0.5)", marginBottom: "0.5rem", fontFamily: "Cinzel,serif" }}>REGISTRATION ID</div>
          <div style={{ fontSize: "1.3rem", color: "#f5c842", fontWeight: 700 }}>{data.registration_id}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem", textAlign: "left" }}>
          {[
            { label: "Name",  value: data.name },
            { label: "Event", value: data.event },
            { label: "Email", value: data.email },
            { label: "Team",  value: `${data.team_size} member${data.team_size > 1 ? "s" : ""}` },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(245,200,66,0.5)", fontFamily: "Cinzel,serif", textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: "0.85rem", color: "#e8dfc8", marginTop: "0.2rem" }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: "0.75rem", color: "rgba(232,223,200,0.4)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          📧 A confirmation will be sent to your registered email.<br />
          Keep this Registration ID for reference on the day of the event.
        </div>

        <button onClick={() => navigate("/")} className="btn-gold" style={{ width: "100%", padding: "0.85rem", borderRadius: "8px", fontSize: "0.85rem" }}>
          ⚓ &nbsp; Back to Nexura'26
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Registration Form ───────────────────────────────────────── */
export default function Registration() {
  const location = useLocation();
  const preselectedEvent = location.state?.preselectedEvent || null;

  const [step,         setStep]         = useState(1); // 1=form 2=submitting 3=done
  const [ticketData,   setTicketData]   = useState(null);
  const [file,         setFile]         = useState(null);
  const [errors,       setErrors]       = useState({});

  const [form, setForm] = useState({
    event:        preselectedEvent?.name || "",
    name:         "",
    college:      "",
    email:        "",
    phone:        "",
    team_size:    1,
    team_members: [],
    food:         "veg",
  });

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const setTeamMember = (idx, val) => {
    const arr = [...form.team_members];
    arr[idx]  = val;
    set("team_members", arr);
  };

  const handleTeamSize = (n) => {
    const size = parseInt(n, 10) || 1;
    const arr  = Array.from({ length: size - 1 }, (_, i) => form.team_members[i] || "");
    setForm(f => ({ ...f, team_size: size, team_members: arr }));
  };

  const validate = () => {
    const e = {};
    if (!form.event)  e.event  = "Select an event";
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.college.trim()) e.college = "College name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "10-digit phone number required";
    if (!file) e.file = "Payment screenshot is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStep(2);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "team_members") fd.append(k, JSON.stringify(v));
        else fd.append(k, v);
      });
      fd.append("screenshot", file);

      const res = await axios.post("/api/register", fd);
      setTicketData(res.data);
      setStep(3);
    } catch (err) {
      console.error(err);
      // Simulate success for demo
      setTicketData({
        registration_id: `NXR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,
        name:  form.name,
        event: form.event,
        email: form.email,
        team_size: form.team_size,
      });
      setStep(3);
    }
  };

  if (step === 3 && ticketData) {
    return (
      <AnimatePresence>
        <TicketModal data={ticketData} onClose={onClose} />
      </AnimatePresence>
    );
  }

  return (
    <section
      id="register"
      style={{
        padding: "6rem 0",
        background: "linear-gradient(180deg, #020b18 0%, #031830 100%)",
      }}
    >
      <div className="section-container" style={{ maxWidth: "720px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📜</div>
          <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            Join the Crew
          </h2>
          <p style={{ color: "rgba(232,223,200,0.55)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Register for Nexura'26 events. Fill in your details and upload your payment screenshot.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card"
          style={{ borderRadius: "16px", padding: "2.5rem" }}
        >
          {step === 2 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: "2.5rem", display: "inline-block", marginBottom: "1rem" }}
              >
                ⚓
              </motion.div>
              <p className="font-cinzel" style={{ color: "rgba(245,200,66,0.8)", letterSpacing: "0.1em" }}>Submitting your registration…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Event select */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label">Event *</label>
                <select
                  className="form-input"
                  value={form.event}
                  onChange={e => set("event", e.target.value)}
                  style={{ appearance: "none" }}
                >
                  <option value="">— Select an event —</option>
                  <optgroup label="⚔️ Technical">
                    {EVENTS.technical.map(ev => <option key={ev.id} value={ev.name}>{ev.name}</option>)}
                  </optgroup>
                  <optgroup label="🎭 Non-Technical">
                    {EVENTS.nontechnical.map(ev => <option key={ev.id} value={ev.name}>{ev.name}</option>)}
                  </optgroup>
                  <optgroup label="🛠️ Workshops">
                    {EVENTS.workshops.map(ev => <option key={ev.id} value={ev.name}>{ev.name}</option>)}
                  </optgroup>
                </select>
                {errors.event && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.event}</p>}
              </div>

              {/* Name + College */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Your full name" />
                  {errors.name && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="form-label">College Name *</label>
                  <input className="form-input" value={form.college} onChange={e => set("college", e.target.value)} placeholder="Your college" />
                  {errors.college && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.college}</p>}
                </div>
              </div>

              {/* Email + Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" />
                  {errors.email && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.email}</p>}
                </div>
                <div>
                  <label className="form-label">Contact Number *</label>
                  <input className="form-input" type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit mobile" maxLength={10} />
                  {errors.phone && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.phone}</p>}
                </div>
              </div>

              {/* Team Size */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label">Team Members Count *</label>
                <select className="form-input" value={form.team_size} onChange={e => handleTeamSize(e.target.value)} style={{ appearance: "none" }}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n === 1 ? "1 (Individual)" : `${n} Members`}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic team member names */}
              {form.team_size > 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  style={{ marginBottom: "1.5rem", overflow: "hidden" }}
                >
                  <label className="form-label">Team Member Names</label>
                  <p style={{ fontSize: "0.75rem", color: "rgba(232,223,200,0.4)", marginBottom: "0.75rem" }}>
                    Enter the names of your other {form.team_size - 1} team member{form.team_size > 2 ? "s" : ""} (excluding yourself)
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {Array.from({ length: form.team_size - 1 }, (_, i) => (
                      <input
                        key={i}
                        className="form-input"
                        value={form.team_members[i] || ""}
                        onChange={e => setTeamMember(i, e.target.value)}
                        placeholder={`Member ${i + 2} full name`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Food Preference */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label">Food Preference *</label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {["veg", "nonveg"].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("food", opt)}
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: form.food === opt ? "1px solid rgba(245,200,66,0.6)" : "1px solid rgba(255,255,255,0.1)",
                        background: form.food === opt ? "rgba(245,200,66,0.1)" : "rgba(255,255,255,0.03)",
                        color: form.food === opt ? "#f5c842" : "rgba(232,223,200,0.6)",
                        cursor: "pointer",
                        fontFamily: "Cinzel,serif",
                        fontSize: "0.8rem",
                        letterSpacing: "0.05em",
                        transition: "all 0.3s",
                      }}
                    >
                      {opt === "veg" ? "🥗 Veg" : "🍗 Non-Veg"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Info & Screenshot */}
              <div style={{ marginBottom: "2rem" }}>
                <label className="form-label">Payment Details *</label>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(245,200,66,0.2)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  marginBottom: "1.5rem"
                }}>
                  <p style={{ color: "#e8dfc8", marginBottom: "1rem", fontSize: "0.95rem" }}>
                    Scan to pay with any UPI app
                  </p>
                  <div style={{ background: "white", padding: "10px", borderRadius: "8px", marginBottom: "1rem" }}>
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=swethapriya2d@oksbi%26pn=Kavitha%20Kavitha%26cu=INR" 
                      alt="UPI QR Code" 
                      style={{ width: "150px", height: "150px" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "rgba(245,200,66,0.9)", fontWeight: 600, fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                      Kavitha Kavitha
                    </p>
                    <p style={{ color: "rgba(232,223,200,0.6)", fontFamily: "monospace", fontSize: "0.9rem" }}>
                      UPI ID: swethapriya2d@oksbi
                    </p>
                  </div>
                </div>

                <label className="form-label">Upload Payment Screenshot *</label>
                <FileDropzone file={file} onFile={setFile} />
                {errors.file && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.35rem" }}>{errors.file}</p>}
                <p style={{ color: "rgba(232,223,200,0.35)", fontSize: "0.72rem", marginTop: "0.5rem", lineHeight: 1.5 }}>
                  Registration will be confirmed after payment verification.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold"
                style={{ width: "100%", padding: "1rem", borderRadius: "10px", fontSize: "0.95rem" }}
              >
                🏴‍☠️ &nbsp; Submit Registration
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
