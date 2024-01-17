import React, {useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import PatientHeaderSec from "@/components/patients/PatientHeaderSec";
import PatientList from "@/components/patients/PatientList";
import HttpRequest from "@/requests/HttpRequest";
import {requestBaseUrl} from "@/requests/constants";
import {alertError} from "@/functions/alertFunctions";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";

export async function getServerSideProps(){
    try{
        const response: any = await fetch(`${requestBaseUrl}/findAllPatients?page=1`)
        const resData: any = await response.json()

        const activeRes: any = await fetch(`${requestBaseUrl}/searchActivePatients?page=1`)
        const activeData: any = await activeRes.json()

        return {
            props: {
                allPatients: resData,
                activePatients: activeData,
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                allPatients: [],
                activePatients: [],
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}

export default function Patients({ allPatients, activePatients, error }: any) {
    const [head, setHead] = useState(['id', 'Name', 'Phone', 'email', 'status'])
    const [dataToShow, setDataToShow] = useState<any>([])

    const [showActivePatients, setShowActivePatients] = useState<any>('0')
    const [showInActivePatients, setShowInActivePatients] = useState<any>('0')

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

        if (error) {
            console.log(error)
            alertError(`Error Occurred`)
        }
        else if(allPatients.AllPatients.length == 0){
            console.log(allPatients.AllPatients.length)
            alertError("There Are Not Any Patients")
        }
        else{
            console.log(allPatients, activePatients)

            let dataToShowArray = allPatients.AllPatients.map((e:any) => {
                if(JSON.parse(localStorage.jwtNewSmile).isAdmin){
                    return {
                        uuID: e.uuID,
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
                        uuID: e.uuID,
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

            setShowActivePatients(String(activePatients.total))
            setShowInActivePatients(String(allPatients.total-activePatients.total))

            console.log(activePatients.total)
            console.log(allPatients.total-activePatients.total)

        }


    }, [])

    const SearchRef: any = useRef()
    const SearchTypeRef: any = useRef()

    async function getSearchPatient(path: any){
        return await HttpRequest.get(path)
    }

    async function onInpValChangeFunc(){

        const query = SearchRef.current.value
        const queryType = SearchTypeRef.current.value

        console.log(query)

        try{

            let res: any;
            let dataToShowArray: any;

            if(queryType == 'fullName'){


                res = await getSearchPatient(`/searchFullNamePatients?fullName=${query}`)

                console.log(res)


            } else if(queryType == 'no'){

                res = await getSearchPatient(`/searchNoPatients?no=${query}`)


            } else if(queryType == 'phone'){

                res = await getSearchPatient(`/searchPhonePatients?phone=${query}`)


            } if(queryType == 'active'){

                res = await getSearchPatient(`/searchActivePatients`)


            } else if(queryType == 'inActive'){

                res = await getSearchPatient(`/searchInActivePatients`)

            } else{

                res = await getSearchPatient(`/searchFullNamePatients?fullName=${query}`)

            }

            console.log(res)


            if(res.searchedPatients.length == 0){
                alertError("There Are Not Any Patients")
            }
            else{
                dataToShowArray = res.searchedPatients.map((e: any) => {
                    if(JSON.parse(localStorage.jwtNewSmile).isAdmin){
                        return {
                            uuID: e.uuID,
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
                            uuID: e.uuID,
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
            }



        } catch (e: any){
            console.log(e)
            alertError("An Error Occurred")
        }


    }

    return (

        <>
            <HeaderComp />
            <main className="flex flex-col items-center justify-center gap-8 gridMain py-10">
                <ToastContainerDefault />
                <PatientHeaderSec activePatients={showActivePatients} totalPatients={allPatients.total} inactivePatients={showInActivePatients} />
                <PatientList data={dataToShow} head={head} searchInpRef={SearchRef} searchInpTypeRef={SearchTypeRef} totalPatients={allPatients.total} onInpValChangeFunc={onInpValChangeFunc} />
            </main>
        </>

    )
}