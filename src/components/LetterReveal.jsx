import { useInView } from '../hooks'

export default function LetterReveal({
  text,
  as: Tag = 'span',
  delay = 0,
  stagger = 38,
  className,
  style,
  from = 'down',
}) {
  const [ref, inView] = useInView({ threshold: 0.25 })
  const chars = String(text).split('')

  const offsets = {
    down: 'translateY(0.65em) rotate(-6deg)',
    up: 'translateY(-0.5em) rotate(6deg)',
    left: 'translateX(-0.5em)',
    right: 'translateX(0.5em)',
  }

  return (
    <Tag ref={ref} className={className} style={style} aria-label={String(text)}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translate(0,0) rotate(0)' : offsets[from],
            transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, transform 700ms cubic-bezier(0.34,1.56,0.64,1) ${delay + i * stagger}ms`,
            whiteSpace: ch === ' ' ? 'pre' : 'normal',
          }}
        >
          {ch}
        </span>
      ))}
    </Tag>
  )
}
