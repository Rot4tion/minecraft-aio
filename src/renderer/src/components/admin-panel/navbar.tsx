import { SheetMenu } from '@/components/admin-panel/sheet-menu'

interface NavbarProps {
  title: string
  actions?: React.ReactNode
}

export function Navbar({ title, actions }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="flex items-center mx-4 h-14 sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 justify-end items-center">{actions}</div>
      </div>
    </header>
  )
}
