import { useEffect, useState } from 'react'
import { Employee } from '../../types'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/employees', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const employees = await response.json()

        // setEmployees(Object.values(data.data))
        setEmployees(employees.data)
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [])

  return (
    <>
      <main>
        <Navbar />
        <h1>Ansattliste:</h1>
        <table className="table-style">
          <thead>
            <tr>
              <th>Id</th>
              <th>Ansattnummer</th>
              <th>Navn</th>
              <th>Regler</th>
              <th>Handling</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee: Employee) => {
              return (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.employeeNum}</td>
                  <td>{employee.name}</td>
                  <td>{employee.rules}</td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>Se ansatt</Link> /{' '}
                    <Link href={`/employees/${employee.id}/update`}>
                      Oppdater
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  )
}
