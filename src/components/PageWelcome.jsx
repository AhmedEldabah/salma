import Confetti from './Confetti'
import FloatingShapes from './FloatingShapes'

const STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 4.7) % 90}%`,
  top: `${10 + (i * 7.3) % 80}%`,
  delay: `${(i * 0.4) % 4}s`,
  size: `${0.6 + (i % 3) * 0.4}rem`,
}))

export default function PageWelcome({ onNext }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(145deg, #4A0080 0%, #9C0064 40%, #E91E8C 75%, #FF6DB4 100%)',
      }}
    >
      <Confetti count={55} />
      <FloatingShapes />

      {/* background stars */}
      {STARS.map((s) => (
        <span
          key={s.id}
          className="absolute animate-sparkle select-none pointer-events-none"
          style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: s.delay }}
        >
          ✦
        </span>
      ))}

      {/* content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">

        {/* cake emoji */}
        <div className="animate-bounce-slow delay-100 mb-4">
          <span style={{ fontSize: 'clamp(4rem, 12vw, 7rem)' }}>🎂</span>
        </div>

        {/* heading */}
        <h1
          className="animate-fadeInUp delay-200 animate-glowText"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 'clamp(2.8rem, 10vw, 6rem)',
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 4px 24px rgba(255,100,180,0.6)',
          }}
        >
          Happy Birthday
        </h1>

        <h2
          className="animate-fadeInUp delay-400"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 'clamp(2.4rem, 9vw, 5rem)',
            color: '#FFD6EC',
            marginTop: '0.25rem',
            textShadow: '0 4px 20px rgba(255,150,200,0.5)',
          }}
        >
          Salma! 🌸
        </h2>

        {/* sparkle divider */}
        <div className="animate-fadeInUp delay-600 flex items-center gap-3 my-6">
          <span className="animate-twinkle text-2xl">✨</span>
          <div style={{ width: '80px', height: '2px', background: 'rgba(255,255,255,0.45)', borderRadius: '2px' }} />
          <span className="animate-twinkle delay-300 text-2xl">💖</span>
          <div style={{ width: '80px', height: '2px', background: 'rgba(255,255,255,0.45)', borderRadius: '2px' }} />
          <span className="animate-twinkle delay-600 text-2xl">✨</span>
        </div>

        {/* subtitle */}
        <p
          className="animate-fadeInUp delay-700 mb-10"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            color: 'rgba(255,255,255,0.82)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          🎊 Wishing you the most magical day! 🎊
        </p>

        {/* CTA button */}
        <button
          onClick={onNext}
          className="btn-primary btn-gold animate-fadeInUp delay-1000 animate-pulse-glow"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', padding: '0.85rem 2.5rem' }}
        >
          Open Your Surprise 🎁
        </button>

        {/* page indicator */}
        <div className="animate-fadeInUp delay-1200 flex gap-2 mt-10">
          <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: '#fff' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </div>
    </div>
  )
}
