import { FlaskConical, LayoutGrid, LucideIcon, Settings } from 'lucide-react'

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
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: '/settings',
          label: 'Settings',
          icon: Settings
        }
      ]
    },
    {
      groupLabel: 'Lab',
      menus: [
        {
          href: '/test',
          label: 'Test',
          icon: FlaskConical,
          submenus: []
        }
      ]
    }
  ]
}
