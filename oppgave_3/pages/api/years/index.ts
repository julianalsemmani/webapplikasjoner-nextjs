import { NextApiRequest, NextApiResponse } from 'next'
import * as yearController from '../../../features/years/years.controller'
import { Result } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await yearController.getAllYears(res)
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
