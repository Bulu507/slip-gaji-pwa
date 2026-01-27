import type { MealAllowancePeriod } from "../models/meal-allowance-period.model"

const periods: MealAllowancePeriod[] = []

let subscribers: Array<
  (data: MealAllowancePeriod[]) => void
> = []

const notify = () => {
  subscribers.forEach((cb) => cb([...periods]))
}

export const getMealAllowancePeriods = (): MealAllowancePeriod[] => {
  return [...periods]
}

export const subscribeMealAllowancePeriods = (
  callback: (data: MealAllowancePeriod[]) => void
) => {
  subscribers.push(callback)

  return () => {
    subscribers = subscribers.filter((cb) => cb !== callback)
  }
}

export const upsertMealAllowancePeriod = (
  period: MealAllowancePeriod
) => {
  const index = periods.findIndex((p) => p.id === period.id)

  if (index >= 0) {
    periods[index] = period
  } else {
    periods.push(period)
  }

  notify()
}
