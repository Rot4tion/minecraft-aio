import { initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { BrowserWindow } from 'electron'

// Define the context type
export interface TRPCContext {
  mainWindow: BrowserWindow
}

// Create context function
export const createContext = (mainWindow: BrowserWindow): TRPCContext => ({
  mainWindow
})

// Initialize tRPC with context
const t = initTRPC.context<TRPCContext>().create({
  isServer: true,
  transformer: superjson
})

export const router = t.router
export const publicProcedure = t.procedure
