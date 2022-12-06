import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../../types'
import * as employeeController from '../../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'post':
      return await employeeController.createEmployee({ req, res })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
