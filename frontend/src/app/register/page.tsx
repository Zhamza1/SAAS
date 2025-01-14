import {RegisterForm} from "@/components/RegisterForm"
import NavBar from "@/components/Navbar";
import React from "react";

export default function Page() {
    return (
        <div>
            <NavBar/>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <RegisterForm/>
            </div>
        </div>
    )
}
