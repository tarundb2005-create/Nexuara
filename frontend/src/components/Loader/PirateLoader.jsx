import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Ocean canvas — dark crimson sea ────────────────────────── */
function OceanCanvas() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let t        = 0;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      /* ── Sky gradient ── */
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0,   "#040008");
      sky.addColorStop(0.4, "#08000f");
      sky.addColorStop(0.7, "#100015");
      sky.addColorStop(1,   "#200005");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      /* ── Stars ── */
      ctx.globalAlpha = 1;
      for (let s = 0; s < 160; s++) {
        const sx    = (s * 137.5 + 50) % W;
        const sy    = (s * 93.7  + 20) % (H * 0.52);
        const r     = s % 5 === 0 ? 1.4 : 0.65;
        const alpha = 0.25 + 0.55 * Math.sin(t * 0.016 + s);
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = s % 7 === 0 ? `rgba(120,180,255,1)` : `rgba(255,235,235,1)`;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* ── Moon ── */
      ctx.shadowColor = "#4080ff";
      ctx.shadowBlur  = 40;
      ctx.fillStyle   = "#c8e0ff";
      ctx.beginPath();
      ctx.arc(W * 0.83, H * 0.1, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      /* Moon glow ring */
      const mg = ctx.createRadialGradient(W*0.83, H*0.1, 20, W*0.83, H*0.1, 110);
      mg.addColorStop(0, "rgba(80,140,255,0.14)");
      mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg;
      ctx.beginPath();
      ctx.arc(W*0.83, H*0.1, 110, 0, Math.PI*2);
      ctx.fill();

      /* ── Horizon red glow ── */
      const hg = ctx.createRadialGradient(W*0.15, H*0.58, 0, W*0.15, H*0.58, W*0.42);
      hg.addColorStop(0, "rgba(180,0,30,0.38)");
      hg.addColorStop(0.5, "rgba(120,0,20,0.16)");
      hg.addColorStop(1, "transparent");
      ctx.fillStyle = hg;
      ctx.fillRect(0, 0, W, H);

      /* ── Moon reflection on water ── */
      for (let r = 0; r < 5; r++) {
        ctx.globalAlpha = 0.07 - r * 0.012;
        ctx.fillStyle   = "rgba(100,160,255,1)";
        ctx.beginPath();
        ctx.ellipse(W*0.83, H*0.57 + r*20 + Math.sin(t*0.05+r)*5, 8+r*5, 3+r*1.5, 0, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* ── Wave layers ── */
      const waves = [
        { amp: 22, freq: 0.008, spd: 0.38, yBase: 0.56, color: "#160010" },
        { amp: 18, freq: 0.010, spd: 0.58, yBase: 0.62, color: "#280015" },
        { amp: 14, freq: 0.013, spd: 0.80, yBase: 0.67, color: "#3a001a" },
        { amp: 10, freq: 0.016, spd: 1.10, yBase: 0.72, color: "#4c001e" },
        { amp:  6, freq: 0.022, spd: 1.40, yBase: 0.76, color: "#5e0022" },
      ];
      waves.forEach(({ amp, freq, spd, yBase, color }) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 4) {
          const y = H*yBase + amp*Math.sin(x*freq + t*spd) + (amp/2)*Math.sin(x*freq*1.7 + t*spd*1.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();
      });

      /* ── Crimson foam ── */
      const topY = (x) => H*0.56 + 22*Math.sin(x*0.008 + t*0.38);
      for (let x = 0; x < W; x += 22) {
        ctx.globalAlpha = 0.07 + 0.05*Math.sin(t*0.1 + x*0.05);
        ctx.fillStyle   = "#c0102a";
        ctx.beginPath();
        ctx.ellipse(x, topY(x), 8, 2, 0, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* ── Electric blue circuit lines on water ── */
      ctx.strokeStyle = "rgba(30,100,255,0.1)";
      ctx.lineWidth   = 1;
      for (let i = 0; i < 3; i++) {
        const baseY = H * 0.63 + i * 20;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 40) {
          const y = baseY + Math.sin(x*0.02 + t*0.3 + i) * 3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
          if (x % 80 === 0) { ctx.lineTo(x+10, y-6); ctx.lineTo(x+20, y); }
        }
        ctx.stroke();
      }

      /* ── Atmospheric vignette ── */
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

/* ── Ship SVG silhouette ─────────────────────────────────────── */
function Ship() {
  return (
    <motion.div
      initial={{ x: "110vw" }}
      animate={{ x: "18vw" }}
      transition={{ delay: 0.1, duration: 1.8, ease: [0.22, 0.9, 0.36, 1] }}
      style={{
        position: "absolute",
        bottom: "27%",
        width: "clamp(200px, 28vw, 380px)",
        filter: "drop-shadow(0 0 18px rgba(192,16,42,0.45)) drop-shadow(0 0 40px rgba(192,16,42,0.2))",
      }}
    >
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", height:"100%" }}>
        {/* Mast */}
        <rect x="154" y="18" width="5" height="145" fill="#2a0a0a" />
        {/* Yard arm */}
        <rect x="108" y="42" width="96" height="4" fill="#2a0a0a" rx="2" />
        {/* Main sails */}
        <polygon points="113,46 157,46 157,112" fill="rgba(210,185,140,0.88)" stroke="#6b2010" strokeWidth="1" />
        <polygon points="202,46 157,46 157,112" fill="rgba(195,170,125,0.82)" stroke="#6b2010" strokeWidth="1" />
        {/* Red X on sail */}
        <line x1="118" y1="51" x2="156" y2="108" stroke="rgba(192,16,42,0.75)" strokeWidth="2.5" />
        <line x1="156" y1="51" x2="118" y2="108" stroke="rgba(192,16,42,0.75)" strokeWidth="2.5" />
        {/* Top mast */}
        <rect x="134" y="20" width="42" height="3" fill="#2a0a0a" rx="1.5" />
        {/* Top sails */}
        <polygon points="136,23 157,23 157,41" fill="rgba(210,185,140,0.72)" stroke="#6b2010" strokeWidth="0.8" />
        <polygon points="178,23 157,23 157,41" fill="rgba(195,170,125,0.68)" stroke="#6b2010" strokeWidth="0.8" />
        {/* Skull flag */}
        <rect x="155" y="3" width="28" height="17" fill="#120005" rx="1" />
        <circle cx="169" cy="10" r="5.5" fill="#360010" stroke="rgba(192,16,42,0.9)" strokeWidth="1" />
        <text x="169" y="14" textAnchor="middle" fontSize="8" fill="#c0102a">☠</text>
        {/* Hull */}
        <path d="M65,152 Q78,142 100,139 L212,139 Q234,142 248,152 L262,184 Q250,200 160,205 Q70,200 58,184 Z" fill="#150008" stroke="#350010" strokeWidth="1.5" />
        {/* Planks */}
        {[148,157,166,175,184,193].map(y => <line key={y} x1="68" y1={y} x2="250" y2={y} stroke="#250010" strokeWidth="0.8" opacity="0.7"/>)}
        {/* Cannons */}
        {[98,128,158,188].map(x => <rect key={x} x={x} y="152" width="15" height="11" rx="2" fill="#0d0005" stroke="#350010" strokeWidth="0.8"/>)}
        {/* Deck railing */}
        <path d="M92,139 L220,139 L223,129 L89,129 Z" fill="#150008" stroke="#350010" strokeWidth="1" />
        {[98,118,138,158,178,198,215].map(x => <rect key={x} x={x} y="122" width="3" height="18" fill="#350010" rx="1"/>)}
        <line x1="98" y1="124" x2="217" y2="124" stroke="#4a0015" strokeWidth="1.5" />
        {/* Water shadow */}
        <ellipse cx="160" cy="203" rx="106" ry="8" fill="#1a0008" opacity="0.85" />
        {/* Bow waves */}
        {[0,1,2].map(i => (
          <path key={i} d={`M${58-i*10},${184+i*5} Q${48-i*10},${178+i*5} ${42-i*10},${184+i*5}`} fill="none" stroke="rgba(200,20,40,0.2)" strokeWidth="1.5" />
        ))}
      </svg>
    </motion.div>
  );
}

/* ── Compass rose ────────────────────────────────────────────── */
function Compass() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -200, scale: 0.4 }}
      animate={{ opacity: 0.75, rotate: 0, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
      style={{ position: "absolute", top: "5%", left: "4%" }}
    >
      <svg viewBox="0 0 100 100" width="90" height="90">
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(192,16,42,0.35)" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill="rgba(4,0,8,0.82)" stroke="rgba(192,16,42,0.55)" strokeWidth="1.5" />
        {["N","E","S","W"].map((d, i) => {
          const a = (i*90 - 90) * Math.PI / 180;
          return <text key={d} x={50 + 29*Math.cos(a)} y={50 + 29*Math.sin(a) + 4} textAnchor="middle" fontSize="9" fill="#c0102a" fontFamily="Cinzel,serif">{d}</text>;
        })}
        {Array.from({length:16}).map((_,i) => {
          const a = i*22.5*Math.PI/180, r1 = i%4===0 ? 33 : 37;
          return <line key={i} x1={50+r1*Math.cos(a)} y1={50+r1*Math.sin(a)} x2={50+42*Math.cos(a)} y2={50+42*Math.sin(a)} stroke="rgba(192,16,42,0.45)" strokeWidth={i%4===0?1.5:0.8} />;
        })}
        <polygon points="50,16 47,50 50,44 53,50" fill="#c0102a" />
        <polygon points="50,84 47,50 50,56 53,50" fill="#f0e8e8" />
        <circle cx="50" cy="50" r="4" fill="#d4a82a" />
      </svg>
    </motion.div>
  );
}

/* ── Floating ambient elements ───────────────────────────────── */
function AmbientElements() {
  return (
    <>
      {/* Map icon top-right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.45, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{ position: "absolute", top: "6%", right: "5%", fontSize: "clamp(2rem,4vw,3.5rem)" }}
      >🗺️</motion.div>

      {/* Anchor bottom-left */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{ position: "absolute", bottom: "8%", left: "5%", fontSize: "clamp(2rem,3.5vw,3rem)" }}
      >⚓</motion.div>

      {/* Skull bottom-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.38, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        style={{ position: "absolute", bottom: "10%", right: "6%", fontSize: "clamp(1.8rem,3vw,2.8rem)" }}
      >🏴‍☠️</motion.div>

      {/* Horizontal crimson light line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1.0 }}
        style={{
          position: "absolute", top: "33%", left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(192,16,42,0.35), rgba(30,111,217,0.2), transparent)",
          transformOrigin: "left",
        }}
      />

      {/* Bottom red bleed */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(0deg, rgba(110,0,18,0.45) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />
    </>
  );
}

/* ── Main Loader ─────────────────────────────────────────────── */
export default function PirateLoader({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          overflow: "hidden", background: "#040008",
        }}
      >
        <OceanCanvas />
        <Compass />
        <AmbientElements />
        <Ship />
      </motion.div>
    </AnimatePresence>
  );
}
