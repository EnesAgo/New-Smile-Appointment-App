import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {useRouter} from "next/router";

export default function HeaderComp() {
    const [NavHover, setNavHover] = useState("");
    const router = useRouter()

    useEffect(() => {
        const NavHovRoute = router.route.split("/")[1]
        setNavHover(NavHovRoute);
    }, [])


    function logOut() {
        localStorage.setItem('jwtNewSmile', '');
        return router.replace('/')
    }

    return (
            <header className="w-full flex justify-between items-center min-h-16 px-10 bg-[rgba(255,255,255,0.5)] gridHeader">
                <Link href="/">
                    <span className="text-dark font-bold text-2xl">New Smile App</span>
                </Link>
                <nav>
                    <ul className="flex items-center gap-5 child:child:text-first-blue child:child:text-lg">
                        <li>
                            <Link href="/appointments" rel="Appointments" className={`hover:text-first-blue-hover ${NavHover==="appointments" && "font-bold text-sec-blue"}`}>Appointments</Link>
                        </li>
                        <li>
                            <Link href="/patients" rel="Patients" className={`hover:text-first-blue-hover ${NavHover==="patients" && "font-bold text-sec-blue"}`}>Patients</Link>
                        </li>
                        <li>
                            <Link href="/newPatient" rel="New-Patient" className={`hover:text-first-blue-hover ${NavHover==="newPatient" && "font-bold text-sec-blue"}`}>New Patient</Link>
                        </li>
                        <li>
                            <span className="hover:text-first-blue-hover cursor-pointer" onClick={() => logOut()}>Log out</span>
                        </li>
                    </ul>
                </nav>
            </header>
    )
}