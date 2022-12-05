import { NextApiResponse } from 'next'
import { MVCProps, Result } from '../../types'
import * as employeeService from './employees.service'

export const createEmployee = async ({
  employeeNum,
  name,
  rules,
  res,
}: MVCProps) => {
  if (!employeeNum || !name || !rules) {
    return res.status(400).json({
      status: false,
      error: 'Missing fields',
    })
  }

  const createdEmployee = await employeeService.createEmployee({
    employeeNum,
    name,
    rules,
  })

  if (!createdEmployee.status) {
    return res.status(500).json({
      status: false,
      error: createdEmployee.error!,
    })
  }

  return res.status(201).json({
    status: true,
    data: { ...createdEmployee.data },
  })
}

export const getAllEmployees = async (res: NextApiResponse<Result>) => {
  const employees = await employeeService.getAllEmployees()

  if (!employees.status) {
    return res.status(500).json({
      status: false,
      error: 'Failed getting employees',
    })
  }

  return res.status(200).json({
    status: true,
    data: { ...employees.data },
  })
}
