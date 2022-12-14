import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import Navbar from '../../../components/Navbar'

export default function CreateEmployee() {
  const [name, setName] = useState<string>('')
  const [employeeNum, setEmployeeNum] = useState<number>()
  const [rules, setRules] = useState<string>('')
  const [status, setStatus] = useState('idle')

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('loading')
    try {
      const response = await fetch(`/api/employees/create`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeNum, name, rules }),
      })

      setStatus('success')
      router.push(`/employees`)
    } catch (error) {
      setStatus('error')
      console.log(error)
      setTimeout(() => {
        setStatus('idle')
      }, 2000)
    }
  }

  if (isLoading) {
    return <p>Henter data ...</p>
  }
  if (isError) {
    return <p>Noe gikk galt ...</p>
  }

  return (
    <main>
      <Navbar />
      <h1>Opprett ny ansatt:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="employeeNum">Ansatt nummer:</label>
        <input
          type="number"
          value={employeeNum}
          onChange={(e) => setEmployeeNum(e.target.valueAsNumber)}
        />
        <label htmlFor="name">Navn:</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1).toLowerCase()
            )
          }
        />

        <label htmlFor="rules">Regler:</label>
        <input
          type="text"
          value={rules}
          onChange={(e) => setRules(e.target.value)}
        />
        <button type="submit">Opprett</button>
      </form>
    </main>
  )
}
