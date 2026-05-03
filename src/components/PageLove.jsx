import { useState } from 'react'
import Confetti from './Confetti'
import Balloon from './Balloon'

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

  const handleConfetti = () => {
    setBurst(true)
    setTimeout(() => setBurst(false), 1800)
  }

  const handleLove = () => {
    setLoved(true)
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #7F1D1D 0%, #BE123C 40%, #E11D48 75%, #FF69B4 100%)',
      }}
    >
      <Confetti count={burst ? 90 : 0} key={burst ? 'burst' : 'idle'} />

      <main className="relative z-20 flex flex-col items-center w-full max-w-sm px-5 py-10">

        {/* heading */}
        <div className="text-center mb-6 animate-fadeInUp">
          <span
            className={`block mb-3 ${loved ? 'animate-heartbeat' : 'animate-wiggle'}`}
            style={{ fontSize: 'clamp(3.5rem, 12vw, 5.5rem)' }}
          >
            {loved ? '💗' : '💕'}
          </span>
          <h2
            style={{
              fontFamily: "'Pacifico', cursive",
              fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
              color: '#fff',
              textShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            With All Our Love
          </h2>
        </div>

        {/* message card */}
        <div
          className="glass rounded-3xl px-7 py-6 text-center w-full mb-6 animate-fadeInUp delay-200"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
        >
          <p
            className="font-bold leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.92)', fontSize: '1rem' }}
          >
            Salma, you bring so much light and joy into our lives. 🌟<br />
            Every smile you share makes our world a brighter place.<br />
            Today is YOUR day — celebrate big! 🎉
          </p>
        </div>

        {/* interactive buttons */}
        <div className="flex flex-col items-center gap-4 w-full animate-fadeInUp delay-400">

          {/* love button */}
          <button
            onClick={handleLove}
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
            {loved ? '💖 I love you so much! 💖' : '💕 I love you, Salma! 💕'}
          </button>

          {/* confetti burst */}
          <button
            onClick={handleConfetti}
            className="btn-primary w-full justify-center btn-bounce"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
              boxShadow: '0 6px 24px rgba(245,158,11,0.5)',
              fontSize: '1.1rem',
            }}
          >
            🎊 Throw Confetti! 🎊
          </button>

          {/* age reveal */}
          <div
            className="glass w-full rounded-2xl py-4 text-center"
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
              🎂 Salma is 3 years old! 🎂
            </p>
            <p className="font-bold mt-1" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              Three wonderful years of magic ✨
            </p>
          </div>
        </div>

        {/* bottom balloons */}
        <div className="flex justify-center gap-2 mt-8 animate-fadeInUp delay-600">
          {BOTTOM_BALLOONS.map((b, i) => (
            <Balloon
              key={i}
              color={b.color}
              size={b.size}
              style={{ animationDelay: `${i * 0.25}s`, animationDuration: `${3.5 + i * 0.35}s` }}
            />
          ))}
        </div>

        {/* nav buttons */}
        <div className="animate-fadeInUp delay-700 flex gap-4 mt-6">
          <button onClick={onBack} className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
            ← Back
          </button>
          <button onClick={onRestart} className="btn-primary" style={{ background: 'rgba(255,255,255,0.2)', boxShadow: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
            🔄 Start Over
          </button>
        </div>

        {/* page indicator */}
        <div className="animate-fadeInUp delay-800 flex gap-2 mt-8">
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: '#fff' }} />
        </div>
      </main>
    </div>
  )
}
