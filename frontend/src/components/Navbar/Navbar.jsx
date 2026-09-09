import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import nexuraLogo from "../../assets/nexura-logo.jpg";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Events",     href: "/events" },
  { label: "About",      href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]      = useState(false);
  const location = useLocation();
  const activeSection = location.pathname;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 900,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(4,0,8,0.94)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(192,16,42,0.2)" : "none",
        padding: scrolled ? "0.6rem 0" : "1.2rem 0",
      }}
    >
      <div className="section-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link
          to="/"
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}
        >
          <img src={nexuraLogo} alt="Nexaura" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid rgba(192,16,42,0.5)", objectFit: "cover" }} />
          <span className="font-pirata" style={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.1em", background: "linear-gradient(135deg, #e8c84a, #d4a82a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            NEX<span style={{ background: "linear-gradient(135deg, #ff3a52, #c0102a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>A</span>URA<span style={{ color: "rgba(192,16,42,0.6)", WebkitTextFillColor: "rgba(192,16,42,0.6)" }}>'26</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="hidden-mobile">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 1rem",
                fontFamily: "Cinzel, serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                fontWeight: 600,
                color: activeSection === href ? "#c0102a" : "rgba(240,232,232,0.6)",
                borderBottom: activeSection === href ? "1px solid #c0102a" : "1px solid transparent",
                transition: "all 0.3s",
                textTransform: "uppercase",
                textDecoration: "none"
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#c0102a",
            fontSize: "1.5rem",
            padding: "0.25rem",
          }}
          className="show-mobile"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "rgba(4,0,8,0.98)",
            borderTop: "1px solid rgba(192,16,42,0.2)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              onClick={() => setMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "0.75rem 0",
                fontFamily: "Cinzel, serif",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                color: activeSection === href ? "#c0102a" : "rgba(240,232,232,0.8)",
                borderBottom: "1px solid rgba(192,16,42,0.12)",
                textDecoration: "none"
              }}
            >
              {label}
            </Link>
          ))}
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
