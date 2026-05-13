import Link from "next/link";

const highlights = [
  ["🎳", "Pistas flexibles", "Elegí horario y duración"],
  ["🍔", "Comida & tragos", "Plan completo en un lugar"],
  ["🔥", "Promos activas", "Ofertas para grupos"],
  ["📲", "Reserva rápida", "Confirmación por WhatsApp"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030b18] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,24,0.98)_0%,rgba(3,11,24,0.9)_45%,rgba(3,11,24,0.45)_100%),url('/bowling-hero.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_20%,rgba(37,99,235,0.45),transparent_34%),radial-gradient(circle_at_22%_80%,rgba(34,197,94,0.2),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030b18] to-transparent" />

        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-emerald-300 shadow-lg shadow-emerald-500/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Bowling Playa
            </div>

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.05em] md:text-6xl lg:text-7xl">
              Tu plan perfecto en Playa del Carmen
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-semibold leading-8 text-slate-300 md:text-xl">
              Reservá tu pista, elegí tu duración y viví una experiencia con
              bowling, comida, tragos y promociones.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/reservas"
                className="rounded-2xl bg-blue-600 px-8 py-4 text-center text-base font-black text-white shadow-2xl shadow-blue-600/35 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                Reservar pista ahora
              </Link>

              <Link
                href="/promociones"
                className="rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-center text-base font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
              >
                Ver promociones
              </Link>
            </div>
          </div>

          <div className="hidden pt-12 lg:block">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[42px] bg-blue-600/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[36px] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur">
                <div className="min-h-[460px] rounded-[28px] bg-[linear-gradient(180deg,rgba(3,11,24,0.08),rgba(3,11,24,0.78)),url('/bowling-card.jpeg')] bg-cover bg-center">
                  <div className="flex h-[460px] flex-col justify-end p-7">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">
                      Experiencia completa
                    </span>
                    <h2 className="mt-2 text-4xl font-black tracking-tight">
                      Reservas, promos y diversión
                    </h2>
                    <p className="mt-3 max-w-sm text-sm font-semibold leading-6 text-slate-200">
                      Un sistema pensado para que el cliente reserve rápido y
                      el local venda más.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto -mt-10 max-w-7xl px-6 pb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map(([icon, title, text]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.1]"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">
                  {icon}
                </div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-400">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-black text-blue-300">
            Reservas modernas
          </span>
          <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
            Un flujo simple para que más personas terminen reservando.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Horarios flexibles, duración por tramos, confirmación rápida y panel
            privado para recepción.
          </p>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
          <h3 className="text-xl font-black">Hoy disponible</h3>
          <div className="mt-5 space-y-3">
            {["19:00", "19:30", "20:00"].map((hora, index) => (
              <div
                key={hora}
                className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-4"
              >
                <span className="font-black">{hora}</span>
                <span
                  className={`rounded-xl px-4 py-2 text-sm font-black ${
                    index === 1 ? "bg-slate-700 text-slate-300" : "bg-blue-600"
                  }`}
                >
                  {index === 1 ? "Reservado" : "Elegir"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}