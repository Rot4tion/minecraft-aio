import { exposeElectronTRPC } from 'electron-trpc/main'
import { exposeAPIContext } from './api/api-context'

export default function exposeContexts() {
  exposeElectronTRPC()
  exposeAPIContext()
}
