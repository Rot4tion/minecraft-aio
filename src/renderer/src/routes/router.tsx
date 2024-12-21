import { createMemoryHistory, createRouter } from '@tanstack/react-router'
import { rootTree } from './routes'
import { routeConfig } from './routes.config'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const history = createMemoryHistory({
  initialEntries: [routeConfig.dashboard.path]
})
export const router = createRouter({ routeTree: rootTree, history: history })
