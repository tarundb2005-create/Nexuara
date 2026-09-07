import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ADMIN_PASS = "nexaura2026"; // In production, use proper auth

function StatusBadge({ status }) {
  const colors = {
    pending:  { bg: "rgba(4,0,8,0.8)", border: "rgba(192,16,42,0.4)", text: "#c0102a" },
    verified: { bg: "rgba(4,0,8,0.8)", border: "rgba(34,197,94,0.4)", text: "#22c55e" },
    rejected: { bg: "rgba(4,0,8,0.8)", border: "rgba(239,68,68,0.4)", text: "#ef4444" },
  };
  const c = colors[status] || colors.pending;
  return (
    <span style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: "100px", padding: "0.2rem 0.7rem",
      fontSize: "0.7rem", color: c.text, fontFamily: "Cinzel,serif",
      letterSpacing: "0.05em", textTransform: "capitalize",
    }}>
      {status || "pending"}
    </span>
  );
}

export default function AdminDashboard() {
  const [authed,         setAuthed]       = useState(false);
  const [password,       setPassword]     = useState("");
  const [loginErr,       setLoginErr]     = useState("");
  const [registrations,  setRegistrations] = useState([]);
  const [loading,        setLoading]       = useState(false);
  const [filter,         setFilter]        = useState({ event: "", status: "" });
  const [search,         setSearch]        = useState("");

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASS) { setAuthed(true); }
    else { setLoginErr("Invalid password. Try again."); }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/registrations");
      setRegistrations(res.data);
    } catch {
      // Demo data
      setRegistrations([
        {
          id: 1, registration_id: "NXR-M3K9-AB12", timestamp: new Date().toISOString(),
          event: "Code Clash", name: "Arun Kumar", college: "MIT Chennai",
          email: "arun@example.com", phone: "9876543210", team_size: 2,
          team_members: '["Priya R"]', food: "veg",
          payment_status: "verified", reg_status: "confirmed",
        },
        {
          id: 2, registration_id: "NXR-N4L2-CD34", timestamp: new Date().toISOString(),
          event: "Web Voyage", name: "Sneha Iyer", college: "Anna University",
          email: "sneha@example.com", phone: "9123456780", team_size: 1,
          team_members: '[]', food: "nonveg",
          payment_status: "pending", reg_status: "pending",
        },
        {
          id: 3, registration_id: "NXR-P7Q5-EF56", timestamp: new Date(Date.now() - 3600000).toISOString(),
          event: "Capture The Flag", name: "Rahul Menon", college: "IIT Madras",
          email: "rahul@example.com", phone: "8765432109", team_size: 4,
          team_members: '["Dev S","Kiran T","Maya P"]', food: "veg",
          payment_status: "pending", reg_status: "pending",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  const updateStatus = async (id, field, value) => {
    try {
      await axios.patch(`/api/registrations/${id}/status`, { [field]: value });
      setRegistrations(rs => rs.map(r => r.id === id ? { ...r, [field]: value } : r));
    } catch {
      // Optimistic update for demo
      setRegistrations(rs => rs.map(r => r.id === id ? { ...r, [field]: value } : r));
    }
  };

  const exportCSV = async () => {
    try {
      const res = await axios.get("/api/export", { responseType: "blob" });
      const url = URL.createObjectURL(res.data);
      const a   = document.createElement("a");
      a.href    = url;
      a.download = `nexaura26_registrations_${Date.now()}.csv`;
      a.click();
    } catch {
      // Client-side CSV fallback
      const headers = ["ID","Reg ID","Timestamp","Event","Name","College","Email","Phone","Team Size","Team Members","Food","Payment","Status"];
      const rows = registrations.map(r => [
        r.id, r.registration_id, r.timestamp, r.event, r.name, r.college,
        r.email, r.phone, r.team_size, r.team_members, r.food,
        r.payment_status, r.reg_status,
      ]);
      const csv  = [headers, ...rows].map(r => r.map(v => `"${v ?? ""}"`).join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `nexaura26_registrations.csv`;
      a.click();
    }
  };

  // Filter
  const filtered = registrations.filter(r => {
    const matchEvent  = !filter.event  || r.event === filter.event;
    const matchStatus = !filter.status || r.payment_status === filter.status;
    const matchSearch = !search || [r.name, r.email, r.registration_id, r.college]
      .some(v => v?.toLowerCase().includes(search.toLowerCase()));
    return matchEvent && matchStatus && matchSearch;
  });

  const uniqueEvents = [...new Set(registrations.map(r => r.event))];

  /* ── Login page ─────────────────────────────────────────── */
  if (!authed) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(180deg, #040008 0%, #08000f 100%)",
        padding: "2rem",
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ borderRadius: "16px", padding: "2.5rem", maxWidth: "420px", width: "100%", textAlign: "center" }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏴‍☠️</div>
          <h1 className="font-cinzel text-wine-gradient" style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "0.5rem" }}>
            Captain's Log
          </h1>
          <p style={{ color: "rgba(232,223,200,0.5)", fontSize: "0.85rem", marginBottom: "2rem" }}>
            Admin access to Nexaura'26 registration data
          </p>
          <form onSubmit={login}>
            <div style={{ marginBottom: "1rem" }}>
              <label className="form-label" style={{ textAlign: "left", display: "block" }}>Admin Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={e => { setPassword(e.target.value); setLoginErr(""); }}
                placeholder="Enter password"
              />
              {loginErr && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.4rem", textAlign: "left" }}>{loginErr}</p>}
            </div>
            <button type="submit" className="btn-wine" style={{ width: "100%", padding: "0.9rem", borderRadius: "10px", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              ⚓ Enter
            </button>
          </form>
          <p style={{ color: "rgba(232,223,200,0.25)", fontSize: "0.7rem", marginTop: "1.5rem" }}>
            Demo password: <code style={{ color: "rgba(245,200,66,0.5)" }}>nexaura2026</code>
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Dashboard ──────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: "#040008", padding: "2rem 1.5rem" }}>
      {/* Header */}
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <a href="/" style={{ color: "#c0102a", fontSize: "0.75rem", textDecoration: "none", fontFamily: "Cinzel,serif" }}>← Back to Site</a>
            <h1 className="font-cinzel text-wine-gradient" style={{ fontSize: "1.8rem", fontWeight: 900, marginTop: "0.25rem" }}>
              ⚓ Admin Dashboard
            </h1>
            <p style={{ color: "rgba(232,223,200,0.4)", fontSize: "0.85rem" }}>Nexaura'26 Registration Management</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={fetchData} className="btn-outline" style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.8rem" }}>
              🔄 Refresh
            </button>
            <button onClick={exportCSV} className="btn-wine" style={{ padding: "0.6rem 1.25rem", borderRadius: "8px", fontSize: "0.8rem" }}>
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {[
            { label: "Total",    value: registrations.length,                              icon: "📋" },
            { label: "Verified", value: registrations.filter(r => r.payment_status === "verified").length, icon: "✅" },
            { label: "Pending",  value: registrations.filter(r => r.payment_status === "pending").length,  icon: "⏳" },
            { label: "Rejected", value: registrations.filter(r => r.payment_status === "rejected").length, icon: "❌" },
          ].map(({ label, value, icon }) => (
            <div key={label} className="glass-card" style={{ borderRadius: "12px", padding: "1.25rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{icon}</div>
              <div className="font-cinzel" style={{ fontSize: "1.8rem", fontWeight: 900, color: "#c0102a" }}>{value}</div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "rgba(232,223,200,0.5)", textTransform: "uppercase", fontFamily: "Cinzel,serif" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card" style={{ borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <input
            className="form-input"
            style={{ maxWidth: "240px", flex: "1 1 200px" }}
            placeholder="🔍 Search name, email, ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="form-input"
            style={{ maxWidth: "200px", flex: "1 1 160px", appearance: "none" }}
            value={filter.event}
            onChange={e => setFilter(f => ({ ...f, event: e.target.value }))}
          >
            <option value="">All Events</option>
            {uniqueEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
          </select>
          <select
            className="form-input"
            style={{ maxWidth: "160px", flex: "1 1 140px", appearance: "none" }}
            value={filter.status}
            onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <span style={{ fontSize: "0.8rem", color: "rgba(232,223,200,0.4)", whiteSpace: "nowrap" }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div className="glass-card" style={{ borderRadius: "12px", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#c0102a" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚓</div>
              Loading registrations…
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="admin-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Reg ID</th>
                    <th>Timestamp</th>
                    <th>Event</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Team</th>
                    <th>Food</th>
                    <th>Payment</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={11} style={{ textAlign: "center", padding: "2rem", color: "rgba(232,223,200,0.3)" }}>
                        No registrations found.
                      </td>
                    </tr>
                  ) : filtered.map(r => (
                    <tr key={r.id}>
                      <td>
                        <code style={{ fontSize: "0.75rem", color: "#c0102a", background: "rgba(192,16,42,0.08)", padding: "0.2rem 0.4rem", borderRadius: "4px" }}>
                          {r.registration_id}
                        </code>
                      </td>
                      <td style={{ color: "rgba(232,223,200,0.5)", fontSize: "0.78rem" }}>
                        {new Date(r.timestamp).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td style={{ fontWeight: 600, color: "#e8dfc8", whiteSpace: "nowrap" }}>{r.event}</td>
                      <td>{r.name}</td>
                      <td style={{ color: "rgba(232,223,200,0.7)", fontSize: "0.85rem" }}>{r.college}</td>
                      <td style={{ color: "rgba(232,223,200,0.7)", fontSize: "0.85rem" }}>{r.email}</td>
                      <td style={{ color: "rgba(232,223,200,0.7)", fontSize: "0.85rem" }}>{r.phone}</td>
                      <td style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "0.8rem", color: "#c0102a" }}>{r.team_size}</span>
                      </td>
                      <td style={{ textAlign: "center", fontSize: "0.8rem" }}>
                        {r.food === "veg" ? "🥗" : "🍗"}
                      </td>
                      <td>
                        <StatusBadge status={r.payment_status} />
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <button
                            onClick={() => updateStatus(r.id, "payment_status", "verified")}
                            disabled={r.payment_status === "verified"}
                            style={{
                              background: r.payment_status === "verified" ? "rgba(34,197,94,0.2)" : "rgba(4,0,8,0.9)",
                              border: "1px solid rgba(34,197,94,0.4)",
                              borderRadius: "6px",
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.7rem",
                              color: "#22c55e",
                              cursor: r.payment_status === "verified" ? "default" : "pointer",
                              opacity: r.payment_status === "verified" ? 0.5 : 1,
                            }}
                          >✓</button>
                          <button
                            onClick={() => updateStatus(r.id, "payment_status", "rejected")}
                            disabled={r.payment_status === "rejected"}
                            style={{
                              background: r.payment_status === "rejected" ? "rgba(239,68,68,0.2)" : "rgba(4,0,8,0.9)",
                              border: "1px solid rgba(192,16,42,0.25)",
                              borderRadius: "6px",
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.7rem",
                              color: "#ef4444",
                              cursor: r.payment_status === "rejected" ? "default" : "pointer",
                              opacity: r.payment_status === "rejected" ? 0.5 : 1,
                            }}
                          >✕</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
