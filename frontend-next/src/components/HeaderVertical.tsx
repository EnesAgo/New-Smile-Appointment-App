import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {useRouter} from "next/router";

export default function HeaderVertComp() {
    const [NavHover, setNavHover] = useState("");
    const router = useRouter()

    useEffect(() => {
        const NavHovRoute = router.route.split("/")[1]
        setNavHover(NavHovRoute);
    }, [])


    function logOut() {
        sessionStorage.setItem('jwtNewSmile', '');
        return router.replace('/')
    }

    return (
        <header className="h-full w-32 bg-[rgba(255,255,255,0.5)] gridHeader overflow-visible">
                <ul className="headerVert h-lvh w-full px-5 py-10 flex flex-col items-center justify-around gap-5 child:child:text-first-blue child:child:text-lg">
                    <li>
                        <Link href="/appointments" rel="Appointments" className={`hover:text-first-blue-hover ${NavHover==="appointments" && "font-bold text-sec-blue"}`}>
                            <img className="rounded-full w-[90px] h-[90px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIgWDh1ZO9tuo9Rndw1yiKec3deRjV4IZoQ&usqp=CAU" alt="appointments"/>
                        </Link>
                    </li>
                    <li>
                        <Link href="/patients" rel="Patients" className={`hover:text-first-blue-hover ${NavHover==="patients" && "font-bold text-sec-blue"}`}>
                            <img className="rounded-full w-[90px] h-[90px]" src="https://static.vecteezy.com/system/resources/previews/036/689/887/large_2x/management-learning-creative-icon-design-vector.jpg" alt="appointments"/>
                        </Link>
                    </li>

                    <li>
                        <Link href="/newPatient" rel="New-Patient" className={`hover:text-first-blue-hover ${NavHover==="newPatient" && "font-bold text-sec-blue"}`}>
                            <img className="rounded-full w-[90px] h-[90px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4xZIGFGCECPLgK2J8oSpo81h9sFjzNBNKBA&usqp=CAU" alt="appointments"/>
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" rel="New-Patient" className={`hover:text-first-blue-hover ${NavHover==="settings" && "font-bold text-sec-blue"}`}>
                            <img className="rounded-full w-[90px] h-[90px]" src="https://static.vecteezy.com/system/resources/previews/037/030/501/large_2x/cog-creative-icon-design-vector.jpg" alt="appointments"/>
                        </Link>
                    </li>

                    <li>
                        <span className="hover:text-first-blue-hover cursor-pointer" onClick={() => logOut()}>
                            <img className="rounded-full w-[90px] h-[90px]" src="https://static.vecteezy.com/system/resources/previews/036/691/913/large_2x/home-creative-icon-design-vector.jpg" alt="appointments"/>
                        </span>
                    </li>
                </ul>
        </header>
    )
}