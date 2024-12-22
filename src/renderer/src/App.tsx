import { syncThemeWithLocal } from '@/helpers/theme_helpers'
import { RouterProvider } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { router } from './routes/router'
import { useGlobalStore } from './store/global-store'
import { trpcReact } from '@/helpers/ipc/trpc/trpc-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ipcLink } from 'electron-trpc/renderer'
import superjson from 'superjson'

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
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [ipcLink()],
      transformer: superjson
    })
  )
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpcReact.Provider>
  )
}

export default App
