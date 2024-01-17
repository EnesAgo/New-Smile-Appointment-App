import React, {useRef} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import LogButton from "@/components/Inputs/LogButton";

export default function ChangePassword({ submitForm }: any) {

    const iconPrefix = '/assets/imgs/icons'

    const oldPassRef: any  = useRef();
    const newPassRef: any  = useRef();
    const newPassVerifyRef: any  = useRef();


    return (
        <section className="flex flex-col w-96 h-80 bg-[rgba(240,242,255,0.8)]">
            <section className="w-full h-10 flex items-center justify-center border-b-2 border-b-sec-blue">
                <h5 className="text-sec-blue font-sans font-sm font-normal">Change Password</h5>
            </section>
            <section className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-7 self-center">
                    <InpLg placeholderVal={"Old Password"} inpType={"password"} inpRef={oldPassRef} hasPic={true} imgSrc={`${iconPrefix}/lockIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"New Password"} inpType={"password"} inpRef={newPassRef} hasPic={true} imgSrc={`${iconPrefix}/lockIcon.svg`} imgAlt={"userIcon"} />
                    <InpLg placeholderVal={"Confirm New Password"} inpType={"password"} inpRef={newPassVerifyRef} hasPic={true} imgSrc={`${iconPrefix}/lockIcon.svg`} imgAlt={"userIcon"} />

                    <LogButton onClickFn={() => submitForm(oldPassRef, newPassRef, newPassVerifyRef)} />
                </div>
            </section>
        </section>
    )
}