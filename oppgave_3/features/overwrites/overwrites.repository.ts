import prisma from '../../lib/db'

export const getAllOverwrites = async () => {
  try {
    const overwrites = await prisma.overwrites.findMany({
      include: {
        day: true,
        employee: {
          select: {
            name: true,
          },
        },
      },
    })

    return {
      status: true,
      data: overwrites,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting all overwrites',
    }
  }
}

export const createOverwrite = async (dayId: string, employeeNum: number) => {
  try {
    const createdOverwrite = await prisma.overwrites.create({
      data: {
        dayId,
        employeeNum,
      },
    })

    return {
      status: true,
      data: createdOverwrite,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed creating an overwrite',
    }
  }
}
