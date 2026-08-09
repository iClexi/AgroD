import { Availability } from '@/components/agro/availability'
import { Benefits } from '@/components/agro/benefits'
import { DemoExperience } from '@/components/agro/demo-experience'
import { Evidence } from '@/components/agro/evidence'
import { Hero } from '@/components/agro/hero'
import { Journey } from '@/components/agro/journey'
import { Pricing } from '@/components/agro/pricing'
import { ProblemSolution } from '@/components/agro/problem-solution'
import { Showcase } from '@/components/agro/showcase'
import { SiteFooter } from '@/components/agro/site-footer'
import { SiteHeader } from '@/components/agro/site-header'
import { Team } from '@/components/agro/team'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Evidence />
        <ProblemSolution />
        <Benefits />
        <Journey />
        <Showcase />
        <Pricing />
        <Team />
        <Availability />
        <DemoExperience />
      </main>
      <SiteFooter />
    </>
  )
}
