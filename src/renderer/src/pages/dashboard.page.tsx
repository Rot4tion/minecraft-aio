import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import ToggleTheme from '@renderer/components/toggle-theme'
import { Button } from '@renderer/components/ui/button'
import { routeConfig } from '@renderer/routes/routes.config'
import { useRouter } from '@tanstack/react-router'

export default function DashboardPage() {
  const router = useRouter()

  return (
    <ContentLayout title={routeConfig.dashboard.label}>
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Dashboard Page</h1>
        <ToggleTheme></ToggleTheme>
      </div>
    </ContentLayout>
  )
}
