"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";
import WhatsappFloatingButton from "./WhatsappFloatingButton";

export default function PublicChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPrivateArea =
    pathname?.startsWith("/admin") || pathname?.startsWith("/analytics");

  if (isPrivateArea) return <main>{children}</main>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsappFloatingButton />
    </>
  );
}
