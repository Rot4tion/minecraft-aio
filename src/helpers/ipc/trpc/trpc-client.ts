import { createTRPCProxyClient } from '@trpc/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import superjson from 'superjson'
import { AppRouter } from './app-router'

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [ipcLink()],
  transformer: superjson
})
