import React, {useEffect, useRef, useState} from 'react'
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

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

    }, [])

    const SearchRef = useRef()
    const SearchTypeRef = useRef()


    return (

        <>
            <HeaderComp />
            <main className="flex flex-col items-center justify-center gap-8 gridMain py-10">
                <PatientHeaderSec activePatients={1583} totalPatients={2230} inactivePatients={647} />
                <PatientList data={data} head={head} searchInpRef={SearchRef} totalPatients={2230} />
            </main>
        </>

    )
}