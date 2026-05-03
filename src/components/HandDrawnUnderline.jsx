import { useInView } from '../hooks'

export default function HandDrawnUnderline({
  color = '#FFD700',
  stroke = 5,
  height = 14,
  delay = 200,
  className,
}) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  return (
    <svg
      ref={ref}
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className={`block w-full ${className ?? ''}`}
      style={{ height }}
      aria-hidden="true"
    >
      <path
        d="M 4 9 Q 50 1 100 8 T 196 5"
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        style={{
          strokeDasharray: 250,
          strokeDashoffset: inView ? 0 : 250,
          transition: `stroke-dashoffset 1100ms cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
          filter: `drop-shadow(0 2px 6px ${color}66)`,
        }}
      />
    </svg>
  )
}
