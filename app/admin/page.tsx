"use client";

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
  if (day === 0 || day === 5 || day === 6) return "15:00";
  return "17:00";
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

function getStatusLabel(status: Reservation["status"]) {
  if (status === "confirmed") return "Confirmada";
  if (status === "cancelled") return "Cancelada";
  return "Pendiente";
}

function getCardClasses(status: Reservation["status"]) {
  if (status === "confirmed") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-100";
  }

  if (status === "cancelled") {
    return "border-red-400/30 bg-red-500/10 text-red-100";
  }

  return "border-yellow-400/30 bg-yellow-400/10 text-yellow-100";
}

function getWhatsappLink(reservation: Reservation) {
  const phone = reservation.phone.replace(/\D/g, "");

  const message = encodeURIComponent(
    `Hola ${reservation.name}, te escribimos de Bowling Playa 🎳\n\nConfirmamos tu reserva:\nFecha: ${reservation.date}\nPista: ${reservation.lane}\nHorario: ${reservation.start_time.slice(
      0,
      5
    )} a ${reservation.end_time.slice(0, 5)}\n\n¡Te esperamos!`
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

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();

  const [reservations, setReservations] = useState<Reservation[]>([]);
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
    };
  }, [reservations]);

  useEffect(() => {
    loadReservations(dateFilter);
  }, [dateFilter]);

  async function loadReservations(date: string) {
    try {
      setIsLoading(true);
      setMessage("");
      const loadedReservations = await fetchReservations(date);
      setReservations(loadedReservations);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las reservas."
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "No se pudo actualizar la reserva.");
      }

      await loadReservations(dateFilter);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la reserva."
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
    <main className="min-h-screen bg-[#030b18] px-6 py-16 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
              Panel privado
            </span>

            <h1 className="mt-5 text-5xl font-black tracking-tight">
              Agenda diaria
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-400">
              Vista por fecha, horario y pista para gestionar reservas.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <label className="block text-sm font-bold text-slate-300">
              Fecha
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => goToRelativeDay(-1)}
                className="rounded-xl bg-white/10 px-3 py-3 text-sm font-bold text-slate-300 hover:bg-white/15"
              >
                ←
              </button>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <button
                onClick={() => goToRelativeDay(1)}
                className="rounded-xl bg-white/10 px-3 py-3 text-sm font-bold text-slate-300 hover:bg-white/15"
              >
                →
              </button>

              <button
                onClick={() => setDateFilter(getTodayDate())}
                className="rounded-xl bg-blue-600/80 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500"
              >
                Hoy
              </button>

              <button
                onClick={() => loadReservations(dateFilter)}
                className="rounded-xl bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-200 hover:bg-emerald-500/25"
              >
                Actualizar
              </button>

              <button
                onClick={logout}
                className="rounded-xl bg-red-500/15 px-4 py-3 text-sm font-bold text-red-200 hover:bg-red-500/25"
              >
                Salir
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm font-semibold text-slate-300">
            {message}
          </div>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
            <p className="text-sm font-bold text-slate-400">Total del día</p>
            <p className="mt-2 text-3xl font-black">{stats.total}</p>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
            <p className="text-sm font-bold text-yellow-200">Pendientes</p>
            <p className="mt-2 text-3xl font-black">{stats.pending}</p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            <p className="text-sm font-bold text-emerald-200">Confirmadas</p>
            <p className="mt-2 text-3xl font-black">{stats.confirmed}</p>
          </div>

          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-5">
            <p className="text-sm font-bold text-red-200">Canceladas</p>
            <p className="mt-2 text-3xl font-black">{stats.cancelled}</p>
          </div>
        </div>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black">Calendario de pistas</h2>
              <p className="mt-1 text-sm text-slate-400">
                {isLoading
                  ? "Cargando agenda..."
                  : `Horarios del día: ${getOpeningHour(dateFilter)} a 01:00`}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-bold">
              <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-2 text-yellow-200">
                Pendiente
              </span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-emerald-200">
                Confirmada
              </span>
              <span className="rounded-full border border-white/10 bg-slate-950 px-3 py-2 text-slate-400">
                Libre
              </span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[1180px]">
              <div className="grid grid-cols-7 gap-3">
                <div className="rounded-2xl bg-slate-950 p-4 font-bold">
                  Horario
                </div>

                {lanes.map((lane) => (
                  <div
                    key={lane}
                    className="rounded-2xl bg-slate-950 p-4 text-center font-bold"
                  >
                    Pista {lane}
                  </div>
                ))}

                {timeSlots.map((time) => (
                  <div key={time} className="contents">
                    <div className="rounded-2xl bg-slate-950/70 p-4 font-bold">
                      {time}
                    </div>

                    {lanes.map((lane) => {
                      const reservation = getReservationForSlot(
                        reservations,
                        lane,
                        time
                      );

                      if (!reservation) {
                        return (
                          <div
                            key={`${time}-${lane}`}
                            className="rounded-xl border border-white/10 bg-white/[0.025] p-3 text-center text-xs font-bold text-slate-600"
                          >
                            Libre
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${time}-${lane}`}
                          className={`rounded-xl border p-3 text-xs ${getCardClasses(
                            reservation.status
                          )}`}
                        >
                          <div className="font-black">
                            {getStatusLabel(reservation.status)}
                          </div>

                          <div className="mt-1 font-bold text-white">
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
                              className="rounded-lg bg-emerald-500/20 px-2 py-1 text-[10px] font-bold text-emerald-100 hover:bg-emerald-500/30"
                            >
                              OK
                            </button>

                            <button
                              onClick={() =>
                                updateStatus(reservation.id, "cancelled")
                              }
                              className="rounded-lg bg-red-500/20 px-2 py-1 text-[10px] font-bold text-red-100 hover:bg-red-500/30"
                            >
                              Cancelar
                            </button>

                            <a
                              href={getWhatsappLink(reservation)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-blue-500/20 px-2 py-1 text-[10px] font-bold text-blue-100 hover:bg-blue-500/30"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}