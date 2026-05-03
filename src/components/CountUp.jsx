import { useEffect, useState } from 'react'
import { useInView } from '../hooks'

export default function CountUp({ to = 3, duration = 1300, className, style, suffix = '', prefix = '' }) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    let start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 4)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}
