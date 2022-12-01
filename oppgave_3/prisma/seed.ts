import {PrismaClient} from '@prisma/client'
import {employees} from "../data/employees";
import {years} from "../data/years";

const LUNCH = require("../data/lunch.json")

const prisma = new PrismaClient()

const seedEmployees = async () => {
  const promises = employees.map(async (employee) => {
    await prisma.emploee.create({
      data: {
        employeeNum: employee.id,
        name: employee.name,
        rules: employee.rules
      }
    })
  })

  await Promise.all(promises)
}


const seedYear = async () => {
  for (let year of years) {
    const yearRecord = await prisma.year.create({
      data: {name: year.name}
    })

    for (let week in LUNCH.year) {
      const weekInt = parseInt(week)
      const weekRecord = await prisma.week.create({
        data: {
          week: weekInt,
          yearId: yearRecord.id
        }
      })
      for (let day in LUNCH.year[week].week) {
        if (LUNCH.year[week].week[day] !== null) {
          await prisma.day.create({
            data: {
              name: day,
              employeeNum: LUNCH.year[week].week[day].id,
              weekId: weekRecord.id
            }
          })
        }
      }
    }
  }
}

async function main() {
  console.log(`Start seeding ...`)

  await seedEmployees()
  await seedYear()

  console.log(`Seeding finished.`)
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
