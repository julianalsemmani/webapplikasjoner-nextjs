import prisma from '../../lib/db'

export const getAllYears = async () => {
  try {
    const years = await prisma.year.findMany({
      include: {
        week: {
          include: {
            day: {
              include: {
                employee: true,
              },
            },
          },
        },
      },
    })

    return {
      status: true,
      data: years,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting all years',
    }
  }
}
