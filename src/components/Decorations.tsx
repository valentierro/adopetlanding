/** Paw print SVG — inline, scalable */
export function PawPrint({ size = 32, color = 'currentColor', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      {/* Toe pads */}
      <ellipse cx="20" cy="10" rx="6" ry="8" fill={color} />
      <ellipse cx="34" cy="7"  rx="6" ry="8" fill={color} />
      <ellipse cx="48" cy="10" rx="6" ry="8" fill={color} />
      <ellipse cx="11" cy="22" rx="5" ry="7" fill={color} />
      {/* Main pad */}
      <ellipse cx="32" cy="40" rx="16" ry="18" fill={color} />
    </svg>
  );
}

/** Heart with paw inside — brand icon */
export function HeartPaw({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      {/* Heart left half */}
      <path
        d="M50 85 C50 85 8 55 8 30 C8 17 18 8 30 8 C38 8 45 13 50 20 C55 13 62 8 70 8 C82 8 92 17 92 30 C92 55 50 85 50 85Z"
        fill="#E05D3A"
      />
      {/* Heart right overlay */}
      <path
        d="M50 85 C50 85 50 55 50 30 C50 13 62 8 70 8 C82 8 92 17 92 30 C92 55 50 85 50 85Z"
        fill="#2E7D5E"
      />
      {/* Paw — white */}
      <ellipse cx="42" cy="45" rx="4.5" ry="6"   fill="white" opacity="0.9" />
      <ellipse cx="52" cy="43" rx="4.5" ry="6"   fill="white" opacity="0.9" />
      <ellipse cx="38" cy="56" rx="3.5" ry="5"   fill="white" opacity="0.9" />
      <ellipse cx="32" cy="62" rx="12"  ry="11"  fill="white" opacity="0.9" />
    </svg>
  );
}

/** Adoption pin — uses real asset from /public/icons/heart-paw.png */
export function AdoptionPin({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/icons/heart-paw.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Partner pin — uses real asset from /public/icons/pin-parceiro.png */
export function PartnerPin({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/icons/pin-parceiro.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Heart-paw logo icon — uses real asset from /public/icons/pin-adocao.png */
export function HeartPawIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/icons/pin-adocao.png"
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/** Floating decorative paw print — scattered background element */
export function FloatingPaw({
  x, y, size = 24, opacity = 0.05, rotation = 0, color = '#0FBA9E',
}: {
  x: string; y: string; size?: number; opacity?: number; rotation?: number; color?: string;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity, transform: `rotate(${rotation}deg)` }}
      aria-hidden
    >
      <PawPrint size={size} color={color} />
    </div>
  );
}

/** Floating heart */
export function FloatingHeart({
  x, y, size = 20, opacity = 0.06, rotation = 0, color = '#F4732A',
}: {
  x: string; y: string; size?: number; opacity?: number; rotation?: number; color?: string;
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, opacity, transform: `rotate(${rotation}deg)` }}
      aria-hidden
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </div>
  );
}
