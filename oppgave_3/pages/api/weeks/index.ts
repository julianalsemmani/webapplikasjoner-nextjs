import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../../types'
import * as weeksController from '../../../features/weeks/weeks.controller'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const weeks = await prisma.week.findMany({
        include: {
          day: {
            include: {
              employee: true,
              overWrites: {
                include: {
                  employee: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      })

      return res.status(200).json({ status: true, data: { ...weeks } })
    // UNCOMMENT BELOW
    // return await weeksController.getAllWeeks(res)
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
