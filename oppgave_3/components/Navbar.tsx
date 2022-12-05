import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Hjem</Link>
        </li>
        <li>
          <Link href={'/employees/create'}>Legg til ansatt</Link>
        </li>
        <li>
          <Link href={'/employees'}>Ansattliste</Link>
        </li>
      </ul>
    </nav>
  )
}
