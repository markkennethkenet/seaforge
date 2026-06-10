export default function AuthIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto mt-10">
      <svg viewBox="0 0 480 360" className="w-full h-auto" aria-hidden="true">
        <ellipse cx="240" cy="310" rx="180" ry="18" fill="#1db9a5" opacity="0.12" />
        <path
          d="M60 280 Q120 220 180 260 T300 250 T420 270"
          fill="none"
          stroke="#1db9a5"
          strokeWidth="3"
          opacity="0.35"
        />
        <g transform="translate(80, 120)">
          <rect x="0" y="60" width="70" height="110" rx="35" fill="#163d32" />
          <circle cx="35" cy="35" r="28" fill="#f4c97a" />
          <rect x="95" y="75" width="65" height="95" rx="32" fill="#1db9a5" />
          <circle cx="127" cy="48" r="26" fill="#8ecae6" />
          <rect x="180" y="65" width="72" height="105" rx="36" fill="#1a2e2a" />
          <circle cx="216" cy="38" r="27" fill="#f4c97a" />
          <rect x="270" y="80" width="68" height="90" rx="34" fill="#2d6a5f" />
          <circle cx="304" cy="52" r="25" fill="#cdb4db" />
        </g>
        <g opacity="0.9">
          <path d="M40 200 Q55 140 70 200 Q85 260 100 200 Q115 140 130 200" fill="none" stroke="#159684" strokeWidth="4" />
          <path d="M350 190 Q365 130 380 190 Q395 250 410 190 Q425 130 440 190" fill="none" stroke="#159684" strokeWidth="4" />
          <ellipse cx="240" cy="175" rx="55" ry="18" fill="#1db9a5" opacity="0.25" />
        </g>
      </svg>
    </div>
  );
}
