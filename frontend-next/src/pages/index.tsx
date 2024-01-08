import React from 'react'
import HeaderComp from "@/components/Header";
import LoginForm from "@/components/Login";

export default function Home() {
    async function submitLoginForm(usernameRef:any, passwordRef:any){
        const usernameVal = usernameRef.current.value
        const passVal = passwordRef.current.value
    }

  return (
      <>
          <HeaderComp />
          <main className="flex gridMain flex items-center justify-center">
            <LoginForm submitForm={submitLoginForm} />
          </main>
      </>
  )
}