import { useLocalStorageState } from 'ahooks'

export interface ShitTime {
	year: number
	month: number
	day: number
	times: number
	note: string
}

export type ShitManager = ReturnType<typeof useShitManager>

export function useShitManager() {
	const [shitTimes, setShitTimes] = useLocalStorageState<ShitTime[]>('shit-times', {
		defaultValue: [],
		listenStorageChange: true,
	})

	const addShitTime = (date: Date = new Date()) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		setShitTimes((v) => {
			const shitTimes = v ?? []
			const shitTime = shitTimes.find((v) => v.year === year && v.month === month && v.day === day)
			if (shitTime) {
				shitTime.times += 1
			} else {
				const record = {
					year,
					month,
					day,
					times: 1,
					note: '',
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

		return shitTimes.find((v) => v.year === year && v.month === month && v.day === day)
	}

	const setShitNote = (note: string, date: Date = new Date()) => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		setShitTimes((v) => {
			const shitTimes = v ?? []
			const shitTime = shitTimes.find((v) => v.year === year && v.month === month && v.day === day)
			if (shitTime) {
				shitTime.note = note
			} else {
				const record = {
					year,
					month,
					day,
					times: 0,
					note: note,
				}
				shitTimes.push(record)
			}

			return [...shitTimes]
		})
	}

	const clearShitTimes = () => setShitTimes([])

	return {
		shitTimes,
		setShitTimes,
		addShitTime,
		getShitTime,
		setShitNote,
		clearShitTimes,
	}
}
