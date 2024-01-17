import React, {useRef} from 'react'
import InpLg from "@/components/Inputs/LogInp";
import LogButton from "@/components/Inputs/LogButton";

export default function ChangeColor({ colorRef, changeColor, userData, val }: any) {

    const iconPrefix = '/assets/imgs/icons'


    return (
        <section className="flex flex-col w-96 h-24 bg-[rgba(240,242,255,0.8)]">
            <section className="w-full h-10 flex items-center justify-center border-b-2 border-b-sec-blue">
                <h5 className="text-sec-blue font-sans font-sm font-normal">Change Event Color</h5>
            </section>
            <section className="w-full h-full flex items-center justify-center">
                    <input className="border-none w-full h-12 mx-3" type="color" onChange={changeColor} ref={colorRef} value={val} defaultValue={userData?.userEventColor} />
            </section>
        </section>
    )
}