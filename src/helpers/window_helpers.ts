import { trpcClient } from './ipc/trpc/trpc-client'

export async function minimizeWindow() {
  await trpcClient.window.minimize.mutate()
}
export async function maximizeWindow() {
  await trpcClient.window.maximize.mutate()
}
export async function closeWindow() {
  await trpcClient.window.close.mutate()
}
