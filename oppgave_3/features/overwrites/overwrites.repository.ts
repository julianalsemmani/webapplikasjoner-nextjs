import prisma from '../../lib/db'
import { MVCEmployeeProps } from '../../types'

export const getAllOverwrites = async () => {
  try {
    const overwrites = await prisma.overwrites.findMany({
      include: {
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

export const createOverwrite = async (id: string, data: MVCEmployeeProps) => {
  try {
    const createdOverwrite = await prisma.overwrites.update({
      where: {
        id: id,
      },
      data,
    })

    return {
      status: true,
      data: createdOverwrite,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed updating creating overwrite',
    }
  }
}
