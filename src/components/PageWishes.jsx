import LetterReveal from './LetterReveal'
import HandDrawnUnderline from './HandDrawnUnderline'
import { useInView } from '../hooks'

const WISHES = [
  {
    icon: '🌸',
    title: 'Joy & Happiness',
    text: 'random walks fel zamalek',
    gradient: 'linear-gradient(135deg, rgba(255,64,129,0.25), rgba(255,105,180,0.15))',
  },
  {
    icon: '✨',
    title: 'Dreams Come True',
    text: 'trying new food',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(236,72,153,0.15))',
  },
  {
    icon: '💝',
    title: 'Love All Around',
    text: 'talking shit about every human being',
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

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 700ms cubic-bezier(0.22,1,0.36,1) ${index * 120}ms`,
      }}
    >
      <div
        className="glass rounded-3xl px-8 py-8 w-full text-left relative overflow-hidden"
        style={{
          background: wish.gradient,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
      >
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
              style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}
            >
              {wish.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PageWishes({ onNext, onBack }) {
  return (
    <div
      className="page-full relative w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #5B21B6 0%, #7C3AED 35%, #BE185D 75%, #E91E8C 100%)',
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

      <main className="relative z-20 flex flex-col items-center justify-center flex-1 w-full max-w-md px-8 py-12 pb-safe">
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="text-5xl animate-heartbeat block mb-4">💌</span>
          <div className="relative inline-block">
            <LetterReveal
              as="h2"
              text="too many more"
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
        </div>

        <div className="flex flex-col gap-12 w-full mb-16">
          {WISHES.map((w, i) => (
            <WishCard key={w.title} wish={w} index={i} />
          ))}
        </div>

        <div className="animate-fadeInUp delay-700 flex gap-12 mt-4">
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

        <div className="animate-fadeInUp delay-800 flex gap-2 mt-8">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </main>
    </div>
  )
}
