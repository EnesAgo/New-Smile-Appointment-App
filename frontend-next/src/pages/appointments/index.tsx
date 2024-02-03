import React, {useCallback, useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import MyCalendar from "@/components/appointments/MyCalendar";
import {requestBaseUrl} from "@/requests/constants";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import HttpRequest from "@/requests/HttpRequest";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import EventForm from "@/components/appointments/EventForm";
import HeaderVertComp from "@/components/HeaderVertical";
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

    useEffect(() => {

        if(isFormOpen){
            console.log(document.getElementById("eventForm"))
            document.getElementById("eventForm")?.focus()
        }

    }, [isFormOpen])

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
                    alertError(NewEvent.error)
                    setIsFormOpen(false)
                    return
                }

                setEvents(
                    (prev: any) => [...prev, eventObjData])

                alertSuccess("Event Created Successfully")
            }
            else{
                console.log("no")
                const patientUUIDString = uuidv4()

                const eventObjData = {
                    ...eventObjDataStart,
                    patient: patientUUIDString,
                    patientPhone: phoneVal
                }

                console.log(eventObjData)

                const NewEvent: any = await HttpRequest.post(`/createEvent`, eventObjData)

                if(NewEvent.error){
                    console.log(NewEvent.error)
                    alertError(NewEvent.error)
                    setIsFormOpen(false)
                    return
                }

                setEvents(
                    (prev: any) => [...prev, eventObjData])

                alertSuccess("Event Created Successfully")

                let imgUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.awAiMS1BCAQ2xS2lcdXGlwHaHH%26pid%3DApi&f=1&ipt=da636c11b0380e062d4a8ab26a212d392e7cb46a8ffd5fc083dee44e68c266a4&ipo=images'


                const newPatientData = {
                    name: newPatientNoVal,
                    surname: newPatientNoVal,
                    parentName: newPatientNoVal,
                    bornIn: "",
                    birthPlace: "",
                    address: "",

                    email: "",
                    phone: phoneVal,
                    embg: "",
                    uuID: NewEvent.patient,

                    patientImage: imgUrl,
                }

                try{
                    const newPatient: any = await HttpRequest.post("/createPatient", newPatientData)
                    console.log(newPatient)
                }
                catch (e){
                    console.log(e)
                }


                const medHisObj = {
                    medicine: "",
                    allergies: "allergiesVal",
                    stableHealth: true,
                    operationInFiveYears: false,
                    HepatitisDisease: false,
                    jaundiceDisease: false,
                    hiv: false,
                    pregnant: false,
                    patientUUID: NewEvent.patient,
                }

                try{
                    const postMedHis:any = await HttpRequest.post("/createMedHistory", medHisObj)
                    console.log(postMedHis)

                }
                catch (e) {
                    alertError(`An Error Occurred`)
                    console.log(e)
                    return
                }
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
            {/*<ToastContainerDefault />*/}
            {
                isFormOpen &&
                <div className="w-full h-full z-10 bg-gray-400 absolute opacity-[90%]"></div>
            }

            {/*<HeaderComp />*/}
            <HeaderVertComp />

            <main className="flex flex-col gap-2 gridMain items-center justify-center pt-6 pb-6">

                <MyCalendar
                    calEvents={events}
                    handleNavigate={handleNavigate}
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
                    scrollToTime={currentDate.setHours(7, 0, 0)}
                />

                {
                    isFormOpen &&
                    <section className="w-[510px] h-[500px] flex flex items-center justify-between m-4 rounded-2xl z-20 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]" >
                        <div className="bg-white w-full h-full rounded-2xl">
                            {
                                isNewEventForm ?
                                    <EventForm dates={eventFormDates} FormTitle={"New Event"} cancelEvent={cancelEvent} submitForm={postNewEvent} /> :
                                    <EventForm dates={eventFormDates} FormTitle={"Edit Event"} cancelEvent={cancelEvent} submitForm={updateEvent} deleteEvent={deleteEvent} selectedEvent={selectedEvent} defaultInpVals={defaultEditFormData} isEdit={true} />

                            }
                        </div>
                    </section>
                }

            </main>
        </>
    )
}