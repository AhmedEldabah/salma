import { useEffect, useRef, useState, useCallback } from 'react'

export function useInView({ threshold = 0.2, once = true, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) obs.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inView]
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return progress
}

export function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return y
}

export function useIdle(ms = 9000) {
  const [idle, setIdle] = useState(false)
  useEffect(() => {
    let timer
    const reset = () => {
      setIdle(false)
      clearTimeout(timer)
      timer = setTimeout(() => setIdle(true), ms)
    }
    const events = ['touchstart', 'touchmove', 'scroll', 'keydown', 'pointerdown']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()
    return () => {
      events.forEach((e) => window.removeEventListener(e, reset))
      clearTimeout(timer)
    }
  }, [ms])
  return idle
}

export function useShake(onShake, threshold = 16) {
  const onShakeRef = useRef(onShake)
  useEffect(() => {
    onShakeRef.current = onShake
  })

  useEffect(() => {
    let last = { x: 0, y: 0, z: 0, t: 0 }
    let lastFire = 0
    const handler = (e) => {
      const a = e.accelerationIncludingGravity
      if (!a) return
      const now = Date.now()
      const dt = now - last.t
      if (dt < 80) return
      const dx = (a.x ?? 0) - last.x
      const dy = (a.y ?? 0) - last.y
      const dz = (a.z ?? 0) - last.z
      const speed = (Math.sqrt(dx * dx + dy * dy + dz * dz) / Math.max(dt, 1)) * 1000
      if (speed > threshold && now - lastFire > 800) {
        lastFire = now
        onShakeRef.current?.()
      }
      last = { x: a.x ?? 0, y: a.y ?? 0, z: a.z ?? 0, t: now }
    }
    window.addEventListener('devicemotion', handler)
    return () => window.removeEventListener('devicemotion', handler)
  }, [threshold])
}

export function useLongPress(onLongPress, ms = 600) {
  const ref = useRef(null)
  const cb = useRef(onLongPress)
  useEffect(() => {
    cb.current = onLongPress
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let timer = null
    let fired = false

    const start = (e) => {
      fired = false
      timer = setTimeout(() => {
        fired = true
        if (navigator.vibrate) navigator.vibrate(30)
        cb.current?.(e)
      }, ms)
    }
    const cancel = () => {
      if (timer) clearTimeout(timer)
      timer = null
    }
    const click = (e) => {
      if (fired) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    el.addEventListener('touchstart', start, { passive: true })
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchmove', cancel, { passive: true })
    el.addEventListener('touchcancel', cancel)
    el.addEventListener('mousedown', start)
    el.addEventListener('mouseup', cancel)
    el.addEventListener('mouseleave', cancel)
    el.addEventListener('click', click, true)

    return () => {
      cancel()
      el.removeEventListener('touchstart', start)
      el.removeEventListener('touchend', cancel)
      el.removeEventListener('touchmove', cancel)
      el.removeEventListener('touchcancel', cancel)
      el.removeEventListener('mousedown', start)
      el.removeEventListener('mouseup', cancel)
      el.removeEventListener('mouseleave', cancel)
      el.removeEventListener('click', click, true)
    }
  }, [ms])

  return ref
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])
  return reduced
}

export function useTapBurst() {
  const [bursts, setBursts] = useState([])

  const burst = useCallback((x, y) => {
    const id = Math.random().toString(36).slice(2)
    setBursts((b) => [...b, { id, x, y }])
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 800)
  }, [])

  return [bursts, burst]
}
