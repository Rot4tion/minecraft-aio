import mineflayer from 'mineflayer'
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder'
import { mineflayer as mineflayerViewer } from 'prismarine-viewer'
import { loader as autoEat } from 'mineflayer-auto-eat'
const { GoalNear } = goals

export interface MCBotOptions extends mineflayer.BotOptions {
  enablePathfinder?: boolean
  enableAutoEat?: boolean
}

export class MCBot {
  bot: mineflayer.Bot
  options: MCBotOptions
  constructor(bot: mineflayer.Bot, options: MCBotOptions) {
    this.bot = bot

    this.options = options
  }
  public static createMCBot(options: MCBotOptions): MCBot {
    const { enablePathfinder, enableAutoEat, ...opts } = options

    const b = mineflayer.createBot(opts)
    const mcb = new MCBot(b, options)

    if (enablePathfinder) {
      b.loadPlugin(pathfinder)
    }
    if (enableAutoEat) {
      b.loadPlugin(autoEat)
    }

    b.once('spawn', () => {
      mineflayerViewer(b, { port: 3000 }) // Start the viewing server on port 3000

      const defaultMove = new Movements(b)

      b.on('chat', function (username, message) {
        if (username === b.username) return

        const target = b.players[username] ? b.players[username].entity : null
        if (message === 'come') {
          if (!target) {
            b.chat("I don't see you !")
            return
          }
          const p = target.position

          b.pathfinder.setMovements(defaultMove)
          b.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1))
        }
      })
    })

    b.on('error', (err: Error) => {
      console.error('Bot error:', err.message)
    })
    return mcb
  }
  serverInfo(log = false) {
    const b = this.bot
    const serverInfo = {
      host: b._client.socket.remoteAddress,
      port: b._client.socket.remotePort,
      version: b.version,
      players: {
        online: Object.keys(b.players).length,
        max: b.game.maxPlayers
      },
      motd: b.game.serverBrand
    }
    if (log) {
      console.log('Server Info:', serverInfo)
    }
    return serverInfo
  }
  test() {}
}
