'use client'

import { Swords, Compass, Settings, type LucideIcon } from 'lucide-react'

export type TabId = 'match' | 'discover' | 'rules'

interface NavItem {
  id: TabId
  label: string
  icon: LucideIcon
}

const ITEMS: NavItem[] = [
  { id: 'match', label: 'اللعب', icon: Swords },
  { id: 'discover', label: 'استكشف', icon: Compass },
  { id: 'rules', label: 'القوانين', icon: Settings },
]

interface BottomNavProps {
  active: TabId
  onChange: (id: TabId) => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="border-t border-white/8 bg-[#121212]/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-6 py-2.5">
        {ITEMS.map((item) => {
          const Icon = item.icon
          const selected = item.id === active
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex flex-1 flex-col items-center gap-1 py-1.5"
              aria-current={selected ? 'page' : undefined}
            >
              <Icon
                className="h-5 w-5 transition-colors"
                strokeWidth={selected ? 2.5 : 2}
                style={{ color: selected ? '#e53e3e' : 'rgba(255,255,255,0.45)' }}
              />
              <span
                className={`text-[11px] transition-colors ${
                  selected ? 'font-bold text-white' : 'font-medium text-white/45'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
