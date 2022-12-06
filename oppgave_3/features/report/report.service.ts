import * as reportRepo from './report.repository'
import ExcelJS from "exceljs";

const SHEET_TITLE = 'report'
export const downloadReport = async () => {
  try {
    const response = await reportRepo.downloadReport()
    if (!response?.status){
      return {
        status: false,
        error: response?.error
      }
    }

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet(SHEET_TITLE)

    sheet.columns = [
      { header: 'Week', key: 'week' },
      { header: 'Day', key: 'day' },
      { header: 'Employee', key: 'employee' },
      { header: 'Overwrite', key: 'overwrite' },
    ]

    response.data?.map((week) => {
      sheet.addRow({ week: week.week })
      week.day.map((day) => {
        if (day.overWrites.length > 0) {
          sheet.addRow({
            day: day.name,
            employee: day.employee.name,
            overwrite: day.overWrites[0].employee.name,
          })
        } else {
          sheet.addRow({ day: day.name, employee: day.employee.name })
        }
      })
    })

    const buff = await workbook.xlsx.writeBuffer()
    return {status: true, data: buff}

  } catch (e) {
    return {
      status: false,
      error: 'Internal server error'
    }
  }
}
