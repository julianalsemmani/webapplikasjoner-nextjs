import { PrismaClientValidationError } from '@prisma/client/runtime'
import prisma from '../../lib/db'

export const getAllWeeks = async () => {
  try {
    const weeks = await prisma.week.findMany({
      include: {
        day: {
          include: {
            employee: true,
            overWrites: {
              include: {
                employee: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return {
      status: true,
      data: weeks,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting all weeks',
    }
  }
}

export const getWeekByURL = async (id: string) => {
  try {
    const week = await prisma.week.findUnique({
      include: {
        day: {
          include: {
            employee: true,
            overWrites: {
              include: {
                employee: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id,
      },
    })

    return {
      status: true,
      data: week,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting week by URL',
    }
  }
}

export const getWeeksByQueryParameters = async (from: number, to: number) => {
  try {
    const weeks = await prisma.week.findMany({
      include: {
        day: {
          include: {
            employee: true,
            overWrites: {
              include: {
                employee: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        week: {
          gte: from,
          lte: to,
        },
      },
    })

    return {
      status: true,
      data: weeks,
    }
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return {
        status: false,
        error: 'Invalid query parameters',
      }
    } else {
      return {
        status: false,
        error: 'Failed getting weeks by query parameters',
      }
    }
  }
}
