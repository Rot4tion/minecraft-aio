import { publicProcedure, router } from '../trpc'
import { SharedSubscription as TRPCSharedSubscription } from '../utils/shared-subscription'

// Create a shared subscription instance
const testSubscription = new TRPCSharedSubscription<string>(
  3000,
  () => `Test data: ${new Date().toISOString()}`
)

export const testTRPC = router({
  testSubscription: publicProcedure.subscription(() => {
    return testSubscription.subscribe()
  }),
  test: publicProcedure.mutation(() => {})
})
