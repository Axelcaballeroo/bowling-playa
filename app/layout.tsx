import "./globals.css";
import PublicChrome from "../src/components/layout/PublicChrome";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#030b18] text-white">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
