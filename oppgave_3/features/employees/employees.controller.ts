import { NextApiResponse } from 'next'
import { MVCRequestResponse, Result } from '../../types'
import * as employeeService from './employees.service'

export const createEmployee = async ({ req, res }: MVCRequestResponse) => {
  const { employeeNum, name, rules } = req.body

  if (!employeeNum || !name || !rules) {
    return res.status(400).json({
      status: false,
      error: 'Missing required fields: employeeNum, name, rules',
    })
  }

  const createdEmployee = await employeeService.createEmployee({
    employeeNum,
    name,
    rules,
  })

  if (!createdEmployee?.status) {
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

  if (!employees?.status) {
    return res.status(500).json({
      status: false,
      error: 'Failed getting employees',
    })
  }

  return res.status(200).json({
    status: true,
    // FIXME: typescript-error
    data: employees.data,
  })
}

export const getEmployeeByURL = async ({ req, res }: MVCRequestResponse) => {
  const id =
    req.query.id instanceof Array
      ? req.query.id.find((i) => i.includes('id'))
      : req.query.id

  if (!id)
    return res.status(400).json({ status: false, error: 'Id is missing' })

  const employee = await employeeService.getEmployeeByURL(id)

  if (!employee?.status) {
    return res.status(404).json({ status: false, error: 'Employee not found' })
  }

  return res.status(200).json({ status: true, data: { ...employee.data } })
}

export const updateEmployeeByURL = async ({ req, res }: MVCRequestResponse) => {
  const { id: id, ...data } = req.body

  if (!id) {
    return res.status(400).json({ status: false, error: 'Id not found' })
  } else if (!data) {
    return res.status(400).json({ status: false, error: 'Missing data' })
  }

  const updatedEmployee = await employeeService.updateEmployeeByURL(id, data)

  return res
    .status(200)
    .json({ status: true, data: { ...updatedEmployee.data } })
}

export const getEmployeeBySearchingName = async ({
  req,
  res,
}: MVCRequestResponse) => {
  const name =
    req.query.name instanceof Array
      ? req.query.name.find((i) => i.includes('name'))
      : req.query.name

  if (!name)
    return res.status(400).json({ status: false, error: 'Name is missing' })

  const employee = await employeeService.getEmployeeBySearchingName(name)

  if (!employee?.status)
    return res.status(404).json({ status: false, error: 'Employee not found' })

  // FIXME: Typescript error
  return res.status(200).json({ status: true, data: employee.data })
}
