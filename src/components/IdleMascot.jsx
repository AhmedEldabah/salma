import { useState } from 'react'
import { useIdle } from '../hooks'

const MESSAGES = [
  'tap me!',
  'still here? 🌸',
  'keep scrolling ✨',
  "you're loved 💖",
]

export default function IdleMascot({ ms = 9000 }) {
  const idle = useIdle(ms)
  const [hidden, setHidden] = useState(false)
  const [i, setI] = useState(0)

  if (!idle || hidden) return null
  const msg = MESSAGES[i % MESSAGES.length]

  return (
    <button
      data-no-burst="true"
      onClick={() => {
        setI((n) => n + 1)
        if (i >= MESSAGES.length - 1) setHidden(true)
        if (navigator.vibrate) navigator.vibrate(15)
      }}
      className="fixed bottom-5 right-4 z-[45] glass rounded-full pl-2 pr-4 py-2 flex items-center gap-2"
      style={{
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        animation: 'idlePop 480ms cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      <span className="text-2xl animate-wiggle inline-block">🐰</span>
      <span className="font-extrabold text-white text-sm">{msg}</span>
    </button>
  )
}
