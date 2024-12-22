import { MCServerTable } from '../../../shared/db/schema/mc-server.schema'
import { MC_SERVER_MANAGER_REFRESH } from './mc-server-manager-channels'
export type MCServerManagerIPC = {
  refresh: (serverId: number) => Promise<typeof MCServerTable.$inferSelect>
}
export function exposeMCServerManagerContext() {
  const { contextBridge, ipcRenderer } = window.require('electron')
  contextBridge.exposeInMainWorld('mcServerManager', {
    refresh: async (serverId: number) => ipcRenderer.invoke(MC_SERVER_MANAGER_REFRESH, serverId)
  } satisfies MCServerManagerIPC)
}