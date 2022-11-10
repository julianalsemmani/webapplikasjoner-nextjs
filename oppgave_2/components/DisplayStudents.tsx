import {Student} from '../types/'
import {ReactNode} from "react";
import GroupStudents from "./GroupStudents";
import {GroupBy} from "../lib/groupBy";

type DisplayStudentsProps = {
  students: Student[]
  category: string
}

export default function DisplayStudents({students, category}: DisplayStudentsProps) {
  const display = ({students, category}: DisplayStudentsProps) => {
    function populateStudents(students: Student[]): ReactNode {
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
    }

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

        return populateStudents(students)

      case 'alder':
        return (<GroupStudents students={students} category={GroupBy.age}/>)

      case 'kjønn':
        return (<GroupStudents students={students} category={GroupBy.gender}/>)

      case 'studieretning':
        return (<GroupStudents students={students} category={GroupBy.group}/>)

      default:
        return (
          <ul>
            <p>Category not recognized</p>
          </ul>
        )
    }
  }

  return <>{display({students, category})}</>
}
