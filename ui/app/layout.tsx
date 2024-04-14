import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./(client)/Providers/StoreProvider";
import { ToastProvider } from "./(client)/Providers/ToastProvider";

const montserrat = Montserrat({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
  variable: "--font-mons",
});

export const metadata: Metadata = {
  title: "SazzyStore",
  description: "SazzyStore: The best place to buy your favorite products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <StoreProvider>{children}</StoreProvider> */}
        {children}
        <ToastProvider />
        {/* {children} */}
      </body>
    </html>
  );
}
