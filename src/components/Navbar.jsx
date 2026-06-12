import { useState, useEffect } from "react";
import Logo from "./Logo";

const NAV_LINKS = ["Home", "Services", "Portfolio", "About", "Contact"];
const WHATSAPP_URL =
  "https://wa.me/917568616646?text=Hi%2C%20I%20would%20like%20to%20book%20a%20makeup%20session!";

export default function Navbar({ activeSection, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: scrolled ? "12px 0" : "22px 0",
    background: scrolled ? "rgba(253,246,240,0.96)" : "transparent",
    backdropFilter: scrolled ? "blur(14px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(201,123,138,0.12)" : "none",
    transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
  };

  const linkBase = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 500,
    padding: "4px 0",
    position: "relative",
    transition: "color 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <button
          onClick={() => onNav?.("Home")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="Go to home"
        >
          <Logo size="md" dark={false} />
        </button>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => onNav?.(l)}
              style={{
                ...linkBase,
                color: activeSection === l ? "#c97b8a" : "#7a3a4a",
              }}
            >
              {l}
              {/* Active underline */}
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  height: 1,
                  width: activeSection === l ? "100%" : 0,
                  background: "#c97b8a",
                  transition: "width 0.35s ease",
                }}
              />
            </button>
          ))}

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: 50,
              background: "linear-gradient(135deg, #c97b8a, #a0506a)",
              color: "white",
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(160,80,106,0.28)",
            }}
          >
            Book Now
          </a>
        </div>

        {/* Mobile hamburger — animated ☰ / ✕ */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            width: 44,
            height: 44,
            padding: 10,
            borderRadius: 8,
          }}
          className="mobile-menu-btn"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: "#7a3a4a",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: "#7a3a4a",
              borderRadius: 2,
              transition: "all 0.3s ease",
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? "scaleX(0)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: "#7a3a4a",
              borderRadius: 2,
              transition: "all 0.3s ease",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile dropdown — full-screen overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: scrolled ? "52px" : "62px",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "28px 32px 40px",
            background: "rgba(253,246,240,0.98)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            borderTop: "1px solid rgba(201,123,138,0.12)",
            overflowY: "auto",
            zIndex: 998,
            animation: "menuSlideDown 0.3s cubic-bezier(0.23,1,0.32,1) forwards",
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <button
              key={l}
              onClick={() => { onNav?.(l); setMenuOpen(false); }}
              style={{
                ...linkBase,
                color: activeSection === l ? "#c97b8a" : "#7a3a4a",
                textAlign: "left",
                padding: "18px 0",
                fontSize: 13,
                borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(201,123,138,0.10)" : "none",
                width: "100%",
              }}
            >
              <span style={{ marginRight: 10, opacity: 0.4, fontSize: 10 }}>{String(i + 1).padStart(2, "0")}</span>
              {l}
            </button>
          ))}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "16px 24px",
              borderRadius: 50,
              background: "linear-gradient(135deg, #c97b8a, #a0506a)",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              marginTop: 28,
              display: "block",
              boxShadow: "0 8px 28px rgba(160,80,106,0.28)",
            }}
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </a>
        </div>
      )}

      <style>{`
        @keyframes menuSlideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
