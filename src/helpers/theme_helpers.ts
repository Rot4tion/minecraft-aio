import { ThemeMode } from '../types/theme-mode'
import { trpcClient } from './ipc/trpc/trpc-client'

const THEME_KEY = 'theme'

export interface ThemePreferences {
  system: ThemeMode
  local: ThemeMode | null
}

export async function getCurrentTheme(): Promise<ThemePreferences> {
  const currentTheme = await trpcClient.theme.current.mutate()
  const localTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null

  return {
    system: currentTheme,
    local: localTheme
  }
}

export async function setTheme(newTheme: ThemeMode) {
  switch (newTheme) {
    case 'dark':
      await trpcClient.theme.dark.mutate()
      updateDocumentTheme(true)
      break
    case 'light':
      await trpcClient.theme.light.mutate()
      updateDocumentTheme(false)
      break
    case 'system':
      const isDarkMode = await trpcClient.theme.system.mutate()
      updateDocumentTheme(isDarkMode)
      break
  }

  localStorage.setItem(THEME_KEY, newTheme)
}

export async function toggleTheme() {
  const isDarkMode = await trpcClient.theme.toggleTheme.mutate()
  const newTheme = isDarkMode ? 'dark' : 'light'
  updateDocumentTheme(isDarkMode)
  localStorage.setItem(THEME_KEY, newTheme)
}

export async function syncThemeWithLocal() {
  const { local } = await getCurrentTheme()
  if (!local) {
    setTheme('system')
    return
  }

  await setTheme(local)
}

function updateDocumentTheme(isDarkMode: boolean) {
  if (!isDarkMode) {
    document.documentElement.classList.remove('dark')
  } else {
    document.documentElement.classList.add('dark')
  }
}
