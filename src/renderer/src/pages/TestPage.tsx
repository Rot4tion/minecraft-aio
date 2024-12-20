import { Button } from '@/components/ui/button'
import { ContentLayout } from '@renderer/components/admin-panel/content-layout'
import { MCServerTable } from '@shared/db/schema/mc-server.schema'
import { users } from '@shared/db/schema/user.schema'
import { webDb } from '@shared/db/webDB'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    const fetchData = async () => {
      setData(await webDb.select().from(MCServerTable))
    }

    fetchData()
  }, [])

  return (
    <ContentLayout title="Test">
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
        <div>{JSON.stringify(data, null, 2)}</div>
      </div>
    </ContentLayout>
  )
}
