import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../../types'
import * as employeeController from '../../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await employeeController.getEmployeeByURL({ req, res })

    case 'put':
      return await employeeController.updateEmployeeByURL({ req, res })

    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
