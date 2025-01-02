import { botManager } from '../../../../main/core/bot/bot-manager'
import { StressTestOptions } from '../../../../shared/type'
import { publicProcedure, router } from '../trpc'

export const botManagerTRPC = router({
  createStressTestBot: publicProcedure
    .input((x) => x as { amount: number; options?: StressTestOptions })
    .mutation(({ input: { amount, options } }) => botManager.createStressTestBot(amount, options))
})
