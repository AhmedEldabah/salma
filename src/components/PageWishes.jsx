const WISHES = [
  {
    icon: '🌸',
    title: 'Joy & Happiness',
    text: 'May every single day bring you joy, laughter, and moments that make your heart sing!',
    gradient: 'linear-gradient(135deg, rgba(255,64,129,0.25), rgba(255,105,180,0.15))',
  },
  {
    icon: '✨',
    title: 'Dreams Come True',
    text: 'May all your beautiful dreams take flight and the stars align to make every wish come true.',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.15))',
  },
  {
    icon: '💝',
    title: 'Love All Around',
    text: 'May you always feel the warmth of love from everyone around you — today and forever.',
    gradient: 'linear-gradient(135deg, rgba(251,146,60,0.25), rgba(255,64,129,0.15))',
  },
]

const FLOATING_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 8) % 85}%`,
  delay: `${(i * 0.5) % 5}s`,
  duration: `${3.5 + (i % 3)}s`,
  size: `${0.8 + (i % 3) * 0.4}rem`,
}))

export default function PageWishes({ onNext, onBack }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #5B21B6 0%, #7C3AED 35%, #BE185D 75%, #E91E8C 100%)',
      }}
    >
      {/* floating hearts */}
      {FLOATING_HEARTS.map((h) => (
        <span
          key={h.id}
          className="fixed animate-float pointer-events-none select-none"
          style={{
            left: h.left,
            bottom: '-2rem',
            fontSize: h.size,
            animationDelay: h.delay,
            animationDuration: h.duration,
            zIndex: 1,
            opacity: 0.45,
          }}
        >
          💕
        </span>
      ))}

      <main className="relative z-20 flex flex-col items-center w-full max-w-md px-5 py-10">

        {/* heading */}
        <div className="text-center mb-8 animate-fadeInUp">
          <span className="text-5xl animate-heartbeat block mb-3">💌</span>
          <h2
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(2rem, 7vw, 2.8rem)',
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          >
            Our Wishes For You
          </h2>
          <p
            className="mt-2 font-semibold"
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', letterSpacing: '0.05em' }}
          >
            From the bottom of our hearts 🌸
          </p>
        </div>

        {/* wish cards */}
        <div className="flex flex-col gap-4 w-full mb-8">
          {WISHES.map((w, i) => (
            <div
              key={w.title}
              className={`glass rounded-3xl px-6 py-5 animate-fadeInUp`}
              style={{
                background: w.gradient,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                animationDelay: `${0.15 + i * 0.2}s`,
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="animate-bounce-slow flex-shrink-0"
                  style={{ fontSize: '2.2rem', animationDelay: `${i * 0.3}s` }}
                >
                  {w.icon}
                </span>
                <div>
                  <h3
                    className="font-extrabold mb-1"
                    style={{ color: '#fff', fontSize: '1.05rem' }}
                  >
                    {w.title}
                  </h3>
                  <p
                    className="font-semibold leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}
                  >
                    {w.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* nav buttons */}
        <div className="animate-fadeInUp delay-700 flex gap-4">
          <button onClick={onBack} className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
            ← Back
          </button>
          <button onClick={onNext} className="btn-primary">
            Next →
          </button>
        </div>

        {/* page indicator */}
        <div className="animate-fadeInUp delay-800 flex gap-2 mt-8">
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: '#fff' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </main>
    </div>
  )
}
