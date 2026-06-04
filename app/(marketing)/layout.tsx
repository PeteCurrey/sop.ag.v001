import type { Metadata } from 'next'
import { MarketingNav } from '@/components/layout/MarketingNav'
import { MarketingFooter } from '@/components/layout/MarketingFooter'

export const metadata: Metadata = {
  title: 'Procedra — SOP Generation & Management Platform',
  description: 'Procedra turns your knowledge into AI-generated SOPs — structured, versioned, and distributed across your team in minutes. Start your free 14-day trial.',
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingNav />
      {children}
      <MarketingFooter />
    </>
  )
}
