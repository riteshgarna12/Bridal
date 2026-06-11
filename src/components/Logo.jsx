// src/components/Logo.jsx
// SVG Logo for Sonal Bridal Artist

export default function Logo({ size = "md", dark = false }) {
  const color = dark ? "#f9e8ec" : "#7a3a4a";
  const accent = "#c97b8a";

  const sizes = {
    sm: { width: 110, height: 40 },
    md: { width: 150, height: 52 },
    lg: { width: 200, height: 68 },
  };
  const { width, height } = sizes[size] || sizes.md;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 68"
      fill="none"
      xmlns="logo.svg"
      aria-label="Sonal Bridal Artist"
    >
      {/* Decorative diamond / petal motif */}
      <g transform="translate(0, 10)">
        {/* Left petal */}
        <ellipse cx="16" cy="24" rx="7" ry="14" fill={accent} opacity="0.25" transform="rotate(-30 16 24)" />
        {/* Right petal */}
        <ellipse cx="16" cy="24" rx="7" ry="14" fill={accent} opacity="0.25" transform="rotate(30 16 24)" />
        {/* Center dot */}
        <circle cx="16" cy="24" r="3" fill={accent} />
        {/* Tiny sparkles */}
        <circle cx="8"  cy="14" r="1.2" fill={accent} opacity="0.6" />
        <circle cx="24" cy="14" r="1.2" fill={accent} opacity="0.6" />
        <circle cx="16" cy="6"  r="1"   fill={accent} opacity="0.45" />
      </g>

      {/* Brand name — "Sonal" */}
      <text
        x="34"
        y="32"
        fontFamily="'Cormorant Garamond', serif"
        fontWeight="300"
        fontStyle="italic"
        fontSize="28"
        fill={color}
        letterSpacing="1"
      >
        Sonal
      </text>

      {/* Thin rule below */}
      <line x1="34" y1="38" x2="194" y2="38" stroke={accent} strokeWidth="0.6" opacity="0.5" />

      {/* Sub-label — "BRIDAL ARTIST" */}
      <text
        x="34"
        y="52"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="500"
        fontSize="9"
        fill={accent}
        letterSpacing="4"
      >
        BRIDAL ARTIST
      </text>

      {/* Small dot separators in sub-label row */}
      <circle cx="120" cy="47" r="1.5" fill={accent} opacity="0.5" />
    </svg>
  );
}
