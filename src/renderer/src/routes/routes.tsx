import TestPage from '@renderer/pages/test.page'
import SettingsPage from '@renderer/pages/setting.page'
import { createRoute } from '@tanstack/react-router'
import DashboardPage from '../pages/dashboard.page'
import { RootRoute } from './__root'
import { routeConfig } from './routes.config'
import McServersPage from '@renderer/pages/servers.page'
import BotsPage from '@renderer/pages/bots.page'

// TODO: Steps to add a new route:
// 1. Create a new page component in the '../pages/' directory (e.g., NewPage.tsx)
// 2. Import the new page component at the top of this file
// 3. Define a new route for the page using createRoute()
// 4. Add the new route to the routeTree in RootRoute.addChildren([...])
// 5. Add a new Link in the navigation section of RootRoute if needed

// Example of adding a new route:
// 1. Create '../pages/NewPage.tsx'
// 2. Import: import NewPage from '../pages/NewPage';
// 3. Define route:
//    const NewRoute = createRoute({
//      getParentRoute: () => RootRoute,
//      path: '/new',
//      component: NewPage,
//    });
// 4. Add to routeTree: RootRoute.addChildren([HomeRoute, NewRoute, ...])
// 5. Add Link: <Link to="/new">New Page</Link>

export const HomeRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: routeConfig.dashboard.path,
  component: DashboardPage
})

export const McServerRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: routeConfig.mcServers.path,
  component: McServersPage
})
export const BotsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: routeConfig.bots.path,
  component: BotsPage
})
export const SettingsRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: routeConfig.settings.path,
  component: SettingsPage
})
export const TestRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: routeConfig.test.path,
  component: TestPage
})

export const rootTree = RootRoute.addChildren([
  HomeRoute,
  McServerRoute,
  BotsRoute,
  SettingsRoute,
  TestRoute
])
