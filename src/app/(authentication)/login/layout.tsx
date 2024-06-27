"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { isUserLoggedIn } from "~/app/utils/user-session";


export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const router = useRouter()
  

  if(isUserLoggedIn()) {
    router.replace('/home')
  }
  return (
    <div className="grid h-screen w-screen">
        {children}
    
    </div>
  );
}
