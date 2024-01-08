import React from 'react'

export default function LogButton({onClickFn}: any) {
    return (
        <button onClick={onClickFn} className="flex items-center justify-center bg-sec-blue hover:bg-sec-blue-hover h-10 w-52 rounded-xl">
            <h5 className="text-white text-lg">Sign In</h5>
        </button>
    )
}