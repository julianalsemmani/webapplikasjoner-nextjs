import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Day, Week } from '../../../types'
import Navbar from '../../../components/Navbar'

export default function Week() {
  const router = useRouter()
  const [week, setWeek] = useState<Week>()

  useEffect(() => {
    const weekId = router.query.id

    if (!weekId) return

    const handler = async () => {
      try {
        const response = await fetch(`/api/weeks/${weekId}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        setWeek(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [router.query])

  return (
    <>
      <main>
        <h1>Lunsjkalender</h1>
        <Navbar />

        <h2>Uke {week?.week}</h2>
        <table className="table-style" key={week?.id}>
          <thead>
            <tr>
              <th>Mandag</th>
              <th>Tirsdag</th>
              <th>Onsdag</th>
              <th>Torsdag</th>
              <th>Fredag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {week?.day.map((day: Day) => {
                return (
                  <td key={day.id}>
                    <Link href={`/employees/${day.employee.id}`}>
                      {day.employee.name}
                    </Link>
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
        {/* <ul key={week?.week}>
          {week?.day.map((day: Day) => {
            return (
              <>
                <li key={day.id}>
                  <span>{day.name}</span>{' '}
                  <Link href={`/employees/${day.employee.id}`}>
                    {day.employee.name}
                  </Link>
                </li>
              </>
            )
          })}
        </ul> */}
      </main>
    </>
  )
}
