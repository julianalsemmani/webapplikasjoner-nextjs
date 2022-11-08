import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/db'
import { Result } from '../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      const students = await prisma.student.findMany()

      return res.status(200).json({ status: true, data: { ...students } })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
