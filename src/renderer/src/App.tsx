import { syncThemeWithLocal } from '@/helpers/theme_helpers'
import { RouterProvider } from '@tanstack/react-router'
import { useEffect } from 'react'
import { router } from './routes/router'

function App(): JSX.Element {
  useEffect(() => {
    syncThemeWithLocal()
  }, [])

  return <RouterProvider router={router} />
}

export default App
