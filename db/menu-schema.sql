-- QR Menu schema for the existing Bowling Playa Supabase project.
-- Run this in the same database that already contains reservations/blocks.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint admin_users_identity_check check (user_id is not null or email is not null)
);

create unique index if not exists admin_users_user_id_key
  on public.admin_users(user_id)
  where user_id is not null;

create unique index if not exists admin_users_email_key
  on public.admin_users(lower(email))
  where email is not null;

create or replace function public.is_menu_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.active = true
      and (
        au.user_id = auth.uid()
        or lower(au.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

create table if not exists public.menu_sections (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('food', 'drinks')),
  name_es text not null,
  name_en text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  section_id uuid not null references public.menu_sections(id) on delete restrict,
  name_es text not null,
  name_en text not null,
  description_es text,
  description_en text,
  image_url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete restrict,
  name_es text not null,
  name_en text not null,
  description_es text,
  description_en text,
  price numeric nullable,
  price_label text nullable,
  badge text nullable,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.menu_products(id) on delete restrict,
  label_es text not null,
  label_en text not null,
  price numeric not null,
  price_label text nullable,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_sections_active_order_idx
  on public.menu_sections(active, sort_order);

create index if not exists menu_categories_section_order_idx
  on public.menu_categories(section_id, active, sort_order);

create index if not exists menu_products_category_order_idx
  on public.menu_products(category_id, active, sort_order);

create index if not exists menu_product_variants_product_order_idx
  on public.menu_product_variants(product_id, active, sort_order);

drop trigger if exists set_menu_sections_updated_at on public.menu_sections;
create trigger set_menu_sections_updated_at
before update on public.menu_sections
for each row execute function public.set_updated_at();

drop trigger if exists set_menu_categories_updated_at on public.menu_categories;
create trigger set_menu_categories_updated_at
before update on public.menu_categories
for each row execute function public.set_updated_at();

drop trigger if exists set_menu_products_updated_at on public.menu_products;
create trigger set_menu_products_updated_at
before update on public.menu_products
for each row execute function public.set_updated_at();

drop trigger if exists set_menu_product_variants_updated_at on public.menu_product_variants;
create trigger set_menu_product_variants_updated_at
before update on public.menu_product_variants
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.menu_sections enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_products enable row level security;
alter table public.menu_product_variants enable row level security;

drop policy if exists "Admins can read admin users" on public.admin_users;
create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_menu_admin());

drop policy if exists "Public can read active menu sections" on public.menu_sections;
create policy "Public can read active menu sections"
on public.menu_sections
for select
to anon, authenticated
using (active = true);

drop policy if exists "Admins can manage menu sections" on public.menu_sections;
create policy "Admins can manage menu sections"
on public.menu_sections
for all
to authenticated
using (public.is_menu_admin())
with check (public.is_menu_admin());

drop policy if exists "Public can read active menu categories" on public.menu_categories;
create policy "Public can read active menu categories"
on public.menu_categories
for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1
    from public.menu_sections s
    where s.id = section_id
      and s.active = true
  )
);

drop policy if exists "Admins can manage menu categories" on public.menu_categories;
create policy "Admins can manage menu categories"
on public.menu_categories
for all
to authenticated
using (public.is_menu_admin())
with check (public.is_menu_admin());

drop policy if exists "Public can read active menu products" on public.menu_products;
create policy "Public can read active menu products"
on public.menu_products
for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1
    from public.menu_categories c
    join public.menu_sections s on s.id = c.section_id
    where c.id = category_id
      and c.active = true
      and s.active = true
  )
);

drop policy if exists "Admins can manage menu products" on public.menu_products;
create policy "Admins can manage menu products"
on public.menu_products
for all
to authenticated
using (public.is_menu_admin())
with check (public.is_menu_admin());

drop policy if exists "Public can read active menu product variants" on public.menu_product_variants;
create policy "Public can read active menu product variants"
on public.menu_product_variants
for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1
    from public.menu_products p
    join public.menu_categories c on c.id = p.category_id
    join public.menu_sections s on s.id = c.section_id
    where p.id = product_id
      and p.active = true
      and c.active = true
      and s.active = true
  )
);

drop policy if exists "Admins can manage menu product variants" on public.menu_product_variants;
create policy "Admins can manage menu product variants"
on public.menu_product_variants
for all
to authenticated
using (public.is_menu_admin())
with check (public.is_menu_admin());

-- Bootstrap an existing Supabase Auth user as menu/admin user.
-- Replace the email if needed, then run once after the Auth user exists.
insert into public.admin_users (email, active)
values ('admin@bowlingplaya.com', true)
on conflict ((lower(email))) where email is not null
do update set active = excluded.active;
