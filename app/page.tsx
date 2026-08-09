import type { Metadata } from 'next'
import { IndexExperience } from '@/components/landing/index-experience'

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return <IndexExperience />
}
