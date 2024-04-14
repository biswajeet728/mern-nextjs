// import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";
import "../globals.css";
import Header from "./components/Header";
import { checkAuth } from "@/services/auth/checkAuth";

const montserrat = Montserrat({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
  variable: "--font-mons",
});

export const metadata: Metadata = {
  title: "SazzyStore",
  description: "SazzyStore: The best place to buy your favorite products.",
};

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authStatus = await checkAuth();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header authStatus={authStatus} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
