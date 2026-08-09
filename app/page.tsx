import type { Metadata } from 'next'
import { Availability } from '@/components/agro/availability'
import { Benefits } from '@/components/agro/benefits'
import { DemoExperience } from '@/components/agro/demo-experience'
import { Evidence } from '@/components/agro/evidence'
import { Hero } from '@/components/agro/hero'
import { Pricing } from '@/components/agro/pricing'
import { SiteFooter } from '@/components/agro/site-footer'
import { SiteHeader } from '@/components/agro/site-header'
import { Team } from '@/components/agro/team'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Evidence />
        <DemoExperience />
        <Benefits />
        <Pricing />
        <Team />
        <Availability />
      </main>
      <SiteFooter />
    </>
  )
}
