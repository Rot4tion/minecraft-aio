import { mcServerManager } from '../../../../main/core/mc-server-manager'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

export const mcServerManagerRouter = router({
  refresh: publicProcedure
    .input(z.object({ serverId: z.number() }))
    .mutation(({ input }) => mcServerManager.refresh(input.serverId))
})
