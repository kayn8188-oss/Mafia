'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { ROLES, type RoleId } from './roles'

interface RoleRevealProps {
  onBack: () => void
  /** When provided, the card locks to this assigned secret role (game mode). */
  roleId?: RoleId
}

export function RoleReveal({ onBack, roleId }: RoleRevealProps) {
  const assigned = !!roleId
  const [active, setActive] = useState<RoleId>(roleId ?? 'mafia')
  const [flipped, setFlipped] = useState(false)

  const role = ROLES.find((r) => r.id === active)!
  const Icon = role.icon

  function selectRole(id: RoleId) {
    if (assigned || id === active) return
    setFlipped(false)
    setActive(id)
  }

  return (
    <div className="flex min-h-full flex-col px-5 pt-6 pb-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          aria-label="رجوع"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e] text-white/70 active:bg-[#242424]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-white/50">دورك في اللعبة</span>
        <div className="h-10 w-10" />
      </div>

      <p className="mt-8 text-center text-sm text-white/50">
        {flipped
          ? 'هذا دورك — لا تُظهره لأحد'
          : assigned
            ? 'تم توزيع الأدوار — اضغط لكشف دورك السري'
            : 'اضغط على البطاقة لكشف دورك'}
      </p>

      {/* flip card */}
      <div className="perspective-1200 mx-auto mt-6 w-full max-w-xs">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="preserve-3d relative block aspect-[3/4] w-full transition-transform duration-500 ease-out"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          aria-label="اقلب البطاقة"
        >
          {/* back (hidden face) */}
          <div className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border border-white/8 bg-[#1e1e1e]">
            <div className="animate-red-glow absolute h-28 w-28 rounded-full bg-[#e53e3e]/20 blur-2xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-[#e53e3e]/30 bg-[#141414]">
              <span className="text-3xl font-extrabold text-[#e53e3e]">؟</span>
            </div>
            <p className="mt-6 text-lg font-bold">عصابة الحارة</p>
            <p className="mt-1 text-xs text-white/40">بطاقة الدور</p>
          </div>

          {/* front (revealed face) */}
          <div
            className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border bg-[#1e1e1e] p-6"
            style={{ borderColor: role.danger ? 'rgba(229,62,62,0.4)' : 'rgba(255,255,255,0.1)' }}
          >
            {role.danger && (
              <div className="animate-red-glow absolute h-32 w-32 rounded-full bg-[#e53e3e]/25 blur-2xl" />
            )}
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-3xl border"
              style={{
                borderColor: role.danger ? 'rgba(229,62,62,0.35)' : 'rgba(255,255,255,0.12)',
                background: role.danger ? 'rgba(229,62,62,0.08)' : '#141414',
              }}
            >
              <Icon
                className="h-11 w-11"
                strokeWidth={1.75}
                style={{ color: role.danger ? '#e53e3e' : '#ffffff' }}
              />
            </div>
            <h2 className="mt-6 text-2xl font-extrabold">{role.name}</h2>
            <p className="mt-1 text-sm font-medium text-[#e53e3e]">{role.tagline}</p>
            <p className="mt-4 max-w-[220px] text-center text-xs leading-relaxed text-white/50">
              {role.description}
            </p>
          </div>
        </button>
      </div>

      {/* role selector — preview mode only */}
      {!assigned && (
      <div className="mt-auto pt-8">
        <p className="mb-3 text-center text-xs font-medium text-white/40">استعرض الأدوار</p>
        <div className="grid grid-cols-4 gap-2.5">
          {ROLES.map((r) => {
            const RIcon = r.icon
            const selected = r.id === active
            return (
              <button
                key={r.id}
                onClick={() => selectRole(r.id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-colors ${
                  selected
                    ? 'border-[#e53e3e]/50 bg-[#e53e3e]/10'
                    : 'border-white/8 bg-[#1e1e1e] active:bg-[#242424]'
                }`}
              >
                <RIcon
                  className="h-5 w-5"
                  strokeWidth={2}
                  style={{ color: selected ? '#e53e3e' : 'rgba(255,255,255,0.65)' }}
                />
                <span
                  className={`text-[11px] font-medium ${selected ? 'text-white' : 'text-white/55'}`}
                >
                  {r.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      )}
    </div>
  )
}
