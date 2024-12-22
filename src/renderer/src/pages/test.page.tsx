import { Button } from '@/components/ui/button'
import { trpcReact } from '@/helpers/ipc/trpc/trpc-react'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { routeConfig } from '@renderer/routes/routes.config'
import { useGlobalStore } from '@renderer/store/global-store'
import { users } from '@shared/db/schema/user.schema'
import { webDb } from '@shared/db/webDB'

export default function TestPage() {
  const mcServers = useGlobalStore((x) => x.mcServers)
  trpcReact.test.testSubscription.useSubscription(undefined, {
    onData(data) {
      console.log('🚀 ~ onNext: ~ data:', data)
    }
  })
  trpcReact.test.testSubscription.useSubscription(undefined, {
    onData(data) {
      console.log('🚀 ~ onNext: ~ data:', data)
    }
  })
  return (
    <ContentLayout title={routeConfig.test.label}>
      <div className="flex flex-col gap-2 justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Test Page</h1>
        <Button
          onClick={async () => {
            const res = await webDb
              .insert(users)
              .values({ name: 'test', bio: 'test' })
              .returning({ id: users.id, name: users.name, bio: users.bio })
            console.log('🚀 ~ onClick={ ~ res:', res)
          }}
        >
          Test
        </Button>
        <div>{JSON.stringify(mcServers, null, 2)}</div>
      </div>
    </ContentLayout>
  )
}
