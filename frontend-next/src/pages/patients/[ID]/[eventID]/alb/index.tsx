import React, {useEffect} from 'react';
import { useRouter } from 'next/router'
import {requestBaseUrl} from "@/requests/constants";
import moment from "moment/moment";

export async function getServerSideProps({ params }: any){
    try{
        const resHis: any = await fetch(`${requestBaseUrl}/findOneEvent?uuID=${params.eventID}`)
        const data: any = await resHis.json()


        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                data: {},
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}
const PrintDocumentAlb = ({ data }: any ) => {
    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");
        if(data){
            window.print();
        }
    }, [data])

    const { title, start, end, description, billType, bill, fromName, uuID, patient, payed } = data

    const startDateFormatted = moment(start).format("DD MMM YYYY hh:mm")

    const dueDateFormatted = moment(end).format("DD MMM YYYY hh:mm")

    return (
        data &&
        <div className="mx-8 min-h-[800px] h-[800px]">
            <div className="w-full h-full flex flex-col gap-10">
                <h1 className="text-center text-dark text-4xl">New Smile</h1>
                <div className="flex flex-col gap-12">
                    <h1 className="font-semibold text-xl">Служби:</h1>
                    <div className="w-full flex justify-center">
                        <table className="table table-auto w-[80%] border-collapse border border-slate-500">
                            <thead className="w-full">
                            <tr className="w-full child:border child:border-slate-500 child:p-2">
                                <th className="text-left">Fjalëkalimi</th>
                                <th className="text-left">Titulli</th>
                                <th className="text-left">Data e fillimit</th>
                                <th className="text-left">data e përfundimit</th>
                                <th className="text-left">përshkrim</th>
                                {/*<th className="text-left">bill</th>*/}
                                {/*<th className="text-left">currency</th>*/}
                                {/*<th className="text-left">payed</th>*/}
                                <th className="text-left">MJEKU</th>
                            </tr>
                            </thead>
                            <tbody className="w-full">
                            <tr className="w-full bg-alto even:bg-sand child:border child:border-slate-500 child:p-2">
                                <td><h2>{uuID}</h2></td>
                                <td><h2>{title}</h2></td>
                                <td><h2>{startDateFormatted}</h2></td>
                                <td><h2>{dueDateFormatted}</h2></td>
                                <td><h2>{description}</h2></td>
                                {/*<td><h2>{bill}</h2></td>*/}
                                {/*<td><h2>{billType} </h2></td>*/}
                                {/*<td><h2>{String(payed)}</h2></td>*/}
                                <td><h2>{fromName}</h2></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="font-medium text-lg mt-8">
                        Jam dakord që një ndërhyrje <u>është bërë</u> në <u>_____________</u>, shuma e ndërhyrjes është <u>_____________</u> dhe se do të paguhet brenda afatit të
                    </h2>

                </div>

            </div>
            <div className="static bottom-5 w-full flex justify-between">
                <div className="flex flex-col h-[100px] w-[350px] justify-between items-center">
                    <h1 className="font-semibold text-xl text-center">Nënshkrimi i drejtorit</h1>
                    <span className="w-[80%] border border-b-dark"></span>
                </div>
                <div className="flex flex-col h-[100px] w-[350px] justify-between items-center">
                    <h1 className="font-semibold text-xl text-center">Nënshkrimi i klientit</h1>
                    <span className="w-[80%] border border-b-dark"></span>
                </div>
            </div>
        </div>
    );
};

export default PrintDocumentAlb;