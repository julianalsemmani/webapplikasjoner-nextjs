import { MVCEmployeeProps } from '../../types'
import * as employeeRepository from './employees.repository'

export const createEmployee = async ({
  employeeNum,
  name,
  rules,
}: MVCEmployeeProps) => {
  const existingEmployee = await employeeRepository.employeeExists({
    employeeNum,
    name,
    rules,
  })

  if (existingEmployee.status) {
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
