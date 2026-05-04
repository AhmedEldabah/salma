import Bunting from './Bunting'
import PhotoFrame from './PhotoFrame'
import PopBalloon from './PopBalloon'
import HandDrawnUnderline from './HandDrawnUnderline'
import CountUp from './CountUp'
import { useInView } from '../hooks'

const BALLOON_PAIRS = [
  { color: '#FF4081', size: 46, delay: '0s', duration: '3.8s' },
  { color: '#FF69B4', size: 36, delay: '0.5s', duration: '4.5s' },
  { color: '#FF4081', size: 42, delay: '0.3s', duration: '4.2s' },
  { color: '#FFD700', size: 34, delay: '0.9s', duration: '3.5s' },
]

const TRAITS = [
  { icon: '🎀', label: 'So loved' },
  { icon: '🌸', label: 'So special' },
  { icon: '💛', label: 'So wonderful' },
  { icon: '⭐', label: 'So bright' },
]

export default function PagePhoto({ onNext, onBack }) {
  const [traitsRef, traitsIn] = useInView({ threshold: 0.3 })

  return (
    <div
      className="page-full relative w-full overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(150deg, #BE185D 0%, #E91E8C 45%, #FB923C 100%)',
      }}
    >
      <div className="relative z-20 animate-fadeIn">
        <Bunting />
      </div>

      <main className="relative z-20 flex flex-col items-center justify-center flex-1 px-6 sm:px-8 pt-2 pb-safe">
        <p
          className="animate-fadeInUp delay-100 mb-5 sm:mb-7 font-extrabold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)' }}
        >
          ✨ Today's Star ✨
        </p>

        {/* tap-to-pop balloons + photo */}
        <div className="flex items-center justify-center gap-6 sm:gap-16 mb-4 animate-fadeInUp delay-200">
          <div className="flex flex-col items-center gap-2">
            <PopBalloon
              color={BALLOON_PAIRS[0].color}
              size={BALLOON_PAIRS[0].size}
              style={{ animationDelay: BALLOON_PAIRS[0].delay, animationDuration: BALLOON_PAIRS[0].duration }}
            />
            <PopBalloon
              color={BALLOON_PAIRS[1].color}
              size={BALLOON_PAIRS[1].size}
              style={{ animationDelay: BALLOON_PAIRS[1].delay, animationDuration: BALLOON_PAIRS[1].duration }}
            />
          </div>

          <div className="relative">
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl animate-sway select-none"
              style={{ zIndex: 2 }}
            >
              🎩
            </div>
            <PhotoFrame />
            <div
              className="absolute -bottom-2 -right-3 animate-popIn delay-500"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255,140,0,0.5)',
                border: '2.5px solid #fff',
              }}
            >
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: '#fff', fontSize: '0.95rem' }}>
                <CountUp to={20} duration={1100} />🎂
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <PopBalloon
              color={BALLOON_PAIRS[2].color}
              size={BALLOON_PAIRS[2].size}
              style={{ animationDelay: BALLOON_PAIRS[2].delay, animationDuration: BALLOON_PAIRS[2].duration }}
            />
            <PopBalloon
              color={BALLOON_PAIRS[3].color}
              size={BALLOON_PAIRS[3].size}
              style={{ animationDelay: BALLOON_PAIRS[3].delay, animationDuration: BALLOON_PAIRS[3].duration }}
            />
          </div>
        </div>

        <p className="text-white/70 font-bold text-xs uppercase tracking-widest animate-fadeInUp delay-400 mb-4">
          tap a balloon 🎈
        </p>

        {/* name card with hand-drawn underline */}
        <div className="animate-fadeInUp delay-400 mb-5">
          <div
            className="glass rounded-3xl px-10 sm:px-12 py-8 text-center relative"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            <div className="relative inline-block">
              <h2
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: 'clamp(2rem, 7vw, 3rem)',
                  color: '#fff',
                  textShadow: '0 3px 12px rgba(0,0,0,0.2)',
                  lineHeight: 1.1,
                }}
              >
                Salma 💖
              </h2>
              <div className="absolute left-1/2 -translate-x-1/2" style={{ width: '80%', bottom: -10 }}>
                <HandDrawnUnderline color="#FFD700" delay={600} stroke={4} height={10} />
              </div>
            </div>
            <p className="mt-8 font-bold tracking-widest uppercase text-white/75 text-xs">
              The birthday queen 👑
            </p>
          </div>
        </div>

        {/* trait chips — viewport-triggered staggered reveal */}
        <div ref={traitsRef} className="flex gap-3 sm:gap-4 mb-5 flex-wrap justify-center max-w-md">
          {TRAITS.map((t, i) => (
            <span
              key={t.label}
              className="glass tap-card px-5 py-2.5 rounded-full font-bold text-white text-sm flex items-center gap-2 whitespace-nowrap"
              style={{
                opacity: traitsIn ? 1 : 0,
                transform: traitsIn ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
                transition: `all 600ms cubic-bezier(0.34,1.56,0.64,1) ${i * 110}ms`,
              }}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </span>
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

        <div className="animate-fadeInUp delay-800 flex gap-3 mt-5">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </main>
    </div>
  )
}
