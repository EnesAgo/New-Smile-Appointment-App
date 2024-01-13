import React from 'react'
import NewPatientForm from "@/components/newPatient/NewPatientForm";
import HeaderComp from "@/components/Header";

export default function Patient() {
    return (
        <>
            <HeaderComp />
            <main className="flex flex-col gridMain items-center py-12">
                <NewPatientForm />
            </main>
        </>
    )
}