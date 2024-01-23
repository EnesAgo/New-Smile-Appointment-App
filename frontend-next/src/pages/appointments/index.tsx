import React, {useCallback, useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import MyCalendar from "@/components/appointments/MyCalendar";
import {requestBaseUrl} from "@/requests/constants";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import HttpRequest from "@/requests/HttpRequest";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import EventForm from "@/components/appointments/EventForm";
const { v4: uuidv4 } = require('uuid');

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
    const [selectedEvent, setSelectedEvent] = useState<any>({})
    const [isFormOpen, setIsFormOpen] = useState(false)
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
            console.log(data.AllEvents)
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

        setIsFormOpen(true);

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
        setIsFormOpen(true);
        setSelectedEvent(event)
        setIsNewEventForm(false);
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))

        console.log(event)

        const defaultInpVals = {
            title: event.title,
            desc: event.description,
            currency: event.billType,
            bill: event.bill,
            no: event.patientName,
            phone: event.patientPhone
        }
        console.log(defaultInpVals)
        setDefaultEditFormData(defaultInpVals)
        setEventFormDates({start: event.start, end: event.end});

    }, [])


    async function cancelEvent(){
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))
        setIsFormOpen(false)
    }

    async function postNewEvent(startRef:any, endRef:any, titleRef:any, descRef:any, patientNoRef:any, billRef:any, currencyRef:any, phoneRef:any, fullDayDateRef:any){
        setEvents((prev: any) => prev.filter((e: any) => e.uuID !== 'testUUID'))

        try{

            const newStartVal = startRef.current.value;
            const newEndVal = endRef.current.value;
            const newTitleVal = titleRef.current.value;
            const newDescVal = descRef.current.value;
            const newPatientNoVal = patientNoRef.current.value;
            const newBillVal = billRef.current.value;
            const newCurrencyVal = currencyRef.current.value;
            const phoneVal = phoneRef.current.value;
            const fullDayDateVal = fullDayDateRef.current.value;

            console.log(fullDayDateVal)



            const patient: any = await HttpRequest.get(`/searchFullNamePatients?fullName=${newPatientNoVal}`)

            if(patient.error){
                console.log(patient.error)
                alertError("An Error Occurred")
                return
            }
            if(!window.sessionStorage.jwtNewSmile){
                alertError("An Error Occurred")
                return
            }

            const workerData = JSON.parse(window.sessionStorage.jwtNewSmile)

            const fullStartDate = changeDateTime(fullDayDateVal, newStartVal)
            const fullEndDate = changeDateTime(fullDayDateVal, newEndVal)

            const eventObjDataStart: any = {
                title: newTitleVal,
                start: fullStartDate,
                end: fullEndDate,
                description: newDescVal,
                from: workerData.uuID,
                fromName: workerData.username,
                color: workerData.userEventColor,
                patientName: newPatientNoVal,
                bill: newBillVal,
                billType: newCurrencyVal,
            }

            if(patient.searchedPatients.length !== 0){
                console.log("yes")
                const eventObjData = {
                    ...eventObjDataStart,
                    patient: patient.searchedPatients[0].uuID,
                    patientPhone: patient.searchedPatients[0].phone
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
            }
            else{
                console.log("no")
                const eventObjData = {
                    ...eventObjDataStart,
                    patient: uuidv4(),
                    patientPhone: phoneVal
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
            }


            titleRef.current.value = '';
            descRef.current.value = '';
            patientNoRef.current.value = '';
            billRef.current.value = '';
            currencyRef.current.value = '';

            setIsFormOpen(false)
            
        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
        }


    }

    async function updateEvent(startRef:any, endRef:any, titleRef:any, descRef:any, patientNoRef:any, billRef:any, currencyRef:any, phoneRef:any, fullDayDateRef:any) {
        try{
            const newStartVal = startRef.current.value;
            const newEndVal = endRef.current.value;
            const newTitleVal = titleRef.current.value;
            const newDescVal = descRef.current.value;
            const newPatientNoVal = patientNoRef.current.value;
            const newBillVal = billRef.current.value;
            const newCurrencyVal = currencyRef.current.value;
            const phoneVal = phoneRef.current.value;
            const fullDayDateVal = fullDayDateRef.current.value;

            console.log(newPatientNoVal)


            const patient: any = await HttpRequest.get(`/searchFullNamePatients?fullName=${newPatientNoVal}`)

            if(patient.error){
                console.log(patient.error)
                alertError("An Error Occurred")
                return
            }


            if(!window.sessionStorage.jwtNewSmile){
                alertError("An Error Occurred")
                return
            }

            const workerData = JSON.parse(window.sessionStorage.jwtNewSmile)

            const fullStartDate = changeDateTime(fullDayDateVal, newStartVal)
            const fullEndDate = changeDateTime(fullDayDateVal, newEndVal)

            const eventObjData = {
                ...selectedEvent,
                title: newTitleVal,
                start: new Date(fullStartDate),
                end: new Date(fullEndDate),
                description: newDescVal,
                from: workerData.uuID,
                fromName: workerData.username,
                color: workerData.userEventColor,
                patientName: newPatientNoVal,
                patientPhone: phoneVal,
                bill: newBillVal,
                billType: newCurrencyVal,
            }

            const updated: any = await HttpRequest.put(`/updateEvent?uuID=${selectedEvent.uuID}`, eventObjData)
            if(updated.error){
                console.log(updated.error)
                alertError("An Error Occurred")
                return
            }
            setEvents((prev: any) => prev.map((e: any) => (e.uuID === eventObjData.uuID ? eventObjData : e)))
            alertSuccess("Element Successfully Updated")
            setIsFormOpen(false)

        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
        }
    }
    async function deleteEvent(){
        console.log(selectedEvent.uuID)

        try{
            const deleted: any = await HttpRequest.delete(`/deleteEvent/${selectedEvent.uuID}`)
            if(deleted.error){
                console.log(deleted.error)
                alertError("An Error Occurred")
                return
            }
            setEvents((prev: any) => prev.filter((e: any) => e.uuID !== selectedEvent.uuID))
            alertSuccess("Element Successfully Deleted")
            setIsFormOpen(false)

        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
        }
    }

    return (
        <>
            {
                isFormOpen &&
                <div className="w-full h-full z-10 bg-gray-400 absolute opacity-[90%]"></div>
            }
            <HeaderComp />
            <ToastContainerDefault />
            <main className="flex flex-col gap-2 gridMain items-center justify-center pt-12 pb-6">

                <MyCalendar
                    calEvents={events}
                    handleNavigate={handleNavigate}
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
                />

                {
                    isFormOpen &&
                    <section className="w-[80%] h-[500px] flex flex items-center justify-between m-4 rounded-2xl z-20" style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-25%, -50%)"}} >
                        <div className="bg-white w-[45%] h-full rounded-2xl">
                            {
                                isNewEventForm ?
                                    <EventForm dates={eventFormDates} FormTitle={"New Event"} cancelEvent={cancelEvent} submitForm={postNewEvent} /> :
                                    <EventForm dates={eventFormDates} FormTitle={"Edit Event"} cancelEvent={cancelEvent} submitForm={updateEvent} deleteEvent={deleteEvent} defaultInpVals={defaultEditFormData} isEdit={true} />

                            }
                        </div>
                    </section>
                }
            </main>
        </>
    )
}