import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Day, Week } from '../types'

export default function WeekCards() {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [toggle, setToggle] = useState<any>({})

  function toggleFunction(id: string) {
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    })
  }

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/weeks', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

        setWeeks(Object.values(data.data))
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [])

  return (
    <>
      {weeks.map((week: Week) => {
        return (
          <>
            <section>
              <h2>Uke {week.week}</h2>
              <button
                onClick={() => toggleFunction(week.id)}
                style={{ display: toggle[week.id] ? 'none' : 'block' }}
              >
                Se dager
              </button>
              <ul
                key={week.id}
                style={{ display: toggle[week.id] ? 'block' : 'none' }}
              >
                {week.day.map((day: Day) => {
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
                <button onClick={() => toggleFunction(week.id)}>
                  Lukk dager
                </button>
              </ul>
            </section>
          </>
        )
      })}
    </>
  )
}
