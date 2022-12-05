import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { E } from 'vitest/dist/global-732f9b14'
import prisma from '../../../../lib/db'
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
