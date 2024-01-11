import React, {useEffect} from 'react'
import HeaderComp from "@/components/Header";

export default function NewPatient() {
    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");

        document.body.classList.add("bg-background-img-two");


    }, [])
    return (
        <>
            <HeaderComp />
            <main className="flex gridMain">

            </main>
        </>
    )
}