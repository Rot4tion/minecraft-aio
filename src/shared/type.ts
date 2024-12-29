import { BotOptions } from 'mineflayer'

export type StressTestOptions = Omit<BotOptions, 'username'> & {
  delay?: number
  namePrefix?: string
}
