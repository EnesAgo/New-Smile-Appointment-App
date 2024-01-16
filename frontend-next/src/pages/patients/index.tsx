import React, {useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import PatientHeaderSec from "@/components/patients/PatientHeaderSec";
import PatientList from "@/components/patients/PatientList";
import HttpRequest from "@/requests/HttpRequest";
import {requestBaseUrl} from "@/requests/constants";

export async function getServerSideProps(){
    try{
        // const data:any = await HttpRequest.get(`/findAllPatients?&page=1`)

        const response: any = await fetch(`${requestBaseUrl}/findAllPatients?&page=1`)
        const data: any = await response.json()

        console.log(data)

        return {
            props: {
                data
            }
        }
    }
    catch (e){
        return {
            props: {
                data: e
            }
        }
    }
}
export default function Patients({ data }: any) {
    const [head, setHead] = useState(['id', 'Name', 'Phone', 'email', 'status'])
    const [dataToShow, setDataToShow] = useState<any>([])

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

        console.log(data)

        let dataToShowArray = data.AllPatients.map((e:any) => {
            if(JSON.parse(localStorage.jwtNewSmile).isAdmin){
                return {
                    no: String(e.no),
                    Name: `${e.name} ${e.surname}`,
                    email: e.email,
                    debt: e.debt,
                    Currency: e.debtCurrencyType,
                    status: e.status
                }
            }
            else{
                return {
                    no: String(e.no),
                    Name: `${e.name} ${e.surname}`,
                    phone: e.phone,
                    email: e.email,
                    debt: e.debt,
                    Currency: e.debtCurrencyType,
                    status: e.status
                }
            }
        })

        setHead(Object.keys(dataToShowArray[0]))
        setDataToShow(dataToShowArray)

        console.log(dataToShowArray)



    }, [])

    const SearchRef = useRef()
    const SearchTypeRef = useRef()


    return (

        <>
            <HeaderComp />
            <main className="flex flex-col items-center justify-center gap-8 gridMain py-10">
                <PatientHeaderSec activePatients={1583} totalPatients={2230} inactivePatients={647} />
                <PatientList data={dataToShow} head={head} searchInpRef={SearchRef} totalPatients={2230} />
            </main>
        </>

    )
}