import { exposeElectronTRPC } from 'electron-trpc/main'
import { exposeAPIContext } from './api/api-context'
import { exposeMCServerManagerContext } from './mc-server-manager/mc-server-manager-context'

export default function exposeContexts() {
  exposeElectronTRPC()
  exposeAPIContext()
  exposeMCServerManagerContext()
}
