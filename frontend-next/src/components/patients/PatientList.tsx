import React, {useState} from 'react'
import { useRouter } from 'next/router'

import InpLg from "@/components/Inputs/LogInp";
import SelectInp from "@/components/Inputs/SelectInp";
import humanReadableNumber from "@/functions/humanReadableNumber";

export default function PatientList({data, head, searchInpRef, totalPatients}: any) {
    const router = useRouter()

    const iconPrefix = '/assets/imgs/icons'
    const limit = 15;

    const readableTotalPatients = humanReadableNumber(totalPatients)


    const [pageNum, setPageNum] = useState(1)


    return (
        <section className="flex flex-col items-center justify-center w-[70%] min-h-32 bg-white rounded-[30px] pt-10">

            <div className="w-full min-h-28 flex items-center justify-between px-12">

                <h1 className="font-bold text-3xl font-sans">All Customers</h1>

                <div className="flex gap-4">
                    <InpLg className={"!bg-[#f9fbff] placeholder-[#b5b7c0] !text-gray-800"} placeholderVal={"Search"} inpType={"text"} inpRef={searchInpRef} hasPic={true} imgSrc={`${iconPrefix}/search-icon.png`} imgAlt={"userIcon"} />
                    <SelectInp className={"!bg-[#f9fbff] !text-[#3d3cxx42] text-sm !w-44 !rounded-xl"} placeholderVal={"Search"} inpType={"text"} inpRef={searchInpRef} hasPic={false} />

                </div>

            </div>

            <div className="flex flex-col w-full ">
                <div className="overflow-x-auto w-full">
                    <div className="w-full inline-block align-middle">
                        <div className="overflow-hidden rounded-lg flex justify-center">
                            <table className="w-full divide-y divide-gray-200 mx-10 table-fixed">
                                <thead className="">
                                <tr>
                                    {head && head.map((e: any) =>
                                        <th key={Math.random()*1000}
                                            scope="col"
                                            className="pl-2 py-3 text-xs font-bold text-left text-gray-400 uppercase"
                                        >
                                            {e.toUpperCase()}
                                        </th>
                                    )}
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {data && data.map((e:any) =>

                                    <tr key={Math.random()*1000} className="cursor-pointer" onClick={() => router.push(`/patients/${e.id}`)}>
                                        {head && head.map((tdInd: any) => (
                                            tdInd === 'status' ?

                                            <td key={Math.random()*1000} className="pl-2 py-4 text-sm whitespace-nowrap text-gray-800">
                                                {

                                                    e[tdInd] === true ?

                                                    <div className="w-20 h-10 flex items-center justify-center border-[1px] border-[#008767] bg-[#a6e7d9] text-[#008767] rounded">Active</div> :

                                                    <div className="w-20 h-10 flex items-center justify-center border-[1px] border-[#DF0404] bg-[#FFC5C5] text-[#DF0404] rounded">Inactive</div>

                                                }
                                            </td>:

                                            <td key={Math.random()*1000} className="pl-2 py-2 text-sm whitespace-nowrap text-gray-800">
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
                <h5 className="text-sm text-gray-400" >Showing data {data[0].id} to {data[data.length-1].id} of {readableTotalPatients} entries </h5>
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


        </section>
    )
}