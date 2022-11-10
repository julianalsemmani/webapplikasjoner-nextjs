import {Student} from "../types";
import React, {ReactNode} from "react";
import {groupStudentsBy} from "../lib/groupBy";

type DisplayProps = {
  students: Student[]
  category: string
}

export default function GroupStudents({students, category}: DisplayProps) {

  function populateStudents(students: Student[] | any, group: string): ReactNode {
    return (
      <div key={group}>
        <h1>Gruppering etter {category}: {group}</h1>
        <ul>
          {students.map((student: Student) => {
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
        <h2 className="count">Antall: {students.length}</h2>
      </div>
    )
  }

  const grouped = groupStudentsBy(students, category)

  function populateGroups() {
    return Object.keys(grouped).map((objKey) => {
      const key = objKey as keyof typeof grouped
      const group = grouped[key]
      return (
        populateStudents(group, objKey)
      )
    })
  }

  return (
    <>
      {populateGroups()}
    </>
  )
}
