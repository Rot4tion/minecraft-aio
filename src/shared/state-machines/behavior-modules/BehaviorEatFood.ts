import mcDataLoader from 'minecraft-data'
import { StateBehavior } from 'mineflayer-statemachine'
import { Bot } from 'mineflayer'
export type Item = {
  quantity: number
} & (
  | {
      id?: number
      name: string
    }
  | {
      id: number
      name?: string
    }
)
export type Food = Item & {
  id: NonNullable<Item['id']>
  name: NonNullable<Item['name']>
  priority: number
}
export class BehaviorEatFood implements StateBehavior {
  active: boolean
  readonly bot: Bot
  readonly mcData: mcDataLoader.IndexedData
  stateName: string
  finished: boolean

  constructor(bot: Bot) {
    this.active = false
    this.bot = bot
    this.stateName = 'BehaviorEatFood'
    this.finished = false
    this.mcData = mcDataLoader(bot.version)
  }

  onStateEntered() {
    if (this.bot.food === 20) {
      this.finished = true
    } else {
      this.eat()
    }
  }

  getAllFoods() {
    const mcDataFoods = this.mcData.foodsArray
    return mcDataFoods.map((item) => item.name)
  }

  onStateExited() {
    this.finished = false
  }

  checkFoodInInventory() {
    const validFoods: Array<Food> = []

    this.bot.inventory.items().forEach((foodInventory) => {
      const validFoodWithPriority: Food = {
        id: foodInventory.type,
        name: foodInventory.name,
        quantity: foodInventory.count,
        priority: 0
      }
      validFoods.push(validFoodWithPriority)
    })

    return validFoods
  }

  eat() {
    const availableFood = this.checkFoodInInventory().sort(function (a, b) {
      if (a.priority > b.priority) {
        return 1
      }
      if (a.priority < b.priority) {
        return -1
      }
      return 0
    })

    if (availableFood.length === 0) {
      this.finished = true
      return
    }

    const firstFoodFound = availableFood.shift()

    if (!firstFoodFound) {
      this.finished = true
      return
    }

    this.bot.equip(firstFoodFound.id, 'hand').then(() => {
      return this.bot.consume()
    })
    // .then(() => {
    //   if (!this.bot.food || this.bot.food !== 20) {
    //     this.eat()
    //   } else {
    //     this.finished = true
    //   }
    // })
    // .catch((error) => {
    //   this.finished = true
    // })
  }

  isFinished() {
    return this.finished
  }
}
