// TODO: Her er det bugs
/* 
  CHANGES DONE
  > changed const result = { data: [] } to const result = await response.json()
    --> setCountry(result.data())
  > added isMatch = {isMatch} to fulfill component Words.tsx parameters

  SUGGESTIONS
  > 
*/

import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import Letters from '../components/Letters'
import Strikes from '../components/Strikes'
import Words from '../components/Words'
import { useGame } from '../hooks/useGame'

const Home: NextPage = () => {
  const isFirstRender = useRef(true)
  const {
    country,
    setCountry,
    isMatch,
    wordSplit,
    handleGuess,
    guesses,
    strikes,
    getMessage,
  } = useGame()

  useEffect(() => {
    if (!isFirstRender.current) return
    isFirstRender.current = false

    const handler = async () => {
      try {
        const response = await fetch('/api/countries', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()
        setCountry(result.data)
        console.log(result.data.name) // FOR CONSOLE DEBUGGING
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [setCountry])

  return (
    <main>
      <h1>Gjett flagget</h1>
      <p className="flag">{country?.unicodeFlag}</p>
      <Strikes strikes={strikes} />
      <Words words={wordSplit()} isMatch={isMatch} />
      <Letters
        handleGuess={handleGuess}
        guesses={guesses}
        getMessage={getMessage}
      />
    </main>
  )
}

export default Home
