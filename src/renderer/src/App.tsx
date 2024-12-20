import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/router'
import { syncThemeWithLocal } from '@/helpers/theme_helpers'
import { useEffect } from 'react'

function App(): JSX.Element {
  useEffect(() => {
    syncThemeWithLocal()
  }, [])

  return <RouterProvider router={router} />
}

export default App
