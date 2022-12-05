import type { NextApiRequest, NextApiResponse } from 'next'
import { employees } from '../../data/employees'
import { PrismaClient } from '@prisma/client'
import { years } from '../../data/years'

const prisma = new PrismaClient()

const LUNCH = require('../../data/lunch.json')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    for (const employee of employees) {
      await prisma.employee.create({
        data: {
          employeeNum: employee.id,
          name: employee.name,
          rules: employee.rules,
        },
      })
    }

    for (let year of years) {
      const yearRecord = await prisma.year.create({
        data: { name: year.name },
      })

      for (let week in LUNCH.year) {
        const weekInt = parseInt(week)
        const weekRecord = await prisma.week.create({
          data: {
            week: weekInt,
            yearId: yearRecord.id,
          },
        })
        for (let day in LUNCH.year[week].week) {
          if (LUNCH.year[week].week[day] !== null) {
            await prisma.day.create({
              data: {
                name: day,
                employeeNum: LUNCH.year[week].week[day].id,
                weekId: weekRecord.id,
              },
            })
          }
        }
      }
    }
    return res
      .status(200)
      .json({ success: true, message: 'seeded the demo data successfully :p' })
  } catch (e) {}
}
