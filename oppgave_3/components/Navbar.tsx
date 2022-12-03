import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Hjem</Link>
        </li>
        <li>
          <Link href={'/'}>Legg til bruker</Link>
        </li>
      </ul>
    </nav>
  )
}
