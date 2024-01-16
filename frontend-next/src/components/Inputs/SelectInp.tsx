import React from 'react'
import {ISelInpProps} from "@/@types/interfaces";

export default function SelectInp(Props: ISelInpProps) {
    const {inpRef, hasPic, imgSrc, imgAlt, className, onChange} = Props
    return (
        <label className="relative flex">
            {
                hasPic &&
                <img src={imgSrc} alt={imgAlt} className="h-5 w-5 absolute top-[50%] translate-y-[-50%] left-3" />
            }
            <span className="h-5 w-5 absolute top-[50%] translate-y-[-50%] left-4 text-sm text-gray-400">Type: </span>
            <select name="type" className={`pl-14 w-80 h-10 bg-white rounded-lg font-bold ${className && className}`} ref={inpRef} onChange={onChange} >
                <option value="fullName">Full Name</option>
                <option value="no">No</option>
                <option value="phone">phone</option>
                <option value="active">Active</option>
                <option value="inActive">InActive</option>

            </select>
        </label>
    )
}