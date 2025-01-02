import { serverManagerTRPC } from './routers/mc-server-manager.trpc'
import { botManagerTRPC } from './routers/mc-bot-manager.trpc'
import { testTRPC } from './routers/test.trpc'
import { themeTRPC } from './routers/theme.trpc'
import { windowTRPC } from './routers/window.trpc'
import { router } from './trpc'

export const appRouter = router({
  theme: themeTRPC,
  window: windowTRPC,
  serverManager: serverManagerTRPC,
  botManager: botManagerTRPC,
  test: testTRPC
})
export type AppRouter = typeof appRouter
