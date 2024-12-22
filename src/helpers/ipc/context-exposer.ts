import { exposeElectronTRPC } from 'electron-trpc/main'
import { exposeAPIContext } from './api/api-context'
import { exposeMCServerManagerContext } from './mc-server-manager/mc-server-manager-context'
import { exposeWindowContext } from './window/window-context'

export default function exposeContexts() {
  exposeElectronTRPC()
  exposeWindowContext()
  exposeAPIContext()
  exposeMCServerManagerContext()
}
