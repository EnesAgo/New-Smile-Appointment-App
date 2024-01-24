import React, {useEffect, useRef, useState} from 'react'
import HeaderComp from "@/components/Header";
import ToastContainerDefault from "@/components/toastContainer/ToastContainers";
import {alertError, alertSuccess} from "@/functions/alertFunctions";
import HttpRequest from "@/requests/HttpRequest";
import ChangePassword from "@/components/settings/ChangePassword";
import {useRouter} from "next/router";
import ChangeColor from "@/components/settings/ChangeColor";
import NewWorker from "@/components/settings/NewWorker";
import HeaderVertComp from "@/components/HeaderVertical";

export default function Settings() {

    const router = useRouter()

    const [nNum, setNNum] = useState(0)

    const [userData, setUserData] = useState<any>()
    const [colorVal, setColorVal] = useState<any>('')

    const colorRef: any = useRef();

    useEffect(() => {
        document.body.classList.remove("bg-background-img-one");
        document.body.classList.remove("bg-background-img-two");

        document.body.classList.add("bg-gradient-to-r");
        document.body.classList.add("from-[#00d8ee]");
        document.body.classList.add("to-[#27f8aa]");

        setUserData(JSON.parse(window.sessionStorage.jwtNewSmile))
        setColorVal(JSON.parse(window.sessionStorage.jwtNewSmile).userEventColor)
    }, [])

    function logOut() {
        sessionStorage.setItem('jwtNewSmile', '');
        return router.replace('/')
    }

    async function changeColor(e: any) {
        console.log(colorRef.current.value)
        setColorVal(colorRef.current.value)


        const changeData = {
            color: colorRef.current.value
        }

        try{
            const resData: any = await HttpRequest.put(`/changeWorkerColor?userUUID=${userData.uuID}`, changeData)
            if(resData.error){
                console.log(resData.error)
                alertError("An Error Occurred")
                return
            }

            console.log(resData)

            sessionStorage.jwtNewSmile = JSON.stringify(resData)
            if(nNum < 3){

                alertSuccess("color changed successfully")

                setNNum(prev => prev+1)

                setTimeout(() => setNNum(prev => prev-1), 3000)
            }
        } catch (e){
            console.log(e)
            alertError("An Error Occurred")
            return
        }

    }

    async function submitChangePassword(oldPassRef: any, newPassRef: any, newPassVerifyRef: any){
        if(oldPassRef.current.value === ''){
            alertError("Please fill in the Old Pass blank")
            return
        }
        if(newPassRef.current.value === ''){
            alertError("Please fill in the New Pass blank")
            return
        }
        if(newPassVerifyRef.current.value === ''){
            alertError("Please fill in the Confirm New Pass blank")
            return
        }
        if(newPassRef.current.value !== newPassVerifyRef.current.value){
            alertError("Your 'new password' is not the same as the 'confirm new password'")
            return
        }

        const objData = {
            oldPass: oldPassRef.current.value,
            newPass: newPassRef.current.value
        }

        console.log(objData)

        try{

            const responseData: any = await HttpRequest.put(`/changeWorkerPassword?userUUID=${userData.uuID}`, objData)

            console.log(responseData)

            if(responseData.error){
                alertError(responseData.error)
                return
            }

            alertSuccess("Password Successfully Changed")
            alertSuccess("Redirecting to Login Page")

            setTimeout(() => setTimeout(() => logOut(), 750))

        } catch (e: any){
            console.log(e)
            alertError(e.code)
        }
    }

    async function postNewWorker(usernameRef:any, nameRef:any, surnameRef:any, emailRef:any, passwordRef:any){
        try{

            if(
                usernameRef.current.value === '' ||
                nameRef.current.value === '' ||
                surnameRef.current.value === '' ||
                emailRef.current.value === '' ||
                passwordRef.current.value === ''
            ){
                alertError("Please fill in the blanks")
                return
            }
            
            const objData ={
                username: usernameRef.current.value,
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                userEventColor: "#255984"
            }

            const NewWorker: any = await HttpRequest.post("/createWorker", objData)

            console.log(NewWorker)

            if(NewWorker.error){
                alertError(`error: ${NewWorker.error}`)
                console.log(NewWorker.error)
            }
            else{
                alertSuccess("Worker Successfully created")

                usernameRef.current.value = '';
                nameRef.current.value = '';
                surnameRef.current.value = '';
                emailRef.current.value = '';
                passwordRef.current.value = '';
            }
            
        } catch (e){
            alertError(`An Error Occurred`)
            console.log(e)
        }
    }

    return (
        <>
            {/*<HeaderComp />*/}
            <HeaderVertComp />

            {/*<ToastContainerDefault />*/}
            <main className="flex flex-col gridMain items-center justify-center gap-8 py-12 h-full">
                <ChangePassword submitForm={submitChangePassword} />
                <ChangeColor colorRef={colorRef} changeColor={changeColor} val={colorVal} userData={userData} />
                {
                    userData?.isAdmin &&
                    <NewWorker submitForm={postNewWorker} />
                }
            </main>
        </>
    )
}