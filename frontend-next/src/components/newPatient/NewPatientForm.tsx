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

    const medicineRef = useRef<any>()
    const allergiesRef = useRef<any>()

    const [stableHealthVal, setStableHealthVal] = useState(false);
    const [operationInFiveYearsVal, setOperationInFiveYearsVal] = useState(false);
    const [HepatitisDiseaseVal, setHepatitisDiseaseVal] = useState(false);
    const [jaundiceDiseaseVal, setJaundiceDiseaseVal] = useState(false);
    const [hivVal, setHivVal] = useState(false);
    const [pregnantVal, setPregnantVal] = useState(false);

    const [isPatientForm, setIsPatientForm] = useState(true)

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

        const medicineVal = medicineRef.current.value;
        const allergiesVal = allergiesRef.current.value;


        try{
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

                const patientUUIDVal = postPatient.uuID

                const medHisObj = {
                    medicine: medicineVal,
                    allergies: allergiesVal,
                    stableHealth: stableHealthVal,
                    operationInFiveYears: operationInFiveYearsVal,
                    HepatitisDisease: HepatitisDiseaseVal,
                    jaundiceDisease: jaundiceDiseaseVal,
                    hiv: hivVal,
                    pregnant: pregnantVal,
                    patientUUID: patientUUIDVal,
                }

                try{
                    const postMedHis:any = await HttpRequest.post("/createMedHistory", medHisObj)
                    console.log(postMedHis)

                }
                catch (e) {
                    alertError(`An Error Occurred`)
                    console.log(e)
                    return
                }


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

        }
        catch (e: any){
            if(e.message){
                alertError(e.message)
                return
            }
            alertError(`An Error Occurred`)
            console.log(e)
        }

        return
    }

    return (
        <>

            <form onSubmit={(e:any) => {e.preventDefault(); submitNewPatient();}} className="w-full h-full flex items-center justify-center" >
             <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">
                <h1 className="pt-6">New Patient</h1>
                <section className="flex flex-col gap-10 items-center justify-center w-full py-12">

                    <section className="flex w-[90%] items-center justify-center gap-24">
                        <label>
                            <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                 font-Poppints">Name</p>
                            <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Name"} inpType={"text"} inpRef={nameRef} hasPic={false}/>
                        </label>
                        <label>
                            <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                 font-Poppints">Surname</p>
                            <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Surname"} inpType={"text"} inpRef={surnameRef} hasPic={false}/>
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
                            <InpLg className={"border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl pr-2"} placeholderVal={"EMBG"} inpType={"number"} inpRef={embgRef} hasPic={false} />
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


                    {/*<button onClick={() => setIsPatientForm(false)} className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#ff4300] hover:bg-[#dd3b00] border-2 border-[#dd3b00] rounded-3xl">Med History</button>*/}

                    <button className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl" type={"submit"}>Submit</button>

                </section>
            </div>
            </form>

            <form onSubmit={(e:any) => {e.preventDefault(); submitNewPatient();}} className="w-full h-full flex items-center justify-center" >
                <div className="flex flex-col items-center w-[80%] min-h-96 bg-white rounded-3xl py-5">
                    <h1 className="pt-6">Patient Medicine History</h1>
                    <section className="flex flex-col gap-10 items-center justify-center w-full py-12">

                        <section className="flex w-[90%] items-center justify-center gap-24">
                            <label>
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">Medicine</p>
                                <InpLg className={"text-red-600 text-bo border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Medicine"} inpType={"text"} inpRef={medicineRef} hasPic={false} isNotRequired={true} />
                            </label>
                            <label>
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">Allergies</p>
                                <InpLg className={"text-red-600 border-2 border-[rgba(102, 102, 102, 0.35)] font-Poppins !placeholder-[rgba(102, 102, 102, 0.60)] !w-72 !h-12 !pl-3 rounded-xl"} placeholderVal={"Allergies"} inpType={"text"} inpRef={allergiesRef} hasPic={false} isNotRequired={true} />
                            </label>
                        </section>

                        <section className="flex w-[90%] items-center justify-center gap-24">

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">StableHealth</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="stableHealth"
                                            value="true"
                                            checked={stableHealthVal}
                                            onChange={() => {setStableHealthVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="stableHealth"
                                            value="false"
                                            checked={!stableHealthVal}
                                            onChange={() => {setStableHealthVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">operationInFiveYears</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="operationInFiveYears"
                                            value="true"
                                            checked={operationInFiveYearsVal}
                                            onChange={() => {setOperationInFiveYearsVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="operationInFiveYears"
                                            value="false"
                                            checked={!operationInFiveYearsVal}
                                            onChange={() => {setOperationInFiveYearsVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                        </section>

                        <section className="flex w-[90%] items-center justify-center gap-24">

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">Hepatitis Disease</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="HepatitisDisease"
                                            value="true"
                                            checked={HepatitisDiseaseVal}
                                            onChange={() => {setHepatitisDiseaseVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="HepatitisDisease"
                                            value="false"
                                            checked={!HepatitisDiseaseVal}
                                            onChange={() => {setHepatitisDiseaseVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">Jaundice Disease</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="jaundiceDisease"
                                            value="true"
                                            checked={jaundiceDiseaseVal}
                                            onChange={() => {setJaundiceDiseaseVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="jaundiceDisease"
                                            value="false"
                                            checked={!jaundiceDiseaseVal}
                                            onChange={() => {setJaundiceDiseaseVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                        </section>

                        <section className="flex w-[90%] items-center justify-center gap-24">

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">HIV</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="Hiv"
                                            value="true"
                                            checked={hivVal}
                                            onChange={() => {setHivVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="Hiv"
                                            value="false"
                                            checked={!hivVal}
                                            onChange={() => {setHivVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                            <div className="w-72 flex flex-col">
                                <p className="!text-[#666] pl-[1px] py-2 cursor-pointer
                     font-Poppints">Is Pregnant</p>


                                <div className={"flex gap-8"}>
                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            className={"accent-[red]"}
                                            name="pregnant"
                                            value="true"
                                            checked={pregnantVal}
                                            onChange={() => {setPregnantVal(true)}}

                                        />
                                        <h3>Yes</h3>
                                    </label>

                                    <label className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="pregnant"
                                            value="false"
                                            checked={!pregnantVal}
                                            onChange={() => {setPregnantVal(false)}}

                                        />
                                        <h3>No</h3>
                                    </label>
                                </div>


                            </div>

                        </section>

                        {/*<button onClick={() => setIsPatientForm(true)} className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#ff4300] hover:bg-[#dd3b00] border-2 border-[#dd3b00] rounded-3xl">Patient Data</button>*/}


                        <button className="flex items-center justify-center w-[58%] h-14 text-white text-2xl font-Poppints bg-[#0072FF] hover:bg-[#0068e8] border-2 border-[#0058C6] rounded-3xl" type={"submit"}>Submit</button>

                    </section>
                </div>
            </form>
        </>
    )
}