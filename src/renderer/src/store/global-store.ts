import { MCServerTable } from '@shared/db/schema/mc-server.schema'
import { webDb } from '@shared/db/webDB'
import { create } from 'zustand'

export interface GlobalState {
  isDataLoaded: boolean
  mcServers: (typeof MCServerTable.$inferSelect)[]
  setDataLoaded: (loaded: boolean) => void
  initData: () => Promise<void>
  refreshServer: (serverId: number) => Promise<typeof MCServerTable.$inferSelect>
}

export const useGlobalStore = create<GlobalState>()((set) => ({
  isDataLoaded: false,
  mcServers: [],
  setDataLoaded: (loaded) => set({ isDataLoaded: loaded }),
  initData: async () => {
    const mcServers = await webDb.select().from(MCServerTable)
    set({ mcServers })
    set({ isDataLoaded: true })
  },
  refreshServer: async (serverId: number) => {
    const server = await window.mcServerManager.refresh(serverId)
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
  }
}))
