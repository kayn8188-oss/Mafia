'use client'

import { Plus, LogIn } from 'lucide-react'
import { TableGraphic } from './table-graphic'

interface HomeScreenProps {
  onCreate: () => void
  onJoin: () => void
}

export function HomeScreen({ onCreate, onJoin }: HomeScreenProps) {
  return (
    <div className="flex min-h-full flex-col items-center px-6 pt-14 pb-8">
      {/* badge */}
      <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#e53e3e]/30 bg-[#e53e3e]/10 px-3 py-1 text-xs font-medium text-[#e53e3e]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e53e3e]" />
        لعبة جماعية أونلاين
      </span>

      {/* title */}
      <h1 className="text-center text-5xl font-extrabold leading-tight tracking-tight">
        مافيا
      </h1>
      <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-white/50">
        اجمع أصدقاءك، وزّع الأدوار، واكتشف من المافيا قبل أن تسقط الحارة.
      </p>

      {/* graphic */}
      <div className="animate-float-slow my-12">
        <TableGraphic seats={8} />
      </div>

      {/* actions */}
      <div className="mt-auto flex w-full max-w-sm flex-col gap-3">
        <button
          onClick={onCreate}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-base font-bold text-[#121212] transition-transform active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
          إنشاء غرفة
        </button>
        <button
          onClick={onJoin}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#1e1e1e] text-base font-semibold text-white transition-colors active:bg-[#242424]"
        >
          <LogIn className="h-5 w-5" strokeWidth={2.25} />
          انضمام لغرفة
        </button>
      </div>
    </div>
  )
}
