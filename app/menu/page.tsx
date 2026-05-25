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
  item: { description_es?: string; description_en?: string },
  language: MenuLanguage
) {
  return language === "es" ? item.description_es : item.description_en;
}

function PriceLine({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex items-baseline gap-2 text-[14px] leading-6 sm:text-[15px]">
      <span className="max-w-[70%] shrink-0 font-medium text-zinc-200">
        {label}
      </span>
      <span className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-zinc-600/80" />
      <span className="shrink-0 font-black tabular-nums text-[#f4d48a]">
        {price}
      </span>
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
      <article className="border-b border-white/[0.07] py-[18px] last:border-b-0">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-[15px] font-black uppercase leading-5 tracking-[0.02em] text-white sm:text-[16px]">
            {localized(product, language)}
          </h3>

          {product.badge && (
            <span className="shrink-0 rounded-full border border-[#f4d48a]/25 bg-[#f4d48a]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#f4d48a]">
              {product.badge}
            </span>
          )}
        </div>

        {productDescription && (
          <p className="mb-2.5 max-w-[34rem] text-[13px] leading-5 text-zinc-500">
            {productDescription}
          </p>
        )}

        <div className="space-y-1 rounded-2xl bg-white/[0.025] px-3 py-2 ring-1 ring-white/[0.05]">
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
    <article className="border-b border-white/[0.07] py-[18px] last:border-b-0">
      <div className="flex items-baseline gap-2">
        <h3 className="max-w-[70%] shrink-0 text-[15px] font-black uppercase leading-5 tracking-[0.02em] text-white sm:text-[16px]">
          {localized(product, language)}
        </h3>
        <span className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-zinc-600/80" />
        <span className="shrink-0 text-[15px] font-black tabular-nums text-[#f4d48a]">
          {product.price || ""}
        </span>
      </div>

      {productDescription && (
        <p className="mt-1.5 max-w-[34rem] pr-12 text-[13px] leading-5 text-zinc-500">
          {productDescription}
        </p>
      )}

      {product.badge && (
        <span className="mt-2 inline-flex rounded-full border border-[#f4d48a]/25 bg-[#f4d48a]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#f4d48a]">
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
    <section className="overflow-hidden rounded-[22px] bg-[#141216] shadow-[0_18px_60px_rgba(0,0,0,0.28)] ring-1 ring-white/10">
      <div
        className="h-24 bg-cover bg-center sm:h-28"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(8,7,10,0.92), rgba(8,7,10,0.58) 52%, rgba(8,7,10,0.22)), url('${subcategory.bannerImage}')`,
        }}
      >
        <div className="flex h-full flex-col justify-end px-5 py-4">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f4d48a]">
            Bowling Playa
          </p>
          <h2 className="mt-1 text-[24px] font-black leading-7 text-white">
            {localized(subcategory, language)}
          </h2>
        </div>
      </div>

      <p className="px-5 py-3 text-[13px] leading-5 text-zinc-400">
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
    <main className="min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#08070a] text-white [&_*]:box-border">
      <header className="relative bg-[#08070a]">
        <div className="h-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(8,7,10,0.96)),url('/bowling-hero.jpeg')] bg-cover bg-center sm:h-24" />

        <section className="-mt-7 px-3 pb-3 sm:px-4">
          <div className="mx-auto max-w-[720px]">
            <div className="min-w-0 rounded-[24px] border border-white/10 bg-[#111015]/95 px-3 pb-3 pt-3 shadow-[0_22px_70px_rgba(0,0,0,0.42)] backdrop-blur sm:px-4 sm:pb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#f4d48a]/25 bg-[#1b1712] text-sm font-black text-[#f4d48a] shadow-lg sm:h-14 sm:w-14 sm:text-base">
                    BP
                  </div>

                  <div className="min-w-0">
                    <h1 className="truncate text-[19px] font-black leading-6 tracking-[0.01em] sm:text-[21px]">
                      Bowling Playa
                    </h1>
                    <p className="mt-0.5 text-[11px] font-bold tracking-[0.06em] text-[#f4d48a] sm:text-[12px] sm:tracking-[0.08em]">
                      {language === "es" ? "Menú digital" : "Digital menu"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 rounded-full border border-white/10 bg-black/25 p-0.5">
                  {(["es", "en"] as MenuLanguage[]).map((item) => (
                    <button
                      className={`h-7 rounded-full px-2 text-[10px] font-black tracking-[0.06em] transition sm:h-8 sm:px-2.5 sm:text-[11px] sm:tracking-[0.08em] ${
                        language === item
                          ? "bg-[#f4d48a] text-[#17110a] shadow-[0_6px_18px_rgba(244,212,138,0.18)]"
                          : "text-zinc-400 hover:text-white"
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

              <div className="mt-4 grid min-w-0 grid-cols-2 gap-1.5 rounded-[18px] border border-white/10 bg-black/25 p-1.5">
                {menuSections.map((section) => {
                  const isActive = activeSection === section.id;

                  return (
                    <button
                      className={`min-w-0 rounded-[14px] py-3 text-[12px] font-black uppercase tracking-[0.1em] transition sm:text-[13px] sm:tracking-[0.14em] ${
                        isActive
                          ? "bg-[#f4d48a] text-[#17110a] shadow-[0_10px_28px_rgba(244,212,138,0.16)]"
                          : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
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
                  className="h-11 w-full rounded-[16px] border border-white/10 bg-[#09080b] pl-11 pr-4 text-[14px] font-semibold text-white outline-none placeholder:text-zinc-600 focus:border-[#f4d48a]/60 focus:bg-[#0c0b0f]"
                  type="search"
                />
              </label>
            </div>
          </div>
        </section>
      </header>

      <nav className="sticky top-0 z-30 border-y border-white/10 bg-[#08070a]/92 shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[720px] gap-2 overflow-x-auto px-3 py-2.5 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
          {sectionSubcategories.map((subcategory) => {
            const isActive = selectedSubcategory?.id === subcategory.id;

            return (
              <button
                className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-black transition ${
                  isActive
                    ? "bg-white text-[#17110a] shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
                    : "bg-[#141216] text-zinc-400 ring-1 ring-white/10 hover:text-white"
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

      <section className="relative mx-auto max-w-[720px] px-3 pb-12 pt-4 sm:px-4">
        {selectedSubcategory && (
          <SubcategoryBanner
            language={language}
            subcategory={selectedSubcategory}
          />
        )}

        <div className="mt-4 overflow-hidden rounded-[22px] border border-white/10 bg-[#111015] px-4 shadow-[0_20px_70px_rgba(0,0,0,0.26)] sm:px-5">
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
              <p className="text-[15px] font-black text-white">
                {search.trim() ? noResults : emptyTitle}
              </p>
              <p className="mx-auto mt-2 max-w-xs text-[13px] leading-6 text-zinc-500">
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
