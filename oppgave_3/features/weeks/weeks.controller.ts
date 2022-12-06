import { NextApiResponse } from 'next'
import { MVCRequestResponse, Result } from '../../types'
import * as weekService from './weeks.service'

export const getAllWeeks = async (res: NextApiResponse<Result>) => {
  const weeks = await weekService.getAllWeeks()

  if (!weeks?.status) {
    return res.status(500).json({
      status: false,
      error: 'Failed getting weeks',
    })
  }

  return res.status(200).json({
    status: true,
    data: weeks.data!,
  })
}

export const getWeekByURL = async ({ req, res }: MVCRequestResponse) => {
  const id =
    req.query.id instanceof Array
      ? req.query.id.find((i) => i.includes('id'))
      : req.query.id

  if (!id)
    return res.status(400).json({ status: false, error: 'Id is missing' })

  const week = await weekService.getWeekByURL(id)

  if (!week?.status) {
    return res.status(404).json({
      status: false,
      error: 'Week not found',
    })
  }

  return res.status(200).json({
    status: true,
    data: { ...week.data },
  })
}

export const getWeeksByQueryParameters = async ({
  req,
  res,
}: MVCRequestResponse) => {
  const fromQuery = req?.query.from
  const toQuery = req?.query.to

  if (fromQuery === undefined || toQuery === undefined) {
    return res
      .status(400)
      .json({ status: false, error: 'Query parameters are missing' })
  }

  const from = parseInt(fromQuery as string)
  const to = parseInt(toQuery as string)

  const weeks = await weekService.getWeeksByQueryParameters(from, to)

  if (!weeks?.status) {
    switch (weeks?.error) {
      case 'Invalid query parameters':
        return res.status(403).json({
          status: false,
          error: weeks?.error,
        })
      case 'Failed getting weeks by query parameters':
        return res.status(500).json({
          status: false,
          error: weeks?.error,
        })
    }
  }

  return res.status(200).json({
    status: true,
    data: weeks.data!,
  })
}
