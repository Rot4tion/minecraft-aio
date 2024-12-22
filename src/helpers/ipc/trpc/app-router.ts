import { router } from './trpc'
import { themeRouter } from './routers/theme'
import { windowRouter } from './routers/window'

export const appRouter = router({
  theme: themeRouter,
  window: windowRouter
})
export type AppRouter = typeof appRouter
