import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'
import { Result } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const year = await prisma.year.findMany({
        include: {
          week: {
            include: {
              day: {
                include: {
                  employee: true,
                },
              },
            },
          },
        },
      })

      return res.status(200).json({ status: true, data: { ...year } })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
