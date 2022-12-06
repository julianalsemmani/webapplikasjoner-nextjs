import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import type { Day, Employee } from '../../../types'
import Link from 'next/link'

export default function Employee() {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee>()

  useEffect(() => {
    const employeeId = router.query.id

    if (!employeeId) return

    const handler = async () => {
      try {
        const response = await fetch(`/api/employees/${employeeId}`, {
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
  }, [router.query])

  return (
    <>
      <main>
        <Navbar />
        <h1>
          Ansatt: {employee?.name} | ID: {employee?.id}
        </h1>
        <table className="table-style" key={employee?.id}>
          <thead>
            <tr>
              <th>Uke</th>
              <th>Dag</th>
              <th>Navn</th>
              <th>Handling</th>
            </tr>
          </thead>

          <tbody>
            {employee?.day.map((day: Day) => {
              return (
                <tr key={day.weekId}>
                  <td>
                    <Link href={`/weeks/${day.week.id}`}>{day.week.week}</Link>
                  </td>
                  <td>{day.name}</td>
                  <td>{employee.name}</td>
                  <Link href={`/weeks/${day.week.id}/overwrite`}>Overskriv Dag</Link>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  )
}
