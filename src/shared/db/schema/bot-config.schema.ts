import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { BotOptions } from 'mineflayer'

export const BotConfigTable = sqliteTable('bot-configs', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  plugins: text('plugins', { mode: 'json' }).notNull().$type<{ id: string }[]>().default([]),
  options: text('options', { mode: 'json' }).$type<Omit<BotOptions, 'username'>>(),
  lastUpdate: integer('last_update', { mode: 'timestamp' })
})
