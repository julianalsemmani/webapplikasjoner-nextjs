import { Day, Week } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { Employee } from "../../../types";

export default function Overwrite() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [day, setDay] = useState<Day[]>();
    const [name, setName] = useState<string>("");
    const [selectedDay, setSelectedDay] = useState<string>("");

    const router = useRouter()

    useEffect(() => {
        fetch(`/api/weeks/${router.query.id}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => setDay(data.data.day));

        var tempEmp: Employee[] = []
        fetch("/api/employees", {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.data.map((employee: Employee) => {
                    if (employee.id != router.query.id) {
                        tempEmp.push(employee)
                    }
                })
            })
            .then(() => setEmployees(tempEmp));

    }, []);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        var currentEmp;

        employees.map((employee: Employee) => {
            if (employee.id == name) {
                currentEmp = employee
            }
        })

        var currentDay;
        day?.map((day: Day) => {
            if (day.id == selectedDay) {
                currentDay = day
            }
        })

        var obj = {
            id: "sdfsHJSDFHSDF7DSHFSDHJKFHJ",
            weekId: currentDay?.weekId,
            employeeNum: currentEmp?.employeeNum,
            employee: {
                id: currentEmp?.id,
                name: currentEmp?.name
            }
        }

        console.log(obj)

    }

    return (
        <>
            <main>
                <Navbar />
                <h1>Overskriv Dag</h1>
                <p>{selectedDay}</p>
                <p>{name}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="day">Dag:</label>
                    <select name="day" id="day" value={selectedDay} onChange={((e) => setSelectedDay(e.target.value))}>
                        {day?.map((day: Day) => {
                            return (
                                <option key={day.id} value={day.id}>{day.name}</option>
                            )
                        })}
                    </select>

                    <label htmlFor="name">Navn</label>
                    <select name="name" id="name" value={name} onChange={((e) => setName(e.target.value))}>
                        {employees.map((employee: Employee) => {
                            return (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            )
                        })}
                    </select>
                    <button type="submit">Overskriv Dag</button>
                </form>
            </main>
        </>
    )
}