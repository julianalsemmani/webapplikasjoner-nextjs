import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/db'
import { Result } from '../../../../types'

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

      // TODO: FIX TYPO IN PRISMA SCHEMA
      const employee = await prisma.emploee.findUnique({
        include: {
          day: {
            include: {
              week: true,
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

    case 'put':
      const { id: Id, ...data } = req.body
      const updatedEmployee = await prisma.emploee.update({
        where: {
          id: Id,
        },
        data,
      })

      return res.status(200).json({ status: true, data: updatedEmployee })
  }
}
