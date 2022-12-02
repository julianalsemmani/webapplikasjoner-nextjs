import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function WeekCards() {
  const [weeks, setWeeks] = useState<any>([])
  const [toggle, setToggle] = useState<any>({})

  function toggleFunction(id: any) {
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

        setWeeks(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [])

  return (
    <>
      {weeks.map((week: any) => {
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
                {week.day.map((day: any) => {
                  return (
                    <>
                      <li key={day.name}>
                        <span>{day.name}</span>
                        <span>{day.employee.name}</span>
                      </li>
                    </>
                  )
                })}
                <button onClick={() => setToggle(false)}>Lukk dager</button>
              </ul>
            </section>
          </>
        )
      })}
    </>
  )
}
