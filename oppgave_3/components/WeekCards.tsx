import { useState, useEffect, ReactNode } from 'react'
import Link from 'next/link'
import { Day, Week } from '../types'
import { Filter } from '../pages'

export default function WeekCards({ from, to }: Filter) {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [toggle, setToggle] = useState<Record<string, boolean>>({})

  function toggleFunction(id: string) {
    setToggle({
      ...toggle,
      [id]: !toggle[id],
    })
  }

  useEffect(() => {
    const handler = async (url: string) => {
      try {
        const response = await fetch(url, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const weeks = await response.json()

        // setWeeks(Object.values(data.data))
        setWeeks(weeks.data)
      } catch (error) {
        console.log(error)
      }
    }

    const url =
      from === 0 || to === 0
        ? '/api/weeks'
        : `/api/weeks/range?from=${from}&to=${to}`

    handler(url).catch((err) => {
      console.log(err)
      setWeeks([])
    })
  }, [from, to])

  function renderDays(days: (Day | null)[]): ReactNode {
    if (days.length === 0) {
      days = Array<Day | null>(5).fill(null)
    }

    return days.map((day) => {
      if (day === null) return <td className="utilgjengelig">Ferie</td>
      return (
        <td key={day.id}>
          {day.overWrites.length > 0 ? (
            <span className="span-cursor">
              <Link href={`/employees/${day.employee.id}`}>
                <span className="utilgjengelig-person">
                  {day.employee.name + " "}
                </span>
              </Link>
              |
              <Link href={`/employees/${day.overWrites[0].employee.id}`}>
                <span>{" " + day.overWrites[0].employee.name}</span>
              </Link>
            </span>
          ) : (
            <Link href={`/employees/${day.employee.id}`}>
              {day.employee.name}
            </Link>
          )}
        </td>
      )
    })
  }

  return (
    <>
      {weeks?.map((week: Week) => {
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
                  <tr>{renderDays(week.day)}</tr>
                  <button
                    onClick={() => toggleFunction(week.id)}
                    className="week-cards-button"
                  >
                    Lukk dager
                  </button>
                </tbody>
              </table>
            </section>
          </>
        )
      })}
    </>
  )
}
