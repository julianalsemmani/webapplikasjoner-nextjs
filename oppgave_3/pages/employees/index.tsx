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

        const data = await response.json()

        setEmployees(Object.values(data.data))
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
            {employees.map((employee: Employee) => {
              return (
                <tr key={employee.id}>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.id}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.employeeNum}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.name}
                    </Link>
                  </td>
                  <td>
                    <Link href={`/employees/${employee.id}`}>
                      {employee.rules}
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
