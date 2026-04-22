import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

export const metadata: Metadata = {
  title: "Random Text Generator",
  icons: {
    icon: '/file-lines-solid.svg',
  },
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}

export default  RootLayout;
