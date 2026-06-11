// src/components/ServiceModal.jsx
import { useEffect } from "react";
import { WHATSAPP_URL } from "../data/services";

export default function ServiceModal({ service, onClose }) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!service) return null;

  const bookURL = `${WHATSAPP_URL.split("?")[0]}?text=Hi%2C%20I%20would%20like%20to%20book%20*${encodeURIComponent(service.title)}*%20please!`;

  return (
    <>
      <style>{`
        .svc-modal-overlay {
          position: fixed; inset: 0; z-index: 2000;
          display: flex; align-items: center; justify-content: center;
          background: rgba(10, 2, 6, 0.82);
          backdrop-filter: blur(12px);
          animation: overlayIn 0.3s ease;
          padding: 20px;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }

        .svc-modal-box {
          position: relative;
          width: 100%;
          max-width: 860px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 28px;
          background: #0e0608;
          animation: boxIn 0.45s cubic-bezier(0.23,1,0.32,1);
          border: 1px solid rgba(201,123,138,0.15);
        }
        @keyframes boxIn {
          from { opacity: 0; transform: translateY(48px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .svc-modal-box::-webkit-scrollbar { width: 4px; }
        .svc-modal-box::-webkit-scrollbar-track { background: #0e0608; }
        .svc-modal-box::-webkit-scrollbar-thumb { background: #7a3a4a; border-radius: 2px; }

        .close-btn {
          position: absolute; top: 20px; right: 20px; z-index: 10;
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          color: white; font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px);
          transition: background 0.25s ease;
        }
        .close-btn:hover { background: rgba(255,255,255,0.2); }

        .modal-hero-img {
          width: 100%; height: 360px; object-fit: cover;
          border-radius: 28px 28px 0 0;
          display: block;
        }
        .modal-img-overlay {
          position: absolute; top: 0; left: 0; right: 0; height: 360px;
          background: linear-gradient(to top, #0e0608 0%, rgba(14,6,8,0.35) 55%, transparent 100%);
          border-radius: 28px 28px 0 0;
          pointer-events: none;
        }
        .modal-body { padding: 36px 44px 44px; }
        .include-chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 20px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(249,232,236,0.7);
        }
        .kw-chip {
          display: inline-block;
          padding: 5px 14px; border-radius: 20px;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 0.06em;
        }
        .stat-card {
          flex: 1; min-width: 130px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 18px 20px;
        }
        .btn-book {
          flex: 1; display: inline-flex; align-items: center; justify-content: center;
          gap: 8px; padding: 16px 28px; border-radius: 50px;
          background: #25D366; color: white; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          transition: all 0.3s ease;
          border: none; cursor: pointer;
        }
        .btn-book:hover { transform: translateY(-2px); box-shadow: 0 12px 36px rgba(37,211,102,0.4); }
        .btn-close-lower {
          padding: 16px 28px; border-radius: 50px;
          background: transparent;
          border: 1px solid rgba(249,232,236,0.18);
          color: rgba(249,232,236,0.55);
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-close-lower:hover { border-color: rgba(249,232,236,0.4); color: rgba(249,232,236,0.8); }

        @media (max-width: 600px) {
          .svc-modal-box { border-radius: 20px; }
          .modal-hero-img { height: 260px; border-radius: 20px 20px 0 0; }
          .modal-img-overlay { height: 260px; border-radius: 20px 20px 0 0; }
          .modal-body { padding: 24px 24px 32px; }
        }
      `}</style>

      <div className="svc-modal-overlay" onClick={onClose}>
        <div className="svc-modal-box" onClick={(e) => e.stopPropagation()}>
          {/* Hero image */}
          <div style={{ position: "relative" }}>
            <img
              src={service.image}
              alt={service.title}
              className="modal-hero-img"
            />
            <div className="modal-img-overlay" />

            {/* Tag badge */}
            <span
              style={{
                position: "absolute", top: 22, left: 22, zIndex: 5,
                fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600,
                padding: "5px 14px", borderRadius: 20,
                background: service.accent, color: "white",
              }}
            >
              {service.tag}
            </span>

            <button className="close-btn" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Subtitle */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.28em", textTransform: "uppercase",
                color: service.accent, marginBottom: 10,
              }}
            >
              {service.subtitle}
            </p>

            {/* Title */}
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(2rem, 5vw, 3rem)", color: "#f9e8ec",
                lineHeight: 1.08, marginBottom: 14,
              }}
            >
              {service.title}
            </h2>

            {/* Rule */}
            <div style={{ width: 48, height: 1, background: service.accent, marginBottom: 20 }} />

            {/* Full description */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 14, lineHeight: 1.85,
                color: "rgba(249,232,236,0.6)", marginBottom: 28,
              }}
            >
              {service.fullDesc}
            </p>

            {/* Keywords */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
              {service.keywords.map((k) => (
                <span
                  key={k}
                  className="kw-chip"
                  style={{
                    background: `${service.accent}18`,
                    color: service.accent,
                    border: `1px solid ${service.accent}35`,
                  }}
                >
                  {k}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <div className="stat-card">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(249,232,236,0.35)", marginBottom: 8 }}>
                  Starting Price
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.45rem", color: "#f9e8ec" }}>
                  {service.price}
                </p>
              </div>
              <div className="stat-card">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(249,232,236,0.35)", marginBottom: 8 }}>
                  Session Duration
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "1.45rem", color: "#f9e8ec" }}>
                  {service.duration}
                </p>
              </div>
            </div>

            {/* Includes */}
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(249,232,236,0.35)", marginBottom: 12 }}>
              Includes
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {service.includes.map((inc) => (
                <span key={inc} className="include-chip">
                  <span style={{ color: service.accent, fontSize: 13 }}>✓</span>
                  {inc}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={bookURL} target="_blank" rel="noopener noreferrer" className="btn-book">
                Book This Look
              </a>
              <button className="btn-close-lower" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
