import { exposeAPIContext } from './api/api-context'
import { exposeMCServerManagerContext } from './mc-server-manager/mc-server-manager-context'
import { exposeThemeContext } from './theme/theme-context'
import { exposeWindowContext } from './window/window-context'

export default function exposeContexts() {
  exposeWindowContext()
  exposeThemeContext()
  exposeAPIContext()
  exposeMCServerManagerContext()
}
