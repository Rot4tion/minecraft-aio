import { Button } from '@/components/ui/button'
import { users } from '@shared/db/schema/user.schema'
import { webDb } from '@shared/db/webDB'

export default function TestPage() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Test Page</h1>
      <Button
        onClick={async () => {
          const res = await webDb
            .insert(users)
            .values({ name: 'test', bio: 'test' })
            .returning({ id: users.id, name: users.name, bio: users.bio })
          console.log('🚀 ~ onClick={ ~ res:', res)
        }}
      >
        Test
      </Button>
    </div>
  )
}
