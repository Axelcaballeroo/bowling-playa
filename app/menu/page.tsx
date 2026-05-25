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
      <span className="min-w-0 max-w-[68%] shrink-0 break-words font-medium text-zinc-200">
        {label}
      </span>
      <span className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-zinc-600/70" />
      <span className="shrink-0 font-black tabular-nums text-[#efd184] drop-shadow-[0_1px_10px_rgba(239,209,132,0.12)]">
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
      <article className="border-b border-white/[0.06] py-4 last:border-b-0 sm:py-[18px]">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words text-[15px] font-black uppercase leading-5 tracking-[0.02em] text-zinc-50 sm:text-[16px]">
            {localized(product, language)}
          </h3>

          {product.badge && (
            <span className="shrink-0 rounded-full border border-[#efd184]/25 bg-[#efd184]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#efd184] shadow-[0_4px_18px_rgba(239,209,132,0.08)]">
              {product.badge}
            </span>
          )}
        </div>

        {productDescription && (
          <p className="mb-3 max-w-[34rem] text-[13px] leading-5 text-zinc-500">
            {productDescription}
          </p>
        )}

        <div className="space-y-1.5 rounded-[18px] bg-white/[0.025] px-3 py-2.5 ring-1 ring-white/[0.045]">
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
    <article className="border-b border-white/[0.06] py-4 last:border-b-0 sm:py-[18px]">
      <div className="flex items-baseline gap-2">
        <h3 className="min-w-0 max-w-[68%] shrink-0 break-words text-[15px] font-black uppercase leading-5 tracking-[0.02em] text-zinc-50 sm:text-[16px]">
          {localized(product, language)}
        </h3>
        <span className="min-w-6 flex-1 translate-y-[-3px] border-b border-dotted border-zinc-600/70" />
        <span className="shrink-0 text-[15px] font-black tabular-nums text-[#efd184] drop-shadow-[0_1px_10px_rgba(239,209,132,0.12)]">
          {product.price || ""}
        </span>
      </div>

      {productDescription && (
        <p className="mt-1.5 max-w-[34rem] pr-6 text-[13px] leading-5 text-zinc-500 sm:pr-12">
          {productDescription}
        </p>
      )}

      {product.badge && (
        <span className="mt-2 inline-flex rounded-full border border-[#efd184]/25 bg-[#efd184]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] text-[#efd184]">
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
    <section className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#121115] shadow-[0_16px_45px_rgba(0,0,0,0.24)]">
      <div
        className="h-[86px] bg-cover bg-center sm:h-28"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7,6,9,0.95), rgba(7,6,9,0.66) 54%, rgba(7,6,9,0.22)), url('${subcategory.bannerImage}')`,
        }}
      >
        <div className="flex h-full flex-col justify-end px-4 py-3.5 sm:px-5 sm:py-4">
          <p className="text-[9px] font-black uppercase tracking-[0.24em] text-[#efd184]">
            Bowling Playa
          </p>
          <h2 className="mt-1 text-[23px] font-black leading-7 text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]">
            {localized(subcategory, language)}
          </h2>
        </div>
      </div>

      <p className="border-t border-white/[0.06] px-4 py-2.5 text-[13px] leading-5 text-zinc-400 sm:px-5">
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
    <main className="min-h-screen w-screen max-w-[100vw] overflow-x-hidden bg-[#070609] text-white [background-image:linear-gradient(180deg,#0b080b_0%,#070609_38%,#050506_100%)] [&_*]:box-border">
      <header className="relative bg-[#070609]">
        <div className="h-[68px] bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(7,6,9,0.96)),url('/bowling-hero.jpeg')] bg-cover bg-center sm:h-24" />

        <section className="-mt-6 px-3 pb-2.5 sm:px-4">
          <div className="mx-auto max-w-[720px]">
            <div className="min-w-0 rounded-[22px] border border-white/[0.09] bg-[#111015]/96 px-3 pb-3 pt-3 shadow-[0_18px_55px_rgba(0,0,0,0.38)] backdrop-blur-md sm:px-4 sm:pb-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] border border-[#efd184]/25 bg-[#1a1511] text-sm font-black text-[#efd184] shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:h-14 sm:w-14 sm:rounded-2xl sm:text-base">
                    BP
                  </div>

                  <div className="min-w-0">
                    <h1 className="truncate text-[18px] font-black leading-5 tracking-[0.01em] sm:text-[21px] sm:leading-6">
                      Bowling Playa
                    </h1>
                    <p className="mt-0.5 text-[11px] font-bold tracking-[0.06em] text-[#efd184] sm:text-[12px] sm:tracking-[0.08em]">
                      {language === "es" ? "Menú digital" : "Digital menu"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 rounded-full border border-white/[0.08] bg-black/30 p-0.5 shadow-inner shadow-black/30">
                  {(["es", "en"] as MenuLanguage[]).map((item) => (
                    <button
                      className={`h-7 rounded-full px-2.5 text-[10px] font-black tracking-[0.06em] transition duration-200 active:scale-95 sm:h-8 sm:px-3 sm:text-[11px] sm:tracking-[0.08em] ${
                        language === item
                          ? "bg-[#efd184] text-[#17110a] shadow-[0_8px_22px_rgba(239,209,132,0.18)]"
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

              <div className="mt-3 grid min-w-0 grid-cols-2 gap-1 rounded-[17px] border border-white/[0.08] bg-black/30 p-1.5 shadow-inner shadow-black/30">
                {menuSections.map((section) => {
                  const isActive = activeSection === section.id;

                  return (
                    <button
                      className={`min-w-0 rounded-[13px] py-2.5 text-[12px] font-black uppercase tracking-[0.11em] transition duration-200 active:scale-[0.98] sm:py-3 sm:text-[13px] sm:tracking-[0.14em] ${
                        isActive
                          ? "bg-[#efd184] text-[#17110a] shadow-[0_10px_28px_rgba(239,209,132,0.14)]"
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

              <label className="relative mt-2.5 block">
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
                  className="h-10 w-full rounded-[15px] border border-white/[0.08] bg-[#09080b] pl-11 pr-4 text-[14px] font-semibold text-white outline-none transition duration-200 placeholder:text-zinc-600 focus:border-[#efd184]/55 focus:bg-[#0c0b0f] sm:h-11"
                  type="search"
                />
              </label>
            </div>
          </div>
        </section>
      </header>

      <nav className="sticky top-0 z-30 border-y border-white/[0.07] bg-[#070609]/92 shadow-[0_12px_30px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="relative mx-auto max-w-[720px]">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-4 bg-gradient-to-r from-[#070609] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-8 bg-gradient-to-l from-[#070609] to-transparent" />
          <div className="flex gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
            {sectionSubcategories.map((subcategory) => {
              const isActive = selectedSubcategory?.id === subcategory.id;

              return (
                <button
                  className={`shrink-0 rounded-full px-3.5 py-2 text-[12px] font-black transition duration-200 active:scale-95 ${
                    isActive
                      ? "bg-white text-[#17110a] shadow-[0_8px_22px_rgba(255,255,255,0.12)]"
                      : "bg-[#121115] text-zinc-400 ring-1 ring-white/[0.08] hover:bg-white/[0.05] hover:text-white"
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
        </div>
      </nav>

      <section className="relative mx-auto max-w-[720px] px-3.5 pb-12 pt-3.5 sm:px-4 sm:pt-4">
        {selectedSubcategory && (
          <SubcategoryBanner
            language={language}
            subcategory={selectedSubcategory}
          />
        )}

        <div className="mt-3.5 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#101014] px-3.5 shadow-[0_18px_58px_rgba(0,0,0,0.24)] sm:mt-4 sm:px-5">
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
