import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

// GROUPS FOR FAKE DATA
const groups = [
  'Informatikk',
  'Digitale medier og design',
  'Informasjonssystemer',
]

// USED TO CREATE FAKE DATA
const studentFactory = (count: number) => {
  return Array(count)
    .fill(null)
    .map(() => {
      return {
        name: faker.name.firstName(),
        gender: faker.name.sex(),
        age: faker.datatype.number({
          min: 20,
          max: 50,
        }),
        group: faker.helpers.arrayElement(groups),
      }
    })
}

async function main() {
  console.log(`Start seeding ...`)

  const students = studentFactory(20)

  for (const student of students) {
    await prisma.student.create({ data: student })
  }

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
