'use client'

import { useState } from 'react'
import {
  ChevronRight,
  Copy,
  Check,
  Crown,
  UserPlus,
  LogOut,
  Loader2,
  Users,
  Moon,
  Vote,
  Play,
} from 'lucide-react'
import type { Room } from '@/lib/supabase'

interface LobbyScreenProps {
  room: Room
  playerId: string
  isHost: boolean
  onStart: () => void
  onLeave: () => void
}

const MAX_PLAYERS = 8

function initials(name: string) {
  return name.trim().slice(0, 2)
}

export function LobbyScreen({ room, playerId, isHost, onStart, onLeave }: LobbyScreenProps) {
  const [copied, setCopied] = useState(false)

  const players = room.players
  const joined = players.length
  const slots = Array.from({ length: MAX_PLAYERS }, (_, i) => players[i] ?? null)
  const canStart = joined >= 3

  function copyCode() {
    navigator.clipboard?.writeText(room.roomCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const settings = [
    { icon: Users, label: 'عدد المافيا', value: joined >= 7 ? '2' : '1' },
    { icon: Moon, label: 'مدة الليل', value: '30 ثانية' },
    { icon: Vote, label: 'مدة التصويت', value: '45 ثانية' },
  ]

  return (
    <div className="flex min-h-full flex-col px-5 pt-6 pb-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onLeave}
          aria-label="رجوع"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1e1e1e] text-white/70 active:bg-[#242424]"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="text-sm font-medium text-white/50">غرفة الانتظار</span>
        <div className="h-10 w-10" />
      </div>

      {/* room code */}
      <div className="mt-6 rounded-3xl border border-white/8 bg-[#1e1e1e] p-6 text-center">
        <p className="text-xs font-medium tracking-wide text-white/40">رمز الغرفة</p>
        <div className="mt-3 flex items-center justify-center gap-3" dir="ltr">
          {room.roomCode.split('').map((d, i) => (
            <span
              key={i}
              className="flex h-14 w-12 items-center justify-center rounded-xl bg-[#141414] text-3xl font-extrabold tabular-nums text-white"
            >
              {d}
            </span>
          ))}
        </div>
        <button
          onClick={copyCode}
          className="mx-auto mt-4 flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium text-white/70 active:bg-[#242424]"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-[#e53e3e]" /> تم النسخ
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> نسخ الرمز
            </>
          )}
        </button>
      </div>

      {/* players */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-bold">اللاعبون</h2>
        <span className="text-xs font-medium text-white/40">
          {joined}/{MAX_PLAYERS}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-3">
        {slots.map((p, i) =>
          p ? (
            <div key={p.id} className="flex flex-col items-center gap-2">
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-[#1e1e1e] text-lg font-bold text-white ${
                  p.id === playerId ? 'border-[#e53e3e]/60' : 'border-white/10'
                }`}
              >
                {initials(p.name)}
                {p.isHost && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#e53e3e] text-white">
                    <Crown className="h-3.5 w-3.5" fill="currentColor" />
                  </span>
                )}
              </div>
              <span
                className={`max-w-full truncate text-xs ${
                  p.id === playerId ? 'font-semibold text-[#e53e3e]' : 'text-white/70'
                }`}
              >
                {p.id === playerId ? 'أنت' : p.name}
              </span>
            </div>
          ) : (
            <div key={`empty-${i}`} className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#161616] text-white/25">
                <UserPlus className="h-5 w-5" />
              </div>
              <span className="text-xs text-white/25">فارغ</span>
            </div>
          ),
        )}
      </div>

      {/* game settings */}
      <h2 className="mt-7 text-sm font-bold">إعدادات اللعبة</h2>
      <div className="mt-3 divide-y divide-white/5 overflow-hidden rounded-3xl border border-white/8 bg-[#1e1e1e]">
        {settings.map((s) => (
          <div key={s.label} className="flex items-center gap-3 px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#141414] text-white/50">
              <s.icon className="h-4.5 w-4.5" />
            </span>
            <span className="flex-1 text-sm text-white/70">{s.label}</span>
            <span className="text-sm font-semibold text-white">{s.value}</span>
          </div>
        ))}
      </div>

      {/* action bar */}
      <div className="mt-auto pt-8">
        {isHost ? (
          <>
            <button
              onClick={onStart}
              disabled={!canStart}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#e53e3e] text-base font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e53e3e]/25 disabled:text-white/40"
            >
              <Play className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              بدء اللعبة
            </button>
            {!canStart && (
              <p className="mt-2 text-center text-xs text-white/40">
                يلزم 3 لاعبين على الأقل لبدء اللعبة
              </p>
            )}
          </>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-[#1e1e1e] px-4 py-3.5">
            <Loader2 className="h-5 w-5 animate-spin text-[#e53e3e]" />
            <p className="text-sm font-medium text-white/60">
              بانتظار رئيس الغرفة لبدء اللعبة...
            </p>
          </div>
        )}
        <button
          onClick={onLeave}
          className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-transparent text-base font-semibold text-white/80 transition-colors active:bg-[#1e1e1e]"
        >
          <LogOut className="h-5 w-5" strokeWidth={2.25} />
          مغادرة الغرفة
        </button>
      </div>
    </div>
  )
}
