import { publicProcedure, router } from '../trpc'

export const windowTRPC = router({
  minimize: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.minimize()),
  maximize: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.maximize()),
  close: publicProcedure.mutation(({ ctx }) => ctx.mainWindow.close())
})
