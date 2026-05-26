"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../src/lib/supabaseClient";

const lanes = [1, 2, 3, 4, 5, 6];

type Reservation = {
  id: string;
  date: string;
  lane: number;
  start_time: string;
  end_time: string;
  duration: number;
  name: string;
  phone: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
};

type Block = {
  id: string;
  date: string;
  lane: number;
  start_time: string;
  end_time: string;
  reason: string;
  created_at: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

function timeToMinutes(time: string) {
  const cleanTime = time.slice(0, 5);
  const [hours, minutes] = cleanTime.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes: number) {
  totalMinutes = totalMinutes % 1440;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getDayOfWeekFromDate(date: string) {
  if (!date) return null;
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
}

function getOpeningHour(date: string) {
  const day = getDayOfWeekFromDate(date);
  return day === 0 || day === 5 || day === 6 ? "15:00" : "17:00";
}

function generateTimeSlots(date: string) {
  const opening = getOpeningHour(date);
  const closing = "01:00";

  let current = timeToMinutes(opening);
  let end = timeToMinutes(closing);

  if (end <= current) end += 1440;

  const slots: string[] = [];

  while (current < end) {
    slots.push(minutesToTime(current));
    current += 30;
  }

  return slots;
}

function reservationOverlapsSlot(
  reservation: Reservation,
  lane: number,
  slotTime: string
) {
  if (reservation.lane !== lane) return false;
  if (reservation.status === "cancelled") return false;

  const slotStart = timeToMinutes(slotTime);
  const slotEnd = slotStart + 30;
  const reservationStart = timeToMinutes(reservation.start_time);
  const reservationEnd = timeToMinutes(reservation.end_time);

  return slotStart < reservationEnd && slotEnd > reservationStart;
}

function getReservationForSlot(
  reservations: Reservation[],
  lane: number,
  slotTime: string
) {
  return reservations.find((reservation) =>
    reservationOverlapsSlot(reservation, lane, slotTime)
  );
}

function getBlockForSlot(blocks: Block[], lane: number, slotTime: string) {
  return blocks.find((block) => {
    if (block.lane !== lane) return false;

    const slotStart = timeToMinutes(slotTime);
    const slotEnd = slotStart + 30;
    const blockStart = timeToMinutes(block.start_time);
    const blockEnd = timeToMinutes(block.end_time);

    return slotStart < blockEnd && slotEnd > blockStart;
  });
}

function getStatusLabel(status: Reservation["status"]) {
  if (status === "confirmed") return "Confirmada";
  if (status === "cancelled") return "Cancelada";
  return "Pendiente";
}

function getCardClasses(status: Reservation["status"]) {
  if (status === "confirmed") {
    return "border-emerald-400/25 bg-emerald-500/[0.09] text-emerald-100";
  }

  if (status === "cancelled") {
    return "border-red-400/25 bg-red-500/[0.09] text-red-100";
  }

  return "border-[#efd184]/30 bg-[#efd184]/[0.1] text-[#f7df9b]";
}

function getStatusDot(status: Reservation["status"]) {
  if (status === "confirmed") return "bg-emerald-400";
  if (status === "cancelled") return "bg-red-400";
  return "bg-[#efd184]";
}

function getWhatsappLink(reservation: Reservation) {
  const phone = reservation.phone.replace(/\D/g, "");

  const statusText =
    reservation.status === "confirmed"
      ? "confirmada"
      : reservation.status === "cancelled"
      ? "cancelada"
      : "recibida";

  const message = encodeURIComponent(
    `Hola ${reservation.name}, somos Bowling Playa 🎳

Tu reserva fue ${statusText}.

📅 Fecha: ${reservation.date}
🎳 Pista: ${reservation.lane}
🕒 Horario: ${reservation.start_time.slice(0, 5)} a ${reservation.end_time.slice(
      0,
      5
    )}

Ante cualquier cambio, podés respondernos por este medio.

¡Te esperamos!`
  );

  return `https://wa.me/${phone}?text=${message}`;
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

async function fetchReservations(date: string) {
  const response = await fetch(`/api/reservations?date=${date}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "No se pudieron cargar las reservas.");
  }

  return data.reservations as Reservation[];
}

async function fetchBlocks(date: string) {
  const response = await fetch(`/api/blocks?date=${date}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "No se pudieron cargar los bloqueos.");
  }

  return data.blocks as Block[];
}

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [dateFilter, setDateFilter] = useState(getTodayDate());
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(dateFilter), [dateFilter]);

  const stats = useMemo(() => {
    return {
      total: reservations.length,
      pending: reservations.filter((r) => r.status === "pending").length,
      confirmed: reservations.filter((r) => r.status === "confirmed").length,
      cancelled: reservations.filter((r) => r.status === "cancelled").length,
      blocks: blocks.length,
    };
  }, [reservations, blocks]);

  useEffect(() => {
    loadAgenda(dateFilter);
  }, [dateFilter]);

  async function loadAgenda(date: string) {
    try {
      setIsLoading(true);
      setMessage("");

      const [loadedReservations, loadedBlocks] = await Promise.all([
        fetchReservations(date),
        fetchBlocks(date),
      ]);

      setReservations(loadedReservations);
      setBlocks(loadedBlocks);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo cargar la agenda."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function updateStatus(id: string, status: Reservation["status"]) {
    try {
      setMessage("");

      const response = await fetch("/api/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "No se pudo actualizar la reserva.");
      }

      await loadAgenda(dateFilter);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la reserva."
      );
    }
  }

  async function createBlock(lane: number) {
    const start = prompt("Horario inicio del bloqueo. Ejemplo: 20:00");
    if (!start) return;

    const end = prompt("Horario fin del bloqueo. Ejemplo: 22:00");
    if (!end) return;

    const reason = prompt("Motivo del bloqueo") || "Bloqueo manual";

    try {
      setMessage("");

      const response = await fetch("/api/blocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: dateFilter,
          lane,
          start_time: start,
          end_time: end,
          reason,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "No se pudo crear el bloqueo.");
      }

      await loadAgenda(dateFilter);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo crear el bloqueo."
      );
    }
  }

  async function deleteBlock(id: string) {
    const confirmed = window.confirm("¿Seguro que querés desbloquear este horario?");
    if (!confirmed) return;

    try {
      setMessage("");

      const response = await fetch(`/api/blocks?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "No se pudo eliminar el bloqueo.");
      }

      await loadAgenda(dateFilter);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo eliminar el bloqueo."
      );
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function goToRelativeDay(days: number) {
    const [year, month, day] = dateFilter.split("-").map(Number);
    const current = new Date(year, month - 1, day);
    current.setDate(current.getDate() + days);

    const nextDate = `${current.getFullYear()}-${String(
      current.getMonth() + 1
    ).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

    setDateFilter(nextDate);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070609] bg-[radial-gradient(circle_at_18%_0%,rgba(239,209,132,0.12),transparent_26%),radial-gradient(circle_at_88%_14%,rgba(14,165,233,0.14),transparent_28%)] px-4 py-6 text-white sm:px-6 sm:py-10">
      <motion.section
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="mx-auto max-w-7xl"
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#efd184]/20 bg-[#efd184]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#efd184]">
              <span className="h-2 w-2 rounded-full bg-[#efd184]" />
              Panel privado
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Agenda diaria
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Gestioná reservas, bloqueos manuales y disponibilidad por pista.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur">
            <label className="mb-3 block text-sm font-bold text-slate-300">
              Fecha de agenda
            </label>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              <button
                onClick={() => goToRelativeDay(-1)}
                className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/[0.09] active:scale-95"
              >
                ←
              </button>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="col-span-2 rounded-xl border border-white/[0.08] bg-[#07070b]/90 px-4 py-3 text-white outline-none transition [color-scheme:dark] focus:border-[#efd184]/70 focus:ring-4 focus:ring-[#efd184]/10 [&::-webkit-calendar-picker-indicator]:invert sm:col-span-1"
              />

              <button
                onClick={() => goToRelativeDay(1)}
                className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/[0.09] active:scale-95"
              >
                →
              </button>

              <button
                onClick={() => setDateFilter(getTodayDate())}
                className="rounded-xl bg-[#efd184] px-4 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a] active:scale-95"
              >
                Hoy
              </button>

              <button
                onClick={() => loadAgenda(dateFilter)}
                className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm font-black text-emerald-200 transition hover:bg-emerald-500/20 active:scale-95"
              >
                Actualizar
              </button>

              <button
                onClick={logout}
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-black text-red-200 transition hover:bg-red-500/20 active:scale-95"
              >
                Salir
              </button>
            </div>
          </div>
        </motion.div>

        {message && (
          <motion.div
            variants={fadeUp}
            className="mb-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-slate-300"
          >
            {message}
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div className="rounded-[24px] border border-white/[0.08] bg-[#111015]/86 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-sm font-bold text-slate-400">Total del día</p>
            <p className="mt-2 text-3xl font-black">{stats.total}</p>
          </div>

          <div className="rounded-[24px] border border-[#efd184]/20 bg-[#efd184]/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-sm font-bold text-[#f7df9b]">Pendientes</p>
            <p className="mt-2 text-3xl font-black">{stats.pending}</p>
          </div>

          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-sm font-bold text-emerald-200">Confirmadas</p>
            <p className="mt-2 text-3xl font-black">{stats.confirmed}</p>
          </div>

          <div className="rounded-[24px] border border-red-400/20 bg-red-500/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-sm font-bold text-red-200">Canceladas</p>
            <p className="mt-2 text-3xl font-black">{stats.cancelled}</p>
          </div>

          <div className="rounded-[24px] border border-fuchsia-400/20 bg-fuchsia-500/10 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur">
            <p className="text-sm font-bold text-fuchsia-200">Bloqueos</p>
            <p className="mt-2 text-3xl font-black">{stats.blocks}</p>
          </div>
        </motion.div>

        <motion.section
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6"
        >
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-black tracking-tight">
                Calendario de pistas
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {isLoading
                  ? "Cargando agenda..."
                  : `Horarios del día: ${getOpeningHour(dateFilter)} a 01:00`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-black sm:text-xs">
              <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[#f7df9b]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#efd184]" />
                Pendiente
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-emerald-200">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Confirmada
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-fuchsia-200">
                <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                Bloqueada
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-zinc-500">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                Libre
              </span>
            </div>
          </div>

          <div className="-mx-1 mb-6 flex gap-2 overflow-x-auto px-1 pb-1">
            {lanes.map((lane) => (
              <button
                key={lane}
                onClick={() => createBlock(lane)}
                className="shrink-0 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2.5 text-xs font-black text-fuchsia-200 transition hover:bg-fuchsia-500/20 active:scale-95"
              >
                Bloquear pista {lane}
              </button>
            ))}
          </div>

          <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            <div className="min-w-[1120px]">
              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                <div className="sticky left-0 z-10 rounded-2xl border border-white/[0.06] bg-[#07070b] p-3 text-center text-xs font-black uppercase tracking-[0.12em] text-zinc-400 shadow-[12px_0_24px_rgba(0,0,0,0.24)]">
                  Horario
                </div>

                {lanes.map((lane) => (
                  <div
                    key={lane}
                    className="rounded-2xl border border-white/[0.06] bg-[#07070b] p-3 text-center text-xs font-black uppercase tracking-[0.12em] text-zinc-300"
                  >
                    Pista {lane}
                  </div>
                ))}

                {timeSlots.map((time) => (
                  <div key={time} className="contents">
                    <div className="sticky left-0 z-10 rounded-2xl border border-white/[0.06] bg-[#0d0d12] p-3 text-center text-sm font-black text-zinc-300 shadow-[12px_0_24px_rgba(0,0,0,0.24)]">
                      {time}
                    </div>

                    {lanes.map((lane) => {
                      const reservation = getReservationForSlot(
                        reservations,
                        lane,
                        time
                      );

                      const block = getBlockForSlot(blocks, lane, time);

                      if (!reservation && !block) {
                        return (
                          <div
                            key={`${time}-${lane}`}
                            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center text-xs font-black text-zinc-700"
                          >
                            Libre
                          </div>
                        );
                      }

                      if (block) {
                        return (
                          <motion.div
                            whileHover={{ y: -3 }}
                            key={`${time}-${lane}`}
                            className="rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/[0.09] p-3 text-xs text-fuchsia-100"
                          >
                            <div className="flex items-center gap-2 font-black">
                              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
                              Bloqueado
                            </div>

                            <div className="mt-2 text-[11px] opacity-80">
                              {block.start_time.slice(0, 5)} -{" "}
                              {block.end_time.slice(0, 5)}
                            </div>

                            <div className="mt-2 text-[10px] text-fuchsia-200">
                              {block.reason}
                            </div>

                            <button
                              onClick={() => deleteBlock(block.id)}
                              className="mt-3 rounded-lg border border-red-400/15 bg-red-500/15 px-2 py-1 text-[10px] font-black text-red-100 transition hover:bg-red-500/25 active:scale-95"
                            >
                              Desbloquear
                            </button>
                          </motion.div>
                        );
                      }

                      if (!reservation) return null;

                      return (
                        <motion.div
                          whileHover={{ y: -3 }}
                          key={`${time}-${lane}`}
                          className={`rounded-xl border p-3 text-xs shadow-[0_10px_24px_rgba(0,0,0,0.16)] ${getCardClasses(
                            reservation.status
                          )}`}
                        >
                          <div className="flex items-center gap-2 font-black">
                            <span
                              className={`h-2 w-2 rounded-full ${getStatusDot(
                                reservation.status
                              )}`}
                            />
                            {getStatusLabel(reservation.status)}
                          </div>

                          <div className="mt-2 font-bold text-white">
                            {reservation.name}
                          </div>

                          <div className="mt-1 text-[11px] opacity-80">
                            {reservation.start_time.slice(0, 5)} -{" "}
                            {reservation.end_time.slice(0, 5)}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-1">
                            <button
                              onClick={() =>
                                updateStatus(reservation.id, "confirmed")
                              }
                              className="rounded-lg border border-emerald-400/15 bg-emerald-500/15 px-2 py-1 text-[10px] font-black text-emerald-100 transition hover:bg-emerald-500/25 active:scale-95"
                            >
                              OK
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(reservation.id, "cancelled")
                              }
                              className="rounded-lg border border-red-400/15 bg-red-500/15 px-2 py-1 text-[10px] font-black text-red-100 transition hover:bg-red-500/25 active:scale-95"
                            >
                              Cancelar
                            </button>

                            <a
                              href={getWhatsappLink(reservation)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-sky-400/15 bg-sky-500/15 px-2 py-1 text-[10px] font-black text-sky-100 transition hover:bg-sky-500/25 active:scale-95"
                            >
                              Enviar WA
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </motion.section>
    </main>
  );
}
