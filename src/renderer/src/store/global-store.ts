import { trpcClient } from '@/helpers/ipc/trpc/trpc-client'
import { ServerTable } from '@shared/db/schema/server.schema'
import { webDb } from '@shared/db/webDB'
import { eq } from 'drizzle-orm'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface GlobalState {
  isDataLoaded: boolean
  servers: (typeof ServerTable.$inferSelect)[]
  setDataLoaded: (loaded: boolean) => void
  initData: () => Promise<void>
  refreshServer: (serverId: number) => Promise<typeof ServerTable.$inferSelect>
  refreshAllServers: () => Promise<void>
  addServer: (server: typeof ServerTable.$inferInsert) => Promise<typeof ServerTable.$inferInsert>
  deleteServer: (serverId: number) => Promise<boolean>
}

export const useGlobalStore = create(
  devtools<GlobalState>(
    (set, get) => ({
      isDataLoaded: false,
      servers: [],
      setDataLoaded: (loaded) => set({ isDataLoaded: loaded }),
      initData: async () => {
        const mcServers = await webDb.select().from(ServerTable)
        set({ servers: mcServers })
        set({ isDataLoaded: true })
      },
      refreshServer: async (serverId: number) => {
        const server = await trpcClient.serverManager.refresh.mutate({ serverId })
        set((state) => {
          const idx = state.servers.findIndex((x) => x.id === server.id)
          if (idx === -1) {
            return state
          }
          state.servers[idx] = server
          return {
            servers: state.servers.slice()
          }
        })
        return server
      },
      refreshAllServers: async () => {
        const state = get()
        state.servers.forEach(async (server) => {
          state.refreshServer(server.id)
        })
      },
      addServer: async (server: typeof ServerTable.$inferInsert) => {
        const dbServer = await webDb
          .insert(ServerTable)
          .values(server)
          .returning({ id: ServerTable.id })
          .get()
        const updatedServer = await trpcClient.serverManager.refresh.mutate({
          serverId: dbServer.id
        })
        set((state) => {
          state.servers.push(updatedServer)
          return {
            servers: state.servers.slice()
          }
        })
        return updatedServer
      },
      deleteServer: async (serverId: number) => {
        await webDb.delete(ServerTable).where(eq(ServerTable.id, serverId))

        set((state) => {
          return {
            servers: state.servers.filter((server) => server.id !== serverId)
          }
        })
        return true
      }
    }),
    { enabled: true }
  )
)
