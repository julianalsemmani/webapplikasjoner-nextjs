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
      case 'nothing':
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

      case 'age':
        return (
          <ul>
            <p>Display students sorted by age</p>
          </ul>
        )

      case 'gender':
        return (
          <ul>
            <p>Display students sorted by gender</p>
          </ul>
        )

      case 'class':
        return (
          <ul>
            <p>Display students sorted by class</p>
          </ul>
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
