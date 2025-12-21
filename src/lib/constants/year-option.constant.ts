export type YearOption = {
  value: number
  label: string
}

const CURRENT_YEAR = new Date().getFullYear()
const PAST_YEARS = 10
const FUTURE_YEARS = 1

export const YEAR_OPTIONS: YearOption[] = Array.from(
  { length: PAST_YEARS + FUTURE_YEARS + 1 },
  (_, i) => {
    const year = CURRENT_YEAR + FUTURE_YEARS - i
    return {
      value: year,
      label: String(year),
    }
  }
)
