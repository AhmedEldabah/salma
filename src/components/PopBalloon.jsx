import { useState } from 'react'
import Balloon from './Balloon'

export default function PopBalloon({ size = 60, color = '#FF69B4', style = {}, label = 'Pop balloon' }) {
  const [popped, setPopped] = useState(false)

  const handlePop = (e) => {
    e.stopPropagation()
    if (popped) return
    setPopped(true)
    if (navigator.vibrate) navigator.vibrate(25)
  }

  return (
    <button
      data-no-burst="true"
      onClick={handlePop}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'inline-block',
        position: 'relative',
        width: size,
        minHeight: size * 1.5,
      }}
    >
      {!popped && <Balloon color={color} size={size} style={style} />}
      {popped && (
        <span
          className="absolute inset-0 flex items-start justify-center select-none"
          style={{
            fontSize: size * 0.9,
            animation: 'popBurst 600ms cubic-bezier(0.34,1.56,0.64,1) forwards',
            color,
            paddingTop: 4,
          }}
        >
          💥
        </span>
      )}
    </button>
  )
}
