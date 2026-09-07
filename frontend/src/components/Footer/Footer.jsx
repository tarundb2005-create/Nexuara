import React from "react";
import { motion } from "framer-motion";
import { COLLEGE_NAME, COLLEGE_LOCATION } from "../../data/data";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "transparent",
      borderTop: "1px solid rgba(192,16,42,0.2)",
      padding: "4rem 0 2rem",
    }}>
      <div className="section-container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
          marginBottom: "3rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.25rem" }}>⚓</span>
              <span className="font-pirata" style={{ fontSize: "1.5rem", fontWeight: 900, background: "linear-gradient(135deg, #e8c87a, #d4a82a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>NEXURA'26</span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "rgba(232,223,200,0.45)", lineHeight: 1.7 }}>
              {COLLEGE_NAME}<br />
              {COLLEGE_LOCATION}<br />
              14–16 February 2026
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "rgba(192,16,42,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Navigate
            </h4>
            {["home", "events", "register", "about"].map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(240,232,232,0.3)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  padding: "0.3rem 0",
                  textAlign: "left",
                  transition: "color 0.3s",
                  textTransform: "capitalize",
                }}
                onMouseEnter={e => e.target.style.color = "#c0102a"}
                onMouseLeave={e => e.target.style.color = "rgba(240,232,232,0.3)"}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Events */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "rgba(192,16,42,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Events
            </h4>
            {["Technical Events", "Non-Technical", "Workshops", "Cultural Night"].map(e => (
              <div key={e} style={{ color: "rgba(232,223,200,0.45)", fontSize: "0.875rem", padding: "0.3rem 0" }}>{e}</div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel" style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "rgba(192,16,42,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact
            </h4>
            <div style={{ fontSize: "0.875rem", color: "rgba(232,223,200,0.45)", lineHeight: 2 }}>
              <div>📧 nexura@yourcollege.edu</div>
              <div>📱 +91 98765 43210</div>
              <div>📍 {COLLEGE_LOCATION}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(192,16,42,0.3), transparent)", margin: "2rem 0" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.78rem", color: "rgba(232,223,200,0.3)" }}>
            © 2026 Nexura'26 · {COLLEGE_NAME} · All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(232,223,200,0.3)" }}>Made with</span>
            <span>⚓</span>
            <span style={{ fontSize: "0.75rem", color: "rgba(232,223,200,0.3)" }}>by the Nexura Tech Crew</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
