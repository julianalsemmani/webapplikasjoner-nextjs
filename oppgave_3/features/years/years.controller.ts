import { NextApiResponse } from 'next'
import { Result } from '../../types'
import * as yearService from './years.service'

export const getAllYears = async (res: NextApiResponse<Result>) => {
  const years = await yearService.getAllYears()

  if (!years?.status) {
    return res.status(500).json({
      status: false,
      error: 'Failed getting years',
    })
  }

  return res.status(200).json({
    status: true,
    data: years.data!,
  })
}
