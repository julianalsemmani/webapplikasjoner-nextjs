import * as weekRepository from './weeks.repository'

export const getAllWeeks = async () => {
  const weeks = await weekRepository.getAllWeeks()

  if (!weeks?.status) {
    return {
      status: false,
      error: weeks.error,
    }
  }

  return { status: true, data: weeks.data }
}

export const getWeekByURL = async (id: string) => {
  const week = await weekRepository.getWeekByURL(id)

  if (!week.status) {
    return {
      status: false,
      error: week.error,
    }
  }

  return { status: true, data: week.data }
}

export const getWeeksByQueryParameters = async (from: number, to: number) => {
  const weeks = await weekRepository.getWeeksByQueryParameters(from, to)

  if (!weeks.status) {
    return {
      status: false,
      error: weeks.error,
    }
  }

  return { status: true, data: weeks.data }
}
