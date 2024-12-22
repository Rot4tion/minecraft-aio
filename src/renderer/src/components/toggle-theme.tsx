import { Button } from '@/components/ui/button'
import { trpcReact } from '@/helpers/ipc/trpc/trpc-react'
import { toggleTheme } from '@/helpers/theme_helpers'
import { Moon } from 'lucide-react'

export default function ToggleTheme() {
  return (
    <Button
      onClick={() => {
        toggleTheme()
      }}
      size="icon"
    >
      <Moon size={16} />
    </Button>
  )
}
