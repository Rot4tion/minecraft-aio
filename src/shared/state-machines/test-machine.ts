import { Bot } from 'mineflayer'
import { createActor, createMachine, fromPromise, fromTransition, setup } from 'xstate'

const eatMachine = createMachine({
  invoke: {
    input: ({ context: { bot } }) => ({ bot }),
    src: fromPromise<void, { bot: Bot }>(async ({ input: { bot } }) => {
      const foods = bot.inventory
        .items()
        .filter((x) =>
          [
            'bread',
            'carrot',
            'potato',
            'sweet_berries',
            'baked_potato',
            'cooked_chicken',
            'cooked_porkchop',
            'cooked_mutton'
          ].includes(x.name)
        )
      if (foods.length === 0) {
        return
      }
      await bot.equip(foods[0].type, 'hand')
      await bot.consume()
    })
  },
  onDone: {
    target: '#Test.Ide'
  }
})
export const testMachine = setup({
  types: {
    events: {} as { type: 'physicsTick' },
    input: {} as { bot: Bot },
    context: {} as { bot: Bot }
  },
  actors: {
    eat: createMachine({ id: 'Eat' }),
    next: fromTransition(
      (state, event) => {
        if (event.type === 'increment') {
          return {
            ...state,
            count: state.count + 1
          }
        }
        return state
      },
      { count: 0 }
    )
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFECGAXAYge2xAdAJIB2AlugMQDGAFmFQNb4BmuEA2gAwC6ioADtljlS2YnxAAPRAEYAbJwA0IAJ6IAzABZ1+AOwBWAL6HlaLGyJlKtek1Z52M3khCDh6UeJfSE8patkZTnw5ULDw8ONTDBw8fDNqMVgAVwBbMBY2LmcBIRExCR8ZACZ1dWU1X11dfCMTEDNYgkxSYggmilgwVAAnWnwbWHRsiTd8r1AffQAOcoCEYs5g4rro8ziWto6u3v7B4adRvI8C70QZucqgzXwVqIaYiwAVVAYwDvRXjPsOHiP3TyFRAATmmxQqsmqtXujQsmwgAFlsAAjCjMVoEVIokYuMYnCZSEFgiEIaYyaH3Yh4OASWF4f7jIEIAC0chJrJhjziJHIDPxTM04PmMhkNQuZQlkrKnPWBDMfMBZ18Iv0JMWwQMMqa+HhTQVp0miE0ckugXJ8gilrkWosABExGB9QSiupgcCSTI3RS1tqXm89bjjorDaT9Lo1Us9KsHrKdRikcinUzpjMPZwbprjIYgA */

  id: 'Test',
  initial: 'Ide',

  context: ({ input }) => ({ bot: input.bot }),
  states: {
    Ide: {
      on: {
        physicsTick: {
          guard: ({ context: { bot } }) => {
            console.log('🚀 ~ bot.food:', bot.food)
            return bot.food !== 20
          },
          target: '#Test.Eat'
        }
      }
    },
    Eat: {
      invoke: {
        input: ({ context: { bot } }) => ({ bot }),
        src: fromPromise<void, { bot: Bot }>(async ({ input: { bot } }) => {
          const foods = bot.inventory
            .items()
            .filter((x) =>
              [
                'bread',
                'carrot',
                'potato',
                'sweet_berries',
                'baked_potato',
                'cooked_chicken',
                'cooked_porkchop',
                'cooked_mutton'
              ].includes(x.name)
            )
          if (foods.length === 0) {
            return
          }
          await bot.equip(foods[0].type, 'hand')
          await bot.consume()
        })
      },
      onDone: {
        target: '#Test.Ide'
      }
    }
  }
})
