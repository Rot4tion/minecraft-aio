import { mcBotManager } from '../../../../main/core/bot/mc-bot-manager'
import { StressTestOptions } from '../../../../shared/type'
import { publicProcedure, router } from '../trpc'

export const mcBotManagerTRPC = router({
  createStressTestBot: publicProcedure
    .input((x) => x as { amount: number; options?: StressTestOptions })
    .mutation(({ input: { amount, options } }) => mcBotManager.createStressTestBot(amount, options))
})
