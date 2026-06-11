// src/components/ServicesSection.jsx
// Stunning bento-style masonry grid with real photos, hover reveals & modal detail

import { useState } from "react";
import { SERVICES, WHATSAPP_URL } from "../data/services";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);

  // ── Bento layout rows ──────────────────────────────────────
  // Row A: 1 wide hero (5fr) + 1 tall (3fr)
  // Row B: 3 equal cards
  // Row C: 2 small + 1 wide footer hero
  // Row D: final 2 cards + decorative CTA card
  // Total: 9 real service cards

  return (
    <>
      <style>{`
        /* ── Section shell ── */
        .services-section {
          background: #fefaf7;
          padding: 100px 0 120px;
          position: relative;
          overflow: hidden;
        }

        /* Ambient grain texture */
        .services-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          opacity: 0.4;
        }

        /* Glow orbs */
        .services-section::after {
          content: '';
          position: absolute; pointer-events: none;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(201,123,138,0.06) 0%, transparent 70%);
          top: -100px; right: -200px;
        }

        .services-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
          position: relative; z-index: 1;
        }

        /* ── Section header ── */
        .svc-header { text-align: center; margin-bottom: 72px; }
        .svc-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: #c97b8a; margin-bottom: 22px; display: block;
        }
        .svc-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.0; color:#a0506a;
          margin-bottom: 20px;
        }
        .svc-heading em { font-style: italic; color: #c97b8a; }
        .svc-rule {
          width: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #c97b8a 50%, transparent);
          margin: 0 auto 24px;
          animation: ruleExpand 1.4s cubic-bezier(0.23,1,0.32,1) 0.3s forwards;
        }
        @keyframes ruleExpand { to { width: 120px; } }
        .svc-tagline {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 14px; color: #a0506a; max-width: 440px;
          margin: 0 auto; line-height: 1.85;
        }

        /* ── Bento Grid ── */
        .bento-grid {
          display: grid;
          gap: 14px;
        }

        /* Row A — hero + tall */
        .row-a {
          grid-template-columns: 5fr 3fr;
          grid-template-rows: 540px;
        }

        /* Row B — three equal */
        .row-b {
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 380px;
        }

        /* Row C — small | small | wide */
        .row-c {
          grid-template-columns: 1fr 1fr 2fr;
          grid-template-rows: 340px;
        }

        /* Row D — two + CTA */
        .row-d {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 300px;
        }

        /* ── Decorative CTA card ── */
        .cta-card {
          border-radius: 22px;
          background: linear-gradient(135deg, #3a1520, #7a3a4a, #c97b8a);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 20px; text-align: center; padding: 36px;
          position: relative; overflow: hidden;
          cursor: default;
        }
        .cta-card::before {
          content: '';
          position: absolute; inset: -40%;
          background: radial-gradient(circle at 60% 40%, rgba(255,255,255,0.08), transparent 60%);
          animation: orb 6s ease-in-out infinite alternate;
        }
        @keyframes orb {
          from { transform: translate(0,0); }
          to   { transform: translate(15px, 20px); }
        }
        .cta-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; font-weight: 300;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: #f9e8ec; line-height: 1.2; z-index: 1;
        }
        .cta-sub {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 12px; color: rgba(249,232,236,0.6);
          line-height: 1.7; z-index: 1; max-width: 220px;
        }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 50px;
          background: #25D366; color: white; text-decoration: none;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
          transition: all 0.3s ease; z-index: 1;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,211,102,0.45); }

        /* ── Bottom CTA strip ── */
        .svc-bottom-cta {
          text-align: center; margin-top: 64px;
        }
        .svc-bottom-quote {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-weight: 300; font-size: clamp(1.5rem, 3vw, 2.2rem);
          color: #a0506a; margin-bottom: 28px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
        .row-a {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 320px;
        }

        .row-b {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 300px;
        }

        .row-c {
            grid-template-columns: 1fr 1fr;
            grid-auto-rows: 280px;
        }

        .row-d {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 280px;
        }
        }

        @media (max-width: 560px) {
        .services-section {
            padding: 70px 0 90px;
        }

        .services-inner {
            padding: 0 16px;
        }

        .row-a,
        .row-b,
        .row-c,
        .row-d {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .row-a {
            grid-template-rows: 240px;
        }

        .row-b {
            grid-auto-rows: 220px;
        }

        .row-c {
            grid-auto-rows: 220px;
        }

        .row-d {
            grid-template-rows: 220px;
        }

        .svc-heading {
            font-size: 2.4rem;
        }

        .svc-tagline {
            font-size: 13px;
        }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-inner">

          {/* ── Header ── */}
          <header className="svc-header">
            <span className="svc-eyebrow">✦ Crafted for Every Occasion ✦</span>
            <h2 className="svc-heading">
              Our <em>Services</em>
            </h2>
            <div className="svc-rule" />
            <p className="svc-tagline">
              Each service is a personalised experience — hover to explore,
              tap to discover your dream look.
            </p>
          </header>

          {/* ══════════════════════════════════════
              ROW A — Hero bridal + pre-wedding tall
          ══════════════════════════════════════ */}
          <div className="bento-grid row-a" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[0]} onOpen={setActiveService} animDelay={0} />
            <ServiceCard service={SERVICES[1]} onOpen={setActiveService} animDelay={0.08} />
          </div>

          {/* ══════════════════════════════════════
              ROW B — Glam | Soft Bridal | Signature
          ══════════════════════════════════════ */}
          <div className="bento-grid row-b" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[2]} onOpen={setActiveService} animDelay={0.05} />
            <ServiceCard service={SERVICES[3]} onOpen={setActiveService} animDelay={0.12} />
            <ServiceCard service={SERVICES[4]} onOpen={setActiveService} animDelay={0.18} />
          </div>

          {/* ══════════════════════════════════════
              ROW C — Editorial | Reception | Hairstyling wide
          ══════════════════════════════════════ */}
          <div className="bento-grid row-c" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[5]} onOpen={setActiveService} animDelay={0.05} />
            <ServiceCard service={SERVICES[6]} onOpen={setActiveService} animDelay={0.12} />
            <ServiceCard service={SERVICES[7]} onOpen={setActiveService} animDelay={0.18} />
          </div>

          {/* ══════════════════════════════════════
              ROW D — Mehndi & Haldi + CTA card
          ══════════════════════════════════════ */}
          <div className="bento-grid row-d">
            <ServiceCard service={SERVICES[8]} onOpen={setActiveService} animDelay={0.06} />

            {/* Decorative CTA card */}
            <div className="cta-card">
              <p className="cta-card-title">
                Ready to look<br />breathtaking?
              </p>
              <p className="cta-sub">
                Message us on WhatsApp to discuss your vision, check availability, or book a trial session.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn"
              >
                Book via WhatsApp
              </a>
            </div>
          </div>

          {/* ── Bottom quote ── */}
          <div className="svc-bottom-cta">
            <p className="svc-bottom-quote">
              "Every bride deserves to feel extraordinary."
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "#c97b8a",
              }}
            >
              — Sonal Saini, Bridal Artist
            </p>
          </div>

        </div>
      </section>

      {/* ── Service detail modal ── */}
      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </>
  );
}
