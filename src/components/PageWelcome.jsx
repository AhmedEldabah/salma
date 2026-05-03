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

      {/* Single-viewport hero */}
      <section
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center py-10 w-full"
        style={{ minHeight: '100vh' }}
      >
        {/* cake (long-press for easter egg) */}
        <div
          ref={cakeRef}
          data-no-burst="true"
          className="animate-bounce-slow delay-100 mb-3 select-none"
          style={{ touchAction: 'manipulation', cursor: 'pointer' }}
          aria-label="Birthday cake. Long-press for a surprise."
        >
          <span style={{ fontSize: 'clamp(2.8rem, 9vw, 4.5rem)', display: 'inline-block' }}>
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
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            color: '#fff',
            lineHeight: 1.1,
            textShadow: '0 4px 24px rgba(255,100,180,0.6)',
          }}
        />

        <div className="relative mt-1 inline-block">
          <LetterReveal
            as="h2"
            text="Salma! 🌸"
            stagger={55}
            delay={550}
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(1.8rem, 7vw, 3.4rem)',
              color: '#FFD6EC',
              textShadow: '0 4px 20px rgba(255,150,200,0.5)',
            }}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2" style={{ width: '85%' }}>
            <HandDrawnUnderline color="#FFD700" delay={1400} />
          </div>
        </div>

        {/* sparkle divider */}
        <div className="animate-fadeInUp delay-700 flex items-center gap-3 mt-5 mb-4">
          <span className="animate-twinkle text-xl">✨</span>
          <div style={{ width: 60, height: 2, background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />
          <span className="animate-twinkle delay-300 text-xl">💖</span>
          <div style={{ width: 60, height: 2, background: 'rgba(255,255,255,0.45)', borderRadius: 2 }} />
          <span className="animate-twinkle delay-600 text-xl">✨</span>
        </div>

        {/* note */}
        <div
          ref={noteRef}
          className="glass rounded-3xl px-6 py-5 max-w-sm text-center mt-2"
          style={{
            boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            transform: noteIn ? 'translateY(0) rotate(-1.5deg)' : 'translateY(20px) rotate(-3deg)',
            opacity: noteIn ? 1 : 0,
            transition: 'all 700ms cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p
            className="font-bold leading-snug text-white/95"
            style={{ fontSize: '0.9rem' }}
          >
            tap, scroll, shake — every page hides a tiny surprise ✨
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-white/60 font-extrabold">
            psst — long-press the cake 🎂
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn-primary btn-gold animate-pulse-glow mt-6"
          style={{ fontSize: 'clamp(0.95rem, 3.2vw, 1.15rem)', padding: '0.85rem 2.2rem' }}
        >
          Open Your Surprise 🎁
        </button>

        {/* secret reveal */}
        <div
          aria-hidden={!secret}
          style={{
            marginTop: '0.75rem',
            opacity: secret ? 1 : 0,
            transform: secret ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
            transition: 'all 500ms cubic-bezier(0.34,1.56,0.64,1)',
            pointerEvents: secret ? 'auto' : 'none',
            height: secret ? 'auto' : 0,
          }}
        >
          <div
            className="glass rounded-full px-4 py-1.5 font-extrabold text-white text-xs flex items-center gap-2"
            style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.25)' }}
          >
            <span className="text-base">💌</span>
            made for you with love
          </div>
        </div>

        <div ref={hintRef} className="flex gap-3 mt-6" style={{ opacity: hintIn ? 1 : 0, transition: 'opacity 600ms' }}>
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </section>
    </div>
  )
}
