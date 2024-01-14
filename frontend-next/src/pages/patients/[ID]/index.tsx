import React, {useEffect} from 'react'
import HeaderComp from "@/components/Header";
import EditPatientForm from "@/components/editPatient/EditPatientForm";
import PatientHistory from "@/components/editPatient/PatientHistory";

export default function Patient() {

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

    }, [])

    const patientData = {
        name: "Enes",
        surname: "Ago",
        parentName: "Vedat",
        addres: "hadzhi mustafa no. 51",
        email: "hadzhi mustafa no. 51",
        tel: "hadzhi mustafa no. 51",
        birthDate: "hadzhi mustafa no. 51",
        birthPlace: "hadzhi mustafa no. 51",
        EMBG: "hadzhi mustafa no. 51",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.awAiMS1BCAQ2xS2lcdXGlwHaHH%26pid%3DApi&f=1&ipt=da636c11b0380e062d4a8ab26a212d392e7cb46a8ffd5fc083dee44e68c266a4&ipo=images",
    }

    const patientHistory = [
        {
            uuID: "asd",
            title: "string",
            start: "string",
            end: "string",
            description: "string",
            from: "string",
            patient: "string",
            bill: "string",
            color: "string",
        },
        {
            uuID: "go",
            title: "string",
            start: "string",
            end: "string",
            description: "string",
            from: "string",
            patient: "string",
            bill: "string",
            color: "string",
        }
    ]

    return (
        <>
            <HeaderComp />
            <main className="flex flex-col gridMain items-center gap-8 py-12">
                <EditPatientForm patientData={patientData} />
                <PatientHistory patientHistoryData={patientHistory}/>
            </main>
        </>
    )
}