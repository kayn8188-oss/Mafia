import { Swords, Search, Cross, Shield, type LucideIcon } from 'lucide-react'

export type RoleId = 'mafia' | 'inspector' | 'medic' | 'civilian'

export interface Role {
  id: RoleId
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  danger: boolean
}

export const ROLES: Role[] = [
  {
    id: 'mafia',
    name: 'مافيا',
    tagline: 'اقضِ على المواطنين ليلاً',
    description: 'تتحرك في الظلام. اختر ضحيتك كل ليلة دون أن ينكشف أمرك.',
    icon: Swords,
    danger: true,
  },
  {
    id: 'inspector',
    name: 'محقّق',
    tagline: 'اكشف هوية المشتبه بهم',
    description: 'كل ليلة تفحص لاعباً واحداً لتعرف إن كان من المافيا.',
    icon: Search,
    danger: false,
  },
  {
    id: 'medic',
    name: 'طبيب',
    tagline: 'أنقذ حياة لاعب كل ليلة',
    description: 'اختر لاعباً لحمايته من هجوم المافيا خلال الليل.',
    icon: Cross,
    danger: false,
  },
  {
    id: 'civilian',
    name: 'مواطن',
    tagline: 'صوّت لطرد المافيا',
    description: 'سلاحك هو الحوار والتصويت. اكشف المافيا قبل فوات الأوان.',
    icon: Shield,
    danger: false,
  },
]
