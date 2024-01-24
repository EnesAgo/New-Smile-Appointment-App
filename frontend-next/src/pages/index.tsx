import React, {useEffect, useState} from 'react'
import LoginForm from "@/components/Login";
import HttpRequest from "@/requests/HttpRequest";
import {useRouter} from "next/router";
import {alertError} from "@/functions/alertFunctions";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import {requestBaseUrl} from "@/requests/constants";

export async function getServerSideProps(){
    try{
        const response: any = await fetch(`${requestBaseUrl}/getAllWorkers?page=1`)
        const data: any = await response.json()

        return {
            props: {
                data
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                data: [],
                error: 'Failed to fetch data, ' + JSON.stringify(error),
            },
        };
    }
}
export default function Home({ data, error }: any) {

    const router = useRouter()

    const [userNames, setUserNames] = useState<any>([])

    useEffect(() => {
        if(sessionStorage.jwtNewSmile){
            router.push("/appointments")
        }

        document.body.classList.remove("bg-background-img-two");
        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");

        document.body.classList.add("bg-background-img-one");


        if(error){
            console.log(error)
            alertError(`Error Occurred`)
        } else if(data.dataUsers.length === 0){
            alertError("There Are Not Any Users")
        } else{
            console.log(data)
            setUserNames(data.dataUsers)
        }

    }, [])


    async function submitLoginForm(usernameRef:any, passwordRef:any){
        const usernameVal = usernameRef.current.value
        const passVal = passwordRef.current.value

        if(usernameVal.length === 0){
            alertError("please fill in the username blank")
        }
        if(passVal.length === 0){
            alertError("please fill in the password blank")
        }

        const objData = {
            username: usernameVal,
            password: passVal
        }

        try{
            const responseData: any = await HttpRequest.post('/loginWorker', objData)

            if(responseData.error){
                alertError(responseData.error)

            }else{
                sessionStorage.setItem('jwtNewSmile', JSON.stringify(responseData))
                await router.push("/appointments")
            }
            return
        }
        catch (e: any){
            console.log(e)
            alertError(e.code)
        }

        usernameRef.current.value = ''
        passwordRef.current.value = ''
    }

  return (
      <main className="flex gridMain items-center justify-center">
          {/*<ToastContainerDefault />*/}
          <form onSubmit={(e:any) => {e.preventDefault();}} className="w-full h-full flex items-center justify-center">
              <LoginForm submitForm={submitLoginForm} userNames={userNames} />
          </form>
      </main>
  )
}