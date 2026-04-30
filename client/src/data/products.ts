import type { Product } from '../types'

export const products: Product[] = [
  {
    id: 1,
    icon: 'fas fa-gear',
    badge: 'Operations',
    title: 'ServiceOps',
    description:
      'An intelligent field service management platform that automates scheduling, tracking, and client communication for service-based businesses.',
    tags: ['SaaS', 'B2B'],
  },
  {
    id: 2,
    icon: 'fas fa-car',
    badge: 'Mobility',
    title: 'GoGaadi',
    description:
      'A next-generation vehicle and mobility solutions platform connecting drivers, fleet owners, and commuters in one seamless ecosystem.',
    tags: ['Mobility', 'B2C'],
  },
  {
    id: 3,
    icon: 'fas fa-seedling',
    badge: 'AgriTech',
    title: 'FarmiX',
    description:
      'Precision agriculture technology that empowers farmers with AI-driven crop insights, weather analytics, and market pricing in real time.',
    tags: ['AgriTech', 'AI'],
  },
  {
    id: 4,
    icon: 'fas fa-wallet',
    badge: 'FinTech',
    title: 'PocketPay',
    description:
      'A seamless digital payment ecosystem enabling instant transfers, smart budgeting, and merchant integrations — money made effortless.',
    tags: ['FinTech', 'Payments'],
  },
  {
    id: 5,
    icon: 'fas fa-clapperboard',
    badge: 'Creator Economy',
    title: 'ClapX',
    description:
      'A creator economy and entertainment platform where talent meets audience — featuring short videos, live streaming, and monetization tools.',
    tags: ['Media', 'Social'],
  },
  {
    id: 6,
    icon: 'fas fa-solar-panel',
    badge: 'Energy Tech',
    title: 'Illuminate',
    description:
      'A SCADA-based monitoring platform for non-renewable energy sources — tracking real-time performance, generating daily reports, and resolving incidents with end-to-end operational visibility.',
    tags: ['SCADA', 'Energy', 'Monitoring'],
  },
]
