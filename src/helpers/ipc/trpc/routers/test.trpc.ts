import { createActor } from 'xstate'
import { testMachine } from '../../../../shared/state-machines/test-machine'
import { publicProcedure, router } from '../trpc'
import { SharedSubscription as TRPCSharedSubscription } from '../utils/shared-subscription'

// Create a shared subscription instance
const testSubscription = new TRPCSharedSubscription<string>(
  3000,
  () => `Test data: ${new Date().toISOString()}`
)

const actor = createActor(testMachine)
actor.subscribe((state) => {
  console.log('🚀 ~ actor.subscribe ~ state.value:', state.value)
  console.log('🚀 ~ actor.subscribe ~ state.context:', state.context)
})
actor.start()

for (let i = 0; i < 10; i++) {
  actor.send({ type: 'physicsTick' })
}
export const testTRPC = router({
  testSubscription: publicProcedure.subscription(() => {
    return testSubscription.subscribe()
  }),
  test: publicProcedure.mutation(() => {
    actor.send({ type: 'physicsTick' })
  })
})
