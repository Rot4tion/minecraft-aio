import protocol, { NewPingResult, OldPingResult, PingOptions } from 'minecraft-protocol'
import { db } from '../../shared/db/db'
import { MCServerTable } from '../../shared/db/schema/mc-server.schema'
import { eq } from 'drizzle-orm'

class ServerManager {
  async refresh(serverId: number) {
    const server = await db.select().from(MCServerTable).where(eq(MCServerTable.id, serverId)).get()
    if (!server) {
      throw new Error('Server not found')
    }
    let data: any = {}
    try {
      data = await this.ping({ host: server.host, port: server.port })
    } catch (error) {
      data = { lastPing: new Date(), latency: -1, online: 0, maxPlayers: 0 }
    }
    const dbRes = await db
      .update(MCServerTable)
      .set(data)
      .where(eq(MCServerTable.id, serverId))
      .returning()
      .get()
    return dbRes
  }
  async ping(options: PingOptions & { host: string }) {
    const data: typeof MCServerTable.$inferInsert = {
      host: options.host,
      port: options.port || 25565
    }
    const res: any = await protocol.ping({ host: options.host, port: options.port || 25565 })
    if (res.maxPlayers != undefined) {
      const oldResult: OldPingResult = res
      data.description = oldResult.motd
      data.version = oldResult.version
      data.protocol = oldResult.protocol
      data.online = oldResult.playerCount
      data.maxPlayers = oldResult.maxPlayers
    } else {
      const newResult: NewPingResult = res
      data.newDescription = newResult.description
      data.version = newResult.version.name
      data.protocol = newResult.version.protocol
      data.latency = newResult.latency
      data.favicon = newResult.favicon
      data.online = newResult.players.online
      data.maxPlayers = newResult.players.max
    }
    data.lastPing = new Date()
    return data
  }
}
const serverManager = new ServerManager()
export { serverManager }
