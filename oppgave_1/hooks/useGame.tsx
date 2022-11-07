// TODO: Her er det bugs
/* 
  CHANGES DONE
  > put type strike: Strike in isGameOver-function
  > isGameOver-function now returns true if all strike.icons equals '🚫'
  > handleGuess-function now uses .shift() instead of .pop() to remove the first element in the array if guess is wrong
  > handleGuess-function pushes a new Strike with '🚫'-icon to strikes-array if guess is wrong

  SUGGESTIONS
  > 
*/

import { useState } from 'react'
import { Strike } from '../components/Strikes'

const initialStrikes = [
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
  { icon: '⚪', guess: '' },
]

type Country = {
  name: string
  unicodeFlag: string
} | null

export const useGame = () => {
  const [guesses, setGuesses] = useState<string[]>([])
  const [strikes, setStrikes] = useState<Strike[]>(initialStrikes)
  const [country, setCountry] = useState<Country>(null)

  const isSolved = (country: Country, guesses: string[]) => {
    if (!country) return false

    return [...country.name.replaceAll(' ', '').toLowerCase()].every(
      (letter) => {
        return guesses.includes(letter)
      }
    )
  }

  const isGameOver = strikes.every((strike: Strike) => strike.icon === '🚫')
    ? true
    : false

  const getMessage = () => {
    if (isSolved(country, guesses) && !isGameOver) return 'Du klarte det'
    else if (isGameOver) return 'Du tapte. Prøv igjen'
    else return 'Velg en bokstav'
  }

  const isMatch = (letter: string) => {
    if (guesses.find((guess: any) => guess === letter.toLowerCase())) {
      return letter
    }
    return '_'
  }

  const wordSplit = () => {
    return (
      country?.name?.split(' ').map((word: string) => word.split('')) || null
    )
  }

  const handleGuess = (letter: string) => {
    if (!country?.name?.toLowerCase().includes(letter.toLowerCase())) {
      const strikeCopy = [...strikes]
      strikeCopy.shift()
      strikeCopy.push({ icon: '🚫', guess: letter })
      setStrikes(strikeCopy)
    }
    setGuesses((prev: string[]) => [...prev, letter.toLowerCase()])
  }

  return {
    guesses,
    setGuesses,
    strikes,
    setStrikes,
    country,
    setCountry,
    isMatch,
    isGameOver,
    handleGuess,
    getMessage,
    wordSplit,
  }
}
