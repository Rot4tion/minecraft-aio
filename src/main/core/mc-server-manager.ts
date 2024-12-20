import protocol, { NewPingResult, OldPingResult, PingOptions } from 'minecraft-protocol'
import { db } from '../../shared/db/db'
import { MCServerTable } from '../../shared/db/schema/mc-server.schema'

class MCServerManager {
  constructor() {}

  async pingUpdate(options: PingOptions) {
    const res: any = await protocol.ping(options)
    const data: typeof MCServerTable.$inferInsert = {
      host: options.host ?? '127.0.0.1',
      port: options.port ?? 25565,
      lastPing: new Date()
    }
    if (res.maxPlayers != undefined) {
      const oldResult: OldPingResult = res
      data.description = oldResult.motd
      data.version = oldResult.version
      data.protocol = oldResult.protocol
      data.online = oldResult.playerCount
      data.maxPlayers = oldResult.maxPlayers
    } else {
      const newResult: NewPingResult = res
      data.description =
        typeof newResult.description === 'string'
          ? newResult.description
          : newResult.description.text
      data.version = newResult.version.name
      data.protocol = newResult.version.protocol
      data.latency = newResult.latency
      data.favicon = newResult.favicon
      data.online = newResult.players.online
      data.maxPlayers = newResult.players.max
    }
    console.log('Minecraft Server:', res)

    const dbRes = await db
      .insert(MCServerTable)
      .values(data)
      .onConflictDoUpdate({
        target: [MCServerTable.host, MCServerTable.port],
        set: {
          description: data.description,
          version: data.version,
          protocol: data.protocol,
          online: data.online,
          maxPlayers: data.maxPlayers,
          lastPing: data.lastPing
        }
      })
      .returning({ id: MCServerTable.id, host: MCServerTable.host, port: MCServerTable.port })
    console.log('🚀 ~ MCServerManager ~ ping ~ dbRes:', dbRes)
  }
}
const mcServerManager = new MCServerManager()
export { mcServerManager }
