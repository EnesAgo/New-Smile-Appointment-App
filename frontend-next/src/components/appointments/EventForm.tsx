import React, {useEffect, useRef, useState} from 'react'
import moment from "moment";
import LogButton from "@/components/Inputs/LogButton";
import InpLg from "@/components/Inputs/LogInp";
import {date} from "date-arithmetic";
import { useRouter } from 'next/router'
import HttpRequest from "@/requests/HttpRequest";
import {alertError} from "@/functions/alertFunctions";

export default function EventForm(
    {
        dates, FormTitle, cancelEvent, submitForm,
        selectedEvent=undefined,
        defaultInpVals = {
            title: '',
            desc: '',
            currency: '',
            bill: '',
            no: '',
            phone: ''
        },
        isEdit = false,
        deleteEvent = () => {}
    }: any) {

    const [isPrintOpen, setIsPrintOpen] = useState(false)

    const startRef:any = useRef();
    const endRef:any = useRef();
    const titleRef:any = useRef();
    const descRef:any = useRef();

    const patientNoRef:any = useRef();
    const billRef:any = useRef();
    const currencyRef:any = useRef();
    const phoneRef:any = useRef();
    const fullDayDateVal:any = useRef();

    const router = useRouter()


    useEffect(() => {
        console.log(selectedEvent)
    }, [selectedEvent])


    return (
        <>
            {
                isPrintOpen &&
                <section className={`w-[450px] h-[80px] flex flex items-center justify-between m-4 rounded-2xl z-20 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`} >
                    <div className="bg-white w-full h-full rounded-2xl flex items-center justify-evenly">
                        <button onClick={() => router.push(`/patients/${selectedEvent?.patient}/${selectedEvent.uuID}/eng`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">English</h5>
                        </button>
                        <button onClick={() => router.push(`/patients/${selectedEvent?.patient}/${selectedEvent.uuID}/mk`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-24 rounded-xl`}>
                            <h5 className="text-white text-sm">Македонски</h5>
                        </button>
                        <button onClick={() => router.push(`/patients/${selectedEvent?.patient}/${selectedEvent.uuID}/alb`)} className={`flex items-center justify-center bg-[#4200FF] hover:bg-[#3d00e5] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">Shqipe</h5>
                        </button>
                        <button onClick={() => {setIsPrintOpen(false)}} className={`flex items-center justify-center bg-[#ff3a3a] hover:bg-[#fc0505] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">Cancel</h5>
                        </button>
                    </div>
                </section>
            }
            {
                isPrintOpen &&
                <div className="w-full h-full z-10 bg-gray-400 absolute top-0 left-0 opacity-[90%]"></div>

            }
            <section className="w-full h-full p-6 flex flex-col items-center gap-8">

                <h2 className="font-bold text-2xl font-Poppints ">{FormTitle}</h2>

                <div className="w-full h-full flex flex-col justify-between items-center">

                    <div className="flex w-[80%] justify-between">
                        {/*<input className="mx-2 px-2 w-24 h-8 border-b-dark border-b-[2px] !bg-[rgba(255,255,255,0.5)]" type="time" ref={startRef} value={dates && Array.from(dates.start.toString().split(" "))[4]} />*/}
                        <input className="px-2 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" type="time" ref={startRef} defaultValue={dates && Array.from(dates.start.toString().split(" "))[4]} required id={"eventForm"} />
                        <p className="font-Poppints font-extrabold">-</p>
                        {/*<input className="mx-2 px-2 w-24 h-8 border-b-dark border-b-[2px] !bg-[rgba(255,255,255,0.5)]" type="time" ref={endRef} defaultValue={dates && Array.from(dates.end.toString().split(" "))[4]} />*/}
                        <input className="px-2 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t " type="time" ref={endRef} defaultValue={dates && Array.from(dates.end.toString().split(" "))[4]} required />

                    </div>

                    <div className="w-[80%] flex justify-between">
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={dates && moment(dates.start).format("YYYY-MM-DD")} type="date" ref={fullDayDateVal} placeholder={"Title"} required />
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={defaultInpVals.phone} type="text" ref={phoneRef} placeholder={"Phone"} required />
                    </div>

                    <div className="w-[80%] flex justify-between">
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={defaultInpVals.title} type="text" ref={titleRef} placeholder={"Title"} required />
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={defaultInpVals.no} type="text" ref={patientNoRef} placeholder={"Name Surname"} required />
                    </div>

                    <div className="w-[80%] flex justify-between">
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={defaultInpVals.bill} type="number" ref={billRef} placeholder={"Bill"} required />
                        <input className="pl-1 w-[45%] h-8 border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t" defaultValue={defaultInpVals.currency} type="text" ref={currencyRef} placeholder={"Currency"} required />
                    </div>


                    <textarea rows={5} cols={60} className="mx-2 w-[80%] !h-[100px] border-b-dark border-b-[2px] !bg-[#f2f2f2] rounded-t text-base" placeholder={"Description"} ref={descRef} required>
                        {
                            defaultInpVals.desc &&
                            String(defaultInpVals.desc)
                        }
                    </textarea>

                    <div className="flex gap-3 justify-center ml-2">

                        {
                            isEdit &&
                            <button onClick={() => {setIsPrintOpen(true)}} className={`flex items-center justify-center bg-[#008000] hover:bg-[#01a301] h-10 w-20 rounded-xl`}>
                                <h5 className="text-white text-base">Print</h5>
                            </button>
                        }

                        <LogButton onClickFn={() => submitForm(startRef, endRef, titleRef, descRef, patientNoRef, billRef, currencyRef, phoneRef, fullDayDateVal)} className="!w-32 bg-[#4200FF] hover:bg-[#3d00e5]" buttonName={"Submit"} />

                        {
                            isEdit &&
                            <button onClick={deleteEvent} className={`flex items-center justify-center bg-[red] hover:bg-[#ff3a3a] h-10 w-20 rounded-xl`}>
                                <h5 className="text-white text-base">Delete</h5>
                            </button>
                        }

                        <button onClick={cancelEvent} className={`flex items-center justify-center bg-[#ff3a3a] hover:bg-[#fc0505] h-10 w-20 rounded-xl`}>
                            <h5 className="text-white text-base">Cancel</h5>
                        </button>

                    </div>



                </div>

            </section>
        </>
    )
}