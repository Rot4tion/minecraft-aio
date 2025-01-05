import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { routeConfig } from '@renderer/routes/routes.config'
import { useGlobalStore } from '@renderer/store/global-store'

function BotTable() {
  const servers = useGlobalStore((x) => x.servers)
  return (
    <div className="grid grid-cols-1 auto-rows-auto gap-2 md:grid-cols-2">
      {/* {mcServers.map((server) => (
        <ServerCard key={server.id} server={server}></ServerCard>
      ))} */}
    </div>
  )
}

export default function AccountsPage() {
  return (
    <ContentLayout title={routeConfig.accounts.label} actions={<div className="flex"></div>}>
      <div>
        <BotTable />
      </div>
    </ContentLayout>
  )
}
