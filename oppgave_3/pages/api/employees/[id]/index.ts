import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../../types'
import * as employeeController from '../../../../features/employees/employees.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const id =
        req.query.id instanceof Array
          ? req.query.id.find((i) => i.includes('id'))
          : req.query.id

      if (!id)
        return res.status(400).json({ status: false, error: 'Id is missing' })

      const employee = await prisma.employee.findUnique({
        include: {
          day: {
            include: {
              week: true,
              overWrites: true,
            },
          },
        },
        where: {
          id,
        },
      })

      if (!employee)
        return res
          .status(404)
          .json({ status: false, error: 'Employee not found' })

      return res.status(200).json({ status: true, data: employee })
    // TODO: UNCOMMENT BELOW
    // return await employeeController.getEmployeeByURL({ req, res })

    case 'put':
      return await employeeController.updateEmployeeByURL({ req, res })

    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
