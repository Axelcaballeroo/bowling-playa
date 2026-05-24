"use client";

import { useMemo, useState } from "react";
import {
  menuProducts,
  menuSections,
  menuSubcategories,
  type MenuLanguage,
  type MenuProduct,
  type MenuSubcategory,
} from "../../src/data/menuData";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16.5 16.5 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function localized(
  item: { name_es: string; name_en: string },
  language: MenuLanguage
) {
  return language === "es" ? item.name_es : item.name_en;
}

function localizedVariant(
  item: { label_es: string; label_en: string },
  language: MenuLanguage
) {
  return language === "es" ? item.label_es : item.label_en;
}

function description(
  item: { description_es: string; description_en: string },
  language: MenuLanguage
) {
  return language === "es" ? item.description_es : item.description_en;
}

function PriceLine({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex items-baseline gap-2 text-[15px] leading-6">
      <span className="max-w-[72%] shrink-0 font-semibold text-zinc-200">
        {label}
      </span>
      <span className="min-w-5 flex-1 border-b border-dotted border-zinc-600" />
      <span className="shrink-0 font-black text-[#f2d28a]">{price}</span>
    </div>
  );
}

function ProductItem({
  product,
  language,
}: {
  product: MenuProduct;
  language: MenuLanguage;
}) {
  const productDescription = description(product, language);

  if (product.variants?.length) {
    return (
      <article className="border-b border-zinc-800 py-4 last:border-b-0">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-[16px] font-black leading-5 text-white">
            {localized(product, language)}
          </h3>

          {product.badge && (
            <span className="rounded-full bg-[#f2d28a]/12 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#f2d28a]">
              {product.badge}
            </span>
          )}
        </div>

        {productDescription && (
          <p className="mb-2 text-sm leading-5 text-zinc-500">
            {productDescription}
          </p>
        )}

        <div className="space-y-1">
          {product.variants.map((variant) => (
            <PriceLine
              key={`${product.id}-${variant.label_es}-${variant.price}`}
              label={localizedVariant(variant, language)}
              price={variant.price}
            />
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="border-b border-zinc-800 py-4 last:border-b-0">
      <PriceLine label={localized(product, language)} price={product.price || ""} />

      {productDescription && (
        <p className="mt-1 text-sm leading-5 text-zinc-500">
          {productDescription}
        </p>
      )}

      {product.badge && (
        <span className="mt-2 inline-flex rounded-full bg-[#f2d28a]/12 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-[#f2d28a]">
          {product.badge}
        </span>
      )}
    </article>
  );
}

function SubcategoryBanner({
  subcategory,
  language,
}: {
  subcategory: MenuSubcategory;
  language: MenuLanguage;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-[#171318] ring-1 ring-white/10">
      <div
        className="h-28 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,10,14,0.94), rgba(10,10,14,0.42)), url('${subcategory.bannerImage}')`,
        }}
      >
        <div className="flex h-full flex-col justify-end px-5 py-4">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#f2d28a]">
            Bowling Playa
          </p>
          <h2 className="mt-1 text-2xl font-black leading-7 text-white">
            {localized(subcategory, language)}
          </h2>
        </div>
      </div>

      <p className="px-5 py-3 text-sm leading-5 text-zinc-400">
        {description(subcategory, language)}
      </p>
    </section>
  );
}

export default function MenuPage() {
  const [language, setLanguage] = useState<MenuLanguage>("es");
  const [activeSection, setActiveSection] = useState<"comida" | "bebidas">(
    "bebidas"
  );
  const [activeSubcategory, setActiveSubcategory] = useState("beers");
  const [search, setSearch] = useState("");

  const sectionSubcategories = useMemo(
    () =>
      menuSubcategories.filter(
        (subcategory) => subcategory.section === activeSection
      ),
    [activeSection]
  );

  const selectedSubcategory =
    sectionSubcategories.find(
      (subcategory) => subcategory.id === activeSubcategory
    ) || sectionSubcategories[0];

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const products = menuProducts.filter(
      (product) =>
        product.section === activeSection &&
        product.subcategory === selectedSubcategory?.id
    );

    if (!normalizedSearch) {
      return products;
    }

    return products.filter((product) => {
      const productName = localized(product, language).toLowerCase();
      const variantNames =
        product.variants
          ?.map((variant) => localizedVariant(variant, language).toLowerCase())
          .join(" ") || "";

      return `${productName} ${variantNames}`.includes(normalizedSearch);
    });
  }, [activeSection, language, search, selectedSubcategory?.id]);

  function handleSectionChange(sectionId: "comida" | "bebidas") {
    const firstSubcategory = menuSubcategories.find(
      (subcategory) => subcategory.section === sectionId
    );

    setActiveSection(sectionId);
    setActiveSubcategory(firstSubcategory?.id || "");
    setSearch("");
  }

  const emptyTitle =
    language === "es"
      ? "Esta seccion estara disponible pronto."
      : "This section will be available soon.";
  const noResults =
    language === "es"
      ? "No encontramos productos con ese nombre"
      : "No products found with that name";

  return (
    <main className="min-h-screen bg-[#0b0a0d] text-white">
      <header className="bg-[#0b0a0d]">
        <div className="h-32 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(11,10,13,0.95)),url('/bowling-hero.jpeg')] bg-cover bg-center" />

        <section className="-mt-10 px-4 pb-4">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-end justify-between gap-3">
              <div className="flex min-w-0 items-end gap-3">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-[#0b0a0d] bg-[#171318] text-xl font-black text-[#f2d28a] shadow-xl">
                  BP
                </div>

                <div className="min-w-0 pb-2">
                  <h1 className="truncate text-2xl font-black leading-7">
                    Bowling Playa
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">
                    {language === "es" ? "Abierto ahora" : "Open now"}
                  </p>
                </div>
              </div>

              <div className="mb-2 flex rounded-full bg-[#171318] p-1 ring-1 ring-white/10">
                {(["es", "en"] as MenuLanguage[]).map((item) => (
                  <button
                    className={`rounded-full px-3 py-1.5 text-xs font-black transition ${
                      language === item
                        ? "bg-[#f2d28a] text-[#17110a]"
                        : "text-zinc-400"
                    }`}
                    key={item}
                    onClick={() => setLanguage(item)}
                    type="button"
                  >
                    {item.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 rounded-2xl bg-[#171318] px-4 py-3 text-sm leading-5 text-zinc-400 ring-1 ring-white/10">
              {language === "es"
                ? "Mira el menu y pide con tu mesero."
                : "Browse the menu and order with your server."}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-[#171318] p-1.5 ring-1 ring-white/10">
              {menuSections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <button
                    className={`rounded-xl py-3 text-sm font-black transition ${
                      isActive
                        ? "bg-[#f2d28a] text-[#17110a]"
                        : "text-zinc-400"
                    }`}
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    type="button"
                  >
                    {localized(section, language)}
                  </button>
                );
              })}
            </div>

            <label className="relative mt-3 block">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                <SearchIcon />
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  language === "es"
                    ? "Buscar en esta seccion"
                    : "Search this section"
                }
                className="h-12 w-full rounded-2xl border border-white/10 bg-[#171318] pl-11 pr-4 text-[15px] font-semibold text-white outline-none placeholder:text-zinc-600 focus:border-[#f2d28a]/50"
                type="search"
              />
            </label>
          </div>
        </section>
      </header>

      <nav className="sticky top-0 z-30 border-y border-white/10 bg-[#0b0a0d]/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl gap-2 overflow-x-auto px-4 py-3">
          {sectionSubcategories.map((subcategory) => {
            const isActive = selectedSubcategory?.id === subcategory.id;

            return (
              <button
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition ${
                  isActive
                    ? "bg-white text-[#17110a]"
                    : "bg-[#171318] text-zinc-400 ring-1 ring-white/10"
                }`}
                key={subcategory.id}
                onClick={() => {
                  setActiveSubcategory(subcategory.id);
                  setSearch("");
                }}
                type="button"
              >
                {localized(subcategory, language)}
              </button>
            );
          })}
        </div>
      </nav>

      <section className="mx-auto max-w-2xl px-4 pb-12 pt-5">
        {selectedSubcategory && (
          <SubcategoryBanner
            language={language}
            subcategory={selectedSubcategory}
          />
        )}

        <div className="mt-5 rounded-3xl bg-[#111015] px-5 ring-1 ring-white/10">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <ProductItem
                key={product.id}
                language={language}
                product={product}
              />
            ))
          ) : (
            <div className="px-2 py-10 text-center">
              <p className="text-base font-black text-white">
                {search.trim() ? noResults : emptyTitle}
              </p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                {language === "es"
                  ? "Cambia de categoria o prueba con otra busqueda."
                  : "Change category or try another search."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
