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
import { ChartNoAxesColumnIncreasing, RotateCcw, Sword, Trash } from 'lucide-react'
import { LastUpdate } from './last-update'
import { ClickToCopy } from '../click-to-copy'
import { StressTestDialog } from '../mc-bot/stress-test-dialog'
import { useConfirm } from '../react-confirm-dialog/confirm-dialog'
import { useState } from 'react'
import defaultServerFavicon from '@renderer/assets/default_server_favicon.png'
export function ServerCard({ server }: { server: GlobalState['mcServers'][number] }) {
  const refreshServer = useGlobalStore((x) => x.refreshServer)
  const deleteServer = useGlobalStore((x) => x.deleteServer)
  const [openStressTest, setOpenStressTest] = useState(false)
  const host = `${server.host}${server.port !== 25565 ? ':' + server.port : ''}`
  const confirm = useConfirm()

  return (
    <div>
      <StressTestDialog
        server={server}
        open={openStressTest}
        setOpen={setOpenStressTest}
      ></StressTestDialog>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className="text-xs hover:bg-secondary">
            <CardHeader className="items-end p-0"></CardHeader>
            <CardContent className="flex overflow-hidden p-2 space-x-2">
              <img
                className="flex-shrink-0 w-12 h-12"
                src={server.favicon || defaultServerFavicon}
                alt="default favicon"
              />
              <div className="w-full min-w-0">
                <div className="flex justify-between text-lg font-bold">
                  <ClickToCopy text={host}>
                    <div className="truncate cursor-pointer hover:underline">{host}</div>
                  </ClickToCopy>
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
                <div className="flex justify-between space-x-4">
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
          <ContextMenuLabel className="w-full font-bold text-center">
            {server.host}
          </ContextMenuLabel>
          <ContextMenuItem inset onClick={() => refreshServer(server.id)}>
            <RotateCcw className="mr-2 w-4 h-4" />
            Refresh
          </ContextMenuItem>
          <ContextMenuItem
            inset
            onClick={() => {
              setOpenStressTest(true)
            }}
          >
            <Sword className="mr-2 w-4 h-4" />
            Stress Test
          </ContextMenuItem>
          <ContextMenuItem
            inset
            className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            onClick={async () => {
              const result = await confirm({
                title: `Delete server confirm`,
                description: (
                  <div>
                    Are you sure you want to delete this server?
                    <p className="text-red-500">{server.host}</p>
                  </div>
                ),
                confirmText: 'Delete',
                cancelText: 'Cancel'
              })
              if (!result) return
              deleteServer(server.id)
            }}
          >
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  )
}
