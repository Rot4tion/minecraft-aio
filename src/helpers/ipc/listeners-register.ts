import { BrowserWindow } from 'electron'
import { addMCServerManagerEventListeners } from './mc-server-manager/mc-server-manager-listeners'
import { addWindowEventListeners } from './window/window-listeners'

export default function registerListeners(mainWindow: BrowserWindow) {
  addWindowEventListeners(mainWindow)

  addMCServerManagerEventListeners()
}
