import React, {useEffect, useRef, useState} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import {IPatientEditDataInterface} from "@/@types/interfaces";
import LogButton from "@/components/Inputs/LogButton";

export default function EditPatientForm(Props: IPatientEditDataInterface) {

    const patientData = Props.patientData

    const statusButtonColors = {
        activeBG: "#0C9201",
        activeBGHover: "#096d00",
        activeBorder: "#036104",

        inActiveBG: "#ffC5c5",
        inActiveBGHover: "#ff9393",
        inActiveBorder: "#df0404",
    }

    const [patientImg, setPatientImg] = useState('')

    const [patientStatus, setPatientStatus] = useState(false)

    const nameRef = useRef<any>()
    const surnameRef = useRef<any>()
    const parentRef = useRef<any>()
    const emailRef = useRef<any>()
    const telRef = useRef<any>()
    const addresRef = useRef<any>()
    const birthDateRef = useRef<any>()
    const birthPlaceRef = useRef<any>()
    const debtRef = useRef<any>()
    const debtCurrencyTypeRef = useRef<any>()
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
        debtRef.current.value = patientData.debt
        debtCurrencyTypeRef.current.value = patientData.debtCurrencyType
        embgRef.current.value = patientData.EMBG

        setPatientStatus(patientData.status)

        setPatientImg(patientData.img)
    }, [])



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

                <section className="flex w-[90%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Debt</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Debt"} inpType={"number"} inpRef={debtRef} hasPic={false} />
                    </label>
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Currency</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Currency"} inpType={"text"} inpRef={debtCurrencyTypeRef} hasPic={false} />
                    </label>
                </section>

                <section className="flex w-[60%] items-center justify-center gap-24">
                    <label>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">EMBG</p>
                        <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"EMBG"} inpType={"text"} inpRef={embgRef} hasPic={false} />
                    </label>

                    <div>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Status</p>
                        {
                            patientStatus ?
                                <button
                                    className={`flex items-center justify-center !w-72 !h-12 rounded-xl bg-[#0C9201] hover:bg-[#096d00] border-2 border-[#036104] text-white text-xl`}
                                    onClick={() => setPatientStatus(false)}
                                >Active</button> :

                                <button
                                    // className={`flex items-center justify-center !w-72 !h-12 !pl-3 rounded-xl bg-[#ff3f3f] hover:bg-[#fc0505] border-2 border-[#df0404] text-white text-xl`}

                                    className={`flex items-center justify-center !w-72 !h-12 rounded-xl bg-[#fc6767] hover:bg-[#ff3a3a] border-2 border-[#DF0404] text-white text-xl`}

                                    onClick={() => setPatientStatus(true)}
                                >InActive</button>
                        }
                    </div>

                </section>

                <section className="flex w-[60%] items-center justify-center gap-24">
                    <div>
                        <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                         font-Poppints">Photo</p>
                        <button
                            className="flex items-center justify-center !w-72 !h-12 !pl-3 rounded-xl bg-[#FFA500] hover:bg-[#ea9a04] border-2 border-[#B37400] text-white text-xl"
                            onClick={() => {fileImgRef.current.click()}}
                        >Select File</button>
                        <input className="invisible absolute left-[-200%]" type="file" ref={fileImgRef} />
                    </div>

                    <div>
                        <p className="!text-[red] font-extrabold pl-[1px] py-2 cursor-pointer
                         font-Poppints">Delete</p>
                        <button
                            className={`flex items-center justify-center !w-72 !h-12 !pl-3 rounded-xl bg-[#ff3f3f] hover:bg-[#fc0505] border-2 border-[#df0404] text-white text-xl`}
                            onClick={() => {}}
                        >Delete Patient</button>
                    </div>
                </section>

                <button className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl">Submit</button>

            </section>
        </div>
    )
}