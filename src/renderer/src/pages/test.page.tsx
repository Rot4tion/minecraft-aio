import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { routeConfig } from '@renderer/routes/routes.config'

export default function TestPage() {
  return (
    <ContentLayout title={routeConfig.test.label}>
      <div className="flex flex-col gap-2 justify-center items-center h-screen"></div>
    </ContentLayout>
  )
}
