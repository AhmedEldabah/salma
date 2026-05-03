import { useCallback, useEffect, useState } from 'react'
import Confetti from './Confetti'
import PopBalloon from './PopBalloon'
import ScratchReveal from './ScratchReveal'
import LetterReveal from './LetterReveal'
import CountUp from './CountUp'
import HandDrawnUnderline from './HandDrawnUnderline'
import { useShake } from '../hooks'

const BOTTOM_BALLOONS = [
  { color: '#FF4444', size: 42 },
  { color: '#FF69B4', size: 36 },
  { color: '#FFD700', size: 46 },
  { color: '#DA70D6', size: 38 },
  { color: '#FF4444', size: 40 },
]

export default function PageLove({ onBack, onRestart }) {
  const [loved, setLoved] = useState(false)
  const [burst, setBurst] = useState(false)
  const [shakeHint, setShakeHint] = useState(true)
  const [motionAsked, setMotionAsked] = useState(false)

  const triggerConfetti = useCallback(() => {
    setBurst(true)
    if (navigator.vibrate) navigator.vibrate([20, 40, 20])
    setTimeout(() => setBurst(false), 1800)
  }, [])

  useShake(triggerConfetti, 14)

  // Auto-dismiss the shake hint after a while
  useEffect(() => {
    const t = setTimeout(() => setShakeHint(false), 7000)
    return () => clearTimeout(t)
  }, [])

  // iOS 13+ requires permission for DeviceMotion
  const enableMotion = async () => {
    setMotionAsked(true)
    try {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        await DeviceMotionEvent.requestPermission()
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #7F1D1D 0%, #BE123C 40%, #E11D48 75%, #FF69B4 100%)',
        minHeight: '100vh',
      }}
    >
      <Confetti count={burst ? 90 : 0} key={burst ? 'burst' : 'idle'} />

      <main className="relative z-20 flex flex-col items-center justify-center flex-1 w-full max-w-sm px-8 py-28">
        <div className="text-center mb-16 animate-fadeInUp">
          <span
            className={`block mb-3 ${loved ? 'animate-heartbeat' : 'animate-wiggle'}`}
            style={{ fontSize: 'clamp(3.5rem, 12vw, 5.5rem)' }}
          >
            {loved ? '💗' : '💕'}
          </span>
          <div className="relative inline-block">
            <LetterReveal
              as="h2"
              text="With All Our Love"
              stagger={42}
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
                color: '#fff',
                textShadow: '0 4px 20px rgba(0,0,0,0.25)',
              }}
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2" style={{ width: '75%' }}>
              <HandDrawnUnderline color="#FFD700" delay={1100} stroke={3} height={10} />
            </div>
          </div>
        </div>

        {/* scratch-to-reveal hidden message */}
        <div className="animate-fadeInUp delay-200 mb-20">
          <ScratchReveal width={300} height={130} hint="Scratch for a secret 💛">
            <p
              className="font-bold leading-snug px-2"
              style={{
                fontFamily: "'Pacifico', cursive",
                color: '#BE185D',
                fontSize: '1.15rem',
              }}
            >
              to my favorite gazma ✨
            </p>
          </ScratchReveal>
        </div>

        {/* main message card */}
        <div
          className="glass rounded-3xl px-10 py-12 text-center w-full mb-20 animate-fadeInUp delay-300"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <p className="font-bold leading-relaxed text-white/95" style={{ fontSize: '1rem' }}>
            can't imagine my life without our friendship and can't wait to make more memories together and share more sweet treats
          </p>
        </div>

        {/* shake-to-confetti hint */}
        {shakeHint && (
          <button
            onClick={() => {
              if (!motionAsked) enableMotion()
              triggerConfetti()
              setShakeHint(false)
            }}
            className="glass rounded-full px-6 py-3 text-white font-extrabold text-sm flex items-center gap-3 mb-10 animate-fadeInUp delay-400"
            style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}
            data-no-burst="true"
          >
            <span className="text-xl animate-wiggle">📱</span>
            shake your phone for confetti!
          </button>
        )}

        <div className="flex flex-col items-center gap-16 w-full animate-fadeInUp delay-400">
          <button
            onClick={() => {
              setLoved(true)
              if (navigator.vibrate) navigator.vibrate(30)
            }}
            className="btn-primary w-full justify-center"
            style={{
              background: loved
                ? 'linear-gradient(135deg, #BE185D, #E11D48)'
                : 'linear-gradient(135deg, #E11D48, #FF69B4)',
              boxShadow: loved
                ? '0 6px 24px rgba(190,24,93,0.6)'
                : '0 6px 24px rgba(225,29,72,0.5)',
              fontSize: '1.15rem',
              transition: 'all 0.3s ease',
            }}
          >
            {loved ? '💖 love you salma 💖' : '💕 love you salma 💕'}
          </button>

          <button
            onClick={triggerConfetti}
            className="btn-primary w-full justify-center btn-bounce"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
              boxShadow: '0 6px 24px rgba(245,158,11,0.5)',
              fontSize: '1.1rem',
            }}
          >
            🎊 Throw Confetti! 🎊
          </button>

          {/* age reveal with count-up */}
          <div
            className="glass w-full rounded-2xl py-8 px-8 text-center"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
          >
            <p
              className="font-extrabold"
              style={{
                fontFamily: "'Pacifico', cursive",
                color: '#fff',
                fontSize: 'clamp(1.4rem, 5vw, 2rem)',
              }}
            >
              🎂 <CountUp to={20} duration={1400} /> years old!!! 🎂
            </p>
            <p className="font-bold mt-3 text-white/70 text-sm">
              <CountUp to={20} duration={1400} /> wonderful years of magic ✨
            </p>
          </div>
        </div>

        {/* tap-to-pop bottom balloons */}
        <div className="flex justify-center gap-10 mt-16 animate-fadeInUp delay-600">
          {BOTTOM_BALLOONS.map((b, i) => (
            <PopBalloon
              key={i}
              color={b.color}
              size={b.size}
              style={{ animationDelay: `${i * 0.25}s`, animationDuration: `${3.5 + i * 0.35}s` }}
            />
          ))}
        </div>

        <div className="animate-fadeInUp delay-700 flex gap-16 mt-20">
          <button
            onClick={onBack}
            className="btn-primary"
            style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}
          >
            ← Back
          </button>
          <button
            onClick={onRestart}
            className="btn-primary"
            style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}
          >
            🔄 Start Over
          </button>
        </div>

        <div className="animate-fadeInUp delay-800 flex gap-3 mt-12">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: 28, height: 8, borderRadius: 4, background: '#fff' }} />
        </div>
      </main>
    </div>
  )
}
