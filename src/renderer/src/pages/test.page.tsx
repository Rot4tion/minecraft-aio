import { trpcClient } from '@/helpers/ipc/trpc/trpc-client'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { Button } from '@renderer/components/ui/button'
import { routeConfig } from '@renderer/routes/routes.config'

export default function TestPage() {
  return (
    <ContentLayout title={routeConfig.test.label}>
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <Button
          onClick={() => {
            trpcClient.mcBotManager.createStressTestBot.mutate({ amount: 100 })
          }}
        >
          Create Bot
        </Button>
      </div>
    </ContentLayout>
  )
}
