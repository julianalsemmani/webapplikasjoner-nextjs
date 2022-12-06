import * as overwriteRepository from './overwrites.repository'

export const getAllOverwrites = async () => {
  const overwrites = await overwriteRepository.getAllOverwrites()

  if (!overwrites?.status) {
    return {
      status: false,
      error: overwrites.error,
    }
  }

  return { success: true, data: overwrites.data }
}

export const createOverwrite = async (dayId: string, employeeNum: number) => {
  const createdOverwrite = await overwriteRepository.createOverwrite(
    dayId,
    employeeNum
  )

  if (!createdOverwrite?.status) {
    return {
      status: false,
      error: createdOverwrite.error,
    }
  }

  if (!createdOverwrite?.status) {
    return {
      status: false,
      error: createdOverwrite.error,
    }
  }

  return { status: true, data: createdOverwrite.data }
}
