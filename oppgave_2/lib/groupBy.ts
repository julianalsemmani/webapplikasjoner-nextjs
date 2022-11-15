import {Student} from "../types";

export function groupStudentsBy(students: Student[], filter: string): [string, Student[]] {
  return Object.entries(students).reduce((result: any, [key, value]) => ({
    ...result,
    [value[filter as keyof typeof value]]: [...(result[value[filter as keyof typeof value]] || []), ({...value})]
  }), {})
}

export const GroupBy = {
  age: "age",
  gender: "gender",
  group: "group"
}
