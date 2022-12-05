import fetcher from '../lib/fetch'

const BASE_URL = '/api'
const EMPLOYEES_URL = `${BASE_URL}/employees`

export const getEmployeeById = (id: string) => {
  return fetcher(`${EMPLOYEES_URL}/${id}`, {
    method: 'GET',
  })
}

export const getEmployeeByName = (name: string) => {
  // TODO: transform name
  // name.toLowerCase()

  return fetcher(`${EMPLOYEES_URL}/name/${name}`, {
    method: 'GET',
  })
}
