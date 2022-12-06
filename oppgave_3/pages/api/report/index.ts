import {NextApiRequest, NextApiResponse} from 'next'
import * as reportController from '../../../features/report/report.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await reportController.downloadReport(res)
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
