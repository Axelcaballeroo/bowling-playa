"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/menu") {
    return null;
  }

  return (
    <footer className="border-t border-white/10 bg-[#030b18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Bowling Playa. Todos los derechos reservados.</p>

        <Link
          href="/login"
          className="text-xs font-semibold text-slate-600 transition hover:text-slate-300"
        >
          Acceso interno
        </Link>
      </div>
    </footer>
  );
}