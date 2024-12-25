import { createActor } from 'xstate'
import { testMachine } from '../../../../shared/state-machines/test-machine'
import { publicProcedure, router } from '../trpc'
import { SharedSubscription as TRPCSharedSubscription } from '../utils/shared-subscription'
import { createBot } from 'mineflayer'
import { DEFAULT_BOT_USERNAME } from '../../../../main/constants'

// Create a shared subscription instance
const testSubscription = new TRPCSharedSubscription<string>(
  3000,
  () => `Test data: ${new Date().toISOString()}`
)

const bot = createBot({ username: DEFAULT_BOT_USERNAME })
const actor = createActor(testMachine, { input: { bot } })
actor.subscribe((state) => {
  console.log('state.value', state.value)
})
actor.start()
bot.on('physicsTick', () => {
  actor.send({ type: 'physicsTick' })
})
export const testTRPC = router({
  testSubscription: publicProcedure.subscription(() => {
    return testSubscription.subscribe()
  }),
  test: publicProcedure.mutation(() => {})
})
