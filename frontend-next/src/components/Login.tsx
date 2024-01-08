import React, {useRef} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import LogButton from "@/components/Inputs/LogButton";

export default function LoginForm({submitForm}: any) {
    const iconPrefix = '/assets/imgs/icons'

    const usernameRef = useRef();
    const passwordRef = useRef();


    return (
        <section className="flex flex-col w-96 h-80 bg-[rgba(240,242,255,0.8)]">
            <section className="w-full h-10 flex items-center justify-center border-b-2 border-b-sec-blue">
                <h5 className="text-sec-blue font-sans font-sm font-normal">Login</h5>
            </section>
            <section className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-10 self-center">
                    <InpLg placeholderVal={"username"} inpType={"text"} inpRef={usernameRef} hasPic={true} imgSrc={`${iconPrefix}/userIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"password"} inpType={"password"} inpRef={passwordRef} hasPic={true} imgSrc={`${iconPrefix}/lockIcon.svg`} imgAlt={"userIcon"} />
                    <LogButton onClickFn={() => submitForm(usernameRef, passwordRef)} />
                </div>
            </section>
        </section>
    )
}