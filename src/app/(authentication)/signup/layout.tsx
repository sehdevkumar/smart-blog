import React from "react";


export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-screen">
        {children}
    </div>
  );
}
