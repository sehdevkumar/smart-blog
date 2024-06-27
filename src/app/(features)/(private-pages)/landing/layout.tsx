import React from "react";
import HeaderPage from "~/app/_layout/Header";


export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     {children}
    </>
  );
}
