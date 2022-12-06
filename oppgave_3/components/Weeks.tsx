import {useState, useEffect} from 'react'
import Link from 'next/link'
import {Year, Week} from '../types'
import {Filter, WeeksProps} from "../pages";

export default function Weeks({filterWeeks}: WeeksProps) {
  const [years, setYears] = useState<Year[]>([])
  const [filter, setFilter] = useState<Filter>({from: 0, to: 0})
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
        const data = await response.json()
        setYears(Object.values(data.data))
      } catch (error) {
        console.error(error)
      }
    }

    handler()
      .catch((err) => console.log(err))
  }, [])


  useEffect(() => {
    console.log(filter)
    if (!flag && (filter.from > filter.to)) {
      setFilter({from: filter.to, to: filter.from})
    }
    filterWeeks(filter.from, filter.to)
  }, [filter])

  function clickHandler(e: any) {
    e.preventDefault()
    const value: number = parseInt(e.target.innerHTML)
    console.log(flag)
    if (!flag) {

      setFilter({from: value, to: value})
      setFlag(!flag)
      return
    }
    setFilter({from: filter.from, to: value})
    setFlag(!flag)
  }

  return (
    <>
      <h2>Uker</h2>
      {years.map((year: Year) => {
        return (
          <>
            <h3>{year.name}</h3>
            <ul key={year.name} className="weeks">
              {year.week.map((week: Week) => {
                return (
                  <li key={week.id}>
                    <button onClick={clickHandler} className={"calenderCell " +
                      `${week.week >= filter.from && week.week <= filter.to ? 'activeCalendarCell' : ''}`
                    }>{week.week} </button>
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
