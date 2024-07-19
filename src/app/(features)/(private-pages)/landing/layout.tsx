import React from "react";
export const metadata = {
  title: "SmartBlog",
  description: "Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


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
