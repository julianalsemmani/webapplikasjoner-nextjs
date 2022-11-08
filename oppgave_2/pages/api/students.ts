import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const students = await prisma.student.findMany()

      return res.status(200).json({ status: true, data: students })
    default:
      return res.status(405).json({
        status: false,
        message: 'Method not allowed',
      })
  }
}
