import { Student } from '../types/'

type DisplayStudentsProps = {
  students: Student[]
  category: string
}

export default function DisplayStudents({
  students,
  category,
}: DisplayStudentsProps) {
  const display = ({ students, category }: DisplayStudentsProps) => {
    switch (category) {
      case 'ingen':
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
                  <span>{student.id}</span>
                  <span>{student.name}</span>
                  <span>{student.age}</span>
                  <span>{student.gender}</span>
                  <span>{student.group}</span>
                </li>
              )
            })}
          </ul>
        )

      case 'alder':
        return (
          <>
            <h1>Gruppering etter {category}: GRUPPE HER</h1>

            <ul>
              <p>Display students sorted by age</p>
            </ul>

            <h2 className="count">Antall: {0}</h2>
          </>
        )

      case 'kjønn':
        return (
          <>
            <h1>Gruppering etter {category}: GRUPPE HER</h1>

            <ul>
              <p>Display students sorted by gender</p>
            </ul>

            <h2 className="count">Antall: {0}</h2>
          </>
        )

      case 'klasse':
        return (
          <>
            <h1>Gruppering etter {category}: GRUPPE HER</h1>

            <ul>
              <p>Display students sorted by class</p>
            </ul>

            <h2 className="count">Antall: {0}</h2>
          </>
        )

      default:
        return (
          <ul>
            <p>Category not recognized</p>
          </ul>
        )
    }
  }

  return <>{display({ students, category })}</>
}
