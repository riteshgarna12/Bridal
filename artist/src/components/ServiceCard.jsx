// src/components/ServiceCard.jsx
// Reusable card for the bento grid — hover reveals details, click opens modal

import { useRef, useEffect, useState } from "react";

export default function ServiceCard({ service, onOpen, animDelay = 0 }) {
  const [, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .svc-card-root {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          cursor: pointer;
          transition: transform 0.55s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.55s cubic-bezier(0.23,1,0.32,1);
          background: #1a0c10;
        }
        .svc-card-root.in-view {
          animation: cardReveal 0.7s cubic-bezier(0.23,1,0.32,1) forwards;
        }
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .svc-card-root:hover {
          transform: translateY(-6px) scale(1.012);
          box-shadow: 0 28px 70px rgba(0,0,0,0.55);
        }

        /* Image zoom */
        .svc-card-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.85s cubic-bezier(0.23,1,0.32,1);
          will-change: transform;
        }
        .svc-card-root:hover .svc-card-img { transform: scale(1.1); }

        /* Base gradient overlay */
        .svc-card-base-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            to top,
            rgba(10,3,6,0.92) 0%,
            rgba(10,3,6,0.55) 45%,
            rgba(10,3,6,0.12) 100%
          );
          transition: opacity 0.45s ease;
        }
        .svc-card-root:hover .svc-card-base-overlay { opacity: 0.85; }

        /* Colour sheen on hover */
        .svc-card-sheen {
          position: absolute; inset: 0; z-index: 1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .svc-card-root:hover .svc-card-sheen { opacity: 1; }

        /* Shine sweep */
        .svc-card-shine {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(120deg,
            transparent 25%, rgba(255,255,255,0.06) 50%, transparent 75%);
          transform: translateX(-120%);
          transition: transform 0.7s ease;
        }
        .svc-card-root:hover .svc-card-shine { transform: translateX(120%); }

        /* Content layer */
        .svc-card-content {
          position: absolute; inset: 0; z-index: 3;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 24px;
        }

        /* Tag badge */
        .svc-tag {
          position: absolute; top: 18px; left: 18px; z-index: 4;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 600; padding: 5px 12px; border-radius: 20px; color: white;
        }

        /* Number watermark */
        .svc-num {
          position: absolute; top: 14px; right: 18px; z-index: 4;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic; color: rgba(255,255,255,0.1);
        }

        /* Subtitle */
        .svc-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(255,255,255,0.5); margin-bottom: 7px;
          transform: translateY(4px);
          transition: transform 0.4s ease, color 0.3s ease;
        }
        .svc-card-root:hover .svc-subtitle { transform: translateY(0); color: rgba(255,255,255,0.7); }

        /* Title */
        .svc-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300; color: white; line-height: 1.1;
          margin-bottom: 0;
          transition: margin-bottom 0.4s ease;
        }
        .svc-card-root:hover .svc-title { margin-bottom: 10px; }

        /* Desc — hidden until hover */
        .svc-desc {
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          font-size: 12px; line-height: 1.65;
          color: rgba(255,255,255,0.68);
          max-height: 0; overflow: hidden;
          transition: max-height 0.5s ease, opacity 0.4s ease;
          opacity: 0;
        }
        .svc-card-root:hover .svc-desc { max-height: 80px; opacity: 1; }

        /* Price row */
        .svc-price-row {
          display: flex; align-items: center; gap: 10px; margin-top: 0;
          transition: margin-top 0.4s ease;
        }
        .svc-card-root:hover .svc-price-row { margin-top: 12px; }

        /* CTA arrow pill */
        .svc-cta {
          position: absolute; bottom: 22px; right: 22px; z-index: 5;
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid rgba(255,255,255,0.25);
          color: white; font-size: 16px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(6px);
          transform: translateY(6px); opacity: 0;
          transition: all 0.4s ease;
        }
        .svc-card-root:hover .svc-cta {
          transform: translateY(0); opacity: 1;
        }
      `}</style>

      <div
        ref={ref}
        className={`svc-card-root ${inView ? "in-view" : ""}`}
        style={{ opacity: 0, animationDelay: `${animDelay}s` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpen(service)}
        role="button"
        tabIndex={0}
        aria-label={`View ${service.title} details`}
        onKeyDown={(e) => e.key === "Enter" && onOpen(service)}
      >
        {/* Image */}
        <img
          src={service.image}
          alt={service.title}
          className="svc-card-img"
          loading="lazy"
        />

        {/* Overlays */}
        <div className="svc-card-base-overlay" />
        <div
          className="svc-card-sheen"
          style={{
            background: `radial-gradient(ellipse at bottom left, ${service.accent}30 0%, transparent 65%)`,
          }}
        />
        <div className="svc-card-shine" />

        {/* Tag */}
        <span className="svc-tag" style={{ background: service.accent }}>
          {service.tag}
        </span>

        {/* Number */}
        <span
          className="svc-num"
          style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
        >
          {String(service.id).padStart(2, "0")}
        </span>

        {/* Main content */}
        <div className="svc-card-content">
          <p className="svc-subtitle">{service.subtitle}</p>

          <h3
            className="svc-title"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)" }}
          >
            {service.title}
          </h3>

          <p className="svc-desc">{service.shortDesc}</p>

          <div className="svc-price-row">
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: service.accent,
              }}
            >
              {service.price}
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 11 }}>·</span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.42)",
              }}
            >
              {service.duration}
            </span>
          </div>
        </div>

        {/* CTA arrow */}
        <div className="svc-cta" aria-hidden="true">→</div>
      </div>
    </>
  );
}
