import { Button } from '@renderer/components/ui/button'
import { useGlobalStore } from '@renderer/store/global-store'
import { RotateCcw } from 'lucide-react'

export function RefreshAllServersButton() {
  const refreshAllServers = useGlobalStore((x) => x.refreshAllServers)

  return (
    <Button className="rounded-full" size={'icon'} variant="ghost" onClick={refreshAllServers}>
      <RotateCcw></RotateCcw>
    </Button>
  )
}
