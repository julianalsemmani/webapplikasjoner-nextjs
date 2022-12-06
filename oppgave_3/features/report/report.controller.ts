import {NextApiResponse} from 'next'
import * as reportService from './report.service'

const FILE_NAME = 'report'
export const downloadReport = async (res: NextApiResponse) => {
  try {
    const buffer = await reportService.downloadReport()

    if (!buffer?.status || buffer?.data === undefined) {
      return res
        .status(500)
        .json({
          status: false,
          error: buffer?.error
        })
    }


    return res
      .status(200)
      .setHeader('Content-Length', buffer.data.byteLength)
      .setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      .setHeader('Content-Disposition', `attachment; filename=${FILE_NAME}.xlsx`)
      .send(buffer?.data)

  } catch (e) {
    return res
      .status(500)
      .json({
        status: false,
        error: 'Internal server error!'
      })
  }
}
