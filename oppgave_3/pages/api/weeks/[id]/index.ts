import { NextApiRequest, NextApiResponse } from 'next'
import * as weekController from '../../../../features/weeks/weeks.controller'
import { Result } from '../../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await weekController.getWeekByURL({ req, res })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
