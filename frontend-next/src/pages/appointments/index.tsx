import React, {useCallback, useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import MyCalendar from "@/components/appointments/MyCalendar";
import {requestBaseUrl} from "@/requests/constants";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import HttpRequest from "@/requests/HttpRequest";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import EventForm from "@/components/appointments/EventForm";

export async function getServerSideProps(){
    try{
        const response: any = await fetch(`${requestBaseUrl}/findAllEventsFromThisMonth`)
        const data: any = await response.json()

        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                data: [],
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}

export default function Appointments({ data, error }: any) {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<any>([]);
    const [eventFormDates, setEventFormDates] = useState<any>();
    const [isNewEventForm, setIsNewEventForm] = useState(true)
    const [defaultEditFormData, setDefaultEditFormData] = useState<any>({
        title: '',
        desc: '',
        currency: '',
        bill: '',
        no: '',
    })

    function changeDateTime(date: any, time: any) {
        const newDate: any = new Date(date)
        const timeArr: any = Array.from(time.toString().split(":"))
        newDate.setHours(timeArr[0])
        newDate.setMinutes(timeArr[1])
        return newDate;
    }

    useEffect(() => {
        document.body.classList.remove("bg-background-img-two");
        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");

        document.body.classList.add("bg-background-img-one");

        if(error){
            console.log(error)
            alertError("An Error Occurred")
        }
        if(data.AllEvents){
            setEvents(data.AllEvents.map((obj: any) => ({
                ...obj,
                start: new Date(obj.start),
                end: new Date(obj.end),
            })))
        }


    }, [])

    useEffect(() => {

    }, [])

    const handleNavigate = async (newDate:any) => {
        setCurrentDate(newDate);

        try{
            const resData: any = await HttpRequest.get(`/findAllEventsFromThisMonth?userDate=${JSON.stringify(newDate)}`)

            console.log(resData)

            setEvents(resData.AllEvents.map((obj: any) => ({
                ...obj,
                start: new Date(obj.start),
                end: new Date(obj.end),
            })))

        } catch (e){
            console.log(e)
            alertError("An Error Occurred")
        }

    };

    useEffect(() => {console.log(JSON.stringify(currentDate))}, [currentDate])

    const onSelectSlot = useCallback((e: any) => {

        setIsNewEventForm(true);
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))

        setEventFormDates({start: e.start, end: e.end});

        setEvents(
            (prev: any) => [...prev,{
                start: e.start,
                end: e.end,
                color: "#255984",
                uuID: "testUUID"
            }])


    }, [])

    const onSelectEvent = useCallback((event: any) => {
        console.log(event)
        setIsNewEventForm(false);
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))

        const defaultInpVals = {
            title: event.title,
            desc: event.desc,
            currency: event.billType,
            bill: event.bill,
            no: event.patientNo,
        }
        setDefaultEditFormData(defaultInpVals)
        setEventFormDates({start: event.start, end: event.end});

    }, [])


    async function cancelEvent(){
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))
    }

    async function postNewEvent(startRef:any, endRef:any, titleRef:any, descRef:any, patientNoRef:any, billRef:any, currencyRef:any){
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))

        try{

            const newStartVal = startRef.current.value;
            const newEndVal = endRef.current.value;
            const newTitleVal = titleRef.current.value;
            const newDescVal = descRef.current.value;
            const newPatientNoVal = patientNoRef.current.value;
            const newBillVal = billRef.current.value;
            const newCurrencyVal = currencyRef.current.value;


            const patient: any = await HttpRequest.get(`/findOnePatientWithNo?patientNo=${newPatientNoVal}`)

            if(patient.error){
                console.log(patient.error)
                alertError("An Error Occurred")
                return
            }
            if(!window.localStorage.jwtNewSmile){
                alertError("An Error Occurred")
                return
            }

            const workerData = JSON.parse(window.localStorage.jwtNewSmile)

            const fullStartDate = changeDateTime(eventFormDates.start, newStartVal)
            const fullEndDate = changeDateTime(eventFormDates.end, newEndVal)

            const eventObjData = {
                title: newTitleVal,
                start: fullStartDate,
                end: fullEndDate,
                description: newDescVal,
                from: workerData.uuID,
                fromName: workerData.username,
                color: workerData.userEventColor,
                patient: patient.uuID,
                patientNo: newPatientNoVal,
                bill: newBillVal,
                billType: newCurrencyVal,
            }

            console.log(eventObjData)

            const NewEvent: any = await HttpRequest.post(`/createEvent`, eventObjData)

            if(NewEvent.error){
                console.log(NewEvent.error)
                alertError("An Error Occurred")
                return
            }

            setEvents(
                (prev: any) => [...prev, eventObjData])

            alertSuccess("Event Created Successfully")

            titleRef.current.value = '';
            descRef.current.value = '';
            patientNoRef.current.value = '';
            billRef.current.value = '';
            currencyRef.current.value = '';
            
        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
        }

    }

    return (
        <>
            <HeaderComp />
            <ToastContainerDefault />
            <main className="flex flex-col gap-2 gridMain items-center justify-center pt-12 pb-6">
                <MyCalendar
                    calEvents={events}
                    handleNavigate={handleNavigate}
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
                />

                <section className="w-[80%] h-[500px] flex flex items-center justify-between m-4 rounded-2xl">
                    <div className="bg-[rgba(255,255,255,0.8)] w-[45%] h-full rounded-2xl">
                        {
                            isNewEventForm ?
                                <EventForm dates={eventFormDates} FormTitle={"New Event"} cancelEvent={cancelEvent} submitForm={postNewEvent} /> :
                                <EventForm dates={eventFormDates} FormTitle={"Edit Event"} cancelEvent={cancelEvent} submitForm={postNewEvent} defaultInpVals={defaultEditFormData} isEdit={true} />

                        }
                    </div>
                    {/*<div className="bg-[rgba(255,255,255,0.8)] w-[45%] h-full rounded-2xl"></div>*/}
                </section>
            </main>
        </>
    )
}