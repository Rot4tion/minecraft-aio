import { BrowserWindow } from 'electron'
import { addMCServerManagerEventListeners } from './mc-server-manager/mc-server-manager-listeners'

export default function registerListeners(mainWindow: BrowserWindow) {
  addMCServerManagerEventListeners()
}
