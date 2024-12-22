import { nativeTheme } from 'electron'
import { publicProcedure, router } from '../trpc'

export const themeRouter = router({
  toggleTheme: publicProcedure.mutation(() => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  }),
  current: publicProcedure.mutation((): 'dark' | 'light' | 'system' => nativeTheme.themeSource),
  dark: publicProcedure.mutation(() => (nativeTheme.themeSource = 'dark')),
  light: publicProcedure.mutation(() => (nativeTheme.themeSource = 'light')),
  system: publicProcedure.mutation(() => {
    nativeTheme.themeSource = 'system'
    return nativeTheme.shouldUseDarkColors
  })
})
