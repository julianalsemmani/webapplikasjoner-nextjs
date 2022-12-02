import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const weeks = await prisma.week.findMany({
        include: {
          day: {
            include: {
              employee: true,
            },
          },
        },
      })

      return res.status(200).json({ status: true, data: weeks })
    default:
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
      })
  }
}
