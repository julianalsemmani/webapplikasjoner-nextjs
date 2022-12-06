import { NextApiRequest, NextApiResponse } from 'next'
import * as overwriteController from '../../../features/overwrites/overwrites.controller'
import { Result } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      return await overwriteController.getAllOverwrites(res)
    case 'post':
      const { weekId, employeeNum, currentDay, employee } = req.body

      const createdOverwrite = await prisma.overwrites.create({
        data: {
          weekId: weekId,
          employeeNum: employeeNum,
          day: {
            currentDay,
          },
          employee: {
            create: employee,
          },
        },
      })

      return res.status(200).json(createdOverwrite)
    // return await overwriteController.createOverwrite({ req, res })
    default:
      return res
        .status(405)
        .json({ status: false, error: 'Method not allowed' })
  }
}
