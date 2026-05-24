"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Reservas", href: "/reservas" },
  { label: "Promociones", href: "/promociones" },
  { label: "Menú", href: "/menu" },
  { label: "Contacto", href: "/contacto" },
];

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/menu") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-2xl shadow-lg">
            🎳
          </div>
          <div>
            <p className="text-2xl font-black tracking-tight text-white">
              Bowling Playa
            </p>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              Playa del Carmen
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl px-4 py-2 text-sm font-black text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/reservas"
            className="ml-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Reservar
          </Link>
        </nav>

        <Link
          href="/reservas"
          className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white md:hidden"
        >
          Reservar
        </Link>
      </div>
    </header>
  );
}