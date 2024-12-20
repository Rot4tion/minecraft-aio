import type { Config } from 'drizzle-kit'

export default {
  schema: './src/shared/db/schema/*.schema.ts',
  out: './drizzle',
  driver: 'better-sqlite'
} satisfies Config
