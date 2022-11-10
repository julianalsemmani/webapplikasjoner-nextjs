import { ChangeEvent } from 'react'

type RadioButtonsProps = {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function RadioButtons({ handleChange }: RadioButtonsProps) {
  return (
    <section>
      <label htmlFor="ingen">Ingen</label>
      <input
        type="radio"
        id="ingen"
        name="sortBy"
        value="ingen"
        onChange={handleChange}
      />

      <label htmlFor="alder">Alder</label>
      <input
        type="radio"
        id="alder"
        name="sortBy"
        value="alder"
        onChange={handleChange}
      />

      <label htmlFor="kjønn">Kjønn</label>
      <input
        type="radio"
        id="kjønn"
        name="sortBy"
        value="kjønn"
        onChange={handleChange}
      />

      <label htmlFor="studieretning">Klasse</label>
      <input
        type="radio"
        id="studieretning"
        name="sortBy"
        value="studieretning"
        onChange={handleChange}
      />
    </section>
  )
}
