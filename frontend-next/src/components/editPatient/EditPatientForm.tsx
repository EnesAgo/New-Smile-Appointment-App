import React, {useEffect, useRef, useState} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import {PatientEditDataInterface} from "@/@types/interfaces";

export default function EditPatientForm(Props: PatientEditDataInterface) {

    const patientData = Props.patientData

    const [patientImg, setPatientImg] = useState('')

    const nameRef = useRef<any>()
    const surnameRef = useRef<any>()
    const parentRef = useRef<any>()
    const emailRef = useRef<any>()
    const telRef = useRef<any>()
    const addresRef = useRef<any>()
    const birthDateRef = useRef<any>()
    const birthPlaceRef = useRef<any>()
    const embgRef = useRef<any>()
    const fileImgRef = useRef<any>()

    useEffect(() => {
        nameRef.current.value = patientData.name
        surnameRef.current.value = patientData.surname
        parentRef.current.value = patientData.parentName
        emailRef.current.value = patientData.email
        telRef.current.value = patientData.tel
        addresRef.current.value = patientData.addres
        birthDateRef.current.value = patientData.birthDate
        birthPlaceRef.current.value = patientData.birthPlace
        embgRef.current.value = patientData.EMBG

        setPatientImg(patientData.img)
    })

    return (
        <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">
            <section className="flex items-center justify-center w-full min-h-28 pt-16 pb-4">
                <img className="w-36 rounded-full" src={patientImg} alt="patient image"/>
            </section>
            <section className="flex flex-col gap-10 items-center justify-center w-full pt-6 pb-12">
                <section className="flex w-[90%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Name</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Name"} inpType={"text"} inpRef={nameRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Surname</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Surname"} inpType={"text"} inpRef={surnameRef} hasPic={false} />
                    </label>
                </section>

                <section className="flex w-[90%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Parent Name</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Parent Name"} inpType={"text"} inpRef={parentRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">E-mail</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"E-mail"} inpType={"email"} inpRef={emailRef} hasPic={false} />
                    </label>
                </section>

                <section className="flex w-[90%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Address</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Address"} inpType={"text"} inpRef={addresRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Tel Number</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Tel Number"} inpType={"text"} inpRef={telRef} hasPic={false} />
                    </label>
                </section>

                <section className="flex w-[90%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Birth Date</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Birth Date"} inpType={"text"} inpRef={birthDateRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Birth Place</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Birth Place"} inpType={"text"} inpRef={birthPlaceRef} hasPic={false} />
                    </label>
                </section>

                <section className="flex w-[60%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">EMBG</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"EMBG"} inpType={"text"} inpRef={embgRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Photo</p>
                        <button
                            className="flex items-center justify-center !w-72 !h-12 !pl-3 rounded-xl bg-[#FFA500] hover:bg-[#ea9a04] border-2 border-[#B37400] text-white text-xl"
                            onClick={() => {fileImgRef.current.click()}}
                        >Select File</button>
                        <input className="invisible absolute left-[-200%]" type="file" ref={fileImgRef} />
                    </label>
                </section>

                <button className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl">Submit</button>

            </section>
        </div>
    )
}