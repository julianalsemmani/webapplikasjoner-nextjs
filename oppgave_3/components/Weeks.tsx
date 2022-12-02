import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Weeks() {
  const [years, setYears] = useState<any>([])

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
        setYears(data.data)
      } catch (error) {
        console.error(error)
      }
    }

    handler()
  }, [])

  return (
    <>
      <h2>Uker</h2>
      {years.map((year: any) => {
        return (
          <>
            <h3>{year.name}</h3>
            <ul key={year.name}>
              {year.week.map((week: any) => {
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
