import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { Label } from '@renderer/components/ui/label'
import { Switch } from '@renderer/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@renderer/components/ui/tooltip'
import { useSidebar } from '@renderer/hooks/use-sidebar'
import { useStore } from '@renderer/hooks/use-store'

export default function SettingsPage() {
  const sidebar = useStore(useSidebar, (x) => x)!
  if (!sidebar) return null
  const { settings, setSettings } = sidebar

  return (
    <ContentLayout title="Settings">
      <TooltipProvider>
        <div className="flex gap-6 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-hover-open"
                  onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                  checked={settings.isHoverOpen}
                />
                <Label htmlFor="is-hover-open">Hover Open Sidebar</Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>When hovering on the sidebar in mini state, it will open</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </ContentLayout>
  )
}
