import { Navbar } from '@/components/admin-panel/navbar'

interface ContentLayoutProps {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function ContentLayout({ title, actions, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} actions={actions} />
      <div className="px-2 pt-4 pb-4 sm:px-4">{children}</div>
    </div>
  )
}
