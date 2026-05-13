import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

function timeToMinutes(time: string) {
  const cleanTime = time.slice(0, 5);
  const [hours, minutes] = cleanTime.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDayOfWeek(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).getDay();
}

function getOpeningHour(date: string) {
  const day = getDayOfWeek(date);

  if (day === 0 || day === 5 || day === 6) {
    return "15:00";
  }

  return "17:00";
}

function isValidSchedule(
  date: string,
  startTime: string,
  endTime: string
) {
  const opening = getOpeningHour(date);

  let openMinutes = timeToMinutes(opening);
  let closeMinutes = timeToMinutes("01:00");

  if (closeMinutes <= openMinutes) {
    closeMinutes += 1440;
  }

  let start = timeToMinutes(startTime);
  let end = timeToMinutes(endTime);

  if (start < openMinutes) start += 1440;
  if (end <= start) end += 1440;

  return start >= openMinutes && end <= closeMinutes;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  let query = supabaseAdmin
    .from("reservations")
    .select("*")
    .order("date", { ascending: true })
    .order("start_time", { ascending: true });

  if (date) {
    query = query.eq("date", date);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    reservations: data,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const date = body.date;
const lane = body.lane;
const start_time = body.start_time ?? body.startTime;
const end_time = body.end_time ?? body.endTime;
const duration = body.duration;
const name = body.name;
const phone = body.phone;

    // =========================
    // VALIDACIONES
    // =========================

    if (
      !date ||
      !lane ||
      !start_time ||
      !end_time ||
      !duration ||
      !name ||
      !phone
    ) {
      return NextResponse.json(
        { ok: false, message: "Faltan datos obligatorios." },
        { status: 400 }
      );
    }

    if (lane < 1 || lane > 6) {
      return NextResponse.json(
        { ok: false, message: "Pista inválida." },
        { status: 400 }
      );
    }

    if (![30, 60, 90, 120].includes(duration)) {
      return NextResponse.json(
        { ok: false, message: "Duración inválida." },
        { status: 400 }
      );
    }

    const selectedDate = new Date(date);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json(
        { ok: false, message: "No podés reservar fechas pasadas." },
        { status: 400 }
      );
    }

    if (!isValidSchedule(date, start_time, end_time)) {
      return NextResponse.json(
        { ok: false, message: "Horario fuera del rango permitido." },
        { status: 400 }
      );
    }

    // =========================
    // ANTI SPAM
    // =========================

    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] || "unknown";

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: ipAttempts } = await supabaseAdmin
      .from("reservation_attempts")
      .select("*")
      .eq("ip", ip)
      .gte("created_at", oneHourAgo);

    if ((ipAttempts?.length || 0) >= 10) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Demasiados intentos desde esta conexión. Intentá más tarde.",
        },
        { status: 429 }
      );
    }

    const { data: phoneAttempts } = await supabaseAdmin
      .from("reservation_attempts")
      .select("*")
      .eq("phone", phone)
      .gte("created_at", oneHourAgo);

    if ((phoneAttempts?.length || 0) >= 5) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Demasiados intentos con este número. Intentá más tarde.",
        },
        { status: 429 }
      );
    }

    // =========================
    // CHECK SUPERPOSICIÓN
    // =========================

    const { data: existingReservations, error: existingError } =
      await supabaseAdmin
        .from("reservations")
        .select("*")
        .eq("date", date)
        .eq("lane", lane)
        .neq("status", "cancelled");

    if (existingError) {
      return NextResponse.json(
        { ok: false, message: existingError.message },
        { status: 500 }
      );
    }

    const newStart = timeToMinutes(start_time);
    const newEnd = timeToMinutes(end_time);

    const overlaps = existingReservations?.some((reservation: any) => {
      const existingStart = timeToMinutes(reservation.start_time);
      const existingEnd = timeToMinutes(reservation.end_time);

      return newStart < existingEnd && newEnd > existingStart;
    });

    if (overlaps) {
      return NextResponse.json(
        { ok: false, message: "Ese horario ya está ocupado." },
        { status: 409 }
      );
    }

    // =========================
    // GUARDAR RESERVA
    // =========================

    const { data, error } = await supabaseAdmin
      .from("reservations")
      .insert([
        {
          date,
          lane,
          start_time,
          end_time,
          duration,
          name,
          phone,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message },
        { status: 500 }
      );
    }

    // =========================
    // LOG ANTI SPAM
    // =========================

    await supabaseAdmin.from("reservation_attempts").insert([
      {
        ip,
        phone,
      },
    ]);

    return NextResponse.json(
      {
        ok: true,
        reservation: data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Error interno del servidor.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json(
      { ok: false, message: "Faltan datos para actualizar." },
      { status: 400 }
    );
  }

  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return NextResponse.json(
      { ok: false, message: "Estado inválido." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("reservations")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    reservation: data,
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { ok: false, message: "Falta el ID." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("reservations")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}