import { mcServerManagerRouter } from './routers/mc-server-manager.trpc'
import { themeRouter } from './routers/theme.trpc'
import { windowRouter } from './routers/window.trpc'
import { router } from './trpc'

export const appRouter = router({
  theme: themeRouter,
  window: windowRouter,
  mcServerManager: mcServerManagerRouter
})
export type AppRouter = typeof appRouter
