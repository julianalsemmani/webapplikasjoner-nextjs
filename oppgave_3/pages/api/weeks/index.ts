import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../types'
import * as weeksController from '../../../features/weeks/weeks.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await weeksController.getAllWeeks(res)
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
