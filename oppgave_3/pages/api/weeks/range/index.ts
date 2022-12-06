import {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../../lib/db"
import {Result} from "../../../../types"
import {PrismaClientValidationError} from "@prisma/client/runtime";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  switch (req.method?.toLowerCase()) {
    case 'get':
      try {
        const fromQuery = req?.query.from
        const toQuery = req?.query.to
        if (fromQuery === undefined || toQuery === undefined) {
          return res.status(400).json({status: false, error: 'Query parameters are missing'})
        }

        const from = parseInt(fromQuery as string)
        const to = parseInt(toQuery as string)

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
                      }
                    }
                  }
                }
              }, 
            },
          },
          where: {
            week: {
              gte: from,
              lte: to
            }
          }
        })

        return res.status(200).json({status: true, data: {...weeks}})
      } catch (e) {
        if (e instanceof PrismaClientValidationError) {
          return res.status(400).json({
            status: false,
            error: 'Invalid query parameters'
          })
        }
        return res.status(500).json({
          status: false,
          error: 'Internal server error'
        })
      }
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
