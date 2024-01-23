import React, {useEffect, useRef, useState} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import {IPatientEditDataInterface} from "@/@types/interfaces";
import LogButton from "@/components/Inputs/LogButton";
import FormDataRequest from "@/requests/FormDataRequest";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import {requestBaseUrl} from "@/requests/constants";
import HttpRequest from "@/requests/HttpRequest";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import {useRouter} from "next/router";

export default function EditPatientForm(Props: any) {

    const router = useRouter()

    const patientData = Props.patientData

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
        telRef.current.value = patientData.phone
        addresRef.current.value = patientData.address
        birthDateRef.current.value = patientData.birthDate
        birthPlaceRef.current.value = patientData.birthPlace
        debtRef.current.value = patientData.debt
        debtCurrencyTypeRef.current.value = patientData.debtCurrencyType
        embgRef.current.value = patientData.embg

        setPatientStatus(patientData.status)

        setPatientImg(patientData.img)
    }, [Props])


    async function submitUpdatePatient(){
        const nameVal = nameRef.current.value;
        const surnameVal = surnameRef.current.value;
        const parentVal = parentRef.current.value;
        const emailVal = emailRef.current.value;
        const telVal = telRef.current.value;
        const addressVal = addresRef.current.value;
        const birthDateVal = birthDateRef.current.value;
        const birthPlaceVal = birthPlaceRef.current.value;
        const debtVal = debtRef.current.value;
        const currencyVal = debtCurrencyTypeRef.current.value;
        const embgVal = embgRef.current.value;
        const fileImgVal = fileImgRef.current.files[0];

        let imgUrl = patientData.img

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

        const putData = {
            name: nameVal,
            surname: surnameVal,
            parentName: parentVal,
            bornIn: birthDateVal,
            birthPlace: birthPlaceVal,
            address: addressVal,

            email: emailVal,
            phone: telVal,
            embg: embgVal,
            debt: debtVal,
            debtCurrencyType: currencyVal,
            status: patientStatus,

            patientImage: imgUrl,



        }

        const putPatient: any = await HttpRequest.put(`/updatePatient?uuID=${patientData.uuID}`, putData)


        console.log(putPatient)

        if(putPatient.error){
            alertError(`error: ${putPatient.error}`)
            console.log(putPatient.error)
        }
        else{
            alertSuccess("Patient Successfully Updated")
        }



        return
    }


    async function askPassToDelete(){
        const usrPass = prompt("Please write The Password")

        try{
            const srvPass: any = await HttpRequest.delete(`/deletePatient/${patientData.uuID}?pass=${usrPass}`)

            if(srvPass.error){
                alertError("You Don't Have Permission to delete this Patient")
                return
            }

            alertSuccess("Patient Successfully deleted")
            setTimeout(() => {router.push("/")}, 1500)
            return
        } catch (e) {
            console.log(e)
            alertError("An Error Occurred")
            return
        }
    }



    return (
        <>
            {/*<ToastContainerDefault />*/}
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
                            <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl pr-3"} placeholderVal={"Debt"} inpType={"number"} inpRef={debtRef} hasPic={false} />
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
                            <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl pr-3"} placeholderVal={"EMBG"} inpType={"number"} inpRef={embgRef} hasPic={false} />
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
                                onClick={askPassToDelete}
                            >Delete Patient</button>
                        </div>
                    </section>

                    <button onClick={submitUpdatePatient} className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl">Submit</button>

                </section>
            </div>
        </>
    )
}