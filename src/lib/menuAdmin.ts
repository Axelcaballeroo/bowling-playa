import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "./supabaseAdmin";

export type MenuAdminUser = {
  email: string | null;
  id: string;
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
  const supabase = await getServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: adminByUserId } = await supabaseAdmin
    .from("admin_users")
    .select("id, user_id, email, active")
    .eq("user_id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (adminByUserId) {
    return {
      email: user.email || adminByUserId.email || null,
      id: user.id,
    };
  }

  if (!user.email) return null;

  const { data: adminByEmail } = await supabaseAdmin
    .from("admin_users")
    .select("id, user_id, email, active")
    .eq("email", user.email)
    .eq("active", true)
    .maybeSingle();

  if (!adminByEmail) return null;

  if (!adminByEmail.user_id) {
    await supabaseAdmin
      .from("admin_users")
      .update({ user_id: user.id })
      .eq("id", adminByEmail.id);
  }

  return {
    email: user.email,
    id: user.id,
  };
}

export async function requireMenuAdmin() {
  const user = await getMenuAdminUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function assertMenuAdmin() {
  const user = await getMenuAdminUser();

  if (!user) {
    throw new Error("No autorizado.");
  }

  return user;
}
