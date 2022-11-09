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
          <div>
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
            <h2 className='right-align'>Antall: {students.length}</h2>
          </div>
        )

      case 'age':
        return (
          <div>
            <ul>
              <p>Display students sorted by age</p>
            </ul>
            <h2 className='right-align'>Antall: {0}</h2>
          </div>
        )

      case 'gender':
        return (
          <div>
            <ul>
              <p>Display students sorted by gender</p>
            </ul>
            <h2 className='right-align'>Antall: {0}</h2>
          </div>
        )

      case 'class':
        return (
          <div>
            <ul>
              <p>Display students sorted by class</p>
            </ul>
            <h2 className='right-align'>Antall: {0}</h2>
          </div>
        )

      default:
        return (
          <div>
            <ul>
              <p>Category not recognized</p>
            </ul>
            <h2 className='right-align'>Antall: {0}</h2>
          </div>
        )
    }
  }

  return <>{display({ students, category })}</>
}
