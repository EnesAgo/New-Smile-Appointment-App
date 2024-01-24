import React from 'react'
import {IInpLgPropsInterface} from "@/@types/interfaces";

export default function InpLg(Props: IInpLgPropsInterface) {
    const {placeholderVal, inpType, value, inpRef, hasPic, imgSrc, imgAlt, className, onChange, dataList, isNotRequired} = Props

    return (
        <label className="relative flex">
            {
                hasPic &&
                <img src={imgSrc} alt={imgAlt} className="h-5 w-5 absolute top-[50%] translate-y-[-50%] left-3" />
            }
            {
                onChange ?

                <input value={value && value} list={dataList && dataList} type={inpType} ref={inpRef} className={`pl-12 w-80 h-10 bg-white rounded-lg ${className && className}`} placeholder={placeholderVal} onChange={onChange} required={!isNotRequired} />:

                <input value={value && value} list={dataList && dataList} type={inpType} ref={inpRef} className={`pl-12 w-80 h-10 bg-white rounded-lg ${className && className}`} placeholder={placeholderVal} required={!isNotRequired} />

            }
        </label>
        )
}