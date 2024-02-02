import React, {useEffect, useState} from 'react'
import HeaderComp from "@/components/Header";
import EditPatientForm from "@/components/editPatient/EditPatientForm";
import PatientHistory from "@/components/editPatient/PatientHistory";
import {requestBaseUrl} from "@/requests/constants";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import {useRouter} from "next/router";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import HttpRequest from "@/requests/HttpRequest";
import HeaderVertComp from "@/components/HeaderVertical";
import EventForm from "@/components/appointments/EventForm";
import PatientNewEventForm from "@/components/patients/PatientNewEventForm";

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

    function changeDateTime(date: any, time: any) {
        const newDate: any = new Date(date)
        const timeArr: any = Array.from(time.toString().split(":"))
        newDate.setHours(timeArr[0])
        newDate.setMinutes(timeArr[1])
        return newDate;
    }

    const [isPrintOpen, setIsPrintOpen] = useState(false)
    const [printUUID, setPrintUUID] = useState('')

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

    const [patientHistory, setPatientHistory] = useState<any>([])
    const [isFormOpen, setIsFormOpen] = useState(false)


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

    function setIsPrintOpenFn(printUUIDProp: any){
        setIsPrintOpen(true)
        setIsFormOpen(false)
        setPrintUUID(printUUIDProp)
        window.scrollTo(0, 0);

    }

    async function cancelEvent(){
        setIsFormOpen(false)
        setIsPrintOpen(false)
    }

    async function postNewEvent(startRef:any, endRef:any, titleRef:any, descRef:any, billRef:any, currencyRef:any, fullDayDateRef:any){
        try{

            const newStartVal = startRef.current.value;
            const newEndVal = endRef.current.value;
            const newTitleVal = titleRef.current.value;
            const newDescVal = descRef.current.value;
            const newBillVal = billRef.current.value;
            const newCurrencyVal = currencyRef.current.value;
            const fullDayDateVal = fullDayDateRef.current.value;

            if(!window.sessionStorage.jwtNewSmile){
                alertError("An Error Occurred")
                return
            }

            const workerData = JSON.parse(window.sessionStorage.jwtNewSmile)

            const fullStartDate = changeDateTime(fullDayDateVal, newStartVal)
            const fullEndDate = changeDateTime(fullDayDateVal, newEndVal)

            const eventObjData: any = {
                title: newTitleVal,
                start: fullStartDate,
                end: fullEndDate,
                description: newDescVal,
                from: workerData.uuID,
                fromName: workerData.username,
                color: workerData.userEventColor,
                patientName: `${patientData.name} ${patientData.surname}`,
                bill: newBillVal,
                billType: newCurrencyVal,
                patient: patientData.uuID,
                patientPhone: patientData.phone
            }

            const NewEvent: any = await HttpRequest.post(`/createEvent`, eventObjData)

            if(NewEvent.error){

                console.log(NewEvent.error)
                alertError(NewEvent.error)
                setIsFormOpen(false)
                return
            }

            alertSuccess("Event Created Successfully")

            await fetchNewPage();


            titleRef.current.value = '';
            descRef.current.value = '';
            billRef.current.value = '';
            currencyRef.current.value = '';

            setIsFormOpen(false)

        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
        }


    }


    return (
        <>
            {/*<HeaderComp />*/}
            <HeaderVertComp />
            {
                isFormOpen &&
                <div className="w-full h-full z-10 bg-gray-400 absolute opacity-[90%]"></div>
            }
            {
                isPrintOpen &&
                <div className="w-full h-full z-10 bg-gray-400 absolute opacity-[90%]"></div>
            }
            {
                isFormOpen &&
                <section className={`w-[510px] h-[500px] flex flex items-center justify-between m-4 rounded-2xl z-20 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`} >
                    <div className="bg-white w-full h-full rounded-2xl">
                        <PatientNewEventForm dates={false} FormTitle={"New Event"} cancelEvent={cancelEvent} submitForm={postNewEvent} />
                    </div>
                </section>
            }
            {
                isPrintOpen &&
                <section className={`w-[450px] h-[80px] flex flex items-center justify-between m-4 rounded-2xl z-20 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`} >
                    <div className="bg-white w-full h-full rounded-2xl flex items-center justify-evenly">
                        <button onClick={() => router.push(`/patients/${data.uuID}/${printUUID}/eng`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">English</h5>
                        </button>
                        <button onClick={() => router.push(`/patients/${data.uuID}/${printUUID}/mk`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-24 rounded-xl`}>
                            <h5 className="text-white text-sm">Македонски</h5>
                        </button>
                        <button onClick={() => router.push(`/patients/${data.uuID}/${printUUID}/alb`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">Shqipe</h5>
                        </button>
                        <button onClick={cancelEvent} className={`flex items-center justify-center bg-[#ff3a3a] hover:bg-[#fc0505] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">Cancel</h5>
                        </button>
                    </div>
                </section>
            }

            {/*<ToastContainerDefault />*/}
            <main className={`flex flex-col gridMain items-center gap-8 py-12 ${isFormOpen && "overflow-hidden"}`}>
                <EditPatientForm patientData={patientData} medData={MedHisData} />
                <PatientHistory setFormOn={() => {
                    window.scrollTo(0, 0);
                    setIsPrintOpen(false)
                    setIsFormOpen(true);
                }} patientHistoryData={patientHistory} totalEvents={hisData.total} fetchNewPage={fetchNewPage} setIsPrintOpen={setIsPrintOpenFn} patientUUID={data.uuID} />
            </main>
        </>
    )
}