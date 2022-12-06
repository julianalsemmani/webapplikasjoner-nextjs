import { employees, Employees } from '../data/employees'

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type Bucket = {
  day: number,
  employees: Employees[]
}

type Duty = {
  weekNumber: number,
  day: number
}


type Week = {
  mon: Bucket,
  tue: Bucket,
  wen: Bucket,
  thu: Bucket,
  fri: Bucket
}

type Weeks = {
  even: Week,
  odd: Week,
  specific: Map<number, Week>
}

const weeks: Weeks = {
  even: {
    mon: {day: 1, employees: []},
    tue: {day: 2, employees: []},
    wen: {day: 3, employees: []},
    thu: {day: 4, employees: []},
    fri: {day: 5, employees: []}
  },
  odd: {
    mon: {day: 1, employees: []},
    tue: {day: 2, employees: []},
    wen: {day: 3, employees: []},
    thu: {day: 4, employees: []},
    fri: {day: 5, employees: []}
  },
  specific: new Map<number, Week>()
}


function populate(week: Week, employee: Employees, days: number[]) {
  for (const weeksKey in week) {
    if (days.includes(week[weeksKey].day)) {
      week[weeksKey].employees.push(employee)
    }
  }
}


// sort employees by their to rules
employees.map((employee) => {
  const rules = employee.rules.split("|")
  const daysRule = rules[0]
  let weekRule = rules[1]
  if (weekRule != null) {
    weekRule = weekRule.split(":")[1]
  }

  const days: number[] = []

  if (daysRule === "days:*"  daysRule === "*") {
    days.push(1, 2, 3, 4, 5)
  } else {
    const str = daysRule.split(':')[1].split("")
    str.map((el) => days.push(parseInt(el)))
  }

  if (weekRule === undefined) {
    populate(weeks.even, employee, days)
    populate(weeks.odd, employee, days)
  } else if (weekRule === 'even') {
    populate(weeks.even, employee, days)
  } else if (weekRule === 'odd') {
    populate(weeks.odd, employee, days)
  } else {
    const specWeeks = weekRule.split("")
    specWeeks.map((week) => {
      const weekNumber = parseInt(week)
      const weekObj: Week = {
        mon: {day: 1, employees: []},
        tue: {day: 2, employees: []},
        wen: {day: 3, employees: []},
        thu: {day: 4, employees: []},
        fri: {day: 5, employees: []}
      }
      populate(weekObj, employee, days)
      weeks.specific.set(weekNumber, weekObj)
    })
  }
})



const empMap = new Map<number, Duty[]>()

type LunchWeek = {
  mon: string,
  tue: string,
  wen: string,
  thu: string,
  fri: string
}

const lunch: LunchWeek[] = []
const holidays: number[] = [8, 28, 29, 30, 31, 32, 40, 52]


for (let i = 0; i < 52; i++) {
  const weekNum = i + 1
  const week = {
    mon: '',
    tue: '',
    wen: '',
    thu: '',
    fri: ''
  }

  if (holidays.includes(weekNum)) {
    lunch.push(week)
    continue
  }

  const weekType = weekNum % 2

  let currWeek: Week = null

  if (weekType === 0) {
    currWeek = weeks.even
  } else {
    currWeek = weeks.odd
  }

  let dayNumber = 1
  for (const weekKey in week) {
    const size: number = (currWeek[weekKey] as Bucket)?.employees.length;

    for (let i = 0; i < size; i++) {
      const employee = (currWeek[weekKey] as Bucket).employees[i]
      console.log(`\t${employee.name}`)
      if (!empMap.has(employee.id)) {
        empMap.set(employee.id, [{day: dayNumber, weekNumber: weekNum}])
      }
    }
    dayNumber++
  }
  lunch.push(week)
}