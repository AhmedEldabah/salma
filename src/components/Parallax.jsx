import { useScrollY } from '../hooks'

export default function Parallax({ speed = 0.3, children, className, style }) {
  const y = useScrollY()
  const offset = -y * speed
  return (
    <div
      className={className}
      style={{ ...style, transform: `translate3d(0, ${offset}px, 0)`, willChange: 'transform' }}
    >
      {children}
    </div>
  )
}
