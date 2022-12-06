import { useState, useEffect } from 'react'
import { Year, Week } from '../types'
import { Filter, WeeksProps } from '../pages'

export default function Weeks({ filterWeeks, refreshFilter }: WeeksProps) {
  const [years, setYears] = useState<Year[]>([])
  const [filter, setFilter] = useState<Filter>({ from: 0, to: 0 })
  const [flag, setFlag] = useState<boolean>(false)

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/years', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const years = await response.json()

        setYears(years.data)
      } catch (error) {
        console.error(error)
      }
    }

    handler().catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    if (!flag && filter.from > filter.to) {
      setFilter({ from: filter.to, to: filter.from })
    }
    filterWeeks(filter.from, filter.to)
  }, [filter])

  function clickHandler(e: any) {
    e.preventDefault()
    const value: number = parseInt(e.target.innerHTML)

    if (!flag) {
      setFilter({ from: value, to: value })
      setFlag(!flag)
      return
    }
    setFilter({ from: filter.from, to: value })
    setFlag(!flag)
  }

  function refreshCalendar() {
    refreshFilter()
    setFlag(false)
    setFilter({ from: 0, to: 0 })
  }

  return (
    <>
      <h2>Uker</h2>
      <button
        className="week-cards-button"
        disabled={filter.from === 0}
        onClick={refreshCalendar}
      >
        Refresh
      </button>
      {years.map((year: Year) => {
        return (
          <>
            <h3>{year.name}</h3>
            <ul key={year.name} className="weeks">
              {year.week.map((week: Week) => {
                return (
                  <li key={week.id}>
                    <button
                      onClick={clickHandler}
                      className={
                        'calenderCell ' +
                        `${
                          week.week >= filter.from && week.week <= filter.to
                            ? 'activeCalendarCell'
                            : ''
                        }`
                      }
                    >
                      {week.week}{' '}
                    </button>
                  </li>
                )
              })}
            </ul>
            <hr />
          </>
        )
      })}
    </>
  )
}
