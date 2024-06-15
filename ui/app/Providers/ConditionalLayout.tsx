"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showLayout, setShowLayout] = useState(true);

  useEffect(() => {
    setShowLayout(!pathname.startsWith("/reset-password"));
  }, [pathname]);

  return (
    <>
      {showLayout && <Header />}
      {children}
      {showLayout && <Footer />}
    </>
  );
}
