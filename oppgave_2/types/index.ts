export type Data = {
  status: true
  data: Record<string, unknown> | Record<string, unknown>[]
}

export type Error = {
  status: false
  error: string
}

export type Result = Data | Error

export type Student = {
  id: string
  name: string
  gender: string
  age: number
  group: string
}
