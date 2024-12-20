import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { Button } from '@renderer/components/ui/button'
import { useRouter } from '@tanstack/react-router'
export default function DashboardPage() {
  const router = useRouter()
  return (
    <ContentLayout title="Dashboard">
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Dashboard Page</h1>
        <Button onClick={() => router.history.back()}>back</Button>
      </div>
    </ContentLayout>
  )
}
