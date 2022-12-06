import { MVCEmployeeProps } from '../../types'
import prisma from '../../lib/db'

export const employeeExistsUsingEmployeeNum = async (employeeNum: number) => {
  try {
    const existingEmployee = await prisma.employee.findUniqueOrThrow({
      where: {
        employeeNum: employeeNum,
      },
    })

    return {
      status: true,
      data: existingEmployee,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed finding employee',
    }
  }
}

export const createEmployee = async ({
  employeeNum,
  name,
  rules,
}: MVCEmployeeProps) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        // FIXME: typescript-error
        employeeNum: parseInt(employeeNum),
        name: name,
        rules: rules,
      },
    })

    return {
      status: true,
      data: employee,
    }
  } catch (error) {
    console.log(error)
    return {
      status: false,
      error: 'Failed creating employee',
    }
  }
}

export const getAllEmployees = async () => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        day: {
          include: {
            week: true,
          },
        },
      },
    })

    return {
      status: true,
      data: employees,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting all employees',
    }
  }
}

export const getEmployeeByURL = async (id: string) => {
  try {
    const employee = await prisma.employee.findUnique({
      include: {
        day: {
          include: {
            week: true,
          },
        },
      },
      where: {
        id,
      },
    })

    return {
      status: true,
      data: employee,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting employee by URL',
    }
  }
}

export const updateEmployeeByURL = async (
  id: string,
  data: MVCEmployeeProps
) => {
  try {
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: id,
      },
      data,
    })

    return {
      status: true,
      data: updatedEmployee,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed updating employee by URL',
    }
  }
}

export const getEmployeeBySearchingName = async (name: string) => {
  try {
    const employee = await prisma.employee.findMany({
      include: {
        day: {
          include: {
            week: true,
          },
        },
      },
      where: {
        name,
      },
    })

    return {
      status: true,
      data: employee,
    }
  } catch (error) {
    return {
      status: false,
      error: 'Failed getting employee by name',
    }
  }
}
