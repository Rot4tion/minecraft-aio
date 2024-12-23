import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContextMenuLabel } from '@radix-ui/react-context-menu'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { Button } from '@renderer/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { routeConfig } from '@renderer/routes/routes.config'
import { GlobalState, useGlobalStore } from '@renderer/store/global-store'
import { formatDistanceToNow } from 'date-fns'
import { ChartNoAxesColumnIncreasing, Plus, RotateCcw, Trash } from 'lucide-react'
import { McText } from '@/components/mc-text-react/McText'
import { useEffect, useReducer } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddMCServerSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1)
})
function AddServerDialog() {
  const addServer = useGlobalStore((x) => x.addServer)
  const form = useForm<z.infer<typeof AddMCServerSchema>>({
    resolver: zodResolver(AddMCServerSchema),
    defaultValues: {
      name: 'Minecraft Server',
      address: ''
    }
  })
  async function onSubmit(values: z.infer<typeof AddMCServerSchema>) {
    const data = values.address.split(':')
    const host = data[0]
    const port = Number(data[1]) || 25565
    addServer({
      name: values.name,
      host,
      port
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={'icon'} variant="ghost">
          <Plus></Plus>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter server name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter the server IP or Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose className="w-full">
              <Button className="w-full max-w-none" type="submit">
                Add
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
function LastUpdate({ timestamp }: { timestamp: Date }) {
  const [, forceUpdate] = useReducer((x) => !x, false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render
      forceUpdate()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return <p>{formatDistanceToNow(timestamp, { addSuffix: true, includeSeconds: true })}</p>
}
function ServerCard({ server }: { server: GlobalState['mcServers'][number] }) {
  const refreshServer = useGlobalStore((x) => x.refreshServer)
  const deleteServer = useGlobalStore((x) => x.deleteServer)

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="text-xs">
          <CardHeader className="items-end p-0"></CardHeader>
          <CardContent className="flex p-2 space-x-2">
            <img
              className="w-12 h-12"
              src={server.favicon || '/src/assets/default_server_favicon.png'}
              alt="defaut favicon"
            />
            <div className="w-full">
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
                <div className="overflow-hidden w-max-[200px]">
                  <McText size={'xs'}>
                    {server.description || (server.newDescription as any) || ''}
                  </McText>
                </div>
                <p>{server.version}</p>
              </div>
              <div className="flex justify-between">
                <div></div>
                <div>
                  {server.lastPing && (
                    <p>
                      <LastUpdate timestamp={server.lastPing} />
                    </p>
                  )}
                </div>
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
function RefreshAllServers() {
  const refreshAllServers = useGlobalStore((x) => x.refreshAllServers)

  return (
    <Button className="rounded-full" size={'icon'} variant="ghost" onClick={refreshAllServers}>
      <RotateCcw></RotateCcw>
    </Button>
  )
}
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
              <RefreshAllServers />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="max-h-[384px] overflow-y-auto">
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
