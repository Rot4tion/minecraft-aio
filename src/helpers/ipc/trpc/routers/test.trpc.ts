import { createActor } from 'xstate'
import { botMachine } from '../../../../shared/state-machines/bot-machine'
import { publicProcedure, router } from '../trpc'
import { SharedSubscription as TRPCSharedSubscription } from '../utils/shared-subscription'

// Create a shared subscription instance
const testSubscription = new TRPCSharedSubscription<string>(
  3000,
  () => `Test data: ${new Date().toISOString()}`
)

const actor = createActor(botMachine)
actor.subscribe((state) => {
  console.group('State update')
  console.log('state.value', state.value)
})

actor.start()

export const testTRPC = router({
  testSubscription: publicProcedure.subscription(() => {
    return testSubscription.subscribe()
  }),
  test: publicProcedure.mutation(() => {
    actor.send({ type: 'start' })
  })
})
