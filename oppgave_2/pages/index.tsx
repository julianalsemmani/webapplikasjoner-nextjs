import type { NextPage } from 'next'
import { useState, useEffect, ChangeEvent } from 'react'
import RadioButtons from '../components/RadioButtons'
import { Student } from '../types/'

const Home: NextPage = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [status, setStatus] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value)
  }

  // CAN REMOVE: Function to test display of students
  const displayStudents = (students: Student[]) => {
    students.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }

      if (a.name > b.name) {
        return 1
      }

      return 0
    })

    return (
      <ul>
        {students.map((student) => {
          return (
            <li key={student.id}>
              <span>
                {student.id} {student.name} {student.age} {student.gender}{' '}
                {student.group}
              </span>
            </li>
          )
        })}
      </ul>
    )
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
        setStudents(Object.values(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    handler()
  }, [])

  return (
    <main>
      {/* DEBUGGING TO SEE CURRENT STATUS*/}
      <p>DEBUG</p>
      <p>Current status: {status}</p>

      <h1>Student gruppering</h1>
      <RadioButtons handleChange={handleChange} />

      {/* TESTING DISPLAY OF STUDENTS */}
      {displayStudents(students)}
    </main>
  )
}

export default Home
