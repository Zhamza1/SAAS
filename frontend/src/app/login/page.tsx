import { LoginForm } from "@/components/LoginForm"
import NavBar from "@/components/Navbar";
import {RegisterForm} from "@/components/RegisterForm";
import React from "react";

export default function Page() {
  return (
      <div>
          <NavBar/>
          <div className="flex h-screen w-full items-center justify-center px-4">
              <LoginForm/>
          </div>
      </div>
  )
}
