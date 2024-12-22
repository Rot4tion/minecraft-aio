import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { Button } from '@renderer/components/ui/button'
import { routeConfig } from '@renderer/routes/routes.config'
import { GlobalState, useGlobalStore } from '@renderer/store/global-store'
import { ChartNoAxesColumnIncreasing, RotateCcw } from 'lucide-react'

function ServerCard({ server }: { server: GlobalState['mcServers'][number] }) {
  console.log('🚀 ~ ServerCard ~ server:', server)
  const refreshServer = useGlobalStore((x) => x.refreshServer)
  return (
    <Card className="">
      <CardHeader className="items-end p-0">
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={async () => {
            await refreshServer(server.id)
          }}
        >
          <RotateCcw></RotateCcw>
        </Button>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex justify-between text-lg font-bold">
          <div>{`${server.host}${server.port !== 25565 ? ':' + server.port : ''}`}</div>
          <div className="flex space-x-2">
            <div>
              {server.online}/{server.maxPlayers}
            </div>
            <div className="flex">
              <ChartNoAxesColumnIncreasing
                className={`${server.latency == null || server?.latency == -1 ? 'text-red-500' : 'text-green-500'}`}
                size={20}
              />
              {server?.latency != -1 && <span className="text-sm">{server.latency}ms</span>}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <p>{server.description}</p>
          <p>{server.version}</p>
        </div>
      </CardContent>
    </Card>
  )
}
function ServersTable() {
  const mcServers = useGlobalStore((x) => x.mcServers)
  return (
    <Card>
      <CardHeader>
        <CardTitle>MC Servers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col grid-cols-1 auto-rows-auto gap-4 gap-2grid md:grid-cols-2">
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
