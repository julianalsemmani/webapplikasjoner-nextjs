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
      setStatus('success')
      console.log(result)
      if (result.success && result.data.length === 1) {
        await router.push(`/employees/${result?.data[0].id}`)
      }
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
    <>
      <h2>Søk på en ansatt:</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Søk</button>
      </form>
    </>
  )
}
