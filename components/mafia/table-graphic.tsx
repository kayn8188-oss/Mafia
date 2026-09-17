'use client'

interface TableGraphicProps {
  seats?: number
}

export function TableGraphic({ seats = 8 }: TableGraphicProps) {
  const size = 260
  const center = size / 2
  const orbit = 104
  const players = Array.from({ length: seats })

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* soft red halo */}
      <div className="animate-red-glow absolute inset-6 rounded-full bg-[#e53e3e]/15 blur-2xl" />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative"
        aria-hidden="true"
      >
        {/* outer ring */}
        <circle
          cx={center}
          cy={center}
          r={orbit + 20}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={1.5}
        />
        {/* table */}
        <circle cx={center} cy={center} r={54} fill="#1e1e1e" stroke="#2f2f2f" strokeWidth={1.5} />
        <circle cx={center} cy={center} r={36} fill="none" stroke="#e53e3e" strokeWidth={1.5} strokeOpacity={0.5} />

        {/* seats */}
        {players.map((_, i) => {
          const angle = (i / seats) * Math.PI * 2 - Math.PI / 2
          const x = center + orbit * Math.cos(angle)
          const y = center + orbit * Math.sin(angle)
          const isMafia = i === 2
          return (
            <g key={i}>
              <line
                x1={center + 58 * Math.cos(angle)}
                y1={center + 58 * Math.sin(angle)}
                x2={center + (orbit - 20) * Math.cos(angle)}
                y2={center + (orbit - 20) * Math.sin(angle)}
                stroke="#242424"
                strokeWidth={1.5}
              />
              <circle
                cx={x}
                cy={y}
                r={18}
                fill="#1e1e1e"
                stroke={isMafia ? '#e53e3e' : '#333'}
                strokeWidth={isMafia ? 2 : 1.5}
              />
              {/* simple person vector */}
              <circle cx={x} cy={y - 4} r={5} fill={isMafia ? '#e53e3e' : '#6b6b6b'} />
              <path
                d={`M ${x - 8} ${y + 11} a 8 7 0 0 1 16 0`}
                fill={isMafia ? '#e53e3e' : '#6b6b6b'}
              />
            </g>
          )
        })}
      </svg>

      {/* center mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium tracking-widest text-[#e53e3e]">MAFIA</span>
      </div>
    </div>
  )
}
