import React, {useEffect, useState} from 'react'
import HeaderComp from "@/components/Header";
import EditPatientForm from "@/components/editPatient/EditPatientForm";
import PatientHistory from "@/components/editPatient/PatientHistory";
import {requestBaseUrl} from "@/requests/constants";
import {alertError} from "@/functions/alertFunctions";
import {useRouter} from "next/router";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import HttpRequest from "@/requests/HttpRequest";
import HeaderVertComp from "@/components/HeaderVertical";

export async function getServerSideProps({ params }: any){
    try{
        const response: any = await fetch(`${requestBaseUrl}/findOnePatient?patientUUID=${params.ID}`)
        const data: any = await response.json()

        const resMed: any = await fetch(`${requestBaseUrl}/findOneMedHistory?uuID=${params.ID}`)
        const medData: any = await resMed.json()

        const resHis: any = await fetch(`${requestBaseUrl}/findAllPatientEvents?uuID=${params.ID}`)
        const hisData: any = await resHis.json()


        return {
            props: {
                data,
                medData,
                hisData
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                data: [],
                hisData: [],
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}


export default function Patient({ data, medData, hisData, error }: any) {

    const router = useRouter()

    const [patientData, setPatientData] = useState<any>({
        name: "",
        surname: "",
        parentName: "",
        address: "",
        email: "",
        phone: "",
        birthDate: "",
        birthPlace: "",
        debt: 0,
        debtCurrencyType: "Euro",
        status: false,
        embg: "",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.awAiMS1BCAQ2xS2lcdXGlwHaHH%26pid%3DApi&f=1&ipt=da636c11b0380e062d4a8ab26a212d392e7cb46a8ffd5fc083dee44e68c266a4&ipo=images",

    })

    const [MedHisData, setMedHisData] = useState<any>({
        medicine: "",
        allergies: "",
        stableHealth: false,
        operationInFiveYears: false,
        HepatitisDisease: false,
        jaundiceDisease: false,
        hiv: false,
        pregnant: false,
        patientUUID: false,

    })

    const [patientHistory, setPatientHistory] = useState<any>([{
        uuID: "test",
        title: "test",
        start: "test",
        end: "test",
        description: "test",
        from: "test",
        patient: "test",
        bill: "test",
        color: "test",
    }])

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

        if(error){
            console.log(error)
            alertError("An Error Occurred")
        } else{

            console.log(data)

            setPatientData({
                ...data,
                birthDate: data.bornIn,
                img: data.patientImage
            })

            if(medData){
                setMedHisData(medData)
            }

            if(hisData.AllEvents.length === 0){
                alertError("No History")
            }
            else{
                console.log(hisData.AllEvents)
                setPatientHistory(hisData.AllEvents)
            }

        }

    }, [])

    async function fetchNewPage(pageNum=1){

        try{
            const hisData: any = await HttpRequest.get(`/findAllPatientEvents?uuID=${router.query.ID}&page=${pageNum}`)

            console.log(hisData.AllEvents)
            setPatientHistory(hisData.AllEvents)
        }
        catch (e){
            console.log(e)
            alertError("An Error Occurred")
        }


    }


    return (
        <>
            {/*<HeaderComp />*/}
            <HeaderVertComp />

            {/*<ToastContainerDefault />*/}
            <main className="flex flex-col gridMain items-center gap-8 py-12">
                <EditPatientForm patientData={patientData} medData={MedHisData} />
                <PatientHistory patientHistoryData={patientHistory} totalEvents={hisData.total} fetchNewPage={fetchNewPage} patientUUID={data.uuID} />
            </main>
        </>
    )
}