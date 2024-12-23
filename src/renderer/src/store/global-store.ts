import { trpcClient } from '@/helpers/ipc/trpc/trpc-client'
import { MCServerTable } from '@shared/db/schema/mc-server.schema'
import { webDb } from '@shared/db/webDB'
import { create } from 'zustand'

export interface GlobalState {
  isDataLoaded: boolean
  mcServers: (typeof MCServerTable.$inferSelect)[]
  setDataLoaded: (loaded: boolean) => void
  initData: () => Promise<void>
  refreshServer: (serverId: number) => Promise<typeof MCServerTable.$inferSelect>
  refreshAllServers: () => Promise<void>
  addServer: (
    server: typeof MCServerTable.$inferInsert
  ) => Promise<typeof MCServerTable.$inferInsert>
}

export const useGlobalStore = create<GlobalState>()((set, get) => ({
  isDataLoaded: false,
  mcServers: [],
  setDataLoaded: (loaded) => set({ isDataLoaded: loaded }),
  initData: async () => {
    const mcServers = await webDb.select().from(MCServerTable)
    set({ mcServers })
    set({ isDataLoaded: true })
  },
  refreshServer: async (serverId: number) => {
    const server = await trpcClient.mcServerManager.refresh.mutate({ serverId })
    set((state) => {
      const idx = state.mcServers.findIndex((x) => x.id === server.id)
      if (idx === -1) {
        return state
      }
      state.mcServers[idx] = server
      return {
        mcServers: state.mcServers.slice()
      }
    })
    return server
  },
  refreshAllServers: async () => {
    const state = get()
    state.mcServers.forEach(async (server) => {
      state.refreshServer(server.id)
    })
  },
  addServer: async (server: typeof MCServerTable.$inferInsert) => {
    const dbServer = await webDb
      .insert(MCServerTable)
      .values(server)
      .returning({ id: MCServerTable.id })
      .get()
    const updatedServer = await trpcClient.mcServerManager.refresh.mutate({ serverId: dbServer.id })
    set((state) => {
      state.mcServers.push(updatedServer)
      return {
        mcServers: state.mcServers.slice()
      }
    })
    return updatedServer
  }
}))
