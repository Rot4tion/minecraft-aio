import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@renderer/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@renderer/components/ui/form'
import { Input } from '@renderer/components/ui/input'
import { useGlobalStore } from '@renderer/store/global-store'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const AddMCServerSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1)
})
export function AddServerDialog() {
  const addServer = useGlobalStore((x) => x.addServer)
  const form = useForm<z.infer<typeof AddMCServerSchema>>({
    resolver: zodResolver(AddMCServerSchema),
    defaultValues: {
      name: 'Minecraft Server',
      address: ''
    }
  })
  async function onSubmit(values: z.infer<typeof AddMCServerSchema>) {
    const data = values.address.split(':')
    const host = data[0]
    const port = Number(data[1]) || 25565
    addServer({
      name: values.name,
      host,
      port
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full" size={'icon'} variant="ghost">
          <Plus></Plus>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter server name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter the server IP or Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose className="w-full">
              <Button className="w-full max-w-none" type="submit">
                Add
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
