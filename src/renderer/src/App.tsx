import { syncThemeWithLocal } from '@/helpers/theme_helpers'
import { RouterProvider } from '@tanstack/react-router'
import { useEffect } from 'react'
import { router } from './routes/router'
import { useGlobalStore } from './store/global-store'

function Init() {
  const { initData } = useGlobalStore()

  useEffect(() => {
    console.log('Init')
    initData()
    syncThemeWithLocal()
  }, [])
}

function App(): JSX.Element {
  Init()
  return <RouterProvider router={router} />
}

export default App
