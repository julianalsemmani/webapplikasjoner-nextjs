import { FormEvent, useEffect, useState } from 'react'
import { Employee } from '../../../types'
import Navbar from '../../../components/Navbar'
import { useRouter } from 'next/router'

export default function Employees() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')
  const [employee, setEmployee] = useState<Employee>()

  const isLoading = status === 'loading'
  const isError = status === 'error'

  const router = useRouter()

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch(`/api/employees/${router.query.id}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const employee = await response.json()

        setEmployee(employee.data)
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [router.query.id])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch(`/api/employees/${employee?.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: String(employee?.id), name: String(name) }),
      })

      const updatedEmployee = await response.json()

      setStatus('success')
      router.push('/employees/')
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
        <h1>Ansattinformasjon:</h1>
        <table className="table-style" key={2}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Ansattnummer</th>
              <th>Navn</th>
              <th>Regler</th>
            </tr>
          </thead>

          <tbody>
            <tr key={employee?.id}>
              <td>{employee?.id}</td>
              <td>{employee?.employeeNum}</td>
              <td>{employee?.name}</td>
              <td>{employee?.rules}</td>
            </tr>
          </tbody>
        </table>

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
