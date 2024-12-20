import AdminPanelLayout from '@renderer/components/admin-panel/admin-panel-layout'
import React from 'react'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPanelLayout>
      <main>{children}</main>
    </AdminPanelLayout>
  )
}
