export default function Balloon({ color = '#FF69B4', size = 60, style = {}, className = '' }) {
  const w = size
  const h = size * 1.25
  const knotY = h * 0.88

  return (
    <div className={`animate-balloon ${className}`} style={style}>
      <svg width={w} height={h + 30} viewBox={`0 0 ${w} ${h + 30}`} aria-hidden="true">
        {/* balloon body */}
        <ellipse
          cx={w / 2}
          cy={h / 2.1}
          rx={w / 2 - 2}
          ry={h / 2}
          fill={color}
          opacity="0.92"
        />
        {/* shine */}
        <ellipse
          cx={w / 2 - w * 0.15}
          cy={h / 2.1 - h * 0.18}
          rx={w * 0.12}
          ry={h * 0.1}
          fill="white"
          opacity="0.45"
        />
        {/* knot */}
        <polygon
          points={`${w / 2 - 4},${knotY} ${w / 2 + 4},${knotY} ${w / 2},${knotY + 7}`}
          fill={color}
        />
        {/* string */}
        <path
          d={`M ${w / 2} ${knotY + 7} Q ${w / 2 + 10} ${knotY + 18} ${w / 2} ${knotY + 30}`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
