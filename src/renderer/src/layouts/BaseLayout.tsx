import AdminPanelLayout from '@renderer/components/admin-panel/admin-panel-layout'
import { ConfirmDialogProvider } from '@renderer/components/react-confirm-dialog/confirm-dialog'
import { router } from '@renderer/routes/router'
import React, { useEffect } from 'react'

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.addEventListener('mousedown', (e) => {
      if (e.button === 3) {
        router.history.back()
      } else if (e.button === 4) {
        router.history.forward()
      }
    })

    return () => {
      window.removeEventListener('mousedown', () => {})
    }
  }, [])
  return (
    <>
      <AdminPanelLayout>
        <main className="cursor-default">
          <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
        </main>
      </AdminPanelLayout>
    </>
  )
}
