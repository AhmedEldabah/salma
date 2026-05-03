import { useEffect, useRef, useState } from 'react'

const PARTICLES = ['✨', '💖', '⭐', '🌟', '💫']

export default function TapBurst() {
  const [bursts, setBursts] = useState([])
  const last = useRef(0)

  useEffect(() => {
    const handler = (e) => {
      const now = Date.now()
      if (now - last.current < 90) return
      last.current = now

      const t = e.target
      // Skip when long-press capturing element wants exclusive feedback
      if (t?.closest?.('[data-no-burst]')) return

      const x = e.clientX ?? e.touches?.[0]?.clientX
      const y = e.clientY ?? e.touches?.[0]?.clientY
      if (x == null || y == null) return

      const id = now + Math.random()
      const emoji = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
      setBursts((b) => [...b, { id, x, y, emoji }])
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 750)
    }
    window.addEventListener('pointerdown', handler, { passive: true })
    return () => window.removeEventListener('pointerdown', handler)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[55]">
      {bursts.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{ left: b.x, top: b.y, transform: 'translate(-50%, -50%)' }}
        >
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2
            const dist = 28 + (i % 2) * 6
            const dx = Math.cos(angle) * dist
            const dy = Math.sin(angle) * dist
            return (
              <span
                key={i}
                className="absolute select-none"
                style={{
                  left: 0,
                  top: 0,
                  fontSize: i === 0 ? '1.1rem' : '0.7rem',
                  animation: 'tapSparkle 700ms cubic-bezier(0.22,1,0.36,1) forwards',
                  '--dx': `${dx}px`,
                  '--dy': `${dy}px`,
                  animationDelay: `${i * 12}ms`,
                }}
              >
                {b.emoji}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}
