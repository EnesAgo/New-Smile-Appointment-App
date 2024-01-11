import React, {useEffect} from 'react'
import HeaderComp from "@/components/Header";
import MyCalendar from "@/components/ReactBigCalendar/MyCalendar";

export default function Appointments() {
    useEffect(() => {
        document.body.classList.remove("bg-background-img-two");
        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");

        document.body.classList.add("bg-background-img-one");

    }, [])
    return (
        <>
            <HeaderComp />
            <main className="flex flex-col gridMain items-center justify-center">
                <MyCalendar />
            </main>
        </>
    )
}