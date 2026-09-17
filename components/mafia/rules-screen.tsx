'use client'

import { ROLES } from './roles'

export function RulesScreen() {
  return (
    <div className="flex min-h-full flex-col px-5 pt-8 pb-8">
      <h1 className="text-2xl font-extrabold">القوانين والأدوار</h1>
      <p className="mt-1 text-sm text-white/50">
        تعرّف على الأدوار وكيفية اللعب قبل أن تبدأ الجولة.
      </p>

      <h2 className="mt-8 text-sm font-bold text-white/70">الأدوار</h2>
      <div className="mt-3 flex flex-col gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon
          return (
            <div
              key={role.id}
              className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#1e1e1e] p-4"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                style={{
                  borderColor: role.danger ? 'rgba(229,62,62,0.35)' : 'rgba(255,255,255,0.1)',
                  background: role.danger ? 'rgba(229,62,62,0.08)' : '#141414',
                }}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={2}
                  style={{ color: role.danger ? '#e53e3e' : '#ffffff' }}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{role.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{role.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="mt-8 text-sm font-bold text-white/70">كيف تُلعب</h2>
      <ol className="mt-3 flex flex-col gap-2.5">
        {[
          'ينقسم اللاعبون سراً إلى مافيا ومواطنين وأدوار خاصة.',
          'في الليل تستيقظ المافيا لاختيار ضحية، ويتحرك المحقق والطبيب.',
          'في النهار يتناقش الجميع ويصوّتون لطرد المشتبه به.',
          'يفوز المواطنون بكشف كل المافيا، وتفوز المافيا بالسيطرة على الحارة.',
        ].map((step, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#1e1e1e] p-3.5"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e53e3e] text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-xs leading-relaxed text-white/60">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
