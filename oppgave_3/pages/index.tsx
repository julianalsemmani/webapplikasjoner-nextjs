import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Weeks from '../components/Weeks'
import WeekCards from '../components/WeekCards'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

export interface WeeksProps {
  filterWeeks: (from: number, to: number) => void
}

export type Filter = {
  from: number
  to: number
}

const Home: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({ from: 0, to: 0 })

  // useEffect(() => {
  //   const handler = async () => {
  //     try {
  //       const reponse = await fetch('/api/demo', {
  //         method: 'get',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   handler()
  // }, [])

  function handleFilter(from: number, to: number) {
    console.log(`From: ${from}; to: ${to}`)
    const filterObj: Filter = { from, to }
    setFilter(filterObj)
  }

  return (
    <main>
      <Navbar />
      <Searchbar />
      <Weeks filterWeeks={handleFilter} />
      <WeekCards from={filter.from} to={filter.to} />
    </main>
  )
}

export default Home
