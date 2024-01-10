import React, {useState} from 'react'
import HeaderComp from "@/components/Header";
import PatientHeaderSec from "@/components/patients/PatientHeaderSec";
import PatientList from "@/components/patients/PatientList";

export default function Patients() {
    const [head, setHead] = useState(['id', 'Name', 'Phone', 'email', 'status'])
    const [data, setData] = useState([
        {id: 123, Name: 'Hello', Phone:'(389)70 600 370', email: 'enes@gmail.com', debt: "asd", status: true},
        {id: 123, Name: 'Hello', Phone:'(389)70 600 370', email: 'enes@gmail.com', debt: "asd", status: false},
        {id: 123, Name: 'Hello', Phone:'(389)70 600 370', email: 'enes@gmail.com', debt: "asd", status: true},
        {id: 123, Name: 'Hello', Phone:'(389)70 600 370', email: 'enes@gmail.com', debt: "asd", status: true},
        {id: 123, Name: 'Hello', Phone:'(389)70 600 370', email: 'enes@gmail.com', debt: "asd", status: true},
    ])
    return (

        <>
            <HeaderComp />
            <main className="flex flex-col items-center justify-center gap-8 gridMain py-10">
                <PatientHeaderSec activePatients={1583} totalPatients={2230} inactivePatients={647} />
                <PatientList data={data} head={head} />
            </main>
        </>

    )
}