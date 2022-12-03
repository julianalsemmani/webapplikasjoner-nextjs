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

      const week = await prisma.week.findUnique({
        include: {
          day: {
            include: {
              employee: true,
            },
          },
        },
        where: {
          id,
        },
      })

      if (!week)
        return res.status(404).json({
          status: false,
          error: 'Week not found',
        })

      return res.status(200).json({ status: true, data: week })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
