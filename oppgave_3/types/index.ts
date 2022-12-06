import { NextApiRequest, NextApiResponse } from 'next'

export type Data = {
  status: true
  data: Record<string, unknown> | Record<string, unknown>[]
}

export type Error = {
  status: false
  error: string
}

export type Result = Data | Error

export type Employee = {
  id: string
  employeeNum: number
  name: string
  rules: string
  day: Day[]
}

export type Day = {
  id: string
  name: string
  employee: Employee
  employeeNum: number
  week: Week
  weekId: string
  overWrites: Overwrites[]
}

export type Week = {
  id: string
  week: number
  day: Day[]
  year: Year
  yearId: string
}

export type Year = {
  id: string
  name: string
  week: Week[]
}

export type Overwrites = {
  id: string
  day: Day[]
  week: Week
  weekId: string
  employee: Employee
  employeeNum: number
}

export type MVCEmployeeProps = {
  employeeNum: number
  name: string
  rules: string
}

export type MVCRequestResponse = {
  req: NextApiRequest
  res: NextApiResponse<Result>
}

export type MVCProps = {
  employeeNum: number
  name: string
  rules: string
  req: NextApiRequest
  res: NextApiResponse<Result>
}
