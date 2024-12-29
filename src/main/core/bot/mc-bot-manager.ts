import { StressTestOptions } from '@shared/type'
import { getRandomUsername } from '@shared/utils'
import mineflayer from 'mineflayer'
import { Movements, goals, pathfinder } from 'mineflayer-pathfinder'
import { DEFAULT_BOT_USERNAME } from '../../constants'
const { GoalNear } = goals
class MCBotManager {
  stressTestBots: mineflayer.Bot[] = []
  public static createMCBot(options: any) {}
  clearStressTestBots() {
    this.stressTestBots.forEach((bot) => bot.quit())
    this.stressTestBots = []
  }
  async createStressTestBot(amount: number, options?: StressTestOptions) {
    this.clearStressTestBots()
    for (let i = 0; i < amount; i++) {
      const bot = mineflayer.createBot({
        ...options,
        username: getRandomUsername(options?.namePrefix),
        physicsEnabled: false
      })
      bot.once('spawn', () => {
        console.log(`Spawned bot ${bot.username}`)
        bot.removeAllListeners()
      })
      this.stressTestBots.push(bot)
      if (options?.delay) {
        await new Promise((resolve) => setTimeout(resolve, options.delay))
      }
    }
  }
  test() {
    const b = mineflayer.createBot({
      username: DEFAULT_BOT_USERNAME,
      host: '127.0.0.1',
      port: 25565,
      auth: 'offline'
    })
    b.loadPlugin(pathfinder)
    b.once('spawn', () => {
      console.log('Server Info:', {
        host: b._client.socket.remoteAddress,
        port: b._client.socket.remotePort,
        version: b.version,
        players: {
          online: Object.keys(b.players).length,
          max: b.game.maxPlayers
        },
        motd: b.game.serverBrand
      })
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
  }
}
const mcBotManager = new MCBotManager()
export { mcBotManager }
