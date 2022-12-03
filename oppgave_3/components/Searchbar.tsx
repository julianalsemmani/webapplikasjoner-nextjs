import { useState } from 'react'
import { Employee } from '../types'
import { getEmployeeByName, getEmployeeById } from '../api/employees'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')
  // const [employee, setEmployee] = useState<Employee>()

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const result = await getEmployeeByName(name)
      // const result = await getEmployeeById('clb6vybl50000v7q0jv2mz3z1')
      setStatus('success')
      // console.log(result)
      router.push(`/employees/${result?.data.id}`)
    } catch (error) {
      setStatus('error')
      console.log(error)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
    }
  }

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Fant ikke ansatt ...</p>
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
