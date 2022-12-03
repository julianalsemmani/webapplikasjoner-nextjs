import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Day, Week } from '../types'

export default function WeekCards() {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [toggle, setToggle] = useState<Record<string, boolean>>({})

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
              <h2 className="week-cards-title">Uke {week.week}</h2>
              <button
                onClick={() => toggleFunction(week.id)}
                style={{ display: toggle[week.id] ? 'none' : '' }}
                className="week-cards-button"
              >
                Se dager
              </button>

              <table
                className="table-style"
                key={week.id}
                style={{ display: toggle[week.id] ? '' : 'none' }}
              >
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
                    {week.day.map((day: Day) => {
                      return (
                        <>
                          {/* TODO: FIX HERE*/}
                          {day.id == null ? (
                            <td className="utilgjengelig">Utilgjengelig</td>
                          ) : (
                            <td key={day.id}>
                              <Link href={`/employees/${day.employee.id}`}>
                                {day.employee.name}
                              </Link>
                            </td>
                          )}
                        </>
                      )
                    })}
                  </tr>
                  <button
                    onClick={() => toggleFunction(week.id)}
                    className="week-cards-button"
                  >
                    Lukk dager
                  </button>
                </tbody>
                {/* <ul>
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
                </ul> */}
              </table>
            </section>
          </>
        )
      })}
    </>
  )
}
