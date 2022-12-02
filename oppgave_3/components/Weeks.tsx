import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Year, Week } from '../types'

export default function Weeks() {
  const [years, setYears] = useState<Year[]>([])

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/years', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        setYears(Object.values(data.data))
      } catch (error) {
        console.error(error)
      }
    }

    handler()
  }, [])

  return (
    <>
      <h2>Uker</h2>
      {years.map((year: Year) => {
        return (
          <>
            <h3>{year.name}</h3>
            <ul key={year.name}>
              {year.week.map((week: Week) => {
                return (
                  <li key={week.id}>
                    <Link href={`/weeks/${week.id}`}>{week.week}</Link>
                  </li>
                )
              })}
            </ul>
          </>
        )
      })}
    </>
  )
}
