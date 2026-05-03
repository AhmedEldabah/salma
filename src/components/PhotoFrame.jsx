import salmaPhoto from '../assets/salma.png'

export default function PhotoFrame() {
  return (
    <div className="relative flex items-center justify-center">
      {/* outer glow ring */}
      <div
        className="absolute rounded-full animate-pulse-glow"
        style={{
          width: '210px',
          height: '210px',
          background: 'radial-gradient(circle, rgba(255,105,180,0.35) 0%, transparent 70%)',
        }}
      />
      {/* decorative ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: '180px',
          height: '180px',
          border: '3px dashed rgba(255,255,255,0.45)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      {/* photo circle */}
      <div
        className="relative rounded-full overflow-hidden"
        style={{
          width: '160px',
          height: '160px',
          border: '5px solid rgba(255,255,255,0.9)',
          boxShadow: '0 0 0 3px rgba(255,105,180,0.5), 0 10px 40px rgba(0,0,0,0.25)',
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

