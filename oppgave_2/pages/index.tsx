import type { NextPage } from 'next'
import { useState, useEffect } from 'react'

type Student = {
  id: string
  name: string
  gender: string
  age: number
  group: string
}

const Home: NextPage = () => {
  const [students, setStudents] = useState<Student[]>([])

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
      {/*DISPLAY STUDENTS HERE AS A LIST*/}
    </main>
  )
}

export default Home
