import * as yearRepository from './years.repository'

export const getAllYears = async () => {
  const years = await yearRepository.getAllYears()

  if (!years?.status) {
    return {
      status: false,
      error: years.error,
    }
  }

  return { status: true, data: years.data }
}
