import { useRef, useState } from 'react'
import LetterReveal from './LetterReveal'
import HandDrawnUnderline from './HandDrawnUnderline'
import { useInView } from '../hooks'

const WISHES = [
  {
    icon: '🌸',
    title: 'Joy & Happiness',
    text: 'random walks fel zamalek',
    secret: 'You make everyone smile 💛',
    gradient: 'linear-gradient(135deg, rgba(255,64,129,0.25), rgba(255,105,180,0.15))',
  },
  {
    icon: '✨',
    title: 'Dreams Come True',
    text: 'trying new food',
    secret: 'The world is yours, little star ⭐',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.15))',
  },
  {
    icon: '💝',
    title: 'Love All Around',
    text: 'talking shit about every human being',
    secret: 'Loved beyond measure 💖',
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

function WishCard({ wish, index }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const [opened, setOpened] = useState(false)
  const [ripples, setRipples] = useState([])
  const [bumps, setBumps] = useState(0)
  const cardRef = useRef(null)

  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX ?? e.touches?.[0]?.clientX ?? rect.left + rect.width / 2) - rect.left
    const y = (e.clientY ?? e.touches?.[0]?.clientY ?? rect.top + rect.height / 2) - rect.top
    const id = Date.now() + Math.random()
    setRipples((r) => [...r, { id, x, y }])
    setBumps((b) => b + 1)
    if (!opened) setOpened(true)
    if (navigator.vibrate) navigator.vibrate(12)
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 700)
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 700ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
    >
      <button
        ref={cardRef}
        onClick={handleTap}
        data-no-burst="true"
        key={bumps}
        className="glass rounded-3xl px-8 py-7 w-full text-left tap-card animate-card-tap relative overflow-hidden"
        style={{
          background: wish.gradient,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x - 60,
              top: r.y - 60,
              width: 120,
              height: 120,
              background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)',
              animation: 'ripple 700ms ease-out forwards',
            }}
          />
        ))}

        <div className="flex items-start gap-4 relative">
          <span
            className="animate-bounce-slow flex-shrink-0"
            style={{ fontSize: '2.2rem', animationDelay: `${index * 0.3}s` }}
          >
            {wish.icon}
          </span>
          <div className="flex-1">
            <h3 className="font-extrabold mb-2 text-white" style={{ fontSize: '1.05rem' }}>
              {wish.title}
            </h3>
            <p
              className="font-semibold leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}
            >
              {wish.text}
            </p>
            <div
              style={{
                maxHeight: opened ? 60 : 0,
                opacity: opened ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 500ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <p
                className="mt-3 font-extrabold text-white text-sm flex items-center gap-2"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: '1rem' }}
              >
                <span className="text-base">↳</span> {wish.secret}
              </p>
            </div>
          </div>
        </div>

        {!opened && (
          <span className="absolute right-3 bottom-3 text-xs uppercase tracking-widest font-extrabold text-white/55">
            tap
          </span>
        )}
      </button>
    </div>
  )
}

export default function PageWishes({ onNext, onBack }) {
  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #5B21B6 0%, #7C3AED 35%, #BE185D 75%, #E91E8C 100%)',
        minHeight: '100vh',
      }}
    >
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

      <main className="relative z-20 flex flex-col items-center justify-start flex-1 w-full max-w-md px-8 pt-20 pb-16">
        <div className="text-center mb-10 animate-fadeInUp">
          <span className="text-5xl animate-heartbeat block mb-4">💌</span>
          <div className="relative inline-block">
            <LetterReveal
              as="h2"
              text="too manyy moree"
              stagger={40}
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: 'clamp(2rem, 7vw, 2.8rem)',
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2" style={{ width: '80%' }}>
              <HandDrawnUnderline color="#FFD6EC" delay={1100} stroke={3} height={10} />
            </div>
          </div>
          <p
            className="mt-6 font-semibold text-white/75"
            style={{ fontSize: '0.9rem', letterSpacing: '0.05em' }}
          >
            tap each card for a tiny secret 🌸
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full mb-12">
          {WISHES.map((w, i) => (
            <WishCard key={w.title} wish={w} index={i} />
          ))}
        </div>

        <div className="animate-fadeInUp delay-700 flex gap-6">
          <button
            onClick={onBack}
            className="btn-primary"
            style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}
          >
            ← Back
          </button>
          <button onClick={onNext} className="btn-primary">
            Next →
          </button>
        </div>

        <div className="animate-fadeInUp delay-800 flex gap-3 mt-10">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </main>
    </div>
  )
}
