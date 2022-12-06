import { MVCEmployeeProps } from '../../types'
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

export const createOverwrite = async (id: string, data: MVCEmployeeProps) => {
  const overwrite = await overwriteRepository.createOverwrite(id, data)

  if (!overwrite?.status) {
    return {
      status: false,
      error: overwrite.error,
    }
  }

  return { status: true, data: overwrite.data }
}
