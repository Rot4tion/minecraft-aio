import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { AddServerDialog } from '@renderer/components/mc-servers/add-server-dialog'
import { RefreshAllServersButton } from '@renderer/components/mc-servers/refresh-all-servers-button'
import { ServerCard } from '@renderer/components/mc-servers/server-card'
import { routeConfig } from '@renderer/routes/routes.config'
import { useGlobalStore } from '@renderer/store/global-store'

function ServersTable() {
  const mcServers = useGlobalStore((x) => x.mcServers)
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>MC Servers</CardTitle>
          <div className="flex">
            <div>
              <AddServerDialog />
            </div>
            <div>
              <RefreshAllServersButton />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="max-h-[384px] overflow-y-auto">
        <div className="grid grid-cols-1 auto-rows-auto gap-2 md:grid-cols-2">
          {mcServers.map((server) => (
            <ServerCard key={server.id} server={server}></ServerCard>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function McServersPage() {
  return (
    <ContentLayout title={routeConfig.mcServers.label}>
      <div>
        <ServersTable />
      </div>
    </ContentLayout>
  )
}
