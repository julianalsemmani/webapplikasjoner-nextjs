import prisma from "../../lib/db";

export const downloadReport = async () => {
  try {
    const weeks = await prisma.week.findMany({
      include: {
        day: {
          include: {
            employee: true,
            overWrites: {
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
      data: weeks
    }
  } catch (e) {
    return {
      status: false,
      error: 'Failed to fetch report data'
    }
  }
}
