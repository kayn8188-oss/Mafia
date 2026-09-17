'use client'

import { useEffect, useRef, useState } from 'react'
import { X, LogIn } from 'lucide-react'

interface JoinRoomModalProps {
  open: boolean
  error?: string | null
  onClearError?: () => void
  onClose: () => void
  onJoin: (code: string, name: string) => void
}

export function JoinRoomModal({ open, error, onClearError, onClose, onJoin }: JoinRoomModalProps) {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [name, setName] = useState('')
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (open) {
      setDigits(['', '', '', ''])
      setName('')
      const t = setTimeout(() => inputs.current[0]?.focus(), 120)
      return () => clearTimeout(t)
    }
  }, [open])

  if (!open) return null

  const code = digits.join('')
  const valid = code.length === 4 && name.trim().length > 0

  function setDigit(i: number, value: string) {
    onClearError?.()
    const d = value.replace(/\D/g, '').slice(-1)
    setDigits((prev) => {
      const next = [...prev]
      next[i] = d
      return next
    })
    if (d && i < 3) inputs.current[i + 1]?.focus()
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  function submit() {
    if (valid) onJoin(code, name.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="animate-sheet-up relative mx-auto w-full max-w-md rounded-t-3xl border-t border-white/8 bg-[#1e1e1e] px-6 pb-8 pt-3">
        <div className="mx-auto mb-6 h-1.5 w-10 rounded-full bg-white/15" />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold">انضمام لغرفة</h2>
            <p className="mt-1 text-sm text-white/50">أدخل رمز الغرفة واسمك للانضمام.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141414] text-white/60 active:bg-[#242424]"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* code */}
        <label className="mb-2 block text-xs font-medium tracking-wide text-white/40">
          رمز الغرفة
        </label>
        <div className="flex items-center justify-center gap-3" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputs.current[i] = el
              }}
              value={d}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              aria-label={`الرقم ${i + 1}`}
              className="h-16 w-14 rounded-2xl border border-white/10 bg-[#141414] text-center text-3xl font-extrabold tabular-nums text-white caret-[#e53e3e] outline-none transition-colors focus:border-[#e53e3e]"
            />
          ))}
        </div>

        {/* name */}
        <label className="mb-2 mt-6 block text-xs font-medium tracking-wide text-white/40">
          اسم اللاعب
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submit()
          }}
          placeholder="اكتب اسمك"
          maxLength={16}
          className="h-14 w-full rounded-2xl border border-white/10 bg-[#141414] px-4 text-base font-medium text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#e53e3e]"
        />

        {error && (
          <p className="mt-4 rounded-xl border border-[#e53e3e]/30 bg-[#e53e3e]/10 px-4 py-2.5 text-center text-sm font-medium text-[#e53e3e]">
            {error}
          </p>
        )}

        {/* submit */}
        <button
          onClick={submit}
          disabled={!valid}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#e53e3e] text-base font-bold text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#e53e3e]/25 disabled:text-white/40"
        >
          <LogIn className="h-5 w-5" strokeWidth={2.25} />
          انضمام
        </button>
      </div>
    </div>
  )
}
