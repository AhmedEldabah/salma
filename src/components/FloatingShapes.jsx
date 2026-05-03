const shapes = [
  // smileys
  { id: 1, type: 'emoji', content: '😊', top: '18%', left: '5%', size: '2rem', delay: '0s', duration: '4s' },
  { id: 2, type: 'emoji', content: '😊', top: '65%', right: '6%', size: '1.6rem', delay: '1.2s', duration: '5s' },
  // stars
  { id: 3, type: 'emoji', content: '⭐', top: '12%', right: '8%', size: '1.8rem', delay: '0.5s', duration: '3.5s' },
  { id: 4, type: 'emoji', content: '✨', top: '75%', left: '8%', size: '1.5rem', delay: '0.8s', duration: '4.5s' },
  { id: 5, type: 'emoji', content: '⭐', top: '40%', left: '2%', size: '1.4rem', delay: '1.5s', duration: '4s' },
  { id: 6, type: 'emoji', content: '✨', top: '30%', right: '3%', size: '1.6rem', delay: '0.3s', duration: '5s' },
  // red squares
  { id: 7, type: 'square', top: '22%', left: '12%', size: '14px', delay: '0.2s', duration: '3.8s', color: '#FF4444' },
  { id: 8, type: 'square', top: '55%', right: '12%', size: '10px', delay: '1s', duration: '4.2s', color: '#FF4444' },
  { id: 9, type: 'square', top: '80%', left: '20%', size: '12px', delay: '0.6s', duration: '3.5s', color: '#FF69B4' },
  { id: 10, type: 'square', top: '10%', right: '20%', size: '8px', delay: '1.8s', duration: '5s', color: '#FFD700' },
  // hearts
  { id: 11, type: 'emoji', content: '💕', top: '50%', left: '4%', size: '1.6rem', delay: '2s', duration: '4s' },
  { id: 12, type: 'emoji', content: '🎀', top: '88%', right: '10%', size: '1.5rem', delay: '0.4s', duration: '4.8s' },
  { id: 13, type: 'emoji', content: '🎈', top: '85%', left: '40%', size: '1.8rem', delay: '1.3s', duration: '3.8s' },
]

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
      {shapes.map((s) => {
        const posStyle = {
          position: 'absolute',
          top: s.top,
          left: s.left,
          right: s.right,
          animationDelay: s.delay,
          animationDuration: s.duration,
        }

        if (s.type === 'emoji') {
          return (
            <span
              key={s.id}
              className="animate-float select-none"
              style={{ ...posStyle, fontSize: s.size }}
            >
              {s.content}
            </span>
          )
        }

        return (
          <div
            key={s.id}
            className="animate-float"
            style={{
              ...posStyle,
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              borderRadius: '2px',
            }}
          />
        )
      })}
    </div>
  )
}
