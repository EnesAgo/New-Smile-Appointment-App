import React, {useRef} from 'react'
import InpLg from "@/components/Inputs/LogInp";

export default function NewPatientForm() {

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

    return (
        <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">
            <h1 className="pt-6">New Patient</h1>
            <section className="flex flex-col gap-10 items-center justify-center w-full py-12">

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