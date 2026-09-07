import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM_MEMBERS } from "../../data/data";

/* ── Avatar Component ────────────────────────────────────────── */
function Avatar({ member, size = 100 }) {
  const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const colors   = ["#c0102a", "#1e6fd9", "#c0102a", "#d4a82a", "#1e6fd9", "#8b0020"];
  const color    = colors[member.id % colors.length];

  if (member.avatar) {
    return (
      <div style={{
        width: size, height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: `3px solid ${color}`,
        boxShadow: `0 0 20px ${color}55`,
        flexShrink: 0,
        position: "relative",
      }}>
        <img
          src={member.avatar}
          alt={member.name}
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            objectPosition: "top",
            transform: member.id === 2 ? "scale(1.4) translateY(-10%)" : "none",
          }}
        />
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${color}44 0%, ${color}11 100%)`,
      border: `2px solid ${color}66`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Cinzel, serif",
      fontSize: size * 0.32,
      fontWeight: 900,
      color: color,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/* ── Crew Member Details Modal ───────────────────────────────── */
function CrewModal({ member, onClose }) {
  if (!member) return null;
  const colors = ["#c0102a", "#1e6fd9", "#c0102a", "#d4a82a", "#1e6fd9", "#8b0020"];
  const accentColor = colors[member.id % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(4,0,8,0.85)",
        backdropFilter: "blur(10px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 30, opacity: 0 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #0f0212 0%, #06000a 100%)",
          border: `1px solid ${accentColor}55`,
          borderRadius: "20px",
          maxWidth: "540px",
          width: "100%",
          padding: "2.2rem 2rem",
          position: "relative",
          boxShadow: `0 25px 70px ${accentColor}33`,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%", width: "36px", height: "36px",
            color: "#f0e8e8", fontSize: "1.1rem",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.target.style.background = "#c0102a"; e.target.style.borderColor = "#c0102a"; }}
          onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
        >
          ✕
        </button>

        {/* Profile Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <Avatar member={member} size={110} />

          <div style={{ flex: 1, minWidth: "200px" }}>
            {/* Pirate Role Badge */}
            <div style={{
              display: "inline-block",
              background: `${accentColor}22`,
              border: `1px solid ${accentColor}55`,
              borderRadius: "100px",
              padding: "0.25rem 0.85rem",
              fontFamily: "Pirata One, Cinzel, serif",
              fontSize: "0.85rem",
              color: accentColor,
              letterSpacing: "0.1em",
              marginBottom: "0.5rem",
            }}>
              ☠ {member.role.toUpperCase()}
            </div>

            {/* Member Name */}
            <h2 className="font-cinzel" style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              marginBottom: "0.3rem",
            }}>
              {member.name}
            </h2>

            {/* Position */}
            <div style={{
              fontSize: "0.88rem",
              color: "rgba(240,232,232,0.85)",
              fontWeight: 600,
              fontFamily: "Cinzel, serif",
              letterSpacing: "0.05em",
            }}>
              {member.position}
            </div>

            {/* Department & Year */}
            <div style={{ fontSize: "0.8rem", color: "rgba(232,223,200,0.5)", marginTop: "0.2rem" }}>
              {member.dept} • <span style={{ color: accentColor }}>{member.year}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${accentColor}66, transparent)`,
          marginBottom: "1.5rem",
        }} />

        {/* Bio / Pirate Lore */}
        <div style={{ marginBottom: "1.5rem" }}>
          <h4 className="font-cinzel" style={{
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            color: "rgba(232,223,200,0.5)",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}>
            📜 CREW PROFILE & DUTIES
          </h4>
          <p style={{
            fontSize: "0.92rem",
            color: "rgba(240,232,232,0.85)",
            lineHeight: 1.7,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "1rem 1.2rem",
          }}>
            "{member.bio}"
          </p>
        </div>

        {/* Skills & Expertise */}
        {member.skills && member.skills.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 className="font-cinzel" style={{
              fontSize: "0.75rem",
              letterSpacing: "0.18em",
              color: "rgba(232,223,200,0.5)",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}>
              ⚡ SPECIALTIES & SKILLS
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {member.skills.map((skill, idx) => (
                <span key={idx} style={{
                  background: "rgba(30,111,217,0.12)",
                  border: "1px solid rgba(30,111,217,0.3)",
                  borderRadius: "8px",
                  padding: "0.3rem 0.75rem",
                  fontSize: "0.78rem",
                  color: "#60a5fa",
                  fontFamily: "Cinzel, serif",
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Contact & Social Links */}
        <div>
          <h4 className="font-cinzel" style={{
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            color: "rgba(232,223,200,0.5)",
            textTransform: "uppercase",
            marginBottom: "0.75rem",
          }}>
            📬 CONTACT & SOCIALS
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                style={{
                  background: "rgba(192,16,42,0.15)",
                  border: "1px solid rgba(192,16,42,0.35)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.8rem",
                  color: "#f87171",
                  textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "all 0.3s",
                }}
              >
                ✉️ {member.email}
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                style={{
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  borderRadius: "8px",
                  padding: "0.45rem 0.9rem",
                  fontSize: "0.8rem",
                  color: "#4ade80",
                  textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "all 0.3s",
                }}
              >
                📞 {member.phone}
              </a>
            )}

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Crew Card ───────────────────────────────────────────────── */
function CrewCard({ member, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="crew-card"
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(192,16,42,0.45)" : "rgba(192,16,42,0.14)"}`,
        borderRadius: "16px",
        padding: "2rem 1.5rem",
        textAlign: "center",
        overflow: "hidden",
        transition: "all 0.4s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 60px rgba(192,16,42,0.2)" : "none",
        cursor: "pointer",
      }}
    >
      {/* Map-pin decorative top-left */}
      <div style={{
        position: "absolute", top: "1rem", left: "1rem",
        fontSize: "0.8rem", opacity: 0.4,
      }}>📍</div>

      {/* Parchment texture overlay */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "16px",
        background: "radial-gradient(ellipse at 30% 20%, rgba(192,16,42,0.08) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Role banner */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.7, y: hovered ? 0 : 2 }}
        style={{
          display: "inline-block",
          background: "linear-gradient(135deg, rgba(192,16,42,0.2), rgba(150,0,32,0.12))",
          border: "1px solid rgba(192,16,42,0.4)",
          borderRadius: "100px",
          padding: "0.25rem 0.85rem",
          fontFamily: "Pirata One, Cinzel, serif",
          fontSize: "0.78rem",
          color: "#f87171",
          letterSpacing: "0.1em",
          marginBottom: "1.25rem",
        }}
      >
        ☠ {member.role}
      </motion.div>

      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", position: "relative" }}>
        <Avatar member={member} size={94} />
        {/* Animated ring on hover */}
        <motion.div
          animate={{
            scale: hovered ? [1, 1.18, 1] : 1,
            opacity: hovered ? [0.5, 0.15, 0.5] : 0,
          }}
          transition={{ duration: 1.5, repeat: hovered ? Infinity : 0 }}
          style={{
            position: "absolute",
            width: 94, height: 94,
            borderRadius: "50%",
            border: "2px solid rgba(192,16,42,0.6)",
            top: 0, left: "50%", transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Name */}
      <h3 className="font-cinzel" style={{
        fontSize: "1.05rem",
        fontWeight: 800,
        color: hovered ? "#c0102a" : "#f0e8e8",
        marginBottom: "0.25rem",
        transition: "color 0.3s",
      }}>
        {member.name}
      </h3>

      {/* Position */}
      <div style={{
        fontFamily: "Cinzel, serif",
        fontSize: "0.74rem",
        letterSpacing: "0.12em",
        color: "rgba(192,16,42,0.85)",
        textTransform: "uppercase",
        marginBottom: "0.4rem",
        fontWeight: 600,
      }}>
        {member.position}
      </div>

      {/* Department */}
      <div style={{
        fontSize: "0.78rem",
        color: "rgba(232,223,200,0.5)",
        marginBottom: "1rem",
      }}>
        {member.dept}
      </div>

      {/* Click / Touch Hint Badge */}
      <div style={{
        marginTop: "0.5rem",
        padding: "0.4rem 0.8rem",
        borderRadius: "8px",
        background: hovered ? "rgba(192,16,42,0.2)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(192,16,42,0.4)" : "rgba(255,255,255,0.06)"}`,
        fontSize: "0.72rem",
        color: hovered ? "#fff" : "rgba(232,223,200,0.4)",
        fontFamily: "Cinzel, serif",
        transition: "all 0.3s",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.3rem",
      }}>
        <span>🔍</span> {hovered ? "Click for Full Profile" : "View Profile"}
      </div>
    </motion.div>
  );
}

/* ── Map Decoration ──────────────────────────────────────────── */
function MapDecor() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", top: "4rem", right: "4rem",
          fontSize: "4rem", opacity: 0.05,
        }}
      >🧭</motion.div>

      <div style={{
        position: "absolute", bottom: "3rem", left: "3rem",
        fontSize: "3rem", opacity: 0.05,
        transform: "scaleX(-1)",
      }}>⛵</div>

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} opacity="0.04">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#c0102a" strokeWidth="1" strokeDasharray="8,12" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#c0102a" strokeWidth="1" strokeDasharray="8,12" />
      </svg>
    </div>
  );
}

/* ── About Section Main Component ────────────────────────────── */
export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section
      id="about"
      style={{
        padding: "6rem 0",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MapDecor />

      <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          <div style={{ fontSize: "1.5rem", letterSpacing: "0.3em", color: "rgba(192,16,42,0.3)", marginBottom: "0.75rem" }}>
            ─── ☠ ───
          </div>
          <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            The Nexaura Crew
          </h2>
          <p style={{ color: "rgba(232,223,200,0.5)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Meet the pirates behind Nexaura'26. Tap any crew member to view their photo, full profile, and contact details.
          </p>
          <div style={{ fontSize: "1.5rem", letterSpacing: "0.3em", color: "rgba(192,16,42,0.3)", marginTop: "0.75rem" }}>
            ─── ⚓ ───
          </div>
        </motion.div>

        {/* Crew Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginTop: "3rem",
        }}>
          {TEAM_MEMBERS.map((member, i) => (
            <CrewCard
              key={member.id}
              member={member}
              index={i}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{
            marginTop: "4rem",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(192,16,42,0.3), transparent)",
          }}
        />

        {/* Nexaura Signature */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
          <div className="font-pirata" style={{ fontSize: "1.8rem", color: "rgba(192,16,42,0.5)" }}>
            ─── NEXAURA'26 ───
          </div>
        </motion.div>
      </div>

      {/* Crew Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <CrewModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
