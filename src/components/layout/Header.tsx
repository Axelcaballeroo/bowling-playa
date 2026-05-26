"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Menú", href: "/menu" },
  { label: "Contacto", href: "/#contacto" },
];

function BowlingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="8" r="1.2" fill="currentColor" />
      <circle cx="13" cy="7" r="1.2" fill="currentColor" />
      <circle cx="12" cy="11" r="1.2" fill="currentColor" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      {open ? (
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      ) : (
        <path
          d="M5 8h14M5 16h14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      )}
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/menu") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#070609]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[15px] border border-[#efd184]/25 bg-[#1a1511] text-[#efd184] shadow-[0_10px_30px_rgba(0,0,0,0.28)]">
            <BowlingIcon />
          </div>

          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-black tracking-tight text-white">
              Bowling Playa
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#efd184]/80">
              Playa del Carmen
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-zinc-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/reservas"
            className="hidden rounded-full bg-[#efd184] px-5 py-2.5 text-sm font-black text-[#17110a] shadow-[0_12px_28px_rgba(239,209,132,0.16)] transition hover:-translate-y-0.5 hover:bg-[#f5dd9a] md:inline-flex"
          >
            Reservar
          </Link>

          <button
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-[15px] border border-white/[0.09] bg-white/[0.05] text-white transition active:scale-95 md:hidden"
            type="button"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] bg-[#070609]/96 px-4 py-3 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm font-bold text-zinc-300"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/reservas"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-[#efd184] px-4 py-3.5 text-center text-sm font-black text-[#17110a]"
            >
              Reservar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
