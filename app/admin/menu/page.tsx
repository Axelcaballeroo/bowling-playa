import Link from "next/link";
import ConfirmSubmitButton from "./ConfirmSubmitButton";
import {
  createCategory,
  createProduct,
  createVariant,
  loadAdminMenuData,
  setCategoryActive,
  setProductActive,
  setVariantActive,
  updateCategory,
  updateProduct,
  updateVariant,
  type AdminMenuCategory,
  type AdminMenuProduct,
  type AdminMenuSection,
  type AdminMenuVariant,
} from "./actions";
import { requireMenuAdmin } from "../../../src/lib/menuAdmin";

type PageProps = {
  searchParams: Promise<{
    category?: string;
    section?: string;
  }>;
};

function statusPill(active: boolean) {
  return active
    ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
    : "border-red-400/25 bg-red-500/10 text-red-200";
}

function sectionLabel(type: AdminMenuSection["type"]) {
  return type === "food" ? "COMIDA" : "BEBIDAS";
}

function priceValue(item: { price: number | null; price_label: string | null }) {
  if (item.price_label) return item.price_label;
  if (item.price === null) return "";
  return `$${item.price}`;
}

function inputClass(extra = "") {
  return `w-full rounded-xl border border-white/[0.08] bg-[#07070b]/90 px-3 py-3 text-sm font-semibold text-white outline-none transition placeholder:text-zinc-600 focus:border-[#efd184]/60 ${extra}`;
}

function labelClass() {
  return "mb-1.5 block text-[11px] font-black uppercase tracking-[0.12em] text-zinc-500";
}

function CategoryForm({ category }: { category: AdminMenuCategory }) {
  return (
    <form action={updateCategory} className="space-y-3">
      <input name="id" type="hidden" value={category.id} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={labelClass()}>Nombre ES</span>
          <input className={inputClass()} name="name_es" defaultValue={category.name_es} />
        </label>
        <label>
          <span className={labelClass()}>Nombre EN</span>
          <input className={inputClass()} name="name_en" defaultValue={category.name_en} />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={labelClass()}>Descripcion ES</span>
          <textarea
            className={inputClass("min-h-20 resize-y")}
            name="description_es"
            defaultValue={category.description_es || ""}
          />
        </label>
        <label>
          <span className={labelClass()}>Descripcion EN</span>
          <textarea
            className={inputClass("min-h-20 resize-y")}
            name="description_en"
            defaultValue={category.description_en || ""}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <label>
          <span className={labelClass()}>Imagen</span>
          <input className={inputClass()} name="image_url" defaultValue={category.image_url || ""} />
        </label>
        <label>
          <span className={labelClass()}>Orden</span>
          <input
            className={inputClass()}
            name="sort_order"
            type="number"
            defaultValue={category.sort_order}
          />
        </label>
      </div>

      <button className="rounded-xl bg-[#efd184] px-4 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a] active:scale-95">
        Guardar categoria
      </button>
    </form>
  );
}

function ProductForm({ product }: { product: AdminMenuProduct }) {
  return (
    <form action={updateProduct} className="space-y-3">
      <input name="id" type="hidden" value={product.id} />

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={labelClass()}>Producto ES</span>
          <input className={inputClass()} name="name_es" defaultValue={product.name_es} />
        </label>
        <label>
          <span className={labelClass()}>Producto EN</span>
          <input className={inputClass()} name="name_en" defaultValue={product.name_en} />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          <span className={labelClass()}>Descripcion ES</span>
          <textarea
            className={inputClass("min-h-20 resize-y")}
            name="description_es"
            defaultValue={product.description_es || ""}
          />
        </label>
        <label>
          <span className={labelClass()}>Descripcion EN</span>
          <textarea
            className={inputClass("min-h-20 resize-y")}
            name="description_en"
            defaultValue={product.description_en || ""}
          />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label>
          <span className={labelClass()}>Precio</span>
          <input className={inputClass()} name="price" defaultValue={priceValue(product)} />
        </label>
        <label>
          <span className={labelClass()}>Badge</span>
          <input className={inputClass()} name="badge" defaultValue={product.badge || ""} />
        </label>
        <label>
          <span className={labelClass()}>Orden</span>
          <input
            className={inputClass()}
            name="sort_order"
            type="number"
            defaultValue={product.sort_order}
          />
        </label>
      </div>

      <button className="rounded-xl bg-[#efd184] px-4 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a] active:scale-95">
        Guardar producto
      </button>
    </form>
  );
}

function VariantForm({ variant }: { variant: AdminMenuVariant }) {
  return (
    <form action={updateVariant} className="grid gap-2 rounded-2xl border border-white/[0.06] bg-black/20 p-3 sm:grid-cols-[1fr_1fr_120px_90px_auto_auto] sm:items-end">
      <input name="id" type="hidden" value={variant.id} />
      <label>
        <span className={labelClass()}>Label ES</span>
        <input className={inputClass()} name="label_es" defaultValue={variant.label_es} />
      </label>
      <label>
        <span className={labelClass()}>Label EN</span>
        <input className={inputClass()} name="label_en" defaultValue={variant.label_en} />
      </label>
      <label>
        <span className={labelClass()}>Precio</span>
        <input className={inputClass()} name="price" defaultValue={priceValue(variant)} />
      </label>
      <label>
        <span className={labelClass()}>Orden</span>
        <input
          className={inputClass()}
          name="sort_order"
          type="number"
          defaultValue={variant.sort_order}
        />
      </label>
      <button className="rounded-xl border border-[#efd184]/25 bg-[#efd184]/10 px-3 py-3 text-xs font-black text-[#efd184] transition hover:bg-[#efd184]/20">
        Guardar
      </button>
    </form>
  );
}

export default async function AdminMenuPage({ searchParams }: PageProps) {
  await requireMenuAdmin();
  const params = await searchParams;
  const data = await loadAdminMenuData();

  const sections = data.sections.sort((a, b) => a.sort_order - b.sort_order);
  const activeSection =
    sections.find((section) => section.type === params.section) ||
    sections.find((section) => section.type === "drinks") ||
    sections[0];

  const categories = data.categories
    .filter((category) => category.section_id === activeSection?.id)
    .sort((a, b) => a.sort_order - b.sort_order);

  const selectedCategory =
    categories.find((category) => category.id === params.category) ||
    categories[0];

  const products = data.products
    .filter((product) => product.category_id === selectedCategory?.id)
    .sort((a, b) => a.sort_order - b.sort_order);

  const variantsByProduct = new Map<string, AdminMenuVariant[]>();
  for (const variant of data.variants) {
    const group = variantsByProduct.get(variant.product_id) || [];
    group.push(variant);
    variantsByProduct.set(variant.product_id, group);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070609] bg-[radial-gradient(circle_at_18%_0%,rgba(239,209,132,0.12),transparent_26%),radial-gradient(circle_at_88%_14%,rgba(14,165,233,0.14),transparent_28%)] px-4 py-6 text-white sm:px-6 sm:py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#efd184]/20 bg-[#efd184]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#efd184]">
              <span className="h-2 w-2 rounded-full bg-[#efd184]" />
              Panel privado
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              QR Menu
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              Edita categorias, productos, precios y variantes del menu digital.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              className="rounded-xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-sm font-black text-zinc-300 transition hover:bg-white/[0.09]"
              href="/admin"
            >
              Reservas
            </Link>
            <Link
              className="rounded-xl border border-[#efd184]/25 bg-[#efd184]/10 px-4 py-3 text-sm font-black text-[#efd184] transition hover:bg-[#efd184]/20"
              href="/menu"
            >
              Ver menu
            </Link>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-[22px] border border-white/[0.08] bg-[#111015]/92 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur">
          {sections.map((section) => {
            const isActive = section.id === activeSection?.id;
            return (
              <Link
                className={`rounded-2xl px-4 py-3 text-center text-sm font-black transition ${
                  isActive
                    ? "bg-[#efd184] text-[#17110a]"
                    : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
                }`}
                href={`/admin/menu?section=${section.type}`}
                key={section.id}
              >
                {sectionLabel(section.type)}
              </Link>
            );
          })}
        </div>

        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="space-y-4">
            <section className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur">
              <h2 className="text-xl font-black">Categorias</h2>
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <Link
                    className={`block rounded-2xl border px-4 py-3 transition ${
                      selectedCategory?.id === category.id
                        ? "border-[#efd184]/35 bg-[#efd184]/10"
                        : "border-white/[0.07] bg-white/[0.03] hover:bg-white/[0.06]"
                    }`}
                    href={`/admin/menu?section=${activeSection.type}&category=${category.id}`}
                    key={category.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-black text-white">{category.name_es}</span>
                      <span className={`rounded-full border px-2 py-1 text-[10px] font-black ${statusPill(category.active)}`}>
                        {category.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">{category.name_en}</p>
                  </Link>
                ))}
              </div>
            </section>

            {activeSection && (
              <section className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur">
                <h2 className="text-xl font-black">Nueva categoria</h2>
                <form action={createCategory} className="mt-4 space-y-3">
                  <input name="section_id" type="hidden" value={activeSection.id} />
                  <input className={inputClass()} name="name_es" placeholder="Nombre ES" />
                  <input className={inputClass()} name="name_en" placeholder="Nombre EN" />
                  <textarea className={inputClass("min-h-20 resize-y")} name="description_es" placeholder="Descripcion ES" />
                  <textarea className={inputClass("min-h-20 resize-y")} name="description_en" placeholder="Descripcion EN" />
                  <input className={inputClass()} name="image_url" placeholder="/bowling-card.jpeg" />
                  <input className={inputClass()} name="sort_order" placeholder="Orden" type="number" />
                  <button className="w-full rounded-xl bg-[#efd184] px-4 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a]">
                    Crear categoria
                  </button>
                </form>
              </section>
            )}
          </aside>

          <section className="space-y-5">
            {selectedCategory ? (
              <>
                <div className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-black">{selectedCategory.name_es}</h2>
                      <p className="text-sm text-zinc-500">{selectedCategory.name_en}</p>
                    </div>
                    <form action={setCategoryActive}>
                      <input name="id" type="hidden" value={selectedCategory.id} />
                      <input
                        name="active"
                        type="hidden"
                        value={selectedCategory.active ? "false" : "true"}
                      />
                      <ConfirmSubmitButton
                        className={`rounded-xl border px-4 py-3 text-sm font-black ${statusPill(selectedCategory.active)}`}
                        message={
                          selectedCategory.active
                            ? "Seguro que quieres desactivar esta categoria?"
                            : "Seguro que quieres reactivar esta categoria?"
                        }
                      >
                        {selectedCategory.active ? "Desactivar" : "Reactivar"}
                      </ConfirmSubmitButton>
                    </form>
                  </div>
                  <CategoryForm category={selectedCategory} />
                </div>

                <div className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5">
                  <h2 className="text-xl font-black">Nuevo producto</h2>
                  <form action={createProduct} className="mt-4 grid gap-3 sm:grid-cols-2">
                    <input name="category_id" type="hidden" value={selectedCategory.id} />
                    <input className={inputClass()} name="name_es" placeholder="Producto ES" />
                    <input className={inputClass()} name="name_en" placeholder="Product EN" />
                    <textarea className={inputClass("min-h-20 resize-y")} name="description_es" placeholder="Descripcion ES" />
                    <textarea className={inputClass("min-h-20 resize-y")} name="description_en" placeholder="Description EN" />
                    <input className={inputClass()} name="price" placeholder="$120" />
                    <input className={inputClass()} name="badge" placeholder="Popular / Nuevo / Promo" />
                    <input className={inputClass()} name="sort_order" placeholder="Orden" type="number" />
                    <button className="rounded-xl bg-[#efd184] px-4 py-3 text-sm font-black text-[#17110a] transition hover:bg-[#f5dd9a] sm:col-span-2">
                      Crear producto
                    </button>
                  </form>
                </div>

                {products.map((product) => {
                  const variants = (variantsByProduct.get(product.id) || []).sort(
                    (a, b) => a.sort_order - b.sort_order
                  );

                  return (
                    <article
                      className="rounded-[28px] border border-white/[0.08] bg-[#111015]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur sm:p-5"
                      key={product.id}
                    >
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-black">{product.name_es}</h3>
                            <span className={`rounded-full border px-2 py-1 text-[10px] font-black ${statusPill(product.active)}`}>
                              {product.active ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-zinc-500">{product.name_en}</p>
                        </div>
                        <form action={setProductActive}>
                          <input name="id" type="hidden" value={product.id} />
                          <input name="active" type="hidden" value={product.active ? "false" : "true"} />
                          <ConfirmSubmitButton
                            className={`rounded-xl border px-4 py-3 text-sm font-black ${statusPill(product.active)}`}
                            message={
                              product.active
                                ? "Seguro que quieres desactivar este producto?"
                                : "Seguro que quieres reactivar este producto?"
                            }
                          >
                            {product.active ? "Desactivar" : "Reactivar"}
                          </ConfirmSubmitButton>
                        </form>
                      </div>

                      <ProductForm product={product} />

                      <div className="mt-5 border-t border-white/[0.07] pt-5">
                        <h4 className="text-sm font-black uppercase tracking-[0.14em] text-zinc-500">
                          Variantes
                        </h4>
                        <div className="mt-3 space-y-2">
                          {variants.map((variant) => (
                            <div className="grid gap-2" key={variant.id}>
                              <VariantForm variant={variant} />
                              <form action={setVariantActive} className="flex justify-end">
                                <input name="id" type="hidden" value={variant.id} />
                                <input name="active" type="hidden" value={variant.active ? "false" : "true"} />
                                <ConfirmSubmitButton
                                  className={`rounded-xl border px-3 py-2 text-xs font-black ${statusPill(variant.active)}`}
                                  message={
                                    variant.active
                                      ? "Seguro que quieres desactivar esta variante?"
                                      : "Seguro que quieres reactivar esta variante?"
                                  }
                                >
                                  {variant.active ? "Desactivar variante" : "Reactivar variante"}
                                </ConfirmSubmitButton>
                              </form>
                            </div>
                          ))}
                        </div>

                        <form action={createVariant} className="mt-4 grid gap-2 rounded-2xl border border-dashed border-white/[0.12] bg-black/20 p-3 sm:grid-cols-[1fr_1fr_120px_90px_auto] sm:items-end">
                          <input name="product_id" type="hidden" value={product.id} />
                          <input className={inputClass()} name="label_es" placeholder="Label ES" />
                          <input className={inputClass()} name="label_en" placeholder="Label EN" />
                          <input className={inputClass()} name="price" placeholder="$120" />
                          <input className={inputClass()} name="sort_order" placeholder="Orden" type="number" />
                          <button className="rounded-xl border border-[#efd184]/25 bg-[#efd184]/10 px-3 py-3 text-xs font-black text-[#efd184] transition hover:bg-[#efd184]/20">
                            Agregar
                          </button>
                        </form>
                      </div>
                    </article>
                  );
                })}
              </>
            ) : (
              <div className="rounded-[28px] border border-dashed border-white/[0.1] bg-[#111015]/70 p-8 text-center text-zinc-400">
                Crea una categoria para empezar a cargar productos.
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
