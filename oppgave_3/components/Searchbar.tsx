import { FormEvent, useState } from 'react'
import { getEmployeeByName, getEmployeeById } from '../api/employees'
import { useRouter } from 'next/router'

export default function SearchBar() {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState('idle')

  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isSuccess = status === 'success'

  const router = useRouter()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStatus('loading')

    try {
      const result = await getEmployeeByName(name)
      setStatus('success')
      console.log(result)
      if (result.status && result.data.length === 1) {
        await router.push(`/employees/${result?.data[0].id}`)
      } else {
        setStatus('error')
        setTimeout(() => {
          setName('')
          setStatus('success')
        }, 1500)
      }
    } catch (error) {
      setStatus('error')
      console.log(error)
    }
  }

  if (isLoading) {
    return <h3>Henter data ...</h3>
  }

  if (isError) {
    return <h3>Fant ikke ansatt ...</h3>
  }

  return (
    <>
      <h2>Søk på en ansatt:</h2>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Søk</button>
      </form>
    </>
  )
}
