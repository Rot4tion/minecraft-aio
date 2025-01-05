import { pathfinder } from 'mineflayer-pathfinder'
import { loader as autoEat } from 'mineflayer-auto-eat'
import { mineflayer as viewer } from 'prismarine-viewer'

export const plugins = [
  {
    id: 'mineflayer-pathfinder',
    name: 'Pathfinder',
    inject: pathfinder,
    creators: ['PrismarineJS'],
    description: 'Pathfinding plugin for mineflayer',
    tags: ['movement'],
    source: 'https://github.com/PrismarineJS/mineflayer-pathfinder',
    version: '2.4.5'
  },
  {
    id: 'mineflayer-auto-eat',
    name: 'Auto Eat',
    inject: autoEat,
    creators: ['Link'],
    description: 'A customizable and flexible auto-eat utility plugin for Mineflayer bots',
    tags: ['food'],
    source: 'https://github.com/link-discord/mineflayer-auto-eat',
    version: '2.2.0'
  },
  {
    id: 'prismarine-viewer',
    name: 'Prismarine Viewer',
    inject: viewer,
    creators: ['PrismarineJS'],
    description: 'Web based viewer for servers and bots',
    source: 'https://github.com/PrismarineJS/prismarine-viewer',
    version: '1.25.0'
  }
]
