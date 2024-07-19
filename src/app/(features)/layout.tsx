import React from "react";
import HeaderPage from "../_layout/Header";
import FooterPage from "../_layout/Footer";
import ProtectPages from "./ProtectPages";

export const metadata = {
  title: "SmartBlog",
  description: "Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen w-screen">
     <HeaderPage/>
     <div className="grid overflow-auto  h-[var(--app-height)]">
         <ProtectPages>
            {children}
         </ProtectPages>
     </div>
     <FooterPage/>
    </div>
  );
}
