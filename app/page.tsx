import { SiteHeader } from '@/components/agro/site-header'
import { Hero } from '@/components/agro/hero'
import { Journey } from '@/components/agro/journey'
import { Showcase } from '@/components/agro/showcase'
import { Evidence } from '@/components/agro/evidence'
import { Benefits } from '@/components/agro/benefits'
import { Pricing } from '@/components/agro/pricing'
import { Team } from '@/components/agro/team'
import { Availability } from '@/components/agro/availability'
import { DemoForm } from '@/components/agro/demo-form'
import { SiteFooter } from '@/components/agro/site-footer'

export default function HomePage() {
  return <><SiteHeader /><main><Hero /><Journey /><Showcase /><Evidence /><Benefits /><Pricing /><Team /><Availability /><DemoForm /></main><SiteFooter /></>
}
