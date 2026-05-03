const FLAG_COLORS = ['#FF69B4', '#FF4444', '#FFD700', '#FF8C00', '#DA70D6', '#FF1493']
const LABELS = ['H', 'A', 'P', 'P', 'Y', '🎂', 'B', 'I', 'R', 'T', 'H', 'D', 'A', 'Y']

export default function Bunting() {
  return (
    <div className="w-full flex flex-col items-center pt-4 pb-2 select-none">
      {/* rope */}
      <svg
        viewBox="0 0 900 80"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20"
        aria-hidden="true"
      >
        {/* string */}
        <path
          d="M 0 10 Q 64 60 128 10 Q 192 60 256 10 Q 320 60 384 10 Q 448 60 512 10 Q 576 60 640 10 Q 704 60 768 10 Q 832 60 900 10"
          fill="none"
          stroke="#FF69B4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* flags */}
        {LABELS.map((label, i) => {
          const x = (i / (LABELS.length - 1)) * 900
          const yOffset = i % 2 === 0 ? 10 : 35
          const color = FLAG_COLORS[i % FLAG_COLORS.length]
          return (
            <g key={i}>
              <polygon
                points={`${x - 14},${yOffset} ${x + 14},${yOffset} ${x},${yOffset + 24}`}
                fill={color}
                opacity="0.9"
              />
              <text
                x={x}
                y={yOffset + 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="white"
                fontFamily="sans-serif"
              >
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
