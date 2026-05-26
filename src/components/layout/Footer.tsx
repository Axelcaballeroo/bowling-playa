"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/menu") {
    return null;
  }

  return (
    <footer className="border-t border-white/[0.08] bg-[#070609]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xl font-black tracking-tight text-white">
            Bowling Playa
          </p>
          <p className="mt-2 text-sm font-semibold text-zinc-500">
            Playa del Carmen
          </p>
          <p className="mt-5 text-xs font-medium text-zinc-600">
            &copy; {new Date().getFullYear()} Bowling Playa. Todos los derechos
            reservados.
          </p>
        </div>

        <div className="flex flex-col gap-5 md:items-end">
          <nav className="flex flex-wrap gap-2">
            {[
              { label: "Menú", href: "/menu" },
              { label: "Reservas", href: "/reservas" },
              { label: "Contacto", href: "/#contacto" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-xs font-black text-zinc-400 transition hover:border-[#efd184]/30 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/login"
            className="text-xs font-semibold text-zinc-700 transition hover:text-zinc-400"
          >
            Acceso interno
          </Link>
        </div>
      </div>
    </footer>
  );
}
