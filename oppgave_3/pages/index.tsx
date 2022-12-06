import type {NextPage} from 'next'
import {useEffect, useState} from 'react'
import Weeks from '../components/Weeks'
import WeekCards from '../components/WeekCards'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

export interface WeeksProps {
  filterWeeks: (from: number, to: number) => void
  refreshFilter: () => void
}

export type Filter = {
  from: number
  to: number
}

const Home: NextPage = () => {
  const [filter, setFilter] = useState<Filter>({from: 0, to: 0})

  function handleFilter(from: number, to: number) {
    console.log(`From: ${from}; to: ${to}`)
    const filterObj: Filter = {from, to}
    setFilter(filterObj)
  }

  function refreshFilter() {
    setFilter({from: 0, to: 0})
  }

  return (
    <main>
      <Navbar/>
      <Searchbar/>
      <Weeks filterWeeks={handleFilter} refreshFilter={refreshFilter}/>
      <WeekCards from={filter.from} to={filter.to}/>
    </main>
  )
}

export default Home
