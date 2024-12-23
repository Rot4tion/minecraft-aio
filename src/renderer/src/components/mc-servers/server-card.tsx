import { McText } from '@/components/mc-text-react/McText'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { ContextMenuLabel } from '@radix-ui/react-context-menu'
import { GlobalState, useGlobalStore } from '@renderer/store/global-store'
import { ChartNoAxesColumnIncreasing, RotateCcw, Trash } from 'lucide-react'
import { LastUpdate } from './last-update'

export function ServerCard({ server }: { server: GlobalState['mcServers'][number] }) {
  const refreshServer = useGlobalStore((x) => x.refreshServer)
  const deleteServer = useGlobalStore((x) => x.deleteServer)

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="text-xs">
          <CardHeader className="items-end p-0"></CardHeader>
          <CardContent className="flex overflow-hidden p-2 space-x-2">
            <img
              className="flex-shrink-0 w-12 h-12"
              src={server.favicon || '/src/assets/default_server_favicon.png'}
              alt="default favicon"
            />
            <div className="w-full min-w-0">
              <div className="flex justify-between text-lg font-bold">
                <div className="truncate">{`${server.host}${server.port !== 25565 ? ':' + server.port : ''}`}</div>
                <div className="flex flex-shrink-0 space-x-2">
                  <div className="whitespace-nowrap">
                    {server.online}/{server.maxPlayers}
                  </div>
                  <div className="flex items-center">
                    <ChartNoAxesColumnIncreasing
                      className={`${server.latency == null || server?.latency == -1 ? 'text-red-500' : 'text-green-500'}`}
                      size={20}
                    />
                    {server?.latency != -1 && (
                      <span className="ml-1 text-sm">{server.latency}ms</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="overflow-hidden max-w-[75%]">
                  <McText size={'xs'} className="truncate">
                    {server.description || (server.newDescription as any) || ''}
                  </McText>
                </div>
                <p className="whitespace-nowrap">{server.version}</p>
              </div>
              <div className="flex justify-end">
                {server.lastPing && (
                  <p className="text-right">
                    <LastUpdate timestamp={server.lastPing} />
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel className="w-full font-bold text-center">{server.host}</ContextMenuLabel>
        <ContextMenuItem inset onClick={() => refreshServer(server.id)}>
          <RotateCcw className="mr-2 w-4 h-4" />
          Refresh
        </ContextMenuItem>
        <ContextMenuItem
          inset
          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
          onClick={() => deleteServer(server.id)}
        >
          <Trash className="mr-2 w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
