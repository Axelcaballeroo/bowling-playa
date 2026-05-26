"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const lanes = [1, 2, 3, 4, 5, 6];

const durationOptions = [
  { label: "30 minutos", value: 30 },
  { label: "1 hora", value: 60 },
  { label: "1 hora y media", value: 90 },
  { label: "2 horas", value: 120 },
];

type SelectedSlot = {
  time: string;
  lane: number;
  duration: number;
  endTime: string;
} | null;

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
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#efd184]">
      <path d="M7 3v3M17 3v3M4 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#efd184]">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#efd184]">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M5 21a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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

function slotOverlapsRange(slotTime: string, startTime: string, endTime: string) {
  let slotStart = timeToMinutes(slotTime);
  let slotEnd = slotStart + 30;
  const start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);

  if (end <= start) end += 1440;

  if (slotStart < start && start > 720) {
    slotStart += 1440;
    slotEnd += 1440;
  }

  return slotStart < end && slotEnd > start;
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

function getRequiredSlots(duration: number) {
  return duration / 30;
}

function reservationOverlapsSlot(
  reservation: Reservation,
  date: string,
  lane: number,
  slotTime: string
) {
  if (reservation.date !== date) return false;
  if (reservation.lane !== lane) return false;
  if (reservation.status === "cancelled") return false;

  return slotOverlapsRange(slotTime, reservation.start_time, reservation.end_time);
}

function isSlotOccupiedByReservations(
  reservations: Reservation[],
  date: string,
  lane: number,
  slotTime: string
) {
  return reservations.some((reservation) =>
    reservationOverlapsSlot(reservation, date, lane, slotTime)
  );
}

function isSlotBlockedByBlocks(
  blocks: Block[],
  date: string,
  lane: number,
  slotTime: string
) {
  return blocks.some((block) => {
    if (block.date !== date) return false;
    if (block.lane !== lane) return false;

    return slotOverlapsRange(slotTime, block.start_time, block.end_time);
  });
}

function isRangeAvailable(
  timeSlots: string[],
  time: string,
  lane: number,
  duration: number,
  date: string,
  reservations: Reservation[],
  blocks: Block[]
) {
  const startIndex = timeSlots.indexOf(time);
  const requiredSlots = getRequiredSlots(duration);

  if (!date) return false;
  if (startIndex === -1) return false;
  if (startIndex + requiredSlots > timeSlots.length) return false;

  for (let i = startIndex; i < startIndex + requiredSlots; i++) {
    if (isSlotOccupiedByReservations(reservations, date, lane, timeSlots[i])) {
      return false;
    }

    if (isSlotBlockedByBlocks(blocks, date, lane, timeSlots[i])) {
      return false;
    }
  }

  return true;
}

function isSlotInsideSelection(
  timeSlots: string[],
  time: string,
  lane: number,
  selectedSlot: SelectedSlot
) {
  if (!selectedSlot) return false;
  if (selectedSlot.lane !== lane) return false;

  const startIndex = timeSlots.indexOf(selectedSlot.time);
  const currentIndex = timeSlots.indexOf(time);
  const requiredSlots = getRequiredSlots(selectedSlot.duration);

  return currentIndex >= startIndex && currentIndex < startIndex + requiredSlots;
}

function getSlotStatus(
  timeSlots: string[],
  time: string,
  lane: number,
  selectedSlot: SelectedSlot,
  duration: number,
  date: string,
  reservations: Reservation[],
  blocks: Block[]
) {
  if (isSlotOccupiedByReservations(reservations, date, lane, time)) {
    return "occupied";
  }

  if (isSlotBlockedByBlocks(blocks, date, lane, time)) {
    return "blocked";
  }

  if (isSlotInsideSelection(timeSlots, time, lane, selectedSlot)) {
    return "selected";
  }

  if (!isRangeAvailable(timeSlots, time, lane, duration, date, reservations, blocks)) {
    return "unavailable";
  }

  return "available";
}

function getSlotClasses(status: string) {
  if (status === "occupied") {
    return "cursor-not-allowed border border-red-400/25 bg-red-500/[0.09] text-red-200";
  }

  if (status === "blocked") {
    return "cursor-not-allowed border border-fuchsia-400/25 bg-fuchsia-500/[0.09] text-fuchsia-200";
  }

  if (status === "unavailable") {
    return "cursor-not-allowed border border-white/[0.06] bg-white/[0.02] text-zinc-700";
  }

  if (status === "selected") {
    return "border border-[#efd184] bg-[#efd184]/15 text-[#f7df9b] shadow-[0_12px_30px_rgba(239,209,132,0.12)]";
  }

  return "border border-sky-400/20 bg-sky-500/[0.12] text-sky-100 hover:border-sky-300/60 hover:bg-sky-500/20";
}

function getSlotText(status: string) {
  if (status === "occupied") return "Ocupado";
  if (status === "blocked") return "X";
  if (status === "unavailable") return "—";
  if (status === "selected") return "Elegido";
  return "Libre";
}

function getDurationLabel(duration: number) {
  return durationOptions.find((option) => option.value === duration)?.label || `${duration} min`;
}

async function fetchReservations(date: string) {
  if (!date) return [];

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
  if (!date) return [];

  const response = await fetch(`/api/blocks?date=${date}`, {
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "No se pudieron cargar los bloqueos.");
  }

  return data.blocks as Block[];
}

export default function ReservasPage() {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(60);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [message, setMessage] = useState("");
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);
  const openingHour = date ? getOpeningHour(date) : null;

  useEffect(() => {
    if (!date) {
      queueMicrotask(() => {
        setReservations([]);
        setBlocks([]);
      });
      return;
    }

    async function loadAvailability() {
      try {
        setIsLoadingReservations(true);
        setMessage("");

        const [loadedReservations, loadedBlocks] = await Promise.all([
          fetchReservations(date),
          fetchBlocks(date),
        ]);

        setReservations(loadedReservations);
        setBlocks(loadedBlocks);
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "No se pudieron cargar las reservas."
        );
      } finally {
        setIsLoadingReservations(false);
      }
    }

    loadAvailability();
  }, [date]);

  function handleDateChange(value: string) {
    setDate(value);
    setSelectedSlot(null);
    setMessage("");
  }

  function handleDurationChange(value: number) {
    setDuration(value);
    setSelectedSlot(null);
    setMessage("");
  }

  function handleSelectSlot(time: string, lane: number) {
    if (!isRangeAvailable(timeSlots, time, lane, duration, date, reservations, blocks)) {
      return;
    }

    const endTime = minutesToTime(timeToMinutes(time) + duration);

    setSelectedSlot({
      time,
      lane,
      duration,
      endTime,
    });

    setMessage("");
  }

  async function handleConfirmReservation() {
    if (!date || !selectedSlot || !name.trim() || !phone.trim()) {
      setMessage("Faltan datos obligatorios.");
      return;
    }

    if (
      !isRangeAvailable(
        timeSlots,
        selectedSlot.time,
        selectedSlot.lane,
        selectedSlot.duration,
        date,
        reservations,
        blocks
      )
    ) {
      setMessage("Ese horario ya no está disponible.");
      setSelectedSlot(null);
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage("");

      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date,
          lane: selectedSlot.lane,
          start_time: selectedSlot.time,
          end_time: selectedSlot.endTime,
          duration: selectedSlot.duration,
          name: name.trim(),
          phone: `+${phone}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "No se pudo crear la reserva.");
      }

      const [loadedReservations, loadedBlocks] = await Promise.all([
        fetchReservations(date),
        fetchBlocks(date),
      ]);

      setReservations(loadedReservations);
      setBlocks(loadedBlocks);

      setMessage(
        "Reserva enviada correctamente. Te contactaremos por WhatsApp para confirmarla."
      );

      setSelectedSlot(null);
      setName("");
      setPhone("");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "No se pudo crear la reserva."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070609] bg-[radial-gradient(circle_at_20%_0%,rgba(239,209,132,0.12),transparent_28%),radial-gradient(circle_at_90%_18%,rgba(14,165,233,0.14),transparent_30%)] px-4 py-6 text-white sm:px-6 sm:py-10">
      <motion.section
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid gap-5 lg:grid-cols-[380px_1fr] lg:gap-7">
          <motion.aside
            variants={fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur lg:sticky lg:top-24 lg:self-start sm:p-6"
          >
            <div className="mb-8 flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#efd184]/20 bg-[#efd184]/10 text-[#efd184]">
                <CalendarIcon />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  Datos de tu reserva
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Completá los datos para asegurar tu horario.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Fecha
                </label>

                <input
                  type="date"
                  value={date}
                  onChange={(event) => handleDateChange(event.target.value)}
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#07070b]/90 px-4 py-4 text-white outline-none transition [color-scheme:dark] focus:border-[#efd184]/70 focus:ring-4 focus:ring-[#efd184]/10 [&::-webkit-calendar-picker-indicator]:invert"
                />

                {date && openingHour && (
                  <p className="mt-2 text-sm font-medium text-slate-400">
                    Horario del día: {openingHour} a 01:00
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Duración
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                    <ClockIcon />
                  </div>

                  <select
                    value={duration}
                    onChange={(event) =>
                      handleDurationChange(Number(event.target.value))
                    }
                    className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-[#07070b]/90 py-4 pl-12 pr-4 text-white outline-none transition focus:border-[#efd184]/70 focus:ring-4 focus:ring-[#efd184]/10"
                  >
                    {durationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  Nombre
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                    <UserIcon />
                  </div>

                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Tu nombre"
                    className="w-full rounded-2xl border border-white/[0.08] bg-[#07070b]/90 py-4 pl-12 pr-4 text-white outline-none transition focus:border-[#efd184]/70 focus:ring-4 focus:ring-[#efd184]/10"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-300">
                  WhatsApp
                </label>

                <PhoneInput
                  country="mx"
                  value={phone}
                  onChange={setPhone}
                  preferredCountries={["mx", "us", "ca", "ar", "es"]}
                  enableSearch
                  inputClass="!w-full !h-[56px] !rounded-2xl !border !border-white/[0.08] !bg-[#07070b] !pl-14 !pr-4 !text-white !text-base"
                  buttonClass="!rounded-l-2xl !border-white/[0.08] !bg-[#07070b]"
                  dropdownClass="!bg-slate-950 !text-white"
                  searchClass="!bg-slate-900 !text-white"
                />
              </div>

              <div className="rounded-2xl border border-[#efd184]/15 bg-[#efd184]/[0.06] p-4 text-sm text-zinc-300">
                <p className="flex items-center gap-2 font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-[#efd184]" />
                  Tu selección actual
                </p>

                {selectedSlot ? (
                  <p className="mt-3 leading-6 text-slate-300">
                    Pista {selectedSlot.lane} · {selectedSlot.time} a{" "}
                    {selectedSlot.endTime} ·{" "}
                    {getDurationLabel(selectedSlot.duration)}
                  </p>
                ) : (
                  <p className="mt-3 text-slate-500">
                    Todavía no seleccionaste un horario.
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedSlot || isSubmitting}
                onClick={handleConfirmReservation}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold text-white shadow-xl transition ${
                  selectedSlot && !isSubmitting
                    ? "bg-[#efd184] text-[#17110a] shadow-[0_18px_42px_rgba(239,209,132,0.2)] hover:bg-[#f5dd9a]"
                    : "cursor-not-allowed bg-white/[0.06] text-zinc-600 shadow-none"
                }`}
              >
                <CheckIcon />
                {isSubmitting ? "Enviando..." : "Confirmar reserva"}
              </motion.button>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm font-semibold text-slate-300"
                >
                  {message}
                </motion.div>
              )}
            </div>
          </motion.aside>

          <motion.section
            variants={fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:p-6"
          >
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h2 className="text-2xl font-black tracking-tight">
                  Disponibilidad
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {date
                    ? isLoadingReservations
                      ? "Cargando disponibilidad..."
                      : "Seleccioná una pista y horario disponible."
                    : "Elegí una fecha para comenzar."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] font-black sm:text-xs">
                <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sky-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                  Libre
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-red-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  Ocupado
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-fuchsia-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                  Bloqueado
                </span>
                <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[#f7df9b]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#efd184]" />
                  Elegido
                </span>
              </div>
            </div>

            {!date ? (
              <div className="rounded-3xl border border-dashed border-white/[0.1] bg-black/25 p-8 text-center text-sm text-zinc-400 sm:p-10">
                Seleccioná una fecha para cargar la agenda.
              </div>
            ) : (
              <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                <div className="min-w-[900px]">
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
                          const status = getSlotStatus(
                            timeSlots,
                            time,
                            lane,
                            selectedSlot,
                            duration,
                            date,
                            reservations,
                            blocks
                          );

                          return (
                            <motion.button
                              whileHover={
                                status === "available" ? { y: -3 } : undefined
                              }
                              whileTap={
                                status === "available"
                                  ? { scale: 0.98 }
                                  : undefined
                              }
                              key={`${time}-${lane}`}
                              disabled={
                                status === "occupied" ||
                                status === "blocked" ||
                                status === "unavailable" ||
                                isLoadingReservations
                              }
                              onClick={() => handleSelectSlot(time, lane)}
                  className={`rounded-xl px-3 py-3 text-xs font-black transition active:scale-[0.98] ${getSlotClasses(
                                status
                              )}`}
                            >
                              <span className="inline-flex items-center gap-2">
                                {status !== "unavailable" && (
                                  <span
                                    className={`h-2 w-2 rounded-full ${
                                      status === "selected"
                                        ? "bg-[#efd184]"
                                        : status === "occupied"
                                        ? "bg-red-400"
                                        : status === "blocked"
                                        ? "bg-fuchsia-400"
                                        : "bg-sky-400"
                                    }`}
                                  />
                                )}
                                {getSlotText(status)}
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </motion.section>
    </main>
  );
}
