import { useEffect, useRef, useState } from 'react'

export default function ScratchReveal({
  width = 300,
  height = 110,
  hint = 'Scratch to reveal 💛',
  brushSize = 26,
  threshold = 0.45,
  children,
}) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [hasScratched, setHasScratched] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const grad = ctx.createLinearGradient(0, 0, width, height)
    grad.addColorStop(0, '#FFB347')
    grad.addColorStop(0.5, '#FF69B4')
    grad.addColorStop(1, '#E91E8C')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, width, height)

    // hint text + sparkles
    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    ctx.font = "bold 15px 'Nunito', sans-serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(hint, width / 2, height / 2)
    ctx.font = '18px sans-serif'
    ctx.fillText('✨', 24, 24)
    ctx.fillText('✨', width - 24, 24)
    ctx.fillText('✨', 24, height - 22)
    ctx.fillText('✨', width - 24, height - 22)

    let drawing = false
    let lastX = 0
    let lastY = 0

    const sample = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let cleared = 0
      let total = 0
      for (let i = 3; i < data.length; i += 80) {
        total++
        if (data[i] === 0) cleared++
      }
      if (cleared / total > threshold) setRevealed(true)
    }

    const getPos = (e) => {
      const r = canvas.getBoundingClientRect()
      const x = (e.touches?.[0]?.clientX ?? e.clientX) - r.left
      const y = (e.touches?.[0]?.clientY ?? e.clientY) - r.top
      return { x, y }
    }

    const drawAt = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2)
      ctx.fill()
      lastX = x
      lastY = y
    }

    let raf = 0
    const start = (e) => {
      drawing = true
      const { x, y } = getPos(e)
      lastX = x
      lastY = y
      drawAt(x, y)
      setHasScratched(true)
      if (navigator.vibrate) navigator.vibrate(10)
    }
    const move = (e) => {
      if (!drawing) return
      e.preventDefault?.()
      const { x, y } = getPos(e)
      drawAt(x, y)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(sample)
    }
    const end = () => {
      drawing = false
      sample()
    }

    canvas.addEventListener('touchstart', start, { passive: true })
    canvas.addEventListener('touchmove', move, { passive: false })
    canvas.addEventListener('touchend', end)
    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', end)
    canvas.addEventListener('mouseleave', end)

    return () => {
      cancelAnimationFrame(raf)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove', move)
      canvas.removeEventListener('touchend', end)
      canvas.removeEventListener('mousedown', start)
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', end)
      canvas.removeEventListener('mouseleave', end)
    }
  }, [width, height, hint, brushSize, threshold])

  return (
    <div
      ref={wrapRef}
      data-no-burst="true"
      className="relative inline-block rounded-2xl overflow-hidden"
      style={{ width, height, boxShadow: '0 8px 28px rgba(0,0,0,0.2)' }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #fff 0%, #FFE4F1 100%)',
        }}
      >
        {children}
      </div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          touchAction: 'none',
          opacity: revealed ? 0 : 1,
          transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1)',
          pointerEvents: revealed ? 'none' : 'auto',
          cursor: 'pointer',
        }}
      />
      {!hasScratched && (
        <span
          className="absolute right-3 bottom-3 text-2xl select-none pointer-events-none animate-wiggle"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          👆
        </span>
      )}
    </div>
  )
}
