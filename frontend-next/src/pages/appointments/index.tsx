import React from 'react'
import HeaderComp from "@/components/Header";
import MyCalendar from "@/components/ReactBigCalendar/MyCalendar";

export default function Appointments() {
    return (
        <>
            <HeaderComp />
            <main className="flex flex-col gridMain items-center justify-center">
                <MyCalendar />
            </main>
        </>
    )
}