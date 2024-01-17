import React, {useRef, useState} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import HttpRequest from "@/requests/HttpRequest";
import FormDataRequest from "@/requests/FormDataRequest";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import {requestBaseUrl} from "@/requests/constants";

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

    async function submitNewPatient(){
        const nameVal = nameRef.current.value;
        const surnameVal = surnameRef.current.value;
        const parentVal = parentRef.current.value;
        const emailVal = emailRef.current.value;
        const telVal = telRef.current.value;
        const addressVal = addresRef.current.value;
        const birthDateVal = birthDateRef.current.value;
        const birthPlaceVal = birthPlaceRef.current.value;
        const embgVal = embgRef.current.value;
        const fileImgVal = fileImgRef.current.files[0];

        let imgUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.awAiMS1BCAQ2xS2lcdXGlwHaHH%26pid%3DApi&f=1&ipt=da636c11b0380e062d4a8ab26a212d392e7cb46a8ffd5fc083dee44e68c266a4&ipo=images'

        if(fileImgVal){
            const fileData = await FormDataRequest("/uploadPatientImage", fileImgVal)
            console.log(fileData)

            if(fileData.error){
                alertError(`error: ${fileData.error}`)
                console.log(fileData.error)
                return
            }

            imgUrl = `${requestBaseUrl}/${fileData.finalName}`
            console.log(`${requestBaseUrl}/${fileData.finalName}`)
        }

        const postData = {
            name: nameVal,
            surname: surnameVal,
            parentName: parentVal,
            bornIn: birthDateVal,
            birthPlace: birthPlaceVal,
            address: addressVal,

            email: emailVal,
            phone: telVal,
            embg: embgVal,

            patientImage: imgUrl,

        }

        const postPatient:any = await HttpRequest.post("/createPatient", postData)

        console.log(postPatient)

        if(postPatient.error){
            alertError(`error: ${postPatient.error}`)
            console.log(postPatient.error)
        }
        else{
            alertSuccess("Patient Successfully created")
        }


        nameRef.current.value = '';
        surnameRef.current.value = '';
        parentRef.current.value = '';
        emailRef.current.value = '';
        telRef.current.value = '';
        addresRef.current.value = '';
        birthDateRef.current.value = '';
        birthPlaceRef.current.value = '';
        embgRef.current.value = '';
        fileImgRef.current.value = '';

        return
    }

    return (
        <>
            <ToastContainerDefault />
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
                            <input className="invisible absolute left-[-200%]" type="file" accept="image/*" name="image" ref={fileImgRef} />
                        </label>
                    </section>

                    <button onClick={() => submitNewPatient()} className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl">Submit</button>

                </section>
            </div>
        </>
    )
}