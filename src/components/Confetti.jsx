import { useMemo } from 'react'

const COLORS = ['#FF69B4', '#FF4444', '#FFD700', '#FF8C00', '#FF1493', '#FFA500', '#FF6347', '#DA70D6']
const SHAPES = ['square', 'circle', 'rect']

export default function Confetti({ count = 40 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 5,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      rotation: Math.random() * 360,
    }))
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: `-${p.size * 2}px`,
            width: p.shape === 'rect' ? `${p.size * 2}px` : `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : '1px',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  )
}
