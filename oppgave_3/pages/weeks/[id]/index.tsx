import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Day, Week } from '../../../types'

export default function Weeks() {
  const router = useRouter()
  const [week, setWeek] = useState<Week[]>([])

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
      <h2>Uke {week.week}</h2>
      <Link href={`/`}>Gå tilbake</Link>
      <p>Listen er kommentert ut, se discord for problemet</p>
      {/* <ul key={week.week}>
        {week.day.map((day: Day) => {
          return (
            <li key={day.id}>
              <span>{day.name}</span>
              <span>{day.employee.name}</span>
            </li>
          )
        })}
      </ul> */}
    </>
  )
}
