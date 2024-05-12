import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "./(client)/Providers/ToastProvider";
import { CartProvider } from "./(client)/Providers/CartProvider";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await checkAuth();
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {/* <StoreProvider>{children}</StoreProvider> */}
        <CartProvider user={user}>{children}</CartProvider>
        <ToastProvider />
        {/* {children} */}
      </body>
    </html>
  );
}
