import { MVCEmployeeProps } from '../../types'
import * as employeeRepository from './employees.repository'

export const createEmployee = async ({
  employeeNum,
  name,
  rules,
}: MVCEmployeeProps) => {
  const existingEmployee =
    await employeeRepository.employeeExistsUsingEmployeeNum(employeeNum)

  if (existingEmployee?.status) {
    return {
      status: false,
      error: 'Employee already exists',
    }
  } else {
    const createdEmployee = await employeeRepository.createEmployee({
      employeeNum,
      name,
      rules,
    })

    if (!createdEmployee.status) {
      return {
        status: false,
        error: createdEmployee.error,
      }
    }

    return { status: true, data: createdEmployee.data }
  }
}

export const getAllEmployees = async () => {
  const employees = await employeeRepository.getAllEmployees()

  if (!employees.status) {
    return {
      status: false,
      error: employees.error,
    }
  }

  return { status: true, data: employees.data }
}

export const getEmployeeByURL = async (id: string) => {
  const employee = await employeeRepository.getEmployeeByURL(id)

  if (!employee.status) {
    return {
      status: false,
      error: employee.error,
    }
  }

  return { status: true, data: employee.data }
}

export const updateEmployeeByURL = async (
  id: string,
  data: MVCEmployeeProps
) => {
  const employee = await employeeRepository.updateEmployeeByURL(id, data)

  if (!employee?.status) {
    return {
      status: false,
      error: employee.error,
    }
  }

  return { status: true, data: employee.data }
}

export const getEmployeeBySearchingName = async (name: string) => {
  const employee = await employeeRepository.getEmployeeBySearchingName(name)

  if (!employee.status) {
    return {
      status: false,
      error: employee.error,
    }
  }

  return { status: true, data: employee.data }
}
