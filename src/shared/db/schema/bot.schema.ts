import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const BotTable = sqliteTable('bots', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  username: text('username').unique().notNull(),
  description: text('description'),
  version: text('version'),
  lastUpdate: integer('last_update', { mode: 'timestamp' })
})
