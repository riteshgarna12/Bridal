// src/App.jsx
// Main application — wires Navbar, Hero, Services, Portfolio, About, Contact

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ServicesSection from "./components/ServicesSection";
import Logo from "./components/Logo";
import { WHATSAPP_URL } from "./data/services";
import { InstagramEmbed } from 'react-social-media-embed';
import { FaInstagram } from "react-icons/fa";
import "./styles/globals.css";

// ─── Testimonials ────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    text: "Absolutely breathtaking bridal look. She understood my vision perfectly and made me feel like the most radiant version of myself.",
    event: "Bridal Makeup · 2025",
    initial: "PS",
  },
  {
    name: "Ananya Gupta",
    text: "My pre-wedding photos turned out luminous! The soft dewy look was exactly what I had dreamed of — flawless in every frame.",
    event: "Pre-Wedding Shoot · 2026",
    initial: "AG",
  },
  {
    name: "Mehak Jain",
    text: "Professional, punctual and incredibly talented. The glam look for my reception lasted all night — through every dance and photograph.",
    event: "Reception Glam · 2026",
    initial: "MJ",
  },
  {
    name: "Sneha Patel",
    text: "The editorial look for my portfolio was absolutely stunning! She brought my vision to life with her creative approach.",
    event: "Editorial & Modelling · 2026",
    initial: "SP",
  },
  
];

//reel
const INSTA_POSTS = [
  "https://www.instagram.com/reel/DZKv12GCNl6/",
  "https://www.instagram.com/reel/DRKenznk26g/",
  "https://www.instagram.com/reel/DZFmp0dCZyt/",
];
// ─── Certifications ───────────────────────────────────────────
const CERTS = [
  { title: "Advanced Makeup Artistry", year: "2025", org: "Preeti Gera" },
  { title: "Bridal Makeup Masterclass", year: "2022", org: "Makeup Artistry Academy" },
];

// ─── Gallery images (Unsplash) ────────────────────────────────
const GALLERY = [
  { src: "./1 (1).jpeg", label: "Bridal Glam" },
  { src: "./1 (2).jpeg", label: "Bridal Glam" },
  { src: "./1 (3).jpeg", label: "Bridal Glam" },
  { src: "./1 (4).jpeg", label: "Glam Look" },
  { src: "./bridal (1).jpeg", label: "Bridal Glam" },
  { src: "./bridal (2).jpeg", label: "Bold Glam" },
  { src: "./bridal (3).jpeg", label: "Bold Glam" },
  { src: "./bridal (4).jpeg", label: "Bold Glam" },
  { src: "./1 (5).jpeg", label: "Bridal Glam" },
  { src: "./1 (6).jpeg", label: "Bridal Glam" },
  { src: "./1 (7).jpeg", label: "Bridal Glow" },
  { src: "./1 (8).jpeg", label: "Reception Look" },
  { src: "./1 (9).jpeg", label: "Traditional Bridal" },
  { src: "./1 (10).jpeg", label: "Modern Bridal" },
  { src: "./1 (11).jpeg", label: "Bridal Draping" },
  { src: "./1 (12).jpeg", label: "Soft Glam" },
  { src: "./1 (13).jpeg", label: "Bold Glam" },
  { src: "./bridal (10).jpeg", label: "Haldi Glam" },
  { src: "./bridal (11).jpeg", label: "Haldi Glam" },
  { src: "./bridal (9).jpeg", label: "Bridal Glow" },
  { src: "./bridal (8).jpeg", label: "Hairstyle" },
  { src: "./bridal (7).jpeg", label: "Bridal Glow" },
  { src: "./bridal (6).jpeg", label: "Glamour" },
  { src: "./bridal (5).jpeg", label: "Glamour" },
  { src: "./1 (14).jpeg", label: "Natural Look" },
  { src: "./1 (15).jpeg", label: "Bridal Portrait" },
  { src: "./1 (16).jpeg", label: "Pre-Wedding Glow" },
  { src: "./1 (17).jpeg", label: "Bridal Glam" },
  { src: "./1 (18).jpeg", label: "Bridal Glam" },
  { src: "./1 (19).jpeg", label: "Bridal Details" },
];

// ─── Stats ────────────────────────────────────────────────────
const STATS = [
  { num: "100+", label: "Brides Beautified" },
  { num: "5+",   label: "Years Experience"  },
  { num: "50+", label: "Portfolio Shoots"  },
  { num: "100%",  label: "Happy Clients"     },
];

// ─── Petal component ──────────────────────────────────────────
function Petals() {
  return (
    <>
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-20px) rotate(0deg);   opacity: 0.7; }
          100% { transform: translateY(110vh)  rotate(540deg); opacity: 0;   }
        }
        .petal {
          position: absolute; pointer-events: none;
          font-size: 14px; animation: petalFall linear infinite;
        }
      `}</style>
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${5 + i * 9}%`,
            top: "-10px",
            animationDuration: `${5 + i * 0.7}s`,
            animationDelay: `${i * 0.8}s`,
            fontSize: i % 3 === 0 ? "18px" : "12px",
          }}
        >
          🌸
        </span>
      ))}
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("Home");
  const [heroIn, setHeroIn] = useState(false)

  const handleNav = (sectionName) => {
  setSection(sectionName);

  const sectionElement = document.getElementById(
    sectionName.toLowerCase()
  );

  if (sectionElement) {
    sectionElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  };
  useEffect(() => { setTimeout(() => setHeroIn(true), 120); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)" }}>
      <style>{`
        /* ── Shared animations ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up       { animation: fadeUp 0.9s cubic-bezier(0.23,1,0.32,1) forwards; }
        .d1 { animation-delay: 0.1s; opacity: 0; }
        .d2 { animation-delay: 0.3s; opacity: 0; }
        .d3 { animation-delay: 0.55s; opacity: 0; }
        .d4 { animation-delay: 0.75s; opacity: 0; }
        .d5 { animation-delay: 0.95s; opacity: 0; }

        /* ── Floating WhatsApp button ── */
        .wa-float {
          position: fixed; bottom: 28px; right: 26px; z-index: 900;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 22px; border-radius: 50px;
          background: #25D366; color: white; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          box-shadow: 0 6px 28px rgba(37,211,102,0.42);
          transition: all 0.3s ease;
        }
        .wa-float:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(37,211,102,0.55); }
        .wa-text { display: none; }

        @media (min-width: 500px) { .wa-text { display: inline; } }

        /* ── Gallery hover ── */
        .gallery-item { position: relative; overflow: hidden; cursor: pointer; }
        .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.23,1,0.32,1); display: block; }
        .gallery-item:hover img { transform: scale(1.08); }
        .gallery-label {
          position: absolute; inset: 0; display: flex; align-items: flex-end;
          padding: 18px;
          background: linear-gradient(to top, rgba(90,37,53,0.72), transparent 55%);
          opacity: 0; transition: opacity 0.35s ease;
        }
        .gallery-item:hover .gallery-label { opacity: 1; }

        /* ── Cert card ── */
        .cert-card {
          display: flex; align-items: center; gap: 18px;
          padding: 22px 26px; border-radius: 18px;
          background: white; border: 1px solid rgba(201,123,138,0.14);
          transition: all 0.4s ease;
        }
        .cert-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(180,80,100,0.12); }

        /* ── Testimonial card ── */
        .testi-card {
          padding: 32px; border-radius: 20px;
          background: linear-gradient(135deg, #fdf6f0, #f9ece8);
          border: 1px solid rgba(201,123,138,0.14);
          transition: all 0.4s ease;
        }
        .testi-card:hover { transform: translateY(-5px); box-shadow: 0 18px 56px rgba(180,80,100,0.14); }

        /* ── Contact info card ── */
        .contact-info-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px; padding: 22px 26px; text-align: center;
        }

        /* ── Skill chips ── */
        .skill-chip {
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          padding: 8px 18px; border-radius: 50px;
          background: rgba(201,123,138,0.1); color: #a0506a;
          border: 1px solid rgba(201,123,138,0.22);
        }

        /* ── Hero section mobile padding ── */
        @media (max-width: 480px) {
          .hero-inner {
            padding-top: 100px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }

        /* ── Section mobile padding ── */
        @media (max-width: 640px) {
          .section-pad {
            padding-top: 70px !important;
            padding-bottom: 80px !important;
          }
          .section-pad-sm {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }
        }
      `}</style>

      {/* ── Navbar ── */}
      <Navbar activeSection={section} onNav={handleNav}/>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section  id="home"
        style={{
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          background: "linear-gradient(160deg, #fdf6f0 0%, #f9ece8 45%, #f2dde2 100%)",
        }}
      >
        {heroIn && <Petals />}

        {/* Decorative circles — hidden on very small screens to reduce clutter */}
        {[
          { size: 360, top: "8%", right: "6%", opacity: 0.07 },
          { size: 220, bottom: "12%", left: "4%", opacity: 0.05 },
          { size: 90, top: "35%", left: "14%", opacity: 0.10 },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute", borderRadius: "50%",
              width: c.size, height: c.size,
              top: c.top, bottom: c.bottom,
              left: c.left, right: c.right,
              background: `rgba(201,123,138,${c.opacity})`,
              border: `1px solid rgba(201,123,138,${c.opacity * 2})`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div
          className="hero-inner"
          style={{
            maxWidth: 780, margin: "0 auto",
            padding: "120px 28px 0",
            textAlign: "center", zIndex: 2,
          }}
        >
          {heroIn && (
            <>
              <p
                className="fade-up d1"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10, letterSpacing: "0.38em",
                  textTransform: "uppercase", color: "#c97b8a", marginBottom: 22,
                }}
              >
                ✦ Professional Bridal Artist · Jaipur ✦
              </p>

              <h1
                className="fade-up d2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "clamp(3.5rem, 9vw, 7rem)",
                  lineHeight: 1.02, color: "#5a2535", marginBottom: 20,
                }}
              >
                Your Beauty,<br />
                <span style={{ fontStyle: "italic", color: "#c97b8a" }}>Perfected.</span>
              </h1>

              <p
                className="fade-up d3"
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                  fontSize: "clamp(0.9rem, 2.2vw, 1.1rem)", color: "#9a5a68",
                  maxWidth: 500, margin: "0 auto 40px",
                  lineHeight: 1.9,
                }}
              >
                Luxury bridal makeup &amp; hairstyling — crafting timeless looks for
                weddings, pre-weddings, editorial shoots &amp; every occasion in between.
              </p>

              <div
                className="fade-up d4 hero-btn-group"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                    fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                    padding: "16px 36px", borderRadius: 50,
                    background: "linear-gradient(135deg, #c97b8a, #a0506a)",
                    color: "white", textDecoration: "none",
                    boxShadow: "0 8px 32px rgba(160,80,106,0.32)",
                    transition: "all 0.3s ease",
                  }}
                >
                  Book via WhatsApp
                </a>
                <button
                  onClick={() => handleNav("Portfolio")}
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                    fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "16px 36px", borderRadius: 50,
                    background: "transparent", color: "#7a3a4a",
                    border: "1px solid rgba(201,123,138,0.5)",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}
                >
                  View Portfolio
                </button>
              </div>
            </>
          )}
        </div>

      </section>

      {/* ── Stats banner ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #7a3a4a, #a0506a)",
          padding: "44px 28px",
        }}
      >
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.num}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#f9e8ec", marginBottom: 4,
                }}
              >
                {s.num}
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: "rgba(249,232,236,0.6)",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          SERVICES (image bento grid)
      ════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ════════════════════════════════════════════
          PORTFOLIO
      ════════════════════════════════════════════ */}
      <section id="portfolio"
        className="section-pad"
        style={{
          background: "linear-gradient(180deg, #f9ece8 0%, #fdf6f0 100%)",
          padding: "100px 28px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "#c97b8a", display: "block", marginBottom: 18,
              }}
            >
              ✦ My Work ✦
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#5a2535",
                lineHeight: 1.08, marginBottom: 16,
              }}
            >
              Portfolio &amp; <em style={{ fontStyle: "italic", color: "#c97b8a" }}>Gallery</em>
            </h2>
            <div
              style={{
                width: 60, height: 1,
                background: "linear-gradient(90deg, transparent, #c97b8a, transparent)",
                margin: "0 auto",
              }}
            />
          </div>

<div className="portfolio-grid">
  {GALLERY.map((g, i) => (
    <div
      key={i}
      className={`gallery-item ${
        i === 0 || i === 3 ? "featured" : ""
      }`}
    >
      <img
        src={g.src}
        alt={g.label}
        loading="lazy"
      />

      <div className="gallery-label">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.2rem",
            color: "white",
          }}
        >
          {g.label}
        </span>
      </div>
    </div>
  ))}
</div>

          <p
            style={{
              textAlign: "center", marginTop: 28,
              fontFamily: "'DM Sans', sans-serif", fontSize: 12,
              color: "#c0909a",
            }}
          >
          Full portfolio available on WhatsApp — message us to see more work
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════ */}
      <section id="about" className="section-pad" style={{ background: "white", padding: "100px 28px" }}>
        <div  className="about-grid"
  style={{
    maxWidth: 1100,
    margin: "0 auto",
  }}
        >
          {/* Text */}
          <div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "#c97b8a", display: "block", marginBottom: 18,
              }}
            >
              ✦ About Me ✦
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#5a2535",
                lineHeight: 1.12, marginBottom: 10,
              }}
            >
              Sonal Saini
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
                fontWeight: 300, fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                color: "#c97b8a", marginBottom: 22,
              }}
            >
              Bridal Makeup Artist
            </p>
            <div style={{ width: 44, height: 1, background: "#c97b8a", marginBottom: 26 }} />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 14, lineHeight: 1.9, color: "#7a6070", marginBottom: 18,
              }}
            >
              With over 5 years of expertise in luxury bridal makeup and hairstyling, I have
              transformed hundreds of brides across Rajasthan. My philosophy is simple —
              every woman deserves to feel extraordinary on her most beautiful day.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                fontSize: 14, lineHeight: 1.9, color: "#7a6070", marginBottom: 32,
              }}
            >
              Trained at India's finest academies and holding certifications,
              I specialise in a wide spectrum of looks — from the most ethereal soft bridal
              glow to bold editorial glam. Every look I create is bespoke, tailored exclusively for you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Airbrush Makeup", "HD Foundation", "Hairstyling", "Skin Prep", "Bridal Draping"].map((s) => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div style={{ position: "relative" }}>
            <div  className="about-image"
  style={{
    borderRadius: 28,
    overflow: "hidden",
    background: "linear-gradient(135deg, #f2dde2, #e8c9d2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
            >
              <img
                src="/About.jpeg"
                alt="Sonal at work"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Floating badge */}
            <div  className="about-badge"
  style={{
    position: "absolute",
    background: "#7a3a4a",
    borderRadius: 18,
    padding: "18px 24px",
    textAlign: "center",
    boxShadow: "0 12px 40px rgba(90,37,53,0.3)",
  }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                  fontSize: "2.2rem", color: "#f9e8ec", lineHeight: 1,
                }}
              >
                8+
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(249,232,236,0.65)", marginTop: 4,
                }}
              >
                Years of Excellence
              </p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ maxWidth: 1100, margin: "80px auto 0" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "#c97b8a", display: "block", marginBottom: 14,
              }}
            >
              ✦ Credentials ✦
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3rem)", color: "#5a2535",
              }}
            >
              Certifications &amp; <em style={{ fontStyle: "italic" }}>Training</em>
            </h2>
          </div>
          <div
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          >
            {CERTS.map((c) => (
              <div key={c.title} className="cert-card">
                <div
                  style={{
                    flexShrink: 0, width: 52, height: 52, borderRadius: "50%",
                    background: "linear-gradient(135deg, #f2dde2, #e8c0c8)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🏅
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 400,
                      fontSize: "1.1rem", color: "#5a2535", marginBottom: 4,
                    }}
                  >
                    {c.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                      color: "#c97b8a",
                    }}
                  >
                    {c.org} · {c.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-pad-sm" style={{ background: "var(--cream)", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "#c97b8a", display: "block", marginBottom: 14,
              }}
            >
              ✦ Client Love ✦
            </span>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#5a2535",
              }}
            >
              What Brides <em style={{ fontStyle: "italic" }}>Say</em>
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testi-card">
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem", color: "#c97b8a",
                    lineHeight: 1, marginBottom: 10,
                  }}
                >
                  "
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
                    fontSize: 13.5, lineHeight: 1.8, color: "#7a6070",
                    marginBottom: 22,
                  }}
                >
                  {t.text}
                </p>
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    borderTop: "1px solid rgba(201,123,138,0.18)", paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "linear-gradient(135deg, #c97b8a, #a0506a)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                      fontWeight: 600, color: "white", flexShrink: 0,
                    }}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem", color: "#5a2535", fontWeight: 400,
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#c97b8a" }}>
                      {t.event}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 <div style={{ background: "var(--cream)", padding: "60px 0" }}>
  <div className="insta-grid">
    {INSTA_POSTS.map((url) => (
      <InstagramEmbed
        key={url}
        url={url}
        width="100%"
      />
    ))}
  </div>
</div>

      {/* ════════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════════ */}
      <section id="contact"
        className="section-pad"
        style={{
          background: "linear-gradient(135deg, #5a2535 0%, #7a3a4a 50%, #a0506a 100%)",
          padding: "100px 28px 120px",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              letterSpacing: "0.34em", textTransform: "uppercase",
              color: "rgba(249,232,236,0.55)", display: "block", marginBottom: 22,
            }}
          >
            ✦ Let's Connect ✦
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
              fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#f9e8ec",
              lineHeight: 1.08, marginBottom: 20,
            }}
          >
            Ready to Look <em style={{ fontStyle: "italic" }}>Breathtaking?</em>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif", fontWeight: 300,
              fontSize: 14, lineHeight: 1.9, color: "rgba(249,232,236,0.62)",
              maxWidth: 440, margin: "0 auto 44px",
            }}
          >
            Let's talk about your dream look. Message me on WhatsApp to discuss
            your event, view the full portfolio, or schedule a trial session.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "18px 48px", borderRadius: 50,
              background: "#25D366", color: "white", textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13,
              fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
              boxShadow: "0 8px 36px rgba(37,211,102,0.42)",
              transition: "all 0.3s ease",
              marginBottom: 52,
            }}
          >
            Chat on WhatsApp
          </a>

          <div
            className="contact-info-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14, maxWidth: 700, margin: "0 auto",
            }}
          >
            {[
              { icon: "📍", label: "Location",     val: "Jaipur, Rajasthan" },
              { icon: "📱", label: "WhatsApp",     val: "+91 7568616646"   },
              { icon: "🕐", label: "Availability", val: "Mon – Sun (9am – 8pm)"  },
            ].map((c) => (
              <div key={c.label} className="contact-info-card">
                <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{c.icon}</div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 9,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: "rgba(249,232,236,0.4)", marginBottom: 8,
                  }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
                    fontSize: "1.1rem", color: "#f9e8ec",
                  }}
                >
                  {c.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
  style={{
    background: "#2a0e18",
    padding: "36px 28px",
    textAlign: "center",
  }}
>
  <div
    style={{
      marginBottom: 16,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Logo size="md" dark={true} />
  </div>

  {/* Instagram */}
  <a
  href="https://www.instagram.com/sonalmakeovers/"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.08)",
    color: "#f9ecec",
    textDecoration: "none",
  }}
>
  <FaInstagram size={20} />
</a>

  <p
    style={{
      color: "#d6a0aa",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: 12,
    fontFamily: "'DM Sans', sans-serif",
    }}
    
  >
    © 2025 Sonal Bridal Artist · Jaipur, Rajasthan · All rights reserved
  </p>
</footer>
     
    </div>
  );
}
