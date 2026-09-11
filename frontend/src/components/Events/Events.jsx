import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { EVENTS } from "../../data/data";

/* ── Category Tab ────────────────────────────────────────────── */
const TABS = [
  { key: "technical",    label: "⚔️ Technical",        color: "#c0102a" },
  { key: "nontechnical", label: "🗺️ Non-Technical",    color: "#1e6fd9" }
];

/* ── Event Modal ─────────────────────────────────────────────── */
function EventModal({ event, onClose, onRegister }) {
  if (!event) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "linear-gradient(160deg, #08000f 0%, #040008 100%)",
            border: "1px solid rgba(192,16,42,0.25)",
            borderRadius: "16px",
            padding: "clamp(1.2rem, 5vw, 2rem)",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              background: "rgba(255,255,255,0.05)",
              border: "none", borderRadius: "50%", width: "32px", height: "32px",
              cursor: "pointer", color: "#f0e8e8", fontSize: "1rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >✕</button>

          {/* Header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{event.icon}</div>
            <h2 className="font-cinzel text-wine-gradient" style={{ fontSize: "1.55rem", fontWeight: 700, marginBottom: "0.25rem" }}>
              {event.name}
            </h2>
            <p style={{ color: "rgba(232,223,200,0.5)", fontStyle: "italic", fontSize: "0.9rem" }}>{event.tagline}</p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(192,16,42,0.4), transparent)", marginBottom: "1.5rem" }} />

          {/* Description */}
          <div style={{ marginBottom: "1.5rem" }}>
            {event.description.split('\n').filter(p => p.trim() !== '').map((block, index) => {
              if (block.trim().toLowerCase() === "rounds:") {
                return <h4 key={index} className="font-cinzel" style={{ color: "rgba(192,16,42,0.9)", marginTop: "1rem", marginBottom: "0.5rem", fontSize: "1.1rem" }}>{block}</h4>;
              }
              
              if (block.trim().startsWith("Round ") || block.trim().startsWith("Chess –") || block.trim().startsWith("Carrom –")) {
                const parts = block.split('–');
                if (parts.length > 1) {
                  return (
                    <div key={index} style={{ color: "rgba(232,223,200,0.8)", fontSize: "0.95rem", marginLeft: "1rem", marginBottom: "0.5rem", paddingLeft: "0.75rem", borderLeft: "2px solid rgba(192,16,42,0.5)" }}>
                      <strong style={{ color: "#e8dfc8" }}>{parts[0].trim()}</strong> – {parts.slice(1).join('–').trim()}
                    </div>
                  );
                }
                return <div key={index} style={{ color: "rgba(232,223,200,0.8)", fontSize: "0.95rem", marginLeft: "1rem", marginBottom: "0.5rem" }}>{block}</div>;
              }

              const sentences = block.split('. ').filter(s => s.trim() !== '').map(s => s.trim() + (s.endsWith('.') ? '' : '.'));
              return (
                <ul key={index} style={{ color: "rgba(232,223,200,0.8)", fontSize: "0.95rem", paddingLeft: "1.2rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                  {sentences.map((sentence, sIdx) => (
                    <li key={sIdx} style={{ marginBottom: "0.4rem" }}>
                      {sentence}
                    </li>
                  ))}
                </ul>
              );
            })}
            {event.submissionEmail && (
              <p style={{ marginTop: "1rem", fontSize: "0.95rem", color: "rgba(232,223,200,0.9)", background: "rgba(192,16,42,0.1)", padding: "0.8rem", borderRadius: "8px", border: "1px solid rgba(192,16,42,0.3)" }}>
                Send your paper to this mail: <strong style={{ color: "#fff", letterSpacing: "0.05em" }}>{event.submissionEmail}</strong>
              </p>
            )}
          </div>

          {/* Info grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { icon: "👥", label: "Team Size", value: event.teamSize },
              { icon: "📅", label: "Date",      value: event.date },
              { icon: "🕐", label: "Time",      value: event.time },
              { icon: "📍", label: "Venue",     value: event.venue },
              { icon: "⏳", label: "Deadline",  value: event.deadline },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(192,16,42,0.2)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
              }}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(192,16,42,0.8)", fontFamily: "Cinzel,serif", marginBottom: "0.25rem", textTransform: "uppercase" }}>
                  {icon} {label}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#e8dfc8", fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Rules */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 className="font-cinzel" style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(192,16,42,0.8)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
              📜 Rules & Guidelines
            </h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {event.rules.map((rule, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.875rem", color: "rgba(232,223,200,0.75)", alignItems: "flex-start" }}>
                  <span style={{ color: "rgba(192,16,42,0.6)", flexShrink: 0, marginTop: "0.1rem" }}>⚓</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button
            onClick={() => onRegister(event)}
            className="btn-wine"
            style={{ width: "100%", padding: "0.9rem", borderRadius: "10px", fontSize: "0.9rem" }}
          >
            🏴‍☠️ &nbsp; Register for {event.name}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Event Card ──────────────────────────────────────────────── */
function EventCard({ event, index, onClick }) {
  const tab = TABS.find(t => t.key === event.category) || TABS[0];
  return (
    <motion.div
      className="event-card glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      onClick={() => onClick(event)}
      style={{
        borderRadius: "14px",
        padding: "1.5rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: `linear-gradient(90deg, ${tab.color}88, transparent)`,
      }} />

      {/* Corner shimmer */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "80px", height: "80px",
        background: `radial-gradient(circle at top right, ${tab.color}15, transparent 70%)`,
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{event.icon}</div>

      <h3 className="font-cinzel" style={{ fontSize: "1.05rem", fontWeight: 700, color: "#c0102a", marginBottom: "0.35rem" }}>
        {event.name}
      </h3>
      <p style={{ fontSize: "0.78rem", color: "rgba(232,223,200,0.5)", fontStyle: "italic", marginBottom: "0.75rem" }}>
        {event.tagline}
      </p>
      <p style={{ fontSize: "0.85rem", color: "rgba(232,223,200,0.7)", lineHeight: 1.6, marginBottom: "1rem" }}>
        {event.description.slice(0, 100)}…
      </p>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        <span style={{
          background: "rgba(192,16,42,0.08)", border: "1px solid rgba(192,16,42,0.2)",
          borderRadius: "100px", padding: "0.2rem 0.7rem",
          fontSize: "0.7rem", color: "rgba(192,16,42,0.8)", fontFamily: "Cinzel,serif",
        }}>👥 {event.teamSize}</span>
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: "0.75rem",
        borderTop: "1px solid rgba(192,16,42,0.12)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <span style={{ fontSize: "0.7rem", color: "rgba(192,16,42,0.7)" }}>⏳ Ends: {event.deadline}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button 
            className="btn-wine"
            onClick={(e) => {
              e.stopPropagation();
              window.open("https://docs.google.com/forms/d/e/1FAIpQLScnIJMgoekJ2GlS_8x_yAkvhTgTotsI_ryZVIywAq8EPm7eVw/viewform?usp=publish-editor", "_blank");
            }}
            style={{ padding: "0.4rem 0.8rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", border: "none" }}
          >
            Register
          </button>
          <span style={{ color: "rgba(192,16,42,0.7)", fontSize: "0.8rem" }}>View Details →</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Events Section ──────────────────────────────────────────── */
export default function Events() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get("tab") || "technical";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [selected,  setSelected]  = useState(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && (tab === "technical" || tab === "nontechnical")) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const events = EVENTS[activeTab] || [];

  return (
    <section
      id="events"
      style={{
        padding: "6rem 0",
        background: "transparent",
        position: "relative",
      }}
    >
      {/* Top wave */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#0f0018" />
        </svg>
      </div>

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🗺️</div>
          <h2 className="font-cinzel text-wine-gradient" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            The Treasure Map
          </h2>
          <p style={{ color: "rgba(232,223,200,0.55)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Chart your course through technical battles and creative challenges.
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {TABS.map(({ key, label, color }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: "0.6rem 1.5rem",
                borderRadius: "100px",
                border: activeTab === key ? `1px solid ${color}88` : "1px solid rgba(255,255,255,0.08)",
                background: activeTab === key ? `${color}18` : "transparent",
                color: activeTab === key ? color : "rgba(240,232,232,0.55)",
                fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.08em",
                cursor: "pointer", transition: "all 0.3s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} onClick={setSelected} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Event modal */}
      <AnimatePresence>
        {selected && (
          <EventModal
            event={selected}
            onClose={() => setSelected(null)}
            onRegister={(evt) => { 
              setSelected(null); 
              window.open("https://docs.google.com/forms/d/e/1FAIpQLScnIJMgoekJ2GlS_8x_yAkvhTgTotsI_ryZVIywAq8EPm7eVw/viewform?usp=publish-editor", "_blank");
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
