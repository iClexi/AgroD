import { ProfileApp } from '@/components/profile/profile-app'
import { requireUser } from '@/lib/auth'
import { getDashboardData } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const user = await requireUser('/perfil')
  const data = getDashboardData(user.id)
  return <ProfileApp initialUser={user} devices={data.devices} />
}
