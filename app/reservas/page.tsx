"use client";

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

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-300">
      <path d="M7 3v3M17 3v3M4 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="4" y="5" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-300">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-blue-300">
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

  const slotStart = timeToMinutes(slotTime);
  const slotEnd = slotStart + 30;
  const reservationStart = timeToMinutes(reservation.start_time);
  const reservationEnd = timeToMinutes(reservation.end_time);

  return slotStart < reservationEnd && slotEnd > reservationStart;
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

function isRangeAvailable(
  timeSlots: string[],
  time: string,
  lane: number,
  duration: number,
  date: string,
  reservations: Reservation[]
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
  reservations: Reservation[]
) {
  if (isSlotOccupiedByReservations(reservations, date, lane, time)) {
    return "occupied";
  }

  if (isSlotInsideSelection(timeSlots, time, lane, selectedSlot)) {
    return "selected";
  }

  if (!isRangeAvailable(timeSlots, time, lane, duration, date, reservations)) {
    return "unavailable";
  }

  return "available";
}

function getSlotClasses(status: string) {
  if (status === "occupied") {
    return "border border-red-400/30 bg-red-500/10 text-red-200 cursor-not-allowed";
  }

  if (status === "unavailable") {
    return "border border-white/10 bg-white/[0.025] text-slate-600 cursor-not-allowed";
  }

  if (status === "selected") {
    return "border border-emerald-400 bg-emerald-500/15 text-emerald-200 shadow-lg shadow-emerald-500/10";
  }

  return "border border-blue-400/20 bg-blue-500/15 text-blue-100 hover:border-blue-300 hover:bg-blue-500/25";
}

function getSlotText(status: string) {
  if (status === "occupied") return "Ocupado";
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

export default function ReservasPage() {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(60);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState("");
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = useMemo(() => generateTimeSlots(date), [date]);
  const openingHour = date ? getOpeningHour(date) : null;

  useEffect(() => {
    if (!date) {
      setReservations([]);
      return;
    }

    async function loadReservations() {
      try {
        setIsLoadingReservations(true);
        setMessage("");
        const loadedReservations = await fetchReservations(date);
        setReservations(loadedReservations);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "No se pudieron cargar las reservas.");
      } finally {
        setIsLoadingReservations(false);
      }
    }

    loadReservations();
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
    if (!isRangeAvailable(timeSlots, time, lane, duration, date, reservations)) return;

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

      const loadedReservations = await fetchReservations(date);
      setReservations(loadedReservations);

      setMessage("Reserva enviada correctamente. Te contactaremos por WhatsApp para confirmarla.");
      setSelectedSlot(null);
      setName("");
      setPhone("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo crear la reserva.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030b18] px-6 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[360px_1fr]">
          <aside className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-8 flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-500/15 text-blue-300">
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
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(event) => handleDateChange(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none [color-scheme:dark] focus:border-blue-500 [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

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
                    className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-950/80 py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
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
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-4 pl-12 pr-4 text-white outline-none focus:border-blue-500"
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
                  preferredCountries={[
                    "mx",
                    "us",
                    "ca",
                    "ar",
                    "es",
                    "gb",
                    "fr",
                    "de",
                    "it",
                  ]}
                  enableSearch
                  searchPlaceholder="Buscar país"
                  inputClass="!w-full !h-[56px] !rounded-2xl !border !border-white/10 !bg-slate-950/80 !pl-14 !pr-4 !text-white !text-base !outline-none"
                  buttonClass="!rounded-l-2xl !border-white/10 !bg-slate-950/80"
                  dropdownClass="!bg-slate-950 !text-white"
                  searchClass="!bg-slate-900 !text-white"
                />

                {phone && (
                  <p className="mt-2 text-xs font-medium text-slate-400">
                    Número internacional: +{phone}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm text-slate-300">
                <p className="flex items-center gap-2 font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-blue-400" />
                  Tu selección actual
                </p>

                {selectedSlot ? (
                  <p className="mt-3 leading-6 text-slate-300">
                    Pista {selectedSlot.lane} · {selectedSlot.time} a{" "}
                    {selectedSlot.endTime} · {getDurationLabel(selectedSlot.duration)}
                  </p>
                ) : (
                  <p className="mt-3 text-slate-500">Todavía no seleccionaste un horario.</p>
                )}
              </div>

              {message && (
                <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm font-semibold text-slate-300">
                  {message}
                </div>
              )}

              <button
                disabled={!selectedSlot || isSubmitting}
                onClick={handleConfirmReservation}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-bold text-white shadow-xl transition ${
                  selectedSlot && !isSubmitting
                    ? "bg-blue-600 shadow-blue-600/30 hover:-translate-y-0.5 hover:bg-blue-500"
                    : "cursor-not-allowed bg-slate-800 text-slate-500"
                }`}
              >
                <CheckIcon />
                {isSubmitting ? "Enviando reserva..." : "Confirmar reserva"}
              </button>
            </div>
          </aside>

          <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                  <CalendarIcon />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    Disponibilidad
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {date
                      ? isLoadingReservations
                        ? "Cargando reservas del día..."
                        : "Seleccioná una pista y horario disponible."
                      : "Elegí una fecha para ver los horarios disponibles."}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-xs font-bold">
                <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-blue-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-400" />
                  Libre
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-red-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  Ocupado
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-emerald-200">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Elegido
                </span>
              </div>
            </div>

            {!date ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/50 p-10 text-center text-slate-400">
                Seleccioná una fecha para cargar la agenda.
              </div>
            ) : (
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[980px]">
                  <div className="grid grid-cols-7 gap-3">
                    <div className="rounded-2xl bg-slate-950/80 p-4 text-center font-bold">
                      Horario
                    </div>

                    {lanes.map((lane) => (
                      <div
                        key={lane}
                        className="rounded-2xl bg-slate-950/80 p-4 text-center font-bold"
                      >
                        Pista {lane}
                      </div>
                    ))}

                    {timeSlots.map((time) => (
                      <div key={time} className="contents">
                        <div className="rounded-2xl bg-slate-950/55 p-4 text-center font-bold">
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
                            reservations
                          );

                          return (
                            <button
                              key={`${time}-${lane}`}
                              disabled={
                                status === "occupied" ||
                                status === "unavailable" ||
                                isLoadingReservations
                              }
                              onClick={() => handleSelectSlot(time, lane)}
                              className={`rounded-xl px-3 py-3 text-xs font-bold transition ${getSlotClasses(
                                status
                              )}`}
                            >
                              <span className="inline-flex items-center gap-2">
                                {status !== "unavailable" && (
                                  <span
                                    className={`h-2 w-2 rounded-full ${
                                      status === "selected"
                                        ? "bg-emerald-400"
                                        : status === "occupied"
                                        ? "bg-red-400"
                                        : "bg-blue-400"
                                    }`}
                                  />
                                )}
                                {getSlotText(status)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}