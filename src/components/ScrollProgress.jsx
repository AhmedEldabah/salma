import { useScrollProgress } from '../hooks'

export default function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #FFD700 0%, #FF69B4 50%, #E91E8C 100%)',
          transform: `scaleX(${p})`,
          transition: 'transform 0.08s linear',
          boxShadow: '0 0 12px rgba(255,105,180,0.7)',
          width: '100%',
        }}
      />
    </div>
  )
}
