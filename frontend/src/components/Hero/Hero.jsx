import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SYMPOSIUM_DATE } from "../../data/data";
import nexuraLogo from "../../assets/nexura-logo.jpg";

/* ── Particle canvas — crimson + blue sparks ─────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 90 }, (_, i) => ({
      x:     Math.random() * window.innerWidth,
      y:     Math.random() * window.innerHeight,
      r:     Math.random() * 1.5 + 0.3,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    -Math.random() * 0.4 - 0.1,
      alpha: Math.random(),
      da:    (Math.random() * 0.005 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
      // Mix: 70% wine, 30% blue
      color: i % 3 === 0 ? "#4d9aff" : "#c0102a",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx; p.y += p.vy; p.alpha += p.da;
        if (p.alpha <= 0 || p.alpha >= 1) p.da *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10 || p.x > canvas.width + 10) p.x = Math.random() * canvas.width;
      });
      ctx.globalAlpha = 1;
      rafRef.current  = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />;
}

/* ── Wave bottom ─────────────────────────────────────────────── */
function WaveBottom() {
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "80px" }}>
        <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="rgba(8,0,15,0.9)" />
      </svg>
    </div>
  );
}

/* ── Countdown ───────────────────────────────────────────────── */
function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft({ days:0, hours:0, minutes:0, seconds:0 }); return; }
      setTimeLeft({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return timeLeft;
}

function CountdownUnit({ value, label }) {
  return (
    <div style={{ textAlign: "center", minWidth: "80px" }}>
      <div className="countdown-digit">{String(value).padStart(2,"0")}</div>
      <div style={{ fontFamily: "Cinzel, serif", fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(192,16,42,0.6)", marginTop: "0.25rem", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}
const CountdownSep = () => <div className="countdown-digit" style={{ marginBottom: "1.2rem", opacity: 0.35 }}>:</div>;

import { useNavigate } from "react-router-dom";

/* ── Hero Section ────────────────────────────────────────────── */
export default function Hero() {
  const { days, hours, minutes, seconds } = useCountdown(SYMPOSIUM_DATE.getTime());
  const navigate = useNavigate();

  return (
    <section id="home" style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      background: "transparent",
    }}>
      <ParticleCanvas />

      {/* Wine spotlight */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(192,16,42,0.07) 0%, transparent 70%)",
      }} />
      {/* Blue edge glow */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 40% at 10% 80%, rgba(30,111,217,0.08) 0%, transparent 60%)",
      }} />

      <div className="section-container" style={{ position: "relative", zIndex: 3, textAlign: "center", paddingTop: "7rem", paddingBottom: "6rem" }}>

        {/* Logo + eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
        >
          {/* Circular logo */}
          <div style={{
            width: "100px", height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid rgba(192,16,42,0.5)",
            boxShadow: "0 0 30px rgba(192,16,42,0.4), 0 0 60px rgba(192,16,42,0.15)",
          }}>
            <img src={nexuraLogo} alt="Nexaura" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.75rem",
            background: "rgba(192,16,42,0.08)", border: "1px solid rgba(192,16,42,0.2)",
            borderRadius: "100px", padding: "0.4rem 1.25rem",
            fontFamily: "Cinzel, serif", fontSize: "0.68rem", letterSpacing: "0.25em", color: "rgba(192,16,42,0.8)",
          }}>
            <span>⚓</span><span>NATIONAL LEVEL SYMPOSIUM</span><span>⚓</span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}
        >
          <h1 className="font-pirata" style={{
            fontSize: "clamp(3.5rem, 11vw, 9rem)",
            fontWeight: 900,
            lineHeight: 0.95,
          }}>
            {"NEXAURA".split("").map((l, i) => (
              <span key={i} style={{
                background: l === "X"
                  ? "linear-gradient(180deg, #ff4d62, #c0102a)"
                  : "linear-gradient(180deg, #e8c87a 0%, #d4a82a 40%, #9a7015 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                filter: l === "X"
                  ? "drop-shadow(0 0 30px rgba(192,16,42,0.7))"
                  : "drop-shadow(0 0 20px rgba(212,168,42,0.4))",
              }}>{l}</span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}
        >
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: "linear-gradient(90deg, transparent, rgba(192,16,42,0.5))" }} />
          <span className="font-cinzel" style={{ color: "rgba(192,16,42,0.5)", fontSize: "1.1rem", letterSpacing: "0.4em" }}>'26</span>
          <div style={{ height: "1px", flex: 1, maxWidth: "100px", background: "linear-gradient(90deg, rgba(192,16,42,0.5), transparent)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(0.9rem, 2.2vw, 1.25rem)", color: "rgba(240,232,232,0.55)", letterSpacing: "0.08em", marginBottom: "1rem", maxWidth: "520px", margin: "0 auto 1rem" }}
        >
          Where Technology Meets Adventure · 30th September 2026
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "rgba(240,232,232,0.45)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem", textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          Conducted by the Department of Artificial Intelligence and Data Science
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center",
            background: "rgba(8,0,15,0.7)",
            border: "1px solid rgba(192,16,42,0.2)",
            borderRadius: "16px", padding: "1.5rem 5%", marginBottom: "3rem",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(192,16,42,0.1)",
          }}
        >
          <CountdownUnit value={days} label="Days" />
          <CountdownSep />
          <CountdownUnit value={hours} label="Hours" />
          <CountdownSep />
          <CountdownUnit value={minutes} label="Min" />
          <CountdownSep />
          <CountdownUnit value={seconds} label="Sec" />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button onClick={() => navigate("/events")} className="btn-wine" style={{ padding: "0.9rem 2.5rem", borderRadius: "8px", fontSize: "0.85rem" }}>
            🗺️ &nbsp; Explore Events
          </button>
          <button onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLScnIJMgoekJ2GlS_8x_yAkvhTgTotsI_ryZVIywAq8EPm7eVw/viewform?usp=publish-editor", "_blank")} className="btn-blue" style={{ padding: "0.9rem 2.5rem", borderRadius: "8px", fontSize: "0.85rem" }}>
            ⚓ &nbsp; Register Now
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ display: "flex", justifyContent: "center", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}
        >
          {[
            { value: "10", label: "Events", color: "#c0102a" },
            { value: "2",   label: "Categories", color: "#1e6fd9" },
            { value: "500+", label: "Participants", color: "#c0102a" },
          ].map(({ value, label, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="font-cinzel" style={{
                fontSize: "1.8rem", fontWeight: 900,
                background: `linear-gradient(135deg, ${color}, ${color}88)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{value}</div>
              <div style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: "rgba(240,232,232,0.4)", fontFamily: "Cinzel, serif", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}
        >
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(192,16,42,0.4)", fontFamily: "Cinzel, serif" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: "rgba(192,16,42,0.45)", fontSize: "1rem" }}>↓</motion.div>
        </motion.div>
      </div>
      <WaveBottom />
    </section>
  );
}
