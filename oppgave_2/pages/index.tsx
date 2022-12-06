import type { NextPage } from 'next'
import { useState, useEffect, ChangeEvent } from 'react'
import DisplayStudents from '../components/DisplayStudents'
import RadioButtons from '../components/RadioButtons'
import { Student } from '../types/'

const Home: NextPage = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [category, setCategory] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  useEffect(() => {
    const handler = async () => {
      try {
        const response = await fetch('/api/students', {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()
        setStudents(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [])

  return (
    <main>
      <h1>Student gruppering</h1>
      <RadioButtons handleChange={handleChange} />
      <DisplayStudents students={students} category={category} />
    </main>
  )
}

export default Home
