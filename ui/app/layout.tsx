import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { checkAuth } from "@/services/auth/checkAuth";
import { CartProvider } from "./Providers/GlobalStoreProvider";
import { ToastProvider } from "./Providers/ToastProvider";
import Header from "./components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShowLayoutProvider } from "./Providers/LayoutProvider";
import ConditionalLayout from "./Providers/ConditionalLayout";

const montserrat = Montserrat({
  subsets: ["cyrillic-ext"],
  weight: ["200", "300", "400"],
  variable: "--font-mons",
});

export const metadata: Metadata = {
  title: "SazzyStore",
  description: "SazzyStore: The best place to buy your favorite products.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await checkAuth();

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <CartProvider user={user}>
          <ShowLayoutProvider showLayout={true}>
            <ConditionalLayout>{children}</ConditionalLayout>
          </ShowLayoutProvider>
        </CartProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
