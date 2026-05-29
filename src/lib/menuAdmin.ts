import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";

export type MenuAdminUser = {
  email: string | null;
  id: string;
};

export type MenuAdminAccess =
  | {
      error: null;
      status: "authorized";
      user: MenuAdminUser;
    }
  | {
      error: null;
      status: "unauthenticated";
      user: null;
    }
  | {
      error: string | null;
      status: "unauthorized";
      user: MenuAdminUser;
    }
  | {
      error: string;
      status: "error";
      user: MenuAdminUser | null;
    };

async function getServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components cannot always set cookies; auth reads still work.
          }
        },
      },
    }
  );
}

export async function getMenuAdminUser(): Promise<MenuAdminUser | null> {
  const access = await getMenuAdminAccess();
  return access.status === "authorized" ? access.user : null;
}

export async function getMenuAdminAccess(): Promise<MenuAdminAccess> {
  const supabase = await getServerSupabaseClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    return {
      error: authError.message,
      status: "error",
      user: null,
    };
  }

  if (!user) {
    return {
      error: null,
      status: "unauthenticated",
      user: null,
    };
  }

  const menuUser = {
    email: user.email || null,
    id: user.id,
  };

  const { data: adminByUserId, error: adminByUserIdError } = await supabaseAdmin
    .from("admin_users")
    .select("id, user_id, email, active")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (adminByUserIdError) {
    return {
      error: adminByUserIdError.message,
      status: "error",
      user: menuUser,
    };
  }

  if (adminByUserId) {
    return {
      error: null,
      status: "authorized",
      user: {
        email: user.email || adminByUserId.email || null,
        id: user.id,
      },
    };
  }

  if (!user.email) {
    return {
      error: "La sesion no tiene email asociado.",
      status: "unauthorized",
      user: menuUser,
    };
  }

  const { data: adminByEmail, error: adminByEmailError } = await supabaseAdmin
    .from("admin_users")
    .select("id, user_id, email, active")
    .eq("email", user.email)
    .eq("active", true)
    .maybeSingle();

  if (adminByEmailError) {
    return {
      error: adminByEmailError.message,
      status: "error",
      user: menuUser,
    };
  }

  if (!adminByEmail) {
    return {
      error: null,
      status: "unauthorized",
      user: menuUser,
    };
  }

  if (!adminByEmail.user_id) {
    const { error: updateError } = await supabaseAdmin
      .from("admin_users")
      .update({ user_id: user.id })
      .eq("id", adminByEmail.id);

    if (updateError) {
      return {
        error: updateError.message,
        status: "error",
        user: menuUser,
      };
    }
  }

  return {
    error: null,
    status: "authorized",
    user: {
      email: user.email,
      id: user.id,
    },
  };
}

export async function requireMenuAdmin() {
  const access = await getMenuAdminAccess();

  if (access.status === "unauthenticated") {
    redirect("/login");
  }

  if (access.status !== "authorized") {
    throw new Error(access.error || "No autorizado.");
  }

  return access.user;
}

export async function assertMenuAdmin() {
  const access = await getMenuAdminAccess();

  if (access.status !== "authorized") {
    throw new Error(access.error || "No autorizado.");
  }

  return access.user;
}
