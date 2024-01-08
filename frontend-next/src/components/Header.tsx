import React from 'react'
import Link from "next/link";

export default function HeaderComp() {
    return (
            <header className="w-full flex justify-between items-center min-h-16 px-10 bg-[rgba(255,255,255,0.5)] gridHeader">
                <Link href="/">
                    <span className="text-dark font-bold text-2xl">New Smile App</span>
                </Link>
                <nav>
                    <ul className="flex items-center gap-5 child:child:text-first-blue child:child:text-lg">
                        <li>
                            <Link href="/appointments" rel="Appointments" className="hover:text-first-blue-hover">Appointments</Link>
                        </li>
                        <li>
                            <Link href="/patients" rel="Patients" className="hover:text-first-blue-hover">Patients</Link>
                        </li>
                        <li>
                            <Link href="/newPatient" rel="New-Patient" className="hover:text-first-blue-hover">New Patient</Link>
                        </li>
                        <li>
                            <span className="hover:text-first-blue-hover">Shoes</span>
                        </li>
                    </ul>
                </nav>
            </header>
    )
}