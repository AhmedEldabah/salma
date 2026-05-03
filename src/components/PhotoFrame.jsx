import salmaImg from '../assets/salma.png'

export default function PhotoFrame() {
  return (
    <div className="relative flex items-center justify-center">
      {/* outer glow ring */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: '168px',
          height: '168px',
          background: 'radial-gradient(circle, rgba(255,105,180,0.35) 0%, transparent 70%)',
        }}
      />
      {/* decorative ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '140px',
          height: '140px',
          border: '3px dashed rgba(255,255,255,0.45)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      {/* photo circle */}
      <div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: '120px',
          height: '120px',
          border: '5px solid rgba(255,255,255,0.9)',
          boxShadow: '0 0 0 3px rgba(255,105,180,0.5), 0 10px 40px rgba(0,0,0,0.25)',
          background: 'linear-gradient(135deg, rgba(255,228,225,0.8) 0%, rgba(255,182,193,0.8) 100%)',
        }}
      >
        <img
          src={salmaImg}
          alt="Salma"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    </div>
  )
}

