import type { NextPage } from 'next'
import { useEffect } from 'react'
import Weeks from '../components/Weeks'
import WeekCards from '../components/WeekCards'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'

const Home: NextPage = () => {
  useEffect(() => {
    const handler = async () => {
      try {
        // const reponse = await fetch('/api/demo', {
        //   method: 'get',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
      } catch (error) {
        console.error(error)
      }
    }

    handler()
  }, [])

  return (
    <main>
      <h1>Lunsjkalender</h1>
      <Navbar />
      <Searchbar />
      <Weeks />
      <WeekCards />
    </main>
  )
}

export default Home
