import "~/styles/globals.css";

import { Providers } from "./providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
