import { router } from './trpc'
import { themeRouter } from './routers/theme'

export const appRouter = router({
  theme: themeRouter
})
export type AppRouter = typeof appRouter
