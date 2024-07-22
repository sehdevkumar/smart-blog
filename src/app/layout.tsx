import "~/styles/globals.css";

import { Providers } from "./providers";
import ProtectPages from "./(features)/ProtectPages";
import FooterPage from "./_layout/Footer";
import HeaderPage from "./_layout/Header";

export const metadata = {
  title: "SmartBlog",
  description: "Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`inter`}>
      <body>
        <Providers>
        <div className="grid h-screen w-screen">
          <HeaderPage />
          <div className="grid overflow-auto  h-[var(--app-height)]">
            <ProtectPages>
              {children}
            </ProtectPages>
          </div>
          <FooterPage />
        </div>
        </Providers>
      </body>
    </html>
  );
}
