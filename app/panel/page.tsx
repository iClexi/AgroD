import { PanelApp } from '@/components/panel/panel-app'
import { requireUser } from '@/lib/auth'
import { getDashboardData } from '@/lib/data'

export const dynamic = 'force-dynamic'

export default async function PanelPage() {
  const user = await requireUser()
  const data = getDashboardData(user.id)
  return <PanelApp user={user} initialData={data} />
}
