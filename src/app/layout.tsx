import type { Metadata } from "next";
import "./globals.css";
import App from "./StoreProvider";

export const metadata: Metadata = {
  title: "Random Text Generator",
  icons: {
    icon: '/file-lines-solid.svg'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <App>
      {children}
    </App>
  );
}
