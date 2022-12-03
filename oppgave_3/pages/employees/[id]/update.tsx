import { useEffect, useState } from 'react'
import { Employee } from '../../../types'
import Navbar from '../../../components/Navbar'
import { useRouter } from 'next/router'

export default function Employees() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')

  const isLoading = status === 'loading'
  const isError = status === 'error'

  const router = useRouter()

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setStatus('loading')

    const employeeId = router.query.id

    if (!employeeId) return

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      setStatus('success')
      // router.push(`/employees/${employeeId}`)
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
    <>
      <main>
        <Navbar />
        <h2>Oppdater navn:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </>
  )
}
