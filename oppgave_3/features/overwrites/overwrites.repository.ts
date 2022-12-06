import prisma from '../../lib/db'

export const getOverwrite = async (id: string) => {
  const overwrite = await prisma.overwrites.findUnique({
    where: {
      id,
    },
  })

  if (!overwrite) {
    return { success: false, error: 'Overwrite not found' }
  }

  return { success: true, data: overwrite }
}

export const createOverwrite = async (data: any) => {
  const overwrite = await prisma.overwrites.create({
    data,
  })

  if (!overwrite) {
    return { success: false, error: 'Could not create overwrite' }
  }

  return { success: true, data: overwrite }
}

export const exists = async (name: string) => {
  const overwrite = await prisma.overwrite.findUnique({
    where: {
      name,
    },
  })

  if (overwrite) {
    return { success: true, data: overwrite }
  }

  return { success: false }
}
