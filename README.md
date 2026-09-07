# Nexura'26 — College Symposium Website

> **Pirate-themed annual symposium website** · Where Technology Meets Adventure

## 🚀 Quick Start

### Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API at http://localhost:8000
```

---

## 📁 Structure

```
nexura/
├── frontend/          # React + Vite + Tailwind + Framer Motion
│   └── src/
│       ├── components/
│       │   ├── Loader/       # 5-second pirate cinematic intro
│       │   ├── Navbar/       # Scroll-aware glassmorphism navbar
│       │   ├── Hero/         # Countdown timer + CTAs
│       │   ├── Events/       # Tabbed event cards + modals
│       │   ├── Registration/ # Dynamic form + ticket generation
│       │   ├── About/        # Crew section with hover reveals
│       │   └── Footer/
│       ├── pages/
│       │   └── AdminDashboard.jsx
│       └── data/
│           └── data.js       # ← Edit events & team members here
│
└── backend/           # FastAPI + SQLite
    ├── main.py        # All API routes
    ├── database.py    # SQLite setup
    ├── uploads/       # Payment screenshots stored here
    └── nexura.db      # SQLite database (auto-created)
```

---

## ✏️ Customization

### Update Events
Edit [`frontend/src/data/data.js`](frontend/src/data/data.js) — the `EVENTS` object contains all Technical, Non-Technical, and Workshop events.

### Update Team
Edit the `TEAM_MEMBERS` array in the same file.

### Update Symposium Date
Change `SYMPOSIUM_DATE` in `data.js` for the countdown timer.

### Update College Name
Change `COLLEGE_NAME` and `COLLEGE_LOCATION` in `data.js`.

### Update UPI Payment Info
Add your UPI ID in the Registration component's payment notes section.

---

## 🔐 Admin Dashboard

Visit `/admin` — default password is `nexura2026`.

**Change the password** in `frontend/src/pages/AdminDashboard.jsx`:
```js
const ADMIN_PASS = "your-new-password";
```

For production, replace with proper JWT authentication.

---

## 📊 Registration Flow

1. Participant fills form + uploads payment screenshot
2. Data saved to `backend/nexura.db` (SQLite)
3. Unique Registration ID generated (`NXR-XXXX-XXXX`)
4. Digital ticket shown to participant
5. Admin reviews + verifies payment at `/admin`
6. Export all registrations as CSV from admin dashboard

---

## 🎨 Key Design Features

- **5-second cinematic loader** — animated ocean canvas, SVG pirate ship, letter-by-letter reveal
- **Countdown timer** — live countdown to symposium date
- **Particle system** — animated gold particles across hero
- **Event modals** — detailed event info with smooth spring animations
- **Dynamic form** — team member fields expand based on team size
- **Digital ticket** — unique ticket modal on successful registration
- **Crew section** — hover-reveal cards with bio and social links
- **Admin dashboard** — filter, search, verify/reject payments, CSV export

---

## 🚢 Production Deployment

| Layer    | Recommended                   |
|----------|-------------------------------|
| Frontend | Vercel (`vercel deploy`)      |
| Backend  | Render or Railway             |
| Database | PostgreSQL (replace SQLite)   |
| Storage  | Cloudinary (replace uploads/) |

