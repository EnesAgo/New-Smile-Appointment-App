import React, {useEffect, useState} from 'react'
import humanReadableNumber from "@/functions/humanReadableNumber";
import moment from "moment";
import {useRouter} from "next/router";
import LogButton from "@/components/Inputs/LogButton";


export default function PatientHistory(Props: any) {
    const [head, setHead] = useState<any>([])
    const [historyDataShow, setHistoryDataShow] = useState<any>([])
    const [totalEvents, setTotalEvents] = useState(0)

    const router = useRouter()

    const iconPrefix = '/assets/imgs/icons'
    const limit = Props.totalEvents < 15 ? Props.totalEvents : 15;

    const readableTotalEvents = humanReadableNumber(totalEvents)


    const [pageNum, setPageNum] = useState(1)

    const objKeys = {
        uuID: "test",
        title: "test",
        start: "test",
        end: "test",
        description: "test",
        from: "test",
        // patient: "test",
        bill: "test",
        color: "test",
    }

    useEffect(() => {
            setTotalEvents(Props.totalEvents)

            const dataToUse = Props.patientHistoryData.map((e: any) => {
                return {
                    title: e.title,
                    start: moment(e.start).format("DD MMM YYYY hh:mm"),
                    end: moment(e.end).format("DD MMM YYYY hh:mm"),
                    description: e.description,
                    // patient: e.patient,
                    currency: e.billType,
                    bill: e.bill,
                    from: e.fromName,
                    // color: e.color,
                    uuID: e.uuID
                }
            })


            setHead(Object.keys(objKeys))
            setHistoryDataShow(dataToUse)
    }, [Props])

    return (
        <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">

                    <div className="w-full min-h-28 flex items-center justify-center px-12">

                        <h1 className="font-bold text-3xl font-sans">All Events</h1>

                    </div>

                    <div className="flex flex-col w-full ">
                        <div className="overflow-x-auto w-full">
                            <div className="w-full inline-block align-middle">
                                <div className="overflow-hidden rounded-lg flex justify-center">
                                    <table className="w-full divide-y divide-gray-200 ml-10 mr-7 table-auto">
                                        <thead>
                                        <tr>
                                            {head && head.map((e: any) =>
                                                e!=='color' &&
                                                e!=='uuID' &&

                                                <th key={Math.random()*1000}
                                                    scope="col"
                                                    className="pl-2 py-3 text-sm font-bold text-left text-gray-400 uppercase"
                                                >
                                                    {e.toUpperCase()}
                                                </th>
                                            )}
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {historyDataShow && historyDataShow.map((e:any) =>

                                            <tr key={Math.random()*1000} className="cursor-pointer"
                                                // onClick={() => router.push(`/patients/${Props.patientUUID}/${e.uuID}`)}
                                                onClick={() => {Props.setIsPrintOpen(e.uuID)}}
                                            >
                                                {head && head.map((tdInd: any) => (
                                                    tdInd!=='color' &&
                                                    tdInd!=='uuID' &&

                                                    <td key={Math.random()*1000} className="pl-2 py-2 text-base whitespace-nowrap text-gray-800">
                                                        {String(e[tdInd])}
                                                    </td>
                                                ))}
                                            </tr>

                                        )}
                                        <tr></tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full min-h-16 items-center justify-between px-12 pt-8 pb-12">
                        <h5 className="text-sm text-gray-400" >Showing data {pageNum*limit-limit+1} to {pageNum*limit} of {readableTotalEvents} entries </h5>
                        <div className="flex gap-2 items-center">
                            <LogButton onClickFn={Props.setFormOn} buttonName={"New Event"} className={"mr-5"} />
                            <button
                                onClick={() => {
                                    if(pageNum > 1) {
                                        Props.fetchNewPage(pageNum-1)
                                        setPageNum((prev: any) => prev-1)
                                    }
                                }}
                                className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                            >{'<'}</button>

                            <p className="w-6 h-6 bg-[#5932EA] rounded font-Poppints font-bold text-xs text-[#fff] leading-3 flex items-center justify-center">{pageNum}</p>

                            <button
                                onClick={() => {
                                    if(pageNum < totalEvents/limit) {
                                        Props.fetchNewPage(pageNum+1)
                                        setPageNum((prev: any) => prev+1)
                                    }
                                }}
                                className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                            >{'>'}</button>

                        </div>
                    </div>

                </div>
    )
}