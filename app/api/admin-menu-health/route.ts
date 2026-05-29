import { supabaseAdmin } from "../../../src/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const menuTables = [
  "admin_users",
  "menu_sections",
  "menu_categories",
  "menu_products",
  "menu_product_variants",
];

export async function GET() {
  let canLoadMenuTables = true;
  let error: string | null = null;

  try {
    for (const table of menuTables) {
      const { error: tableError } = await supabaseAdmin
        .from(table)
        .select("id", { count: "exact", head: true })
        .limit(1);

      if (tableError) {
        canLoadMenuTables = false;
        error = `${table}: ${tableError.message}`;
        break;
      }
    }
  } catch (caughtError) {
    canLoadMenuTables = false;
    error =
      caughtError instanceof Error ? caughtError.message : String(caughtError);
  }

  return Response.json({
    ok: true,
    route: "/admin/menu",
    commit: process.env.VERCEL_GIT_COMMIT_SHA || "actual",
    canLoadMenuTables,
    error,
  });
}
