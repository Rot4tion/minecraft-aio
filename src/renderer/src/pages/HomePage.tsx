import { ContentLayout } from '@renderer/components/admin-panel/content-layout'

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Dashboard Page</h1>
      </div>
    </ContentLayout>
  )
}
