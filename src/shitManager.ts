import { useLocalStorageState } from "ahooks"

export interface ShitTime {
  year: number
  month: number
  day: number
  times: number
}

export type ShitManager = ReturnType<typeof useShitManager>

export function useShitManager() {
  const [shitTimes, setShitTimes] = useLocalStorageState<ShitTime[]>(
    'shitTimes',
    {
      defaultValue: [],
      listenStorageChange: true,
      serializer: v => JSON.stringify(v),
      deserializer: v => JSON.parse(v)
    }
  )

  const addShitTime = (date: Date = new Date()) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    setShitTimes(v => {
      const shitTimes = v ?? []
      const shitTime = shitTimes.find(
        v => v.year === year && v.month === month && v.day === day
      )
      if (shitTime) {
        shitTime.times += 1
      } else {
        const record = {
          year,
          month,
          day,
          times: 1
        }
        shitTimes.push(record)
      }

      return [...shitTimes]
    })
  }

  const getShitTime = (date: Date = new Date()) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return shitTimes.find(
      v => v.year === year && v.month === month && v.day === day
    )
  }

  return {
    shitTimes,
    setShitTimes,
    addShitTime,
    getShitTime
  }
}


