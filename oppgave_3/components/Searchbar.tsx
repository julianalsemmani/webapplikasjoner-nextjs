import { useState } from 'react'
import { Employee } from '../types'

export default function SearchBar() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')
  const [employee, setEmployee] = useState<Employee>()

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setStatus('loading')

    // Check if employee exists by using function that returns an employee using name
    // --> if (getEmployee)
    // --> setEmployee(getEmployee)
    // --> setStatus('success')
    // --> Redirect to employee page = /employees/${employee.id}

    // --> else setStatus('error')
    // --> "Employee not found"
  }

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Søk</button>
    </form>
  )
}
