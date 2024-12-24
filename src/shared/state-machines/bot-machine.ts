import { Bot, BotOptions, createBot } from 'mineflayer'
import { assign, fromPromise, setup } from 'xstate'

export const botMachine = setup({
  types: {
    context: {} as { bot?: Bot; options?: BotOptions },
    events: {} as { type: 'start' }
  },
  actors: {
    start: fromPromise<{ bot: Bot }, { options: BotOptions }>(async ({ input }) => {
      return {
        bot: createBot(input.options)
      }
    }),
    load: fromPromise(async () => {
      return {
        username: 'bot',
        host: '127.0.0.1',
        port: 25565,
        auth: 'offline'
      } as BotOptions
    })
  }
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QCED2AXAdASQHYEt0BiXMAD3QG0AGAXUVAAdVZD9VcGQzEBGANl6ZeADgDsAVmr9qEgEwiJvMQBoQATz6zME-uKVyx1ACxiAzNIC+ltWiwAbVAEMI+XFCIQOYTG4BuqADWPnaYji5uUAj+qADGTujsuDS0KVzMrIkcXDwIxrzGmACcvHJSIiJm4mJyRfxqmghFcpgi1GalYmLGxkXGtWbWthhhzq7uRGAATlOoU5iM9gkAZnMAtpih4eNRMfFZyXRpSCAZbNknufmFJWXUFVVdtfUafEqYhiKlfXK-yvzWGwgXCoCBwLh2dIsc6cS6IAC0L0a8IkxSK6IxmIxgyBoTwhChmSSOUQ-QaWlRcn4dwE-FMEi6RSGIC2Y0ihJhJIQZX4wjuJj6pTKBXJCC+mH4kmo1Dk-V4BWkImZoQAYqh7I4AO4AAlITim2sWTnU0w5By5EikEqk1F4tosxlkqleTWoxX0tv4ZnMZjqOOGWAAyuhUIwzcS4QhLW7+Da7bwHU7RQUiphjNSpGYOumCjjrEA */
  context: {},
  id: 'Bot',
  initial: 'Init',
  states: {
    Init: {
      invoke: {
        onDone: {
          target: 'wating',
          actions: assign({
            options: ({ event }) => event.output
          }),

          reenter: true
        },
        onError: {
          target: 'Stop'
        },
        src: 'load'
      }
    },
    wating: {
      on: {
        start: {
          target: 'stating'
        }
      }
    },
    stating: {
      invoke: {
        input: ({ context }) => ({ options: context.options! }),
        onDone: {
          target: 'Follow near player',
          actions: assign({
            bot: ({ event }) => event.output.bot
          })
        },
        src: 'start'
      }
    },
    'Follow near player': {
      type: 'final'
    },
    Stop: {
      type: 'final'
    }
  }
})
