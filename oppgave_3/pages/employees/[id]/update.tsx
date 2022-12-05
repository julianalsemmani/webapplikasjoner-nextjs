import { useEffect, useState } from 'react'
import { Employee } from '../../../types'
import Navbar from '../../../components/Navbar'
import { useRouter } from 'next/router'
import { e } from 'vitest/dist/index-40e0cb97'
import { employees } from '../../../data/employees'
import { getEmployeeById } from '../../../api/employees'

export default function Employees() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')
  const [employeeId, setEmployeeId] = useState<string>('')

  const isLoading = status === 'loading'
  const isError = status === 'error'

  const router = useRouter()
  
  useEffect(() => {
    setEmployeeId(String(router.query.id));
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId: String(employeeId), name: String(name) }),
      })

      const data = await response.json()
      console.log(data)

      setStatus('success')
      router.push(`/employees`)
    } catch (error) {
      setStatus('error')
      console.log(error)
    }
  }

  if (isLoading) {
    return <p>Henter data ...</p>
  }

  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <>
      <main>
        <Navbar />
        <h2>Oppdater navn til ansatt med Id: {employeeId}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nytt Navn:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </>
  )
}
