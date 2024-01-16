import React, {useEffect, useState} from 'react'
import {IPatientEventInterface} from "@/@types/interfaces";
import humanReadableNumber from "@/functions/humanReadableNumber";


export default function PatientHistory(Props: IPatientEventInterface) {
    const patientHistoryData = Props.patientHistoryData

    const [head, setHead] = useState<any>([])
    const [totalEvents, setTotalEvents] = useState(10000)

    const iconPrefix = '/assets/imgs/icons'
    const limit = 15;

    const readableTotalPatients = humanReadableNumber(totalEvents)


    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        setHead(Object.keys(patientHistoryData[0]))
    }, [])

    return (
        <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">

            <div className="w-full min-h-28 flex items-center justify-center px-12">

                <h1 className="font-bold text-3xl font-sans">All Events</h1>

            </div>

            <div className="flex flex-col w-full ">
                <div className="overflow-x-auto w-full">
                    <div className="w-full inline-block align-middle">
                        <div className="overflow-hidden rounded-lg flex justify-center">
                            <table className="w-full divide-y divide-gray-200 ml-10 mr-7 table-fixed">
                                <thead>
                                <tr>
                                    {head && head.map((e: any) =>
                                        e!=='color' &&

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
                                {patientHistoryData && patientHistoryData.map((e:any) =>

                                    <tr key={Math.random()*1000}>
                                        {head && head.map((tdInd: any) => (
                                            tdInd!=='color' &&
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
                <h5 className="text-sm text-gray-400" >Showing data {pageNum*limit} to {pageNum*limit} of {readableTotalPatients} entries </h5>
                <div className="flex gap-2">
                    <button
                        className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                    >{'<'}</button>

                    <p className="w-6 h-6 bg-[#5932EA] rounded font-Poppints font-bold text-xs text-[#fff] leading-3 flex items-center justify-center">{pageNum}</p>

                    <button
                        className="w-6 h-6 bg-[#f5f5f5] border-[#eee] border rounded font-Poppints font-bold text-xl text-[#404B52] leading-3"
                    >{'>'}</button>

                </div>
            </div>

        </div>
    )
}