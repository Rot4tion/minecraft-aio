import { serverManager } from '../../../../main/core/server-manager'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const serverManagerTRPC = router({
  refresh: publicProcedure
    .input(z.object({ serverId: z.number() }))
    .mutation(({ input }) => serverManager.refresh(input.serverId))
})
