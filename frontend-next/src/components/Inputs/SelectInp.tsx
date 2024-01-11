import React from 'react'

interface  selInpProps{
    placeholderVal:string,
    inpType: string,
    inpRef: any,
    hasPic: boolean,
    imgSrc?:string,
    imgAlt?: string,
    className?: String
}
export default function SelectInp(Props: selInpProps) {
    const {placeholderVal, inpType, inpRef, hasPic, imgSrc, imgAlt, className} = Props
    return (
        <label className="relative flex">
            {
                hasPic &&
                <img src={imgSrc} alt={imgAlt} className="h-5 w-5 absolute top-[50%] translate-y-[-50%] left-3" />
            }
            <span className="h-5 w-5 absolute top-[50%] translate-y-[-50%] left-4 text-sm text-gray-400">Type: </span>
            <select name="type" className={`pl-14 w-80 h-10 bg-white rounded-lg font-bold ${className && className}`}>
                <option value="volvo">Volvo</option>

            </select>
        </label>
    )
}