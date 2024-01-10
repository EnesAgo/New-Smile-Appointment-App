import React from 'react'

export default function PatientList({data, head}: any) {
    return (
        <section className="flex flex-col items-center justify-center w-[70%] min-h-32 bg-white rounded-[30px] py-10">

            <div>

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

                                    <tr key={Math.random()*1000}>
                                        {head && head.map((tdInd: any) => (
                                            tdInd === 'status' ?

                                            <td className="pl-2 py-4 text-sm whitespace-nowrap text-gray-800">
                                                {

                                                    e[tdInd] === true ?

                                                    <div className="w-20 h-10 flex items-center justify-center border-[1px] border-[#008767] bg-[#a6e7d9] text-[#008767] rounded">Active</div> :

                                                    <div className="w-20 h-10 flex items-center justify-center border-[1px] border-[#DF0404] bg-[#FFC5C5] text-[#DF0404] rounded">Inactive</div>

                                                }
                                            </td>:

                                            <td className="pl-2 py-2 text-sm whitespace-nowrap text-gray-800">
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

            <div>

            </div>


        </section>
    )
}