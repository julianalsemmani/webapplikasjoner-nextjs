import { NextApiRequest, NextApiResponse } from 'next'
import * as overwriteController from '../../../features/overwrites/overwrites.controller'
import { Result } from '../../../types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      // const overwrite = await prisma.overwrites.findMany({
      //     include: {
      //         employee: {
      //             select: {
      //                 name: true,
      //             },
      //         }
      //     }
      // });
      // return res.status(200).json(overwrite);
      return await overwriteController.getAllOverwrites(res)
    case 'post':
      //   const { id: Id, ...data } = req.body
      //   const updatedOverwrite = await prisma.overwrites.update({
      //     where: {
      //       id: Id,
      //     },
      //     data,
      //   })

      //   return res.status(200).json(updatedOverwrite)
      // FIXME: CREATE OR UPDATE?
      return await overwriteController.createOverwrite({ req, res })
    default:
      return res
        .status(405)
        .json({ status: false, error: 'Method not allowed' })
  }
}
