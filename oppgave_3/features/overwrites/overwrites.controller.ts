import { NextApiResponse } from 'next'
import { MVCRequestResponse, Result } from '../../types'
import * as overwriteService from './overwrites.service'

export const getAllOverwrites = async (res: NextApiResponse<Result>) => {
  const overwrites = await overwriteService.getAllOverwrites()

  if (!overwrites?.success) {
    return res
      .status(500)
      .json({ status: false, error: 'Failed getting overwrites' })
  }

  return res.status(200).json({
    status: true,
    data: overwrites.data!,
  })
}

export const createOverwrite = async ({ req, res }: MVCRequestResponse) => {
  const { dayId, employeeNum } = req.body

  if (!dayId || !employeeNum) {
    return res.status(400).json({
      status: false,
      error: 'Missing required fields: dayId, employeeNum',
    })
  }

  const createdOverwrite = await overwriteService.createOverwrite(
    dayId,
    employeeNum
  )

  if (!createdOverwrite?.status) {
    return res.status(500).json({
      status: false,
      error: 'Failed creating an overwrite',
    })
  }

  return res.status(201).json({
    status: true,
    data: { ...createOverwrite.data },
  })
}
