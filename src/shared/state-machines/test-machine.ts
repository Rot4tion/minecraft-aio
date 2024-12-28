import { assign, forwardTo, setup } from 'xstate'
export const otherMachine = setup({
  types: {
    events: {} as { type: 'physicsTick' },
    context: {} as { count: number },
    input: {} as { count: number },
    output: {} as { count: number }
  },
  actions: {
    increment: assign(({ context }) => {
      return { count: context.count + 1 }
    })
  }
}).createMachine({
  id: 'Order',
  initial: 'Yellow',
  context: ({ input }) => input,
  states: {
    Yellow: {
      on: {
        physicsTick: {
          actions: ['increment'],
          target: 'Blue'
        }
      }
    },
    Blue: {
      on: {
        physicsTick: {
          actions: ['increment'],
          target: 'Done'
        }
      }
    },
    Done: { type: 'final' }
  },
  output: ({ context }) => context
})

export const testMachine = setup({
  types: {
    events: {} as { type: 'physicsTick' },
    context: {} as { count: number }
  },
  actors: { otherMachine },
  actions: {
    increment: assign(({ context }) => {
      return { count: context.count + 1 }
    })
  },
  guards: {
    isSkip: ({ context }) => context.count >= 2
  }
}).createMachine({
  id: 'Test',
  initial: 'Green',
  context: { count: 0 },
  states: {
    Green: {
      on: {
        physicsTick: {
          actions: ['increment'],
          target: 'Red'
        }
      }
    },
    Red: {
      on: {
        physicsTick: { actions: ['increment'], target: 'Other' }
      }
    },
    Other: {
      invoke: {
        id: 'otherMachineId',
        input: ({ context }) => context,
        src: 'otherMachine',
        onDone: {
          target: 'Green',
          actions: [assign(({ event }) => event.output)]
        }
      },
      always: {
        guard: { type: 'isSkip' },
        target: 'Green',
        actions: [
          'increment',
          forwardTo('otherMachineId'),
          (a) => {
            console.log('🚀 ~ actions:[forwardTo ~ a:', JSON.stringify(a, null, 2))
          }
        ]
      }
    }
  }
})
