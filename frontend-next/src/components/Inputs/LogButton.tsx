import React from 'react'

export default function LogButton({onClickFn, className = '', buttonName = 'Sign In'}: any) {
    return (
        <button onClick={onClickFn} className={`${className} flex items-center justify-center bg-sec-blue hover:bg-sec-blue-hover h-10 w-52 rounded-xl`}>
            <h5 className="text-white text-lg">{buttonName}</h5>
        </button>
    )
}