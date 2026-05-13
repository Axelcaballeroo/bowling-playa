import "./globals.css";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import WhatsappFloatingButton from "../src/components/layout/WhatsappFloatingButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#030b18] text-white">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappFloatingButton />
      </body>
    </html>
  );
}