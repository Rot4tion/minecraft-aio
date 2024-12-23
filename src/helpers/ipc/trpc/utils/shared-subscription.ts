import { observable } from '@trpc/server/observable'

export class SharedSubscription<T> {
  private observers = new Set<any>()
  private interval: NodeJS.Timeout | null = null
  private intervalMs: number
  private generator: () => T

  constructor(intervalMs: number, generator: () => T) {
    this.intervalMs = intervalMs
    this.generator = generator
  }

  subscribe() {
    return observable<T>((observer) => {
      this.observers.add(observer)

      if (!this.interval) {
        this.interval = setInterval(() => {
          const data = this.generator()
          this.observers.forEach((obs) => obs.next(data))
        }, this.intervalMs)
      }

      return () => {
        this.observers.delete(observer)
        if (this.observers.size === 0 && this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      }
    })
  }
}
