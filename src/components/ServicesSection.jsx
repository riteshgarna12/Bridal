// src/components/ServicesSection.jsx
import { useState } from "react";
import { SERVICES } from "../data/services";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <style>{`
        .services-section {
          background: #fefaf7;
          padding: 100px 0 120px;
          position: relative;
          overflow: hidden;
        }
        .services-section::before {
          content: '';
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          opacity: 0.4;
        }
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

        /* Header */
        .svc-header { text-align: center; margin-bottom: 72px; }
        .svc-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px; letter-spacing: 0.36em; text-transform: uppercase;
          color: #c97b8a; margin-bottom: 22px; display: block;
        }
        .svc-heading {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; font-size: clamp(3rem, 7vw, 5.5rem);
          line-height: 1.0; color: #a0506a;
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

        /* Bento grid base */
        .bento-grid { display: grid; gap: 14px; }

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
        /* Row D — single full-width card */
        .row-d {
          grid-template-columns: 1fr;
          grid-template-rows: 300px;
        }

        /* Bottom quote */
        .svc-bottom-cta { text-align: center; margin-top: 64px; }
        .svc-bottom-quote {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-weight: 300; font-size: clamp(1.5rem, 3vw, 2.2rem);
          color: #a0506a; margin-bottom: 16px;
        }

        /* Responsive — tablet */
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

        /* Responsive — mobile: strict 2-col */
        @media (max-width: 560px) {
          .services-section { padding: 70px 0 90px; }
          .services-inner { padding: 0 12px; }
          .svc-header { margin-bottom: 44px; }
          .svc-heading { font-size: 2.4rem; }
          .svc-tagline { font-size: 13px; }

          .row-a,
          .row-b,
          .row-c,
          .row-d {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .row-a { grid-template-rows: 220px; }
          .row-b { grid-auto-rows: 200px; }
          .row-c { grid-auto-rows: 200px; }
          .row-d { grid-template-rows: 200px; }

          /* Row B has 3 cards — last one spans full width to avoid blank gap */
          .row-b > *:last-child {
            grid-column: 1 / -1;
          }

          /* Row C has 3 cards — last one (wide on desktop) spans full width */
          .row-c > *:last-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>

      <section className="services-section" id="services">
        <div className="services-inner">

          {/* Header */}
          <header className="svc-header">
            <span className="svc-eyebrow">✦ Crafted for Every Occasion ✦</span>
            <h2 className="svc-heading">Our <em>Services</em></h2>
            <div className="svc-rule" />
            <p className="svc-tagline">
              Each service is a personalised experience — hover to explore,
              tap to discover your dream look.
            </p>
          </header>

          {/* ROW A — Hero bridal + pre-wedding */}
          <div className="bento-grid row-a" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[0]} onOpen={setActiveService} animDelay={0} />
            <ServiceCard service={SERVICES[1]} onOpen={setActiveService} animDelay={0.08} />
          </div>

          {/* ROW B — Glam | Soft Bridal | Signature */}
          <div className="bento-grid row-b" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[2]} onOpen={setActiveService} animDelay={0.05} />
            <ServiceCard service={SERVICES[3]} onOpen={setActiveService} animDelay={0.12} />
            <ServiceCard service={SERVICES[4]} onOpen={setActiveService} animDelay={0.18} />
          </div>

          {/* ROW C — Editorial | Reception | Hairstyling */}
          <div className="bento-grid row-c" style={{ marginBottom: 14 }}>
            <ServiceCard service={SERVICES[5]} onOpen={setActiveService} animDelay={0.05} />
            <ServiceCard service={SERVICES[6]} onOpen={setActiveService} animDelay={0.12} />
            <ServiceCard service={SERVICES[7]} onOpen={setActiveService} animDelay={0.18} />
          </div>

          {/* ROW D — Mehndi & Haldi full width */}
          <div className="bento-grid row-d">
            <ServiceCard service={SERVICES[8]} onOpen={setActiveService} animDelay={0.06} />
          </div>

          {/* Bottom quote */}
          <div className="svc-bottom-cta">
            <p className="svc-bottom-quote">
              "Every bride deserves to feel extraordinary."
            </p>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10, letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#c97b8a",
            }}>
              — Sonal Saini, Bridal Artist
            </p>
          </div>

        </div>
      </section>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  );
}