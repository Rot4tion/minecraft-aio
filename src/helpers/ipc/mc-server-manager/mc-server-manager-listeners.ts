import { ipcMain } from 'electron'
import { mcServerManager } from '../../../main/core/mc-server-manager'
import { MC_SERVER_MANAGER_REFRESH } from './mc-server-manager-channels'

export function addMCServerManagerEventListeners() {
  ipcMain.handle(MC_SERVER_MANAGER_REFRESH, async (_event, serverId: number) => {
    return await mcServerManager.refresh(serverId)
  })
}
