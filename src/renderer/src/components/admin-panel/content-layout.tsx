import { Navbar } from '@/components/admin-panel/navbar'

interface ContentLayoutProps {
  title: string
  children: React.ReactNode
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="px-2 pt-4 pb-4 sm:px-4">{children}</div>
    </div>
  )
}
