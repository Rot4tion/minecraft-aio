import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

export const MCServerTable = sqliteTable(
  'mc_servers',
  {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    host: text('host').notNull(),
    port: integer('port', { mode: 'number' }).notNull(),
    name: text('name'),
    maxPlayers: integer('max_players', { mode: 'number' }),
    online: integer('online', { mode: 'number' }),
    latency: integer('latency', { mode: 'number' }),
    favicon: text('favicon'),
    description: text('description'),
    protocol: integer('protocol', { mode: 'number' }),
    version: text('version'),
    lastPing: integer('last_ping', { mode: 'timestamp' })
  },
  (table) => ({
    hostPortUnique: unique().on(table.host, table.port)
  })
)
