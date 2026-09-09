import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { TEAM_MEMBERS } from "../../data/data";
import ShipSVG from "../Loader/ShipSVG";
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

/* ── Crew Card (Wanted Poster Theme) ──────────────────────────────── */
function CrewCard({ member, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -15, rotateZ: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0, rotateZ: index % 2 === 0 ? -2 : 2 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 0.9, 0.36, 1] }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="crew-card wanted-poster"
      style={{
        position: "relative",
        background: "linear-gradient(175deg, #e4d5b7 0%, #d8c29b 50%, #c8ad81 100%)",
        border: "1px solid #8b5a2b",
        boxShadow: hovered 
          ? "0 25px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(101,67,33,0.6)" 
          : "0 10px 30px rgba(0,0,0,0.3), inset 0 0 40px rgba(101,67,33,0.4)",
        padding: "1.5rem 1rem",
        textAlign: "center",
        width: "250px", // Fixed width looks better for posters
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transform: hovered ? "scale(1.05) rotateZ(0deg) translateY(-10px)" : "scale(1)",
        cursor: "pointer",
        clipPath: "polygon(1% 1%, 99% 0%, 98% 99%, 2% 100%, 0% 98%)", // Slightly imperfect edges
      }}
    >
      {/* Nail / Pin */}
      <div style={{
        position: "absolute", top: "12px", left: "50%", transform: "translateX(-50%)",
        width: "14px", height: "14px", borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%, #b0bec5, #37474f)",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.6)",
        zIndex: 10
      }} />

      {/* Wanted Heading */}
      <h2 className="font-pirata" style={{
        fontSize: "2.8rem",
        color: "#3e2723",
        margin: "1rem 0 0.2rem 0",
        letterSpacing: "0.12em",
        textShadow: "1px 1px 0px rgba(255,255,255,0.4)",
        lineHeight: 1
      }}>
        WANTED
      </h2>

      {/* Dead or Alive */}
      <div style={{
        fontFamily: "Cinzel, serif",
        fontSize: "0.75rem",
        fontWeight: 900,
        letterSpacing: "0.2em",
        color: "#5d4037",
        marginBottom: "1rem",
      }}>
        DEAD OR ALIVE
      </div>

      {/* Portrait Frame */}
      <div style={{
        width: "170px",
        height: "170px",
        margin: "0 auto 1rem auto",
        border: "4px solid #3e2723",
        boxShadow: "inset 0 0 10px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.3)",
        position: "relative",
        background: "#fff",
        overflow: "hidden"
      }}>
        <img 
          src={member.avatar || "/default-avatar.png"} 
          alt={member.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "sepia(0.85) contrast(1.2) brightness(0.9) grayscale(0.2)",
            transition: "filter 0.4s",
          }}
          onMouseEnter={(e) => e.target.style.filter = "none"}
          onMouseLeave={(e) => e.target.style.filter = "sepia(0.85) contrast(1.2) brightness(0.9) grayscale(0.2)"}
        />
      </div>

      {/* Role / Title */}
      <div className="font-cinzel" style={{
        fontSize: "0.9rem",
        fontWeight: 800,
        color: "#4e342e",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "0.2rem",
      }}>
        {member.role}
      </div>

      {/* Name */}
      <h3 className="font-pirata" style={{
        fontSize: "1.9rem",
        color: "#212121",
        margin: "0 0 0.5rem 0",
        lineHeight: 1.1,
        textShadow: "1px 1px 0px rgba(255,255,255,0.4)"
      }}>
        {member.name}
      </h3>

      {/* Bounty */}
      <div className="font-cinzel" style={{
        fontSize: "1.3rem",
        fontWeight: 900,
        color: "#8b0000",
        marginTop: "0.8rem",
        borderTop: "2px dashed #795548",
        borderBottom: "2px dashed #795548",
        padding: "0.4rem 0",
      }}>
        $ {member.id * 15},000,000
      </div>
      
      {/* View Hint */}
      <div style={{
        fontSize: "0.7rem",
        color: "#5d4037",
        marginTop: "1rem",
        fontStyle: "italic",
        opacity: hovered ? 1 : 0.6,
        transition: "opacity 0.3s"
      }}>
        {hovered ? "Click to view dossier" : "Approach with caution"}
      </div>
    </motion.div>
  );
}

/* ── Drawn Island SVG ────────────────────────────────────────── */
function DrawnIsland({ style, isLeft }) {
  return (
    <svg viewBox="0 0 200 100" style={style} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <g transform={isLeft ? "scale(-1, 1) translate(-200, 0)" : "none"}>
        {/* Sandy Base */}
        <path d="M20,80 Q50,60 100,65 T180,80 Q150,100 100,95 T20,80 Z" fill="#e8c396" stroke="#5c4033" strokeWidth="2.5" />
        {/* Mountains/Rocks */}
        <path d="M40,75 L70,30 L100,70 Z" fill="#c49b71" stroke="#5c4033" strokeWidth="2.5" />
        <path d="M80,75 L120,20 L160,75 Z" fill="#ab8158" stroke="#5c4033" strokeWidth="2.5" />
        {/* Small X marks the spot */}
        <path d="M135,80 L145,90 M145,80 L135,90" stroke="#8b0000" strokeWidth="3" strokeLinecap="round" />
        {/* Palm Tree */}
        <path d="M120,70 Q130,50 125,35" fill="none" stroke="#5c4033" strokeWidth="4" strokeLinecap="round" />
        <path d="M125,35 Q140,40 145,30 Q130,30 125,35 Z" fill="#4a5d23" stroke="#2e3b16" strokeWidth="1.5"/>
        <path d="M125,35 Q120,20 110,25 Q120,30 125,35 Z" fill="#4a5d23" stroke="#2e3b16" strokeWidth="1.5"/>
        <path d="M125,35 Q135,20 145,20 Q135,25 125,35 Z" fill="#4a5d23" stroke="#2e3b16" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

/* ── Treasure Map Background ─────────────────────────────────── */
function TreasureMapBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, backgroundColor: "#e8d3a7" }}>
      {/* SVG noise texture for parchment look */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.35, pointerEvents: "none" }}>
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      {/* Vignette for burnt/aged edges */}
      <div style={{
        position: "absolute", inset: 0,
        boxShadow: "inset 0 0 120px rgba(92, 64, 51, 0.8)",
        pointerEvents: "none"
      }} />
      {/* Map grid lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15, pointerEvents: "none" }}>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#5c4033" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

/* ── About Section Main Component ────────────────────────────── */
export default function About() {
  const [selectedMember, setSelectedMember] = useState(null);
  const containerRef = useRef(null);

  // Scroll tracking for the ship
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Dynamically generate the path and animation points based on crew size
  const N = TEAM_MEMBERS.length;
  const segment = 1 / (N + 1);

  const xInput = [0];
  const xOutput = ["0vw"];
  const rotInput = [0];
  const rotOutput = [0];
  
  let pathD = "M 50,0 ";

  for (let i = 1; i <= N; i++) {
    const P = i * segment;
    const startPlateau = P - (segment * 0.2); 
    const endPlateau = P + (segment * 0.2);
    const isLeft = (i - 1) % 2 === 0;
    const pos = isLeft ? "-22vw" : "22vw";
    const xSvg = isLeft ? 28 : 72;
    
    // X Position
    xInput.push(startPlateau, endPlateau);
    xOutput.push(pos, pos);

    // Rotation
    rotInput.push(startPlateau);
    rotOutput.push(isLeft ? -15 : 15);
    rotInput.push(P);
    rotOutput.push(0); // Straighten out when stopped!
    rotInput.push(endPlateau);
    rotOutput.push(isLeft ? 15 : -15);

    // SVG Path (1000vh height, 100vh viewport = 900vh scrollable)
    const yStart = startPlateau * 900 + 40;
    const yEnd = endPlateau * 900 + 40;

    if (i === 1) {
      pathD += `C 50,${yStart/2} ${xSvg},${yStart/2} ${xSvg},${yStart} `;
    } else {
      const prevIsLeft = (i - 2) % 2 === 0;
      const prevXSvg = prevIsLeft ? 28 : 72;
      const prevEndPlateau = (i - 1) * segment + (segment * 0.2);
      const prevYEnd = prevEndPlateau * 900 + 40;
      const midY = (prevYEnd + yStart) / 2;
      pathD += `C ${prevXSvg},${midY} ${xSvg},${midY} ${xSvg},${yStart} `;
    }
    pathD += `L ${xSvg},${yEnd} `; // Vertical straight line for the plateau!
  }

  xInput.push(1);
  xOutput.push("0vw");
  rotInput.push(1);
  rotOutput.push(0);
  
  const lastEndPlateau = N * segment + (segment * 0.2);
  const lastYEnd = lastEndPlateau * 900 + 40;
  const lastXSvg = ((N - 1) % 2 === 0) ? 28 : 72;
  pathD += `C ${lastXSvg},${(lastYEnd + 1000)/2} 50,${(lastYEnd + 1000)/2} 50,1000`;

  const shipX = useTransform(scrollYProgress, xInput, xOutput);
  const shipRotate = useTransform(scrollYProgress, rotInput, rotOutput);

  // Base Y offset to keep ship in upper-middle of viewport
  const shipY = useTransform(scrollYProgress, [0, 1], ["20vh", "20vh"]);

  return (
    <section
      id="about"
      style={{
        position: "relative",
        background: "#e8d3a7", // Match map base color
      }}
    >
      <style>{`
        .crew-card {
          border-color: rgba(92, 64, 51, 0.3) !important;
          background: rgba(255,255,255,0.4) !important;
          backdrop-filter: blur(4px);
        }
        .crew-card:hover {
          background: rgba(255,255,255,0.6) !important;
          border-color: rgba(192,16,42,0.6) !important;
        }
        .text-gold-gradient {
          background: linear-gradient(to right, #8b0000, #5c4033);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .timeline-card-wrapper {
          position: absolute;
          transform: translateY(-50%);
          width: 75%;
          z-index: 2;
        }
        .timeline-card-wrapper.left { left: 5%; right: auto; }
        .timeline-card-wrapper.right { right: 5%; left: auto; }
        
        @media (min-width: 768px) {
          .timeline-card-wrapper { width: 40%; }
          .timeline-card-wrapper.left { left: 8%; }
          .timeline-card-wrapper.right { right: 8%; }
        }
      `}</style>

      {/* ── STICKY TREASURE MAP & SHIP ── */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        zIndex: 0,
      }}>
        <TreasureMapBackground />
        
        {/* Scary Ship sailing down */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            x: shipX,
            y: shipY,
            rotate: shipRotate,
            marginLeft: "-140px", // Half of width
            width: "280px",
            filter: "drop-shadow(0 15px 25px rgba(92,64,51,0.5))",
            zIndex: 10
          }}
        >
          <ShipSVG style={{ width: "100%", height: "100%" }} />
        </motion.div>
      </div>

      {/* ── SCROLLING TIMELINE CONTAINER ── */}
      {/* 1000vh creates enough scroll space for the journey */}
      <div ref={containerRef} style={{ position: "relative", zIndex: 1, height: "1000vh", marginTop: "-100vh", pointerEvents: "none" }}>
        
        {/* Dashed SVG Route connecting ports */}
        <svg viewBox="0 0 100 1000" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}>
          <path 
            d={pathD}
            fill="none" stroke="#8b0000" strokeWidth="0.4" strokeDasharray="1.5 1.5" opacity="0.65" 
          />
        </svg>

        {/* Section Header */}
        <div style={{ position: "absolute", top: "2%", width: "100%", textAlign: "center", pointerEvents: "auto" }}>
          <div style={{ fontSize: "1.5rem", letterSpacing: "0.3em", color: "#8b0000", marginBottom: "0.75rem" }}>
            ─── ☠ ───
          </div>
          <h2 className="font-cinzel text-gold-gradient" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, marginBottom: "0.75rem" }}>
            The Nexaura Crew
          </h2>
          <p style={{ color: "#5c4033", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem", fontWeight: 600 }}>
            Follow the treasure map to discover the pirates waiting at each island port.
          </p>
        </div>

        {/* Crew Islands */}
        {TEAM_MEMBERS.map((member, i) => {
          const isLeft = i % 2 === 0;
          const P = (i + 1) * segment;
          const topPercent = P * 90 + 4;
          
          return (
            <div 
              key={member.id} 
              className={`timeline-card-wrapper ${isLeft ? 'left' : 'right'}`}
              style={{ top: `${topPercent}%`, pointerEvents: "auto" }}
            >
              {/* The Drawn Island behind the card */}
              <DrawnIsland 
                isLeft={isLeft}
                style={{ 
                  position: "absolute", 
                  top: "-60px", // Adjusted to place island center closer to card center
                  [isLeft ? "right" : "left"]: "-80px", 
                  width: "220px", 
                  zIndex: -1,
                  opacity: 0.9,
                  filter: "drop-shadow(0 5px 10px rgba(92,64,51,0.3))"
                }} 
              />
              
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ margin: "0px 0px -42% 0px" }} // Triggers exactly when the boat docks at startPlateau (58vh down)
                transition={{ duration: 0.5, ease: "easeOut", type: "spring", bounce: 0.4 }}
              >
                <CrewCard member={member} onClick={() => setSelectedMember(member)} />
              </motion.div>
            </div>
          );
        })}

        {/* End of the Line */}
        <div style={{ position: "absolute", top: "95%", width: "100%", textAlign: "center", pointerEvents: "auto" }}>
          <div className="font-pirata" style={{ fontSize: "2rem", color: "#8b0000" }}>
            ─── TREASURE FOUND ───
          </div>
        </div>
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
