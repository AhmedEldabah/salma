export default function Grain() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[58]"
      style={{ opacity: 0.07, mixBlendMode: 'overlay' }}
      aria-hidden="true"
    >
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  )
}
