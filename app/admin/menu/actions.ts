"use server";

import { revalidatePath } from "next/cache";
import { assertMenuAdmin } from "../../../src/lib/menuAdmin";
import { supabaseAdmin } from "../../../src/lib/supabaseAdmin";

export type AdminMenuSection = {
  active: boolean;
  id: string;
  name_en: string;
  name_es: string;
  sort_order: number;
  type: "food" | "drinks";
};

export type AdminMenuCategory = {
  active: boolean;
  description_en: string | null;
  description_es: string | null;
  id: string;
  image_url: string | null;
  name_en: string;
  name_es: string;
  section_id: string;
  sort_order: number;
};

export type AdminMenuProduct = {
  active: boolean;
  badge: string | null;
  category_id: string;
  description_en: string | null;
  description_es: string | null;
  id: string;
  name_en: string;
  name_es: string;
  price: number | null;
  price_label: string | null;
  sort_order: number;
};

export type AdminMenuVariant = {
  active: boolean;
  id: string;
  label_en: string;
  label_es: string;
  price: number;
  price_label: string | null;
  product_id: string;
  sort_order: number;
};

export type AdminMenuData = {
  categories: AdminMenuCategory[];
  products: AdminMenuProduct[];
  sections: AdminMenuSection[];
  variants: AdminMenuVariant[];
};

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nullableText(formData: FormData, key: string) {
  const value = text(formData, key);
  return value || null;
}

function integer(formData: FormData, key: string) {
  const value = Number.parseInt(text(formData, key), 10);
  return Number.isFinite(value) ? value : 0;
}

function priceParts(formData: FormData, key: string, required = false) {
  const label = text(formData, key);
  const match = label.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  const price = match ? Number(match[0]) : required ? 0 : null;

  return {
    price,
    price_label: label || null,
  };
}

function refreshMenuPaths() {
  revalidatePath("/menu");
  revalidatePath("/admin/menu");
}

export async function loadAdminMenuData(): Promise<AdminMenuData> {
  await assertMenuAdmin();

  const [sectionsResult, categoriesResult, productsResult, variantsResult] =
    await Promise.all([
      supabaseAdmin
        .from("menu_sections")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("menu_categories")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("menu_products")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("menu_product_variants")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);

  const error =
    sectionsResult.error ||
    categoriesResult.error ||
    productsResult.error ||
    variantsResult.error;

  if (error) {
    throw new Error(error.message);
  }

  return {
    sections: (sectionsResult.data || []) as AdminMenuSection[],
    categories: (categoriesResult.data || []) as AdminMenuCategory[],
    products: (productsResult.data || []) as AdminMenuProduct[],
    variants: (variantsResult.data || []) as AdminMenuVariant[],
  };
}

export async function createCategory(formData: FormData) {
  await assertMenuAdmin();

  const section_id = text(formData, "section_id");
  const name_es = text(formData, "name_es");
  const name_en = text(formData, "name_en");

  if (!section_id || !name_es || !name_en) {
    throw new Error("Faltan datos de la categoria.");
  }

  const { error } = await supabaseAdmin.from("menu_categories").insert({
    section_id,
    name_es,
    name_en,
    description_es: nullableText(formData, "description_es"),
    description_en: nullableText(formData, "description_en"),
    image_url: nullableText(formData, "image_url"),
    sort_order: integer(formData, "sort_order"),
    active: true,
  });

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function updateCategory(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const name_es = text(formData, "name_es");
  const name_en = text(formData, "name_en");

  if (!id || !name_es || !name_en) {
    throw new Error("Faltan datos de la categoria.");
  }

  const { error } = await supabaseAdmin
    .from("menu_categories")
    .update({
      name_es,
      name_en,
      description_es: nullableText(formData, "description_es"),
      description_en: nullableText(formData, "description_en"),
      image_url: nullableText(formData, "image_url"),
      sort_order: integer(formData, "sort_order"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function setCategoryActive(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const active = text(formData, "active") === "true";

  if (!id) throw new Error("Falta el ID de la categoria.");

  const { error } = await supabaseAdmin
    .from("menu_categories")
    .update({ active })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function createProduct(formData: FormData) {
  await assertMenuAdmin();

  const category_id = text(formData, "category_id");
  const name_es = text(formData, "name_es");
  const name_en = text(formData, "name_en");

  if (!category_id || !name_es || !name_en) {
    throw new Error("Faltan datos del producto.");
  }

  const price = priceParts(formData, "price");
  const { error } = await supabaseAdmin.from("menu_products").insert({
    category_id,
    name_es,
    name_en,
    description_es: nullableText(formData, "description_es"),
    description_en: nullableText(formData, "description_en"),
    badge: nullableText(formData, "badge"),
    sort_order: integer(formData, "sort_order"),
    active: true,
    ...price,
  });

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function updateProduct(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const name_es = text(formData, "name_es");
  const name_en = text(formData, "name_en");

  if (!id || !name_es || !name_en) {
    throw new Error("Faltan datos del producto.");
  }

  const price = priceParts(formData, "price");
  const { error } = await supabaseAdmin
    .from("menu_products")
    .update({
      name_es,
      name_en,
      description_es: nullableText(formData, "description_es"),
      description_en: nullableText(formData, "description_en"),
      badge: nullableText(formData, "badge"),
      sort_order: integer(formData, "sort_order"),
      ...price,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function setProductActive(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const active = text(formData, "active") === "true";

  if (!id) throw new Error("Falta el ID del producto.");

  const { error } = await supabaseAdmin
    .from("menu_products")
    .update({ active })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function createVariant(formData: FormData) {
  await assertMenuAdmin();

  const product_id = text(formData, "product_id");
  const label_es = text(formData, "label_es");
  const label_en = text(formData, "label_en");

  if (!product_id || !label_es || !label_en) {
    throw new Error("Faltan datos de la variante.");
  }

  const price = priceParts(formData, "price", true);
  const { error } = await supabaseAdmin.from("menu_product_variants").insert({
    product_id,
    label_es,
    label_en,
    sort_order: integer(formData, "sort_order"),
    active: true,
    ...price,
  });

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function updateVariant(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const label_es = text(formData, "label_es");
  const label_en = text(formData, "label_en");

  if (!id || !label_es || !label_en) {
    throw new Error("Faltan datos de la variante.");
  }

  const price = priceParts(formData, "price", true);
  const { error } = await supabaseAdmin
    .from("menu_product_variants")
    .update({
      label_es,
      label_en,
      sort_order: integer(formData, "sort_order"),
      ...price,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}

export async function setVariantActive(formData: FormData) {
  await assertMenuAdmin();

  const id = text(formData, "id");
  const active = text(formData, "active") === "true";

  if (!id) throw new Error("Falta el ID de la variante.");

  const { error } = await supabaseAdmin
    .from("menu_product_variants")
    .update({ active })
    .eq("id", id);

  if (error) throw new Error(error.message);
  refreshMenuPaths();
}
