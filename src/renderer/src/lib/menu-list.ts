import { routeConfig } from '@renderer/routes/routes.config'
import { Bot, Bug, FlaskConical, LayoutGrid, LucideIcon, Server, Settings } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: routeConfig.dashboard.path,
          label: routeConfig.dashboard.label,
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: routeConfig.mcServers.path,
          label: routeConfig.mcServers.label,
          icon: Server,
          submenus: []
        },
        {
          href: '/bot',
          label: 'Bots',
          icon: Bot,
          active: true,
          submenus: [
            { href: routeConfig.accounts.path, label: routeConfig.accounts.label },
            { href: routeConfig.configs.path, label: routeConfig.configs.label }
          ]
        },
        {
          href: routeConfig.settings.path,
          label: routeConfig.settings.label,
          icon: Settings
        }
      ]
    },
    {
      groupLabel: 'Lab',
      menus: [
        {
          href: routeConfig.test.path,
          label: routeConfig.test.label,
          icon: FlaskConical,
          submenus: []
        }
      ]
    }
  ]
}
