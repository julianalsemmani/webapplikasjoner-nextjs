// TODO: Her er det bugs
/* 
  CHANGES DONE
  > uses .map() instead of forEach()
  > changed LettersProps-handleGuess-type to letter: string

  SUGGESTIONS
  > 
*/

const letterList = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ')

type LettersProps = {
  getMessage: () => string
  guesses: string[]
  handleGuess: (letter: string) => void
}

type LetterProps = Pick<LettersProps, 'handleGuess' | 'guesses'> & {
  letter: string
}

export default function Letters({
  handleGuess,
  guesses,
  getMessage,
}: LettersProps) {
  return (
    <>
      <p className="message">{getMessage()}</p>
      <ul className="letters">
        {letterList.map((letter) => (
          <Letter
            handleGuess={handleGuess}
            guesses={guesses}
            key={letter}
            letter={letter}
          />
        ))}
      </ul>
    </>
  )
}

const Letter = ({ letter, handleGuess, guesses }: LetterProps) => {
  const letterMatch = guesses.includes(letter.toLowerCase())

  return (
    <button
      onClick={() => handleGuess(letter)}
      disabled={letterMatch}
      className={`letter ${letterMatch ? 'highlight' : ''}`}
    >
      {letter}
    </button>
  )
}
