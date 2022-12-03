import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Hjem</Link>
        </li>
        <li>
          <Link href={'/'}>Legg til ansatt</Link>
        </li>
        <li>
          <Link href={'/employees'}>Ansattliste</Link>
        </li>
        <li>
          <Link href={'/employees/update'}>Oppdater ansatte</Link>
        </li>
      </ul>
    </nav>
  )
}
