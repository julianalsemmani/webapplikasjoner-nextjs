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
      <h1>Lunsjkalender</h1>
      <Navbar />

      <h2>Uke {week?.week}</h2>
      <ul key={week?.week}>
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
      </ul>
    </>
  )
}
