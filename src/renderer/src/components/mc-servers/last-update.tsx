import { formatDistanceToNow } from 'date-fns'
import { useEffect, useReducer } from 'react'

export function LastUpdate({ timestamp }: { timestamp: Date }) {
  const [, forceUpdate] = useReducer((x) => !x, false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Force re-render
      forceUpdate()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return <p>{formatDistanceToNow(timestamp, { addSuffix: true, includeSeconds: true })}</p>
}
