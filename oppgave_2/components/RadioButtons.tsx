import { ChangeEvent } from 'react'

type RadioButtonsProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function RadioButtons({ handleChange }: RadioButtonsProps) {
  return (
    <section>
      <form>
        <label htmlFor="nothing">Ingen</label>
        <input
          type="radio"
          id="nothing"
          name="sortBy"
          value="nothing"
          onChange={handleChange}
        />

        <label htmlFor="age">Alder</label>
        <input
          type="radio"
          id="age"
          name="sortBy"
          value="age"
          onChange={handleChange}
        />

        <label htmlFor="gender">Kjønn</label>
        <input
          type="radio"
          id="gender"
          name="sortBy"
          value="gender"
          onChange={handleChange}
        />

        <label htmlFor="class">Klasse</label>
        <input
          type="radio"
          id="class"
          name="sortBy"
          value="class"
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
