import { useState } from 'react'
import Confetti from './components/Confetti'
import Bunting from './components/Bunting'
import Balloon from './components/Balloon'
import PhotoFrame from './components/PhotoFrame'
import FloatingShapes from './components/FloatingShapes'

export default function App() {
  const [clicked, setClicked] = useState(null)
  const [loveClicked, setLoveClicked] = useState(false)
  const [burst, setBurst] = useState(false)

  const handleClick = (btn) => {
    setClicked(btn)
    if (btn === 'click') {
      setBurst(true)
      setTimeout(() => setBurst(false), 1500)
    }
    if (btn === 'love') setLoveClicked(true)
    setTimeout(() => setClicked(null), 600)
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: 'linear-gradient(160deg, #FFB6C1 0%, #FFC0CB 50%, #FFD1DC 100%)' }}
    >
      <Confetti count={burst ? 80 : 45} key={burst ? 'burst' : 'normal'} />
      <FloatingShapes />

      {/* bunting */}
      <div className="relative z-20 animate-fadeIn">
        <Bunting />
      </div>

      <main className="relative z-20 flex flex-col items-center px-4 pb-16">

        {/* hero heading */}
        <div
          className="text-center mb-8 animate-fadeInUp"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-4xl animate-twinkle">🎉</span>
            <h1
              className="font-extrabold leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 5rem)',
                color: '#C2185B',
                textShadow: '3px 3px 0px rgba(255,255,255,0.6), 0 4px 16px rgba(194,24,91,0.25)',
                fontFamily: "'Segoe UI', Impact, sans-serif",
              }}
            >
              Happy Birthday!
            </h1>
            <span className="text-4xl animate-twinkle delay-500">🎂</span>
          </div>
          <p
            className="mt-2 font-semibold tracking-widest uppercase"
            style={{ color: '#E91E8C', fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)' }}
          >
            🎊 Wishing you the most magical day! 🎊
          </p>
        </div>

        {/* balloons + photo */}
        <div
          className="flex items-end justify-center gap-4 sm:gap-10 mb-8 animate-fadeInUp"
          style={{ animationDelay: '0.45s', opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-2">
            <Balloon color="#FF4444" size={55} style={{ animationDelay: '0s', animationDuration: '3.8s' }} />
            <Balloon color="#FF69B4" size={44} style={{ animationDelay: '0.6s', animationDuration: '4.5s', marginTop: '-12px' }} />
          </div>

          <div className="relative">
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl animate-sway select-none"
              style={{ zIndex: 2 }}
            >
              🎩
            </div>
            <PhotoFrame />
          </div>

          <div className="flex flex-col items-center gap-2">
            <Balloon color="#FF69B4" size={50} style={{ animationDelay: '0.3s', animationDuration: '4.2s' }} />
            <Balloon color="#FF4444" size={46} style={{ animationDelay: '0.9s', animationDuration: '3.5s', marginTop: '-12px' }} />
          </div>
        </div>

        {/* name placeholder */}
        <div
          className="text-center mb-8 animate-fadeInUp"
          style={{ animationDelay: '0.65s', opacity: 0 }}
        >
          <div
            className="inline-block rounded-2xl px-8 py-4"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(6px)',
              border: '2px dashed #FF69B4',
              boxShadow: '0 4px 20px rgba(255,105,180,0.2)',
              minWidth: '200px',
            }}
          >
            <p
              className="font-bold"
              style={{ color: '#C2185B', fontSize: 'clamp(1.5rem, 5vw, 2rem)', minHeight: '2.2rem' }}
            >
              {/* name inserted here */}
            </p>
            <p className="text-xs mt-1 font-medium" style={{ color: '#E91E8C', opacity: 0.55 }}>
              ✦ name here ✦
            </p>
          </div>
        </div>

        {/* message card */}
        <div
          className="w-full max-w-sm mb-8 animate-fadeInUp"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <div
            className="rounded-3xl px-6 py-5 text-center"
            style={{
              background: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              border: '2px solid rgba(255,105,180,0.35)',
              boxShadow: '0 8px 32px rgba(255,105,180,0.2)',
              minHeight: '90px',
            }}
          >
            <p
              className="font-semibold leading-relaxed"
              style={{ color: '#AD1457', fontSize: '1rem' }}
            >
              <span style={{ opacity: 0.45, fontStyle: 'italic', color: '#E91E8C' }}>
                Your heartfelt message will go right here... 💌
              </span>
            </p>
          </div>
        </div>

        {/* buttons */}
        <div
          className="flex flex-col items-center gap-4 animate-fadeInUp"
          style={{ animationDelay: '1s', opacity: 0 }}
        >
          <button
            onClick={() => handleClick('age')}
            className="btn-bounce font-bold rounded-full px-10 py-3 text-white transition-all duration-200 select-none cursor-pointer"
            style={{
              background: clicked === 'age'
                ? 'linear-gradient(135deg, #C2185B, #E91E8C)'
                : 'linear-gradient(135deg, #FF69B4, #FF4081)',
              boxShadow: clicked === 'age'
                ? '0 2px 12px rgba(194,24,91,0.4)'
                : '0 6px 20px rgba(255,105,180,0.45)',
              transform: clicked === 'age' ? 'scale(0.95)' : 'scale(1)',
              fontSize: '1.15rem',
              letterSpacing: '0.03em',
            }}
          >
            🎂 3 yrs old 🎂
          </button>

          <button
            onClick={() => handleClick('click')}
            className="btn-bounce font-bold rounded-full px-10 py-3 text-white transition-all duration-200 select-none cursor-pointer"
            style={{
              background: clicked === 'click'
                ? 'linear-gradient(135deg, #C2185B, #E91E8C)'
                : 'linear-gradient(135deg, #FF4081, #FF69B4)',
              boxShadow: clicked === 'click'
                ? '0 2px 12px rgba(194,24,91,0.4)'
                : '0 6px 20px rgba(255,105,180,0.45)',
              transform: clicked === 'click' ? 'scale(0.95)' : 'scale(1)',
              fontSize: '1.15rem',
              letterSpacing: '0.03em',
            }}
          >
            Click here please 😊
          </button>

          <button
            onClick={() => handleClick('love')}
            className="btn-bounce font-extrabold transition-all duration-200 select-none cursor-pointer"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
              color: loveClicked ? '#C2185B' : '#E91E8C',
              textShadow: loveClicked
                ? '0 0 20px rgba(194,24,91,0.6), 2px 2px 0 rgba(255,255,255,0.5)'
                : '2px 2px 0 rgba(255,255,255,0.4)',
              transform: clicked === 'love' ? 'scale(1.2)' : 'scale(1)',
              letterSpacing: '0.02em',
            }}
          >
            {loveClicked ? '💖 I love you! 💖' : '💕 I love you 💕'}
          </button>
        </div>

        {/* bottom balloons */}
        <div
          className="flex justify-center gap-3 mt-10 animate-fadeInUp"
          style={{ animationDelay: '1.2s', opacity: 0 }}
        >
          {['#FF4444', '#FF69B4', '#FFD700', '#FF69B4', '#FF4444'].map((color, i) => (
            <Balloon
              key={i}
              color={color}
              size={38}
              style={{ animationDelay: `${i * 0.3}s`, animationDuration: `${3.5 + i * 0.4}s` }}
            />
          ))}
        </div>

        <p
          className="mt-10 font-semibold animate-twinkle"
          style={{ color: '#C2185B', opacity: 0.7, fontSize: '1.2rem', animationDelay: '1.4s' }}
        >
          🎉 🎈 🎊 🎂 🎈 🎉
        </p>
      </main>
    </div>
  )
}
