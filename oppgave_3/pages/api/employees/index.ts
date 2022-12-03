import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db'
import { Result } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      // TODO: FIX TYPO IN PRISMA SCHEMA "EMPLOEE" -> "EMPLOYEE"
      const employees = await prisma.emploee.findMany({
        include: {
          day: {
            include: {
              week: true,
            },
          },
        },
      })

      return res.status(200).json({ status: true, data: { ...employees } })
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
