import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const name =
        req.query.name instanceof Array
          ? req.query.name.find((i) => i.includes('name'))
          : req.query.name
      console.log(name)
      if (!name)
        return res
          .status(400)
          .json({ success: false, error: 'Name is missing' })
      const employees = await prisma.employee.findMany({
        include: {
          day: {
            include: {
              week: true,
            },
          },
        },
        where: {
          name,
        },
      })

      console.log(employees)
      if (!employees)
        return res
          .status(404)
          .json({ status: false, error: 'Employee not found' })

      return res.status(200).json({ success: true, data: employees })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
