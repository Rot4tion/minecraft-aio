import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { trpcReact } from '@/helpers/ipc/trpc/trpc-react'
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
import { GlobalState } from '@renderer/store/global-store'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const StressTestSchema = z.object({
  amount: z.number().min(1),
  delay: z.coerce.number().optional(),
  namePrefix: z.string().optional()
})
export function StressTestDialog({
  open,
  server,
  setOpen
}: {
  open?: boolean
  server: GlobalState['servers'][number]
  setOpen?: (open: boolean) => void
}) {
  const { mutate } = trpcReact.botManager.createStressTestBot.useMutation()
  const form = useForm<z.infer<typeof StressTestSchema>>({
    resolver: zodResolver(StressTestSchema),
    defaultValues: {
      amount: 20,
      namePrefix: 'bot_'
    }
  })
  async function onSubmit(values: z.infer<typeof StressTestSchema>) {
    mutate({
      amount: values.amount,
      options: { host: server.host, delay: values.delay, namePrefix: values.namePrefix }
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Stress Test Bot</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="namePrefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bot Name Prefix</FormLabel>
                  <FormControl>
                    <Input placeholder="Name prefix (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delay</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Delay ms (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose className="w-full">
              <Button className="w-full max-w-none" type="submit">
                Test
              </Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
