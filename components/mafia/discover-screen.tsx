'use client'

import { Users, Lock, ChevronLeft } from 'lucide-react'

interface Room {
  name: string
  host: string
  players: number
  max: number
  locked?: boolean
  playing?: boolean
}

const ROOMS: Room[] = [
  { name: 'حارة أبو الشوارب', host: 'حسين', players: 6, max: 8 },
  { name: 'ليل المدينة', host: 'زينب', players: 4, max: 10, locked: true },
  { name: 'عصابة الجسر', host: 'مرتضى', players: 8, max: 8, playing: true },
  { name: 'سهرة الأصدقاء', host: 'نور', players: 3, max: 6 },
  { name: 'محقق المحلة', host: 'كرار', players: 5, max: 8 },
]

interface DiscoverScreenProps {
  onJoin: () => void
}

export function DiscoverScreen({ onJoin }: DiscoverScreenProps) {
  return (
    <div className="flex min-h-full flex-col px-5 pt-8 pb-8">
      <h1 className="text-2xl font-extrabold">استكشف الغرف</h1>
      <p className="mt-1 text-sm text-white/50">انضم إلى غرفة عامة وابدأ اللعب فوراً.</p>

      <div className="mt-6 flex flex-col gap-3">
        {ROOMS.map((room, i) => {
          const full = room.players >= room.max
          const disabled = room.playing || full
          return (
            <button
              key={i}
              onClick={onJoin}
              disabled={disabled}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#1e1e1e] p-4 text-right transition-colors enabled:active:bg-[#242424] disabled:opacity-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#141414] text-base font-bold text-white">
                {room.name.slice(0, 2)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-white">{room.name}</p>
                  {room.locked && <Lock className="h-3 w-3 text-white/40" />}
                </div>
                <p className="mt-0.5 text-xs text-white/45">المضيف: {room.host}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-xs font-medium text-white/60">
                  <Users className="h-3.5 w-3.5" />
                  {room.players}/{room.max}
                </span>
                {room.playing ? (
                  <span className="text-[11px] font-medium text-[#e53e3e]">جارية الآن</span>
                ) : (
                  <ChevronLeft className="h-4 w-4 text-white/30" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
