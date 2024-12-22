import { nativeTheme } from 'electron'
import { publicProcedure, router } from '../trpc'

export const windowRouter = router({
  minimize: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.minimize()),
  maximize: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.maximize()),
  close: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.close())
})
