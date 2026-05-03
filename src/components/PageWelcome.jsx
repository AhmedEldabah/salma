import { useState } from 'react'
import Confetti from './Confetti'
import FloatingShapes from './FloatingShapes'
import LetterReveal from './LetterReveal'
import HandDrawnUnderline from './HandDrawnUnderline'
import Parallax from './Parallax'
import { useLongPress, useInView } from '../hooks'

const STARS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 4.7) % 90}%`,
  top: `${4 + (i * 7.3) % 92}%`,
  delay: `${(i * 0.4) % 4}s`,
  size: `${0.6 + (i % 3) * 0.4}rem`,
}))

export default function PageWelcome({ onNext }) {
  const [secret, setSecret] = useState(false)
  const cakeRef = useLongPress(() => setSecret(true), 700)
  const [noteRef, noteIn] = useInView({ threshold: 0.5 })
  const [hintRef, hintIn] = useInView({ threshold: 0.4 })

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(145deg, #4A0080 0%, #9C0064 40%, #E91E8C 75%, #FF6DB4 100%)',
        minHeight: '100vh',
      }}
    >
      <Confetti count={55} />

      {/* Parallax star layer */}
      <Parallax speed={0.25} className="fixed inset-0 z-[5] pointer-events-none">
        {STARS.map((s) => (
          <span
            key={s.id}
            className="absolute animate-sparkle select-none"
            style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: s.delay }}
          >
            ✦
          </span>
        ))}
      </Parallax>

      <FloatingShapes />

      {/* Hero — first viewport */}
      <section
        className="relative z-20 flex flex-col items-center justify-center px-8 text-center gap-6"
        style={{ minHeight: '100vh' }}
      >
        {/* cake (long-press for easter egg) */}
        <div
          ref={cakeRef}
          data-no-burst="true"
          className="animate-bounce-slow delay-100 mb-8 select-none"
          style={{ touchAction: 'manipulation', cursor: 'pointer' }}
          aria-label="Birthday cake. Long-press for a surprise."
        >
          <span style={{ fontSize: 'clamp(4rem, 12vw, 7rem)', display: 'inline-block' }}>
            {secret ? '🎁' : '🎂'}
          </span>
        </div>

        {/* heading */}
        <LetterReveal
          as="h1"
          text="Happy Birthday"
          stagger={45}
          className="animate-glowText"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 'clamp(2.8rem, 10vw, 6rem)',
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 4px 24px rgba(255,100,180,0.6)',
          }}
        />

        <div className="relative mt-3 inline-block">
          <LetterReveal
            as="h2"
            text="Salma! 🌸"
            stagger={55}
            delay={550}
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(2.4rem, 9vw, 5rem)',
              color: '#FFD6EC',
              textShadow: '0 4px 20px rgba(255,150,200,0.5)',
            }}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2" style={{ width: '85%' }}>
            <HandDrawnUnderline color="#FFD700" delay={1400} />
          </div>
        </div>

        {/* sparkle divider */}
        <div className="animate-fadeInUp delay-700 flex items-center gap-4 mt-6 mb-6">
          <span className="animate-twinkle text-2xl">✨</span>
          <div style={{ width: 80, height: 2, background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />
          <span className="animate-twinkle delay-300 text-2xl">💖</span>
          <div style={{ width: 80, height: 2, background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />
          <span className="animate-twinkle delay-600 text-2xl">✨</span>
        </div>

        <p
          className="animate-fadeInUp delay-1000"
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

        {/* secret reveal under cake */}
        <div
          aria-hidden={!secret}
          style={{
            marginTop: '1.5rem',
            opacity: secret ? 1 : 0,
            transform: secret ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
            transition: 'all 500ms cubic-bezier(0.34,1.56,0.64,1)',
            pointerEvents: secret ? 'auto' : 'none',
          }}
        >
          <div
            className="glass rounded-full px-5 py-2 font-extrabold text-white text-sm flex items-center gap-2"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
          >
            <span className="text-lg">💌</span>
            made for you with love
          </div>
        </div>

        {/* scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{
            opacity: hintIn ? 1 : 0,
            transition: 'opacity 600ms 1.4s',
          }}
        >
          <span className="text-white/70 text-xs font-bold tracking-widest uppercase mb-1">
            scroll
          </span>
          <span className="text-white text-2xl animate-scroll-hint" aria-hidden="true">⌄</span>
        </div>
      </section>

      {/* Scroll-reveal note */}
      <section
        className="relative z-20 flex flex-col items-center justify-center px-8 py-24 w-full gap-14"
        style={{ minHeight: '50vh' }}
      >
        <div
          ref={noteRef}
          className="glass rounded-3xl px-10 py-14 max-w-md text-center"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            transform: noteIn ? 'translateY(0) rotate(-1.5deg)' : 'translateY(40px) rotate(-3deg)',
            opacity: noteIn ? 1 : 0,
            transition: 'all 800ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <span className="text-4xl block mb-3">💌</span>
          <p
            className="font-bold leading-relaxed text-white/95"
            style={{ fontSize: '1rem' }}
          >
            This little corner of the internet was made just for you. Tap, scroll, shake — every
            page hides a tiny surprise. ✨
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-white/60 font-extrabold">
            psst — try long-pressing the cake 🎂
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn-primary btn-gold animate-pulse-glow"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', padding: '0.95rem 2.6rem' }}
        >
          Open Your Surprise 🎁
        </button>

        <div className="flex gap-3 mt-6">
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>
    </div>
  )
}
