import React, {useRef} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import LogButton from "@/components/Inputs/LogButton";

export default function NewWorker({ submitForm }: any) {

    const iconPrefix = '/assets/imgs/icons'

    const usernameRef: any  = useRef();
    const nameRef: any  = useRef();
    const surnameRef: any  = useRef();
    const emailRef: any  = useRef();
    const passwordRef: any  = useRef();


    return (
        <section className="flex flex-col w-96 h-auto bg-[rgba(240,242,255,0.8)] mb-12">
            <section className="w-full h-10 flex items-center justify-center border-b-2 border-b-sec-blue">
                <h5 className="text-sec-blue font-sans font-sm font-normal">New Worker</h5>
            </section>
            <section className="w-full h-full flex items-center justify-center my-8">
                <div className="flex flex-col items-center justify-center gap-7 self-center">
                    <InpLg placeholderVal={"Username"} inpType={"text"} inpRef={usernameRef} hasPic={true} imgSrc={`${iconPrefix}/userIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"Name"} inpType={"text"} inpRef={nameRef} hasPic={true} imgSrc={`${iconPrefix}/userIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"Surname"} inpType={"text"} inpRef={surnameRef} hasPic={true} imgSrc={`${iconPrefix}/userIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"E-mail"} inpType={"email"} inpRef={emailRef} hasPic={true} imgSrc={`${iconPrefix}/userIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"Password"} inpType={"password"} inpRef={passwordRef} hasPic={true} imgSrc={`${iconPrefix}/lockIcon.svg`} imgAlt={"userIcon"} />

                    <LogButton onClickFn={() => submitForm(usernameRef, nameRef, surnameRef, emailRef, passwordRef)} />
                </div>
            </section>
        </section>
    )
}