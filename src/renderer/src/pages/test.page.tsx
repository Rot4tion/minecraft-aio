import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { routeConfig } from '@renderer/routes/routes.config'
import { Button } from '@renderer/components/ui/button'
import { trpcClient } from '@/helpers/ipc/trpc/trpc-client'

export default function TestPage() {
  return (
    <ContentLayout title={routeConfig.test.label}>
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <Button
          onClick={() => {
            trpcClient.test.test.mutate()
          }}
        >
          Test
        </Button>
      </div>
    </ContentLayout>
  )
}
