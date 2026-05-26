"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const highlights = [
  {
    title: "Bowling",
    text: "Pistas listas para planes casuales, dates, grupos y noches con amigos.",
  },
  {
    title: "Food & drinks",
    text: "Menú digital con comida, cervezas, cócteles y botellas para la mesa.",
  },
  {
    title: "Nightlife",
    text: "Ambiente oscuro, música y energía de bar en Playa del Carmen.",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M7 3v3M17 3v3M4 9h16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M5 18.5V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-4 2.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#efd184]">
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-[#070609] text-white">
      <section className="relative min-h-[calc(100vh-65px)] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,9,0.42),#070609_92%),linear-gradient(90deg,rgba(7,6,9,0.96),rgba(7,6,9,0.58)),url('/bowling-hero.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_10%,rgba(168,85,247,0.22),transparent_34%),radial-gradient(circle_at_18%_72%,rgba(14,165,233,0.16),transparent_30%)]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex rounded-full border border-white/[0.1] bg-black/30 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-zinc-300 backdrop-blur"
            >
              Playa del Carmen
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[44px] font-black leading-[0.98] tracking-tight sm:text-[64px] lg:text-[82px]"
            >
              Bowling, comida y diversión en{" "}
              <span className="text-[#efd184]">Playa del Carmen</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-2xl text-base font-medium leading-7 text-zinc-300 sm:text-lg"
            >
              Reserva tu pista, abre el menú digital y disfruta una noche de
              drinks, bowling y energía de bar en Bowling Playa.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/reservas"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[#efd184] px-6 py-3 text-sm font-black text-[#17110a] shadow-[0_18px_38px_rgba(239,209,132,0.16)] transition hover:-translate-y-0.5 hover:bg-[#f5dd9a] active:scale-[0.98]"
              >
                Reservar
                <CalendarIcon />
              </Link>

              <Link
                href="/menu"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/[0.11] bg-white/[0.05] px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.08] active:scale-[0.98]"
              >
                Ver menú
                <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[28px] border border-white/[0.1] bg-[#111015]/88 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur"
          >
            <div className="overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(7,6,9,0.18),rgba(7,6,9,0.85)),url('/bowling-card.jpeg')] bg-cover bg-center">
              <div className="flex min-h-[320px] flex-col justify-end p-5 sm:min-h-[420px] sm:p-7">
                <SectionLabel>QR menu</SectionLabel>
                <h2 className="mt-2 max-w-sm text-3xl font-black leading-tight">
                  Food, drinks, cocktails and beers in one clean menu.
                </h2>
                <Link
                  href="/menu"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#17110a] transition hover:bg-[#efd184]"
                >
                  Open menu
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 md:grid-cols-3">
            {highlights.map((item) => (
              <motion.article
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                variants={fadeUp}
                className="rounded-[24px] border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/[0.09] bg-[#111015] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <SectionLabel>Menú digital</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              El QR menú de Bowling Playa
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-400">
              Consulta comida, bebidas, cócteles, cervezas, botellas y opciones
              para compartir desde tu celular.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[#efd184] px-5 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a]"
            >
              Ver menú
              <ArrowIcon />
            </Link>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/[0.09] bg-[linear-gradient(90deg,rgba(7,6,9,0.94),rgba(7,6,9,0.5)),url('/bowling-hero.jpeg')] bg-cover bg-center shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="flex min-h-[260px] flex-col justify-end p-6">
              <p className="max-w-md text-2xl font-black leading-tight">
                Una carta rápida, limpia y pensada para pedir desde la mesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[#efd184]/18 bg-[#efd184]/[0.08] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionLabel>Reservas</SectionLabel>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Planea tu partida sin vueltas
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                Elige fecha, duración y pista disponible. Nosotros confirmamos
                tu reserva para que llegues listo a jugar.
              </p>
            </div>

            <Link
              href="/reservas"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-[#efd184] px-6 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a]"
            >
              Reservar
              <CalendarIcon />
            </Link>
          </div>
        </div>
      </section>

      <section id="contacto" className="px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/[0.09] bg-[#111015] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <SectionLabel>Contacto</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Bowling Playa
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Playa del Carmen, Quintana Roo, México.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="https://wa.me/529841234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-400"
              >
                WhatsApp
                <ChatIcon />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Bowling%20Playa%20Playa%20del%20Carmen"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.08]"
              >
                Cómo llegar
                <PinIcon />
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/[0.09] bg-[#101014] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Horarios
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  Lunes a jueves: 17:00 a 01:00
                  <br />
                  Viernes a domingo: 15:00 a 01:00
                </p>
              </div>
              <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  Experiencia
                </p>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  Bowling, comida, drinks y ambiente nightlife en un mismo
                  lugar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
