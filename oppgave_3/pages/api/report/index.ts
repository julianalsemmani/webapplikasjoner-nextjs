import {NextApiRequest, NextApiResponse} from "next";
import ExcelJS from 'exceljs'

import prisma from "../../../lib/db";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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

      const workbook = new ExcelJS.Workbook()
      const sheet = workbook.addWorksheet("report")
      sheet.columns = [
        {header: 'Week', key: 'week'},
        {header: 'Day', key: 'day'},
        {header: 'Employee', key: 'employee'},
      ]

      weeks.map((week) => {
        sheet.addRow({week: week.week})
        week.day.map((day) => {
          sheet.addRow({day: day.name, employee: day.employee.name})
        })
      })

      const buff = await workbook.xlsx.writeBuffer()

      return res
        .status(200)
        .setHeader('Content-Length', buff.byteLength)
        .setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        .setHeader('Content-Disposition', 'attachment; filename=report.xlsx')
        .send(buff)
    default:
      return res.status(405).json({
        status: false,
        error: 'Method not allowed',
      })
  }
}
