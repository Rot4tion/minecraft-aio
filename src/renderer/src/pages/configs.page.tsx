import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { LastUpdate } from '@renderer/components/last-update'
import { Badge } from '@renderer/components/ui/badge'
import { Card } from '@renderer/components/ui/card'
import { routeConfig } from '@renderer/routes/routes.config'
import {
  Anvil,
  Apple,
  Axe,
  Book,
  BookMarked,
  Bot,
  Egg,
  Fish,
  GraduationCap,
  Hammer,
  HardHat,
  House,
  Pickaxe,
  Shield,
  Star,
  Sword,
  Swords,
  TreeDeciduous,
  Truck,
  Wheat
} from 'lucide-react'

const configIcon = {
  Bot,
  Swords,
  Sword,
  Hammer,
  Pickaxe,
  Axe,
  Anvil,
  HardHat,
  GraduationCap,
  Shield,
  Truck,
  Apple,
  BookMarked,
  Star,
  House,
  Wheat,
  Egg,
  Fish,
  Book,
  TreeDeciduous
}
type ConfigIconType = keyof typeof configIcon
function ConfigIcon({ icon }: { icon: ConfigIconType }) {
  const Icon = configIcon[icon]
  return <Icon className="w-7 h-7" />
}

function ConfigCard({
  config
}: {
  config: {
    name: string
    totalUsing: number
    description?: string
    icon?: ConfigIconType
    lastUpdate: Date
  }
}) {
  return (
    <Card className="p-2 text-xs">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <ConfigIcon icon={config.icon || 'Bot'} />
          <div>{config.name}</div>
        </div>
        <div className="text-end">
          <Badge variant="outline">{config.totalUsing} using</Badge>
          <LastUpdate timestamp={config.lastUpdate} />
        </div>
      </div>
    </Card>
  )
}

export default function ConfigsPage() {
  return (
    <ContentLayout title={routeConfig.configs.label} actions={<div className="flex"></div>}>
      <div className="grid grid-cols-1 auto-rows-auto gap-2 md:grid-cols-2">
        <ConfigCard
          config={{
            name: 'test',
            totalUsing: 10,
            icon: 'Axe',
            lastUpdate: new Date(),
            description: 'test'
          }}
        />
        <ConfigCard
          config={{ name: 'test', totalUsing: 10, icon: 'Fish', lastUpdate: new Date() }}
        />
        <ConfigCard
          config={{ name: 'test', totalUsing: 10, icon: 'Apple', lastUpdate: new Date() }}
        />
        <ConfigCard
          config={{ name: 'test', totalUsing: 10, icon: 'Pickaxe', lastUpdate: new Date() }}
        />
      </div>
    </ContentLayout>
  )
}
