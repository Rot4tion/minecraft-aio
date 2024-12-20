import { Link } from '@tanstack/react-router'
import { MenuIcon, Pickaxe } from 'lucide-react'

import { Menu } from '@/components/admin-panel/menu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { brand } from '@renderer/constants'

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-3 h-full sm:w-72" side="left">
        <SheetHeader>
          <Button className="flex justify-center items-center pt-1 pb-2" variant="link" asChild>
            <Link to="/dashboard" className="flex gap-2 items-center">
              <Pickaxe className="mr-1 w-6 h-6" />
              <SheetTitle className="text-lg font-bold">{brand}</SheetTitle>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  )
}
