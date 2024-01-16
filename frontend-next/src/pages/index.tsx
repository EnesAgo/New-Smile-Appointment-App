import React, {useEffect} from 'react'
import LoginForm from "@/components/Login";
import HttpRequest from "@/requests/HttpRequest";
import {useRouter} from "next/router";
import {alertError} from "@/functions/alertFunctions";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";

export default function Home() {

    const router = useRouter()

    useEffect(() => {
        if(localStorage.jwtNewSmile){
            router.push("/appointments")
        }

        document.body.classList.remove("bg-background-img-two");
        document.body.classList.remove("bg-gradient-to-r");
        document.body.classList.remove("from-[#00d8ee]");
        document.body.classList.remove("to-[#27f8aa]");

        document.body.classList.add("bg-background-img-one");
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
                localStorage.setItem('jwtNewSmile', JSON.stringify(responseData))
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
          <ToastContainerDefault />
          <LoginForm submitForm={submitLoginForm} />
      </main>
  )
}