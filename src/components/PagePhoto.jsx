import Balloon from './Balloon'
import Bunting from './Bunting'
import PhotoFrame from './PhotoFrame'

const BALLOON_PAIRS = [
  { color: '#FF4081', size: 46, delay: '0s', duration: '3.8s' },
  { color: '#FF69B4', size: 36, delay: '0.5s', duration: '4.5s' },
  { color: '#FF4081', size: 42, delay: '0.3s', duration: '4.2s' },
  { color: '#FFD700', size: 34, delay: '0.9s', duration: '3.5s' },
]

export default function PagePhoto({ onNext, onBack }) {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(150deg, #BE185D 0%, #E91E8C 45%, #FB923C 100%)',
      }}
    >
      {/* bunting */}
      <div className="relative z-20 animate-fadeIn">
        <Bunting />
      </div>

      {/* main content */}
      <main className="relative z-20 flex flex-col items-center flex-1 px-4 pb-10">

        {/* subtitle */}
        <p
          className="animate-fadeInUp delay-100 mb-4 font-extrabold tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)' }}
        >
          ✨ Today's Star ✨
        </p>

        {/* balloon + photo + balloon row */}
        <div className="flex items-end justify-center gap-4 sm:gap-12 mb-6 animate-fadeInUp delay-200">
          {/* left balloons */}
          <div className="flex flex-col items-center gap-1">
            <Balloon color={BALLOON_PAIRS[0].color} size={BALLOON_PAIRS[0].size} style={{ animationDelay: BALLOON_PAIRS[0].delay, animationDuration: BALLOON_PAIRS[0].duration }} />
            <Balloon color={BALLOON_PAIRS[1].color} size={BALLOON_PAIRS[1].size} style={{ animationDelay: BALLOON_PAIRS[1].delay, animationDuration: BALLOON_PAIRS[1].duration, marginTop: '-10px' }} />
          </div>

          {/* photo */}
          <div className="relative">
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl animate-sway select-none"
              style={{ zIndex: 2 }}
            >
              🎩
            </div>
            <PhotoFrame />
            {/* age badge */}
            <div
              className="absolute -bottom-2 -right-3 animate-popIn delay-500"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FF8C00)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(255,140,0,0.5)',
                border: '2.5px solid #fff',
              }}
            >
              <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900, color: '#fff', fontSize: '0.85rem' }}>3🎂</span>
            </div>
          </div>

          {/* right balloons */}
          <div className="flex flex-col items-center gap-1">
            <Balloon color={BALLOON_PAIRS[2].color} size={BALLOON_PAIRS[2].size} style={{ animationDelay: BALLOON_PAIRS[2].delay, animationDuration: BALLOON_PAIRS[2].duration }} />
            <Balloon color={BALLOON_PAIRS[3].color} size={BALLOON_PAIRS[3].size} style={{ animationDelay: BALLOON_PAIRS[3].delay, animationDuration: BALLOON_PAIRS[3].duration, marginTop: '-10px' }} />
          </div>
        </div>

        {/* name card */}
        <div className="animate-fadeInUp delay-400 mb-6">
          <div
            className="glass rounded-3xl px-10 py-4 text-center"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            <h2
              style={{
                fontFamily: "'Pacifico', cursive",
                fontSize: 'clamp(2rem, 7vw, 3rem)',
                color: '#fff',
                textShadow: '0 3px 12px rgba(0,0,0,0.2)',
              }}
            >
              Salma 💖
            </h2>
            <p
              className="mt-1 font-bold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem' }}
            >
              Our precious little princess
            </p>
          </div>
        </div>

        {/* small detail */}
        <div className="animate-fadeInUp delay-500 flex gap-4 mb-8 flex-wrap justify-center">
          {['🎀 So loved', '🌸 So special', '💛 So wonderful'].map((t) => (
            <span
              key={t}
              className="glass px-4 py-1.5 rounded-full font-bold"
              style={{ color: '#fff', fontSize: '0.85rem' }}
            >
              {t}
            </span>
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
          <div style={{ width: '28px', height: '8px', borderRadius: '4px', background: '#fff' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
        </div>
      </main>
    </div>
  )
}
