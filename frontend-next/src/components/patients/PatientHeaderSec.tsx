import React from 'react'
import humanReadableNumber from "@/functions/humanReadableNumber";


export default function PatientHeaderSec({activePatients, totalPatients, inactivePatients}: any) {

    const actPerc = parseInt(((100*activePatients)/totalPatients).toFixed(0));
    const incactPerc = parseInt(((100*inactivePatients)/totalPatients).toFixed(0));

    const readableActivePatients = humanReadableNumber(activePatients)
    const readableTotalPatients = humanReadableNumber(totalPatients)
    const readableInactivePatients = humanReadableNumber(inactivePatients)



    return (
        <section className="flex items-center justify-center min-w-[650px] w-[60%] h-32 bg-white rounded-[30px]">
            <div className="flex gap-2 h-20 border-r-[1px] border-r-alto px-10">
                <img src="/assets/imgs/patients/singlePatientImg.png" alt="singlePatient" className="h-20 w-20 rounded-full"/>
                <div className="h-full flex flex-col justify-between">
                    <p className="text-gray-400 text-sm ">Active</p>
                    <h3 className="text-black font-bold text-3xl">{readableActivePatients}</h3>
                    <div className="flex items-center">
                        <img src="/assets/imgs/Icons/green-up-arrow.png" alt="green arrow" className="w-4 h-4"/>
                        <p className=" text-[14px] font-extralight font-sans "><span className="text-[#00ac4f] font-bold text-xs mr-1">{actPerc}%</span>patients</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 h-20 px-10 border-r-[1px] border-r-alto">
                <img src="/assets/imgs/patients/totalPatientsImg.png" alt="singlePatient" className="h-20 w-20 rounded-full"/>
                <div className="h-full flex flex-col justify-center">
                    <p className="text-gray-400 text-sm ">Total Patients</p>
                    <h3 className="text-black font-bold text-3xl">{readableTotalPatients}</h3>
                </div>
            </div>

            <div className="flex gap-2 h-20 px-10">
                <img src="/assets/imgs/patients/singlePatientImg.png" alt="singlePatient" className="h-20 w-20 rounded-full"/>
                <div className="h-full flex flex-col justify-between">
                    <p className="text-gray-400 text-sm ">Inactive</p>
                    <h3 className="text-black font-bold text-3xl">{readableInactivePatients}</h3>
                    <div className="flex items-center">
                        <img src="/assets/imgs/Icons/red-down-arrow.png" alt="red arrow" className="w-4 h-4"/>
                        <p className=" text-[14px] font-extralight font-sans "><span className="text-[#d0014c] font-bold text-xs mr-1">{incactPerc}%</span>patients</p>
                    </div>
                </div>
            </div>

        </section>
    )
}