import { MVCEmployeeProps } from '../../types'

export const employeeExists = async ({ employeeNum }: MVCEmployeeProps) => {
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
