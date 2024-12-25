import { Bot } from 'mineflayer'
import { setup } from 'xstate'
import { BehaviorEatFood } from './behavior-modules/BehaviorEatFood'

export const eatFoodMachine = setup({
  types: {
    context: {} as { behaviorEatFood: BehaviorEatFood },
    input: {} as { bot: Bot }
  },
  guards: {
    isHurry: ({ context }) => {
      const noHurry = context.behaviorEatFood.bot.food === 20
      console.log('🚀 ~ noHurry:', noHurry)
      return !noHurry
    }
  },
  actions: {
    eat: ({ context }) => {
      context.behaviorEatFood.eat()
      return context.behaviorEatFood.isFinished()
    }
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFECGAXAYge2xAdAJIB2AlugMQDGAFmFQNb4BmuEA2gAwC6ioADtljlS2YnxAAPRAEYAbJwA0IAJ6IAzABZ1+AOwBWAL6HlaLGyJlKtek1Z52M3khCDh6UeJfSE8patkZTnw5ULDw8ONTDBw8fDNqMVgAVwBbMBY2LmcBIRExCR8ZACZ1dWU1X11dfCMTEDNYgkxSYggmilgwVAAnWnwbWHRsiTd8r1AffQAOcoCEYs5g4rro8ziWto6u3v7B4adRvI8C70QZucqgzXwVqIaYiwAVVAYwDvRXjPsOHiP3TyFRAATmmxQqsmqtXujQsmwgAFlsAAjCjMVoEVIokYuMYnCZSEFgiEIaYyaH3Yh4OASWF4f7jIEIAC0chJrJhjziJHIDPxTM04PmMhkNQuZQlkrKnPWBDMfMBZ18Iv0JMWwQMMqa+HhTQVp0miE0ckugXJ8gilrkWosABExGB9QSiupgcCSTI3RS1tqXm89bjjorDaT9Lo1Us9KsHrKdRikcinUzpjMPZwbprjIYgA */
  context: ({ input }) => ({
    behaviorEatFood: new BehaviorEatFood(input.bot)
  }),

  id: 'EatFood',
  initial: 'Entered',
  states: {
    Entered: {
      always: [{ guard: 'isHurry', target: 'Eat' }, {}]
    },
    Eat: {
      entry: ['eat'],
      always: [{ guard: 'isHurry', target: 'Eat' }, { target: 'Finished' }]
    },
    Finished: {
      type: 'final'
    },
    Exited: {
      type: 'final'
    }
  }
})
