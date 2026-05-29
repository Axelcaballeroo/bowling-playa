import { createClient } from "@supabase/supabase-js";
import {
  menuProducts as fallbackProducts,
  menuSections as fallbackSections,
  menuSubcategories as fallbackSubcategories,
  type MenuProduct,
  type MenuSection,
  type MenuSubcategory,
} from "../data/menuData";

type MenuSource = "supabase" | "fallback";

export type PublicMenuData = {
  products: MenuProduct[];
  sections: MenuSection[];
  source: MenuSource;
  subcategories: MenuSubcategory[];
};

type DbVariant = {
  active: boolean;
  label_en: string;
  label_es: string;
  price: number | null;
  price_label: string | null;
  sort_order: number;
};

type DbProduct = {
  active: boolean;
  badge: MenuProduct["badge"] | null;
  description_en: string | null;
  description_es: string | null;
  id: string;
  name_en: string;
  name_es: string;
  price: number | null;
  price_label: string | null;
  sort_order: number;
  menu_product_variants?: DbVariant[] | null;
};

type DbCategory = {
  active: boolean;
  description_en: string | null;
  description_es: string | null;
  id: string;
  image_url: string | null;
  name_en: string;
  name_es: string;
  sort_order: number;
  menu_products?: DbProduct[] | null;
};

type DbSection = {
  active: boolean;
  id: string;
  name_en: string;
  name_es: string;
  sort_order: number;
  type: "food" | "drinks";
  menu_categories?: DbCategory[] | null;
};

const fallbackMenuData: PublicMenuData = {
  products: fallbackProducts,
  sections: fallbackSections,
  source: "fallback",
  subcategories: fallbackSubcategories,
};

let cachedPublicClient: ReturnType<typeof createClient> | null = null;

function getPublicSupabaseClient() {
  if (cachedPublicClient) return cachedPublicClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Missing public Supabase environment variables.");
  }

  cachedPublicClient = createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
    },
  });

  return cachedPublicClient;
}

function sectionIdFromType(type: DbSection["type"]): MenuSection["id"] {
  return type === "food" ? "comida" : "bebidas";
}

function displayPrice(price: number | null, label: string | null) {
  if (label) return label;
  if (price === null) return undefined;
  return `$${price}`;
}

function normalizeMenu(rows: DbSection[]): PublicMenuData {
  const sortedSections = [...rows].sort((a, b) => a.sort_order - b.sort_order);

  const sections: MenuSection[] = sortedSections.map((section) => ({
    id: sectionIdFromType(section.type),
    name_en: section.name_en,
    name_es: section.name_es,
  }));

  const subcategories: MenuSubcategory[] = [];
  const products: MenuProduct[] = [];

  for (const section of sortedSections) {
    const sectionId = sectionIdFromType(section.type);
    const categories = [...(section.menu_categories || [])].sort(
      (a, b) => a.sort_order - b.sort_order
    );

    for (const category of categories) {
      subcategories.push({
        id: category.id,
        section: sectionId,
        name_es: category.name_es,
        name_en: category.name_en,
        description_es: category.description_es || "",
        description_en: category.description_en || "",
        bannerImage: category.image_url || "/bowling-card.jpeg",
      });

      const categoryProducts = [...(category.menu_products || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      );

      for (const product of categoryProducts) {
        const variants = [...(product.menu_product_variants || [])]
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((variant) => ({
            label_es: variant.label_es,
            label_en: variant.label_en,
            price: displayPrice(variant.price, variant.price_label) || "",
          }));

        products.push({
          id: product.id,
          section: sectionId,
          subcategory: category.id,
          name_es: product.name_es,
          name_en: product.name_en,
          description_es: product.description_es || undefined,
          description_en: product.description_en || undefined,
          price: displayPrice(product.price, product.price_label),
          variants: variants.length > 0 ? variants : undefined,
          badge: product.badge || undefined,
        });
      }
    }
  }

  return {
    products,
    sections,
    source: "supabase",
    subcategories,
  };
}

export async function getPublicMenuData(): Promise<PublicMenuData> {
  try {
    const supabase = getPublicSupabaseClient();
    const { data, error } = await supabase
      .from("menu_sections")
      .select(
        `
        id,
        type,
        name_es,
        name_en,
        sort_order,
        active,
        menu_categories (
          id,
          name_es,
          name_en,
          description_es,
          description_en,
          image_url,
          sort_order,
          active,
          menu_products (
            id,
            name_es,
            name_en,
            description_es,
            description_en,
            price,
            price_label,
            badge,
            sort_order,
            active,
            menu_product_variants (
              label_es,
              label_en,
              price,
              price_label,
              sort_order,
              active
            )
          )
        )
      `
      )
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackMenuData;
    }

    return normalizeMenu(data as DbSection[]);
  } catch {
    return fallbackMenuData;
  }
}
