import salmaPhoto from '../assets/salma.png'

export default function PhotoFrame() {
  return (
    <div className="relative flex items-center justify-center">
      {/* outer glow ring */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(255,105,180,0.35) 0%, transparent 70%)',
        }}
      />
      {/* decorative ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '210px',
          height: '210px',
          border: '3px dashed rgba(255,255,255,0.45)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      {/* photo circle */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: '180px',
          height: '180px',
          border: '10px solid rgba(255,255,255,0.95)',
          boxShadow: '0 0 0 6px rgba(255,105,180,0.55), 0 0 0 10px rgba(255,215,0,0.4), 0 12px 44px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src={salmaPhoto}
          alt="Salma"
          className="w-full h-full object-cover"
          draggable="false"
        />
      </div>
    </div>
  )
}

