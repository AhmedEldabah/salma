export default function PhotoFrame() {
  return (
    <div className="relative flex items-center justify-center">
      {/* outer glow ring */}
      <div
        className="absolute rounded-full animate-pulse-scale"
        style={{
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,105,180,0.3) 0%, transparent 70%)',
          animation: 'pulse 2.5s ease-in-out infinite',
        }}
      />
      {/* photo circle */}
      <div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: '160px',
          height: '160px',
          border: '5px solid #FF69B4',
          boxShadow: '0 0 0 4px #FFB6C1, 0 8px 32px rgba(255,105,180,0.4)',
          background: 'linear-gradient(135deg, #FFE4E1 0%, #FFC0CB 100%)',
        }}
      >
        {/* placeholder silhouette */}
        <div className="flex flex-col items-center justify-end w-full h-full pb-2 opacity-40">
          {/* head */}
          <div
            className="rounded-full bg-pink-400 mb-1"
            style={{ width: '44px', height: '44px' }}
          />
          {/* body */}
          <div
            className="rounded-t-full bg-pink-400"
            style={{ width: '80px', height: '50px' }}
          />
        </div>
      </div>
    </div>
  )
}
