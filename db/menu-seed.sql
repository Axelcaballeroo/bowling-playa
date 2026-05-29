-- Initial QR Menu seed generated from src/data/menuData.ts.
-- Run after db/menu-schema.sql in the existing Bowling Playa Supabase database.
begin;

insert into public.menu_sections (id, type, name_es, name_en, sort_order, active)
values ('c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'food', 'COMIDA', 'FOOD', 0, true)
on conflict (id) do update set type = excluded.type, name_es = excluded.name_es, name_en = excluded.name_en, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_sections (id, type, name_es, name_en, sort_order, active)
values ('2deab5f7-cd45-5619-8e66-67102683e7e7', 'drinks', 'BEBIDAS', 'DRINKS', 1, true)
on conflict (id) do update set type = excluded.type, name_es = excluded.name_es, name_en = excluded.name_en, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Entradas', 'Starters', 'Entradas para la mesa.', 'Starters for the table.', '/bowling-card.jpeg', 0, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('87081b46-216a-59ea-8f78-5f124d230b64', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Ensaladas', 'Salads', 'Ensaladas frescas.', 'Fresh salads.', '/bowling-card.jpeg', 1, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('7034a983-a9cd-518f-ad34-a1783598d4bc', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Pizzas', 'Pizzas', 'Pizzas para compartir.', 'Shareable pizzas.', '/bowling-card.jpeg', 2, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('67c524f3-a1c2-5744-9de2-282100ceea14', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Empanadas', 'Empanadas', 'Empanadas horneadas.', 'Baked empanadas.', '/bowling-card.jpeg', 3, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('0398fbfd-4665-595c-82c3-3fc6500c003d', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Hamburguesas', 'Burgers', 'Hamburguesas por tamano.', 'Burgers by size.', '/bowling-card.jpeg', 4, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('a09053ea-5bac-5227-9c84-bb6c22feb09d', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Papas a la Francesa', 'French Fries', 'Papas y toppings.', 'Fries and toppings.', '/bowling-card.jpeg', 5, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('72cf2fcb-ce6c-52ec-8248-84ac513f85e4', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Alitas y Boneless', 'Wings & Boneless', 'Alitas y boneless.', 'Wings and boneless.', '/bowling-card.jpeg', 6, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('21e07610-22b4-55ca-b38e-e0244090f2a2', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Nachos', 'Nachos', 'Nachos para compartir.', 'Shareable nachos.', '/bowling-card.jpeg', 7, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('f42b6484-de95-559b-8237-f9878be5cdf9', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Carnes', 'Steaks', 'Platos fuertes.', 'Main dishes.', '/bowling-card.jpeg', 8, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('95061fea-7e7d-5270-b11c-fa741f5dfbe7', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Combos', 'Combos', 'Combos para compartir.', 'Shareable combos.', '/bowling-card.jpeg', 9, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('b9cd63ec-3adc-5259-9647-e8c651603852', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Postres', 'Desserts', 'Postres para cerrar la partida.', 'Desserts to finish the game.', '/bowling-card.jpeg', 10, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('f19bac99-6fa7-5047-8793-6c715d5cf29e', 'c72fdae4-8467-5499-a5bf-be23c8f6ca13', 'Helados', 'Ice Cream', '2 bolas de helado (200ml).', '2 scoops of ice cream (200ml).', '/bowling-card.jpeg', 11, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('0b66c69d-befe-553d-900f-cf5282a77612', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Cervezas', 'Beers', 'Cervezas frias y preparados.', 'Cold beers and beer mixes.', '/bowling-hero.jpeg', 12, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('5081569c-8d00-5dd0-b89f-3fd770dc799c', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Cocteleria de Autor', 'Signature Cocktails', 'Cocteles insignia de Bowling Playa.', 'Bowling Playa signature cocktails.', '/bowling-hero.jpeg', 13, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('c37ef948-cfc3-5576-9927-45ec0965d89f', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Cocteles Clasicos', 'Classic Cocktails', 'Clasicos de barra.', 'Bar classics.', '/bowling-hero.jpeg', 14, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('2d757eb9-79a3-592d-b0f1-70135022e23d', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Champagne', 'Champagne', 'Botellas para celebrar.', 'Bottles to celebrate.', '/bowling-hero.jpeg', 15, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('c59a9653-b364-5964-b32f-d0cd057bac45', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Ginebra', 'Gin', 'Ginebras por presentacion.', 'Gin by serving size.', '/bowling-hero.jpeg', 16, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('ca7d9280-e71d-5bd5-9672-2b41c2569658', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Whisky', 'Whisky', 'Whiskies por presentacion.', 'Whisky by serving size.', '/bowling-hero.jpeg', 17, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('88b9e8e0-5dfc-5c45-8469-a48b20e52f1f', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Vodka', 'Vodka', 'Vodkas por presentacion.', 'Vodka by serving size.', '/bowling-hero.jpeg', 18, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Ron', 'Rum', 'Rones por presentacion.', 'Rum by serving size.', '/bowling-hero.jpeg', 19, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('9b149a6a-8999-5ab1-92db-28e429511665', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Licores', 'Liqueurs', 'Licores y aperitivos.', 'Liqueurs and aperitifs.', '/bowling-hero.jpeg', 20, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('12ff775b-16f6-5d95-a5e6-24c828c1bfde', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Vinos', 'Wines', 'Vinos por copa y botella.', 'Wines by glass and bottle.', '/bowling-hero.jpeg', 21, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('387ab45c-1c5e-5a94-9a68-de002dc76a51', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Tequila', 'Tequila', 'Tequilas por presentacion.', 'Tequila by serving size.', '/bowling-hero.jpeg', 22, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('878f8302-7fdb-534a-9803-11e63067c93e', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Mezcal', 'Mezcal', 'Mezcales seleccionados.', 'Selected mezcals.', '/bowling-hero.jpeg', 23, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('414d7328-9655-5308-bebc-7c210b3e206c', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Sin Alcohol', 'Non-Alcoholic', 'Refrescos, aguas y bebidas sin alcohol.', 'Sodas, waters and non-alcoholic drinks.', '/bowling-hero.jpeg', 24, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_categories (id, section_id, name_es, name_en, description_es, description_en, image_url, sort_order, active)
values ('3230305e-edfd-53bc-a365-0d91adf03d3d', '2deab5f7-cd45-5619-8e66-67102683e7e7', 'Shisha', 'Shisha', 'Shisha y extras.', 'Shisha and extras.', '/bowling-hero.jpeg', 25, true)
on conflict (id) do update set section_id = excluded.section_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, image_url = excluded.image_url, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('923de8be-5e5f-5fb8-a7ab-7a6edda363ca', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'GUACAMOLE', 'GUACAMOLE', '', '', 120, '$120', null, 0, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('3cfcce83-0d2e-59a1-ba28-d499a49a27c3', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'DEDOS DE QUESO', 'CHEESE FINGERS', '10 piezas', '10 pieces', 160, '$160', null, 1, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('02d6b196-dcc9-5bcc-a283-57b599f52736', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'NUGGETS DE POLLO', 'CHICKEN NUGGETS', '8 piezas', '8 pieces', 160, '$160', null, 2, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('a737a76c-25e5-5513-ba99-d000aaec6c24', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'AROS DE CEBOLLA', 'ONION RINGS', '8 piezas', '8 pieces', 160, '$160', null, 3, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('43a3ff4f-68e5-525e-8b38-ee043f729dd4', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'COLIFLOR SPICY', 'SPICY CAULIFLOWER', '', '', 160, '$160', null, 4, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('77ecf3a7-0452-5eb4-9bee-37d7c63da6da', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'CALAMARES FRITOS', 'FRIED CALAMARI', '', '', 190, '$190', null, 5, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('28edb6e7-aa52-5242-852d-278bccc83829', 'a885a0ec-cb35-563e-a51a-1d9ddc5ce1cf', 'CAMARONES FRITOS', 'FRIED SHRIMP', '', '', 190, '$190', null, 6, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('05673cd9-2622-5860-a722-af80ad133cb1', '87081b46-216a-59ea-8f78-5f124d230b64', 'ENSALADA CESAR', 'CAESAR SALAD', 'Lechuga, crutones, queso parmesano, aderezo cesar, aceitunas, pollo', 'Lettuce, croutons, parmesan cheese, caesar dressing, olives, chicken', 200, '$200', null, 7, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('e03c8814-62ac-5bac-925a-bb8c4647253f', '87081b46-216a-59ea-8f78-5f124d230b64', 'ENSALADA POLLO', 'CHICKEN SALAD', 'Lechuga, tomate, huevo, zanahoria, pollo', 'Lettuce, tomato, egg, carrot, chicken', 230, '$230', null, 8, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('18b885b7-d26e-5eb3-ab2f-0ef9032404f0', '87081b46-216a-59ea-8f78-5f124d230b64', 'ENSALADA MEDITERRANEA', 'MEDITERRANEAN SALAD', 'Tomate, cebolla blanca, aceitunas, queso feta, aderezado con aceite de oliva extra virgen y orégano', 'Tomato, white onion, olives, feta cheese, seasoned with extra virgin olive oil and oregano', 200, '$200', null, 9, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ce91effa-713c-57b1-a714-6c5eb5628221', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'MUZARELLA', 'MOZZARELLA', 'Queso Muzarella', 'Mozzarella cheese', 300, '$300', null, 10, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('cbeeae3e-36d3-5b7f-b6d0-e6a09b4e5957', '7034a983-a9cd-518f-ad34-a1783598d4bc', '4 QUESOS', '4 CHEESE', 'Queso Muzarella, queso cheddar, queso gouda, queso azul', 'Mozzarella cheese, cheddar cheese, gouda cheese, blue cheese', 360, '$360', null, 11, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('eb33e6f7-23ca-5c72-b9c9-e88eaf21e747', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'PEPPERONI', 'PEPPERONI', 'Queso Muzarella, rodajas de pepperoni', 'Mozzarella cheese, pepperoni slices', 320, '$320', null, 12, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('41186f58-18fa-5d64-9dfb-aef318c57b7f', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'NAPOLITANA', 'NAPOLITANA', 'Queso Muzarella, rodajas de tomate, salsa de ajo', 'Mozzarella cheese, tomato slices, garlic sauce', 320, '$320', null, 13, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('7225779a-6f3c-5620-8cca-30ae259da44a', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'FUGAZZETTA', 'FUGAZZETTA', 'Queso Muzarella, cebolla caramelizada', 'Mozzarella cheese, caramelized onion', 320, '$320', null, 14, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('4facfd0c-7097-538d-b97e-e0f01ceee728', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'CEBOLLA Y ROQUEFORT', 'ONION & ROQUEFORT', 'Queso Muzarella, queso azul, cebolla caramelizada', 'Mozzarella cheese, blue cheese, caramelized onion', 350, '$350', null, 15, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('57c984ab-e63c-5df7-b5aa-cf6f76e849b5', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'ARUGULA Y JAMON SERRANO', 'ARUGULA & SERRANO HAM', 'Queso Muzarella, arúgula, jamón serrano', 'Mozzarella cheese, arugula, serrano ham', 400, '$400', null, 16, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('dd16195a-f8a6-540c-b303-93ba7ae5ebfc', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'MEXICANA', 'MEXICAN', 'Queso Muzarella, pimientos asados, cebolla, rodajas de jalapeño', 'Mozzarella cheese, roasted peppers, onion, jalapeño slices', 350, '$350', null, 17, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b0d63bb8-7271-5541-8c6f-319b13c609bd', '7034a983-a9cd-518f-ad34-a1783598d4bc', 'HAWAIANA', 'HAWAIIAN', 'Queso Muzarella, cubos de piña, jamón cocido', 'Mozzarella cheese, pineapple cubes, cooked ham', 340, '$340', null, 18, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('25c9690a-66cc-5dfd-8938-0d3c7d1ca5ca', '67c524f3-a1c2-5744-9de2-282100ceea14', 'CHAMPIÑON A LA CREMA', 'CREAMY MUSHROOM', '', '', 60, '$60', null, 19, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('7b0fc357-2c28-5782-b17f-4224e0d47c71', '67c524f3-a1c2-5744-9de2-282100ceea14', 'CARNE', 'BEEF', '', '', 60, '$60', null, 20, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('4a9d5db8-d475-55b4-bc8c-fcd28740a12f', '67c524f3-a1c2-5744-9de2-282100ceea14', 'JAMON Y QUESO', 'HAM & CHEESE', '', '', 60, '$60', null, 21, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('0f5f6c4e-7637-522e-863d-fc7e4d510787', '67c524f3-a1c2-5744-9de2-282100ceea14', 'POLLO AL VERDEO', 'CHICKEN WITH GREEN ONIONS', '', '', 60, '$60', null, 22, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('4aa6f27e-33f3-52c6-8c63-5ad865fd413b', '67c524f3-a1c2-5744-9de2-282100ceea14', 'ESPINACA Y QUESO', 'SPINACH & CHEESE', '', '', 60, '$60', null, 23, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2c7960cf-eb8b-539d-a137-290c4f7586dd', '67c524f3-a1c2-5744-9de2-282100ceea14', '4 QUESOS', '4 CHEESE', '', '', 60, '$60', null, 24, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('51e9e13b-76ee-5b1e-ad37-a6941c0ebdf8', '0398fbfd-4665-595c-82c3-3fc6500c003d', 'CHEESE BURGER', 'CHEESE BURGER', 'Pan de papa, 120gr de carne, queso cheddar', 'Potato bun, 120g beef patty, cheddar cheese', null, null, null, 25, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5d49ffe7-bc9d-5f87-ac29-4748f55a1246', '51e9e13b-76ee-5b1e-ad37-a6941c0ebdf8', 'Simple', 'Single', 190, '$190', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('85800622-ee34-5400-8924-d82e736cfce1', '51e9e13b-76ee-5b1e-ad37-a6941c0ebdf8', 'Doble', 'Double', 240, '$240', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0d38777b-c9dc-5f39-a780-fc2359ff2692', '51e9e13b-76ee-5b1e-ad37-a6941c0ebdf8', 'Triple', 'Triple', 270, '$270', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('170200ab-fc4a-5dfc-af4b-928444daf116', '0398fbfd-4665-595c-82c3-3fc6500c003d', 'BLUE CHEESE BURGER', 'BLUE CHEESE BURGER', 'Pan de papa, 120gr de carne, queso manchego, queso azul, cebolla caramelizada', 'Potato bun, 120g beef patty, manchego cheese, blue cheese, caramelized onion', null, null, null, 26, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7bde2a0a-9ed6-528d-b7df-5bb2a0eaca3d', '170200ab-fc4a-5dfc-af4b-928444daf116', 'Simple', 'Single', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2d3922d8-4303-5c10-aa43-c6bc547d6187', '170200ab-fc4a-5dfc-af4b-928444daf116', 'Doble', 'Double', 270, '$270', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0428829a-9576-5c6d-bf9c-8f2654162c69', '170200ab-fc4a-5dfc-af4b-928444daf116', 'Triple', 'Triple', 310, '$310', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('39e1fdd5-7ae6-5de5-a519-a9db6e7d9c81', '0398fbfd-4665-595c-82c3-3fc6500c003d', 'BACON & CHEDDAR', 'BACON & CHEDDAR', 'Pan de papa, 120gr de carne, queso cheddar, tocino ahumado, salsa especial', 'Potato bun, 120g beef patty, cheddar cheese, smoked bacon, special sauce', null, null, null, 27, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('95f5b061-38b9-5604-95b7-c122440bdac0', '39e1fdd5-7ae6-5de5-a519-a9db6e7d9c81', 'Simple', 'Single', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('3ee2d5b5-86ad-5692-8e3a-ba7c7c2d1e33', '39e1fdd5-7ae6-5de5-a519-a9db6e7d9c81', 'Doble', 'Double', 270, '$270', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('58f5242d-e359-5cd5-9313-fb58cb20fff4', '39e1fdd5-7ae6-5de5-a519-a9db6e7d9c81', 'Triple', 'Triple', 310, '$310', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('750200f9-0671-5996-99a0-7e6f2d59a09e', '0398fbfd-4665-595c-82c3-3fc6500c003d', 'CRISPY ONION', 'CRISPY ONION', 'Pan de papa, 120gr de carne, queso cheddar, aro de cebolla, salsa BBQ', 'Potato bun, 120g beef patty, cheddar cheese, onion ring, BBQ sauce', null, null, null, 28, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8da866bd-934a-526d-baa7-084db06be7ff', '750200f9-0671-5996-99a0-7e6f2d59a09e', 'Simple', 'Single', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('d503457c-844a-57ff-9308-6d6fa9683b65', '750200f9-0671-5996-99a0-7e6f2d59a09e', 'Doble', 'Double', 270, '$270', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('753d3152-edab-5048-91ad-8f89a0b9b94f', '750200f9-0671-5996-99a0-7e6f2d59a09e', 'Triple', 'Triple', 320, '$320', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2ef9fc5b-b960-5bdf-bab4-58e664a2bab6', '0398fbfd-4665-595c-82c3-3fc6500c003d', '"LA MERA MERA" BURGER', '"LA MERA MERA" BURGER', 'Pan de papa, 120gr de carne, queso manchego, guacamole, jalapeños, mayonesa casera', 'Potato bun, 120g beef patty, manchego cheese, guacamole, jalapeños, homemade mayonnaise', null, null, null, 29, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('a9804a7c-1dfd-5865-b302-26417e2b48ef', '2ef9fc5b-b960-5bdf-bab4-58e664a2bab6', 'Simple', 'Single', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('47d90a59-02b6-5dd4-b56b-5c9aeaba9e0a', '2ef9fc5b-b960-5bdf-bab4-58e664a2bab6', 'Doble', 'Double', 270, '$270', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f9f50b0f-f7fb-51a3-9727-d1d3ea38e7d0', '2ef9fc5b-b960-5bdf-bab4-58e664a2bab6', 'Triple', 'Triple', 310, '$310', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('acfa2ad1-394c-5564-b411-1e28c832fa8b', '0398fbfd-4665-595c-82c3-3fc6500c003d', 'VEGANA/VEGETARIANA', 'VEGAN & VEGETARIAN', 'Puedes pedir cualquiera de nuestras hamburguesas con medallón de Portobello o Portobello empanizado', 'You can order any of our burgers with a Portobello patty or breaded Portobello', null, 'Consultar', null, 30, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2fcd606a-c777-5863-ae81-108978e204b6', 'a09053ea-5bac-5227-9c84-bb6c22feb09d', 'SIMPLES', 'SIMPLE 200g', '', '', 100, '$100', null, 31, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('150a1832-5719-5b82-a467-aca97a3ca4e9', 'a09053ea-5bac-5227-9c84-bb6c22feb09d', 'CHEDDAR', 'CHEDDAR', '', '', 110, '$110', null, 32, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('41e01ad5-78fe-5e58-b406-cbb4bc09c48a', 'a09053ea-5bac-5227-9c84-bb6c22feb09d', 'CHEDDAR BACON', 'CHEDDAR BACON', '', '', 130, '$130', null, 33, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('97142040-444c-5194-a55d-0c7bf9456854', '72cf2fcb-ce6c-52ec-8248-84ac513f85e4', 'ALITAS', 'WINGS', '', '', 210, '$210', null, 34, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('42c13137-b715-5948-96ed-f6a320711c36', '72cf2fcb-ce6c-52ec-8248-84ac513f85e4', 'BONELESS', 'BONELESS', '', '', 210, '$210', null, 35, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b62c0e55-572f-5c94-a17d-3ffba69d7971', '21e07610-22b4-55ca-b38e-e0244090f2a2', 'GUACAMOLE 500GR', 'GUACAMOLE 500GR', '', '', 220, '$220', null, 36, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ea6efa81-de21-5fe0-947d-2fbf616a46c6', '21e07610-22b4-55ca-b38e-e0244090f2a2', 'CARNE', 'BEEF', '', '', 260, '$260', null, 37, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('20833484-3ab1-539a-a992-8091a23e592e', '21e07610-22b4-55ca-b38e-e0244090f2a2', 'POLLO', 'CHICKEN', '', '', 250, '$250', null, 38, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8b278360-d3bb-5940-9427-cf3edda36536', 'f42b6484-de95-559b-8237-f9878be5cdf9', 'ARRACHERA', 'SKIRT STEAK', 'Trozo de arrachera al plato con ensalada y papas a la francesa', 'Skirt steak served with salad and french fries', 260, '$260', null, 39, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('c71b24ca-0781-516a-8b19-00bc5f225f90', 'f42b6484-de95-559b-8237-f9878be5cdf9', 'POLLO', 'CHICKEN', 'Trozo de pollo al plato con ensalada y papas a la francesa', 'Chicken served with salad and french fries', 220, '$220', null, 40, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2c3cea20-d4ed-5380-a58a-0112f46a091b', '95061fea-7e7d-5270-b11c-fa741f5dfbe7', 'COMBO MAR', 'SEA COMBO', 'Incluye calamares y camarones fritos, aros de cebolla y papas a la francesa', 'Includes fried calamari, fried shrimp, onion rings and french fries', 550, '$550', null, 41, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('c14ef383-be68-5db3-a955-3a8f148418e5', '95061fea-7e7d-5270-b11c-fa741f5dfbe7', 'COMBO FRITO', 'FRIED COMBO', 'Incluye alitas, boneless, nuggets y papas a la francesa', 'Includes wings, boneless, nuggets and french fries', 580, '$580', null, 42, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('c122c721-b32f-518a-a8e0-317e814a0286', '95061fea-7e7d-5270-b11c-fa741f5dfbe7', 'COMBO SNACKS', 'SNACK COMBO', 'Incluye guacamole, dedos de queso y papas a la francesa', 'Includes guacamole, cheese fingers and french fries', 320, '$320', null, 43, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('dffb1bf5-386b-5256-b436-2ec841a695a8', 'b9cd63ec-3adc-5259-9647-e8c651603852', 'WAFFLE', 'WAFFLE', 'Waffle con 4 toppings (Fresa, Kiwi, Plátano, Frutos rojos, Chocolate, Oreo)', 'Waffle with 4 toppings (Strawberry, Kiwi, Banana, Berries, Chocolate, Oreo)', 180, '$180', null, 44, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('703a9e6f-d447-5bc6-bccf-a1f2925b2da5', 'b9cd63ec-3adc-5259-9647-e8c651603852', 'WAFFLE + HELADO', 'WAFFLE + ICE CREAM', 'Waffle con 4 toppings (Fresa, Kiwi, Plátano, Frutos rojos, Chocolate, Oreo)', 'Waffle with 4 toppings (Strawberry, Kiwi, Banana, Berries, Chocolate, Oreo)', 250, '$250', null, 45, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('c1a90ed2-ff12-5f00-8c0c-f2f59bb11196', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'MOUSSE DE CHOCOLATE', 'CHOCOLATE MOUSSE', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 46, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2505dbd4-30d0-5fa2-a3b9-4584a2cf5db8', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'VAINILLA', 'VANILLA', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 47, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('063e9f53-f331-521e-96df-bab1dd3e2b02', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'FRESA', 'STRAWBERRY', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 48, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8afe0b4d-db75-528b-8ed0-00fcf8f01958', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'DULCE DE LECHE GRANIZADO', 'DULCE DE LECHE CRUNCH', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 49, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('69c521b8-d7bf-5967-9d21-5022ebfe8ecf', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'BANANA SPLIT', 'BANANA SPLIT', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 50, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b8986989-25be-5eb5-9a44-cf7c92975e70', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'MARACUYA', 'PASSION FRUIT', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 51, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('e78c5335-00ed-5fb4-bed1-13808c8ac9ca', 'f19bac99-6fa7-5047-8793-6c715d5cf29e', 'LIMON', 'LEMON', '2 bolas de helado (200ml)', '2 scoops of ice cream (200ml)', 140, '$140', null, 52, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('1f508d6c-2488-5db2-b413-dc2e5d8672f0', '0b66c69d-befe-553d-900f-cf5282a77612', 'HEINEKEN', 'HEINEKEN', '', '', null, null, 'Popular', 53, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5e297b60-ca53-5a9d-9830-784e20fbcb51', '1f508d6c-2488-5db2-b413-dc2e5d8672f0', 'Botella', 'Bottle', 75, '$75', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8849bba4-76f2-5fa6-8e1a-82b97820fbcf', '1f508d6c-2488-5db2-b413-dc2e5d8672f0', 'Tarro', 'Mug', 85, '$85', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('e8596d5e-3f73-5aed-bf83-af28c94d19ae', '1f508d6c-2488-5db2-b413-dc2e5d8672f0', 'Litro', 'Liter', 165, '$165', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2f0b1512-4011-5f96-85bf-278401ac17a2', '1f508d6c-2488-5db2-b413-dc2e5d8672f0', '1.8L', '1.8L', 330, '$330', 3, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('57a18f7b-5316-5b23-bbd9-6b174887f284', '1f508d6c-2488-5db2-b413-dc2e5d8672f0', 'Triton 3L', '3L Tower', 450, '$450', 4, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('64646a4e-6e45-53c2-8e29-d1859a7b12e3', '0b66c69d-befe-553d-900f-cf5282a77612', 'XX', 'XX', '', '', null, null, null, 54, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1558eccf-c491-518b-a4a4-f6b3c37204f5', '64646a4e-6e45-53c2-8e29-d1859a7b12e3', 'Botella', 'Bottle', 65, '$65', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('fbbff3f4-7bf2-57d4-b45a-68e36026e53c', '64646a4e-6e45-53c2-8e29-d1859a7b12e3', 'Tarro', 'Mug', 70, '$70', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7b17e301-c50a-59d7-931e-e51269cd612a', '64646a4e-6e45-53c2-8e29-d1859a7b12e3', 'Litro', 'Liter', 140, '$140', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c6f7a294-db06-5192-90bc-fd37cb44e1e1', '64646a4e-6e45-53c2-8e29-d1859a7b12e3', '1.8L', '1.8L', 260, '$260', 3, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('dcb1bbf8-76a9-566c-b4fb-05fc63dda39f', '64646a4e-6e45-53c2-8e29-d1859a7b12e3', 'Triton 3L', '3L Tower', 390, '$390', 4, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('f2c07828-9869-53b1-863e-b9a89d928377', '0b66c69d-befe-553d-900f-cf5282a77612', 'BOHEMIA CLARA / OBSCURA', 'BOHEMIA CLARA / OBSCURA', '', '', 75, '$75', null, 55, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('cd07f998-7e06-51e1-8bde-dc55cf8674fa', '0b66c69d-befe-553d-900f-cf5282a77612', 'AMSTEL ULTRA', 'AMSTEL ULTRA', '', '', 75, '$75', null, 56, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('7a535c38-76ff-58f8-8778-46f5844ea1ca', '0b66c69d-befe-553d-900f-cf5282a77612', 'CHELADA, MICHELADA, OJO ROJO', 'CHELADA, MICHELADA, OJO ROJO', '', '', 30, '$30', null, 57, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('7a016dd3-25f0-5151-9315-197b236e6385', '0b66c69d-befe-553d-900f-cf5282a77612', 'VASO DE CLAMATO', 'CLAMATO GLASS', '', '', 60, '$60', null, 58, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('cd6d6dcc-be14-50f0-98c0-152ccfb40a41', '5081569c-8d00-5dd0-b89f-3fd770dc799c', 'BABY YODA', 'BABY YODA', 'Coctel de autor.', 'Signature cocktail.', 180, '$180', 'Popular', 59, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8d08004d-1888-5774-9d42-98ee989a379d', '5081569c-8d00-5dd0-b89f-3fd770dc799c', 'EL DIABLO', 'EL DIABLO', 'Coctel de autor.', 'Signature cocktail.', 220, '$220', 'Recomendado', 60, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8df918a3-f124-5c4a-a3c1-d615fbb98c58', '5081569c-8d00-5dd0-b89f-3fd770dc799c', 'TIKI', 'TIKI', 'Coctel de autor.', 'Signature cocktail.', 180, '$180', null, 61, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('f260fee9-e56b-59fc-aa32-dfe90971f70e', '5081569c-8d00-5dd0-b89f-3fd770dc799c', 'BAD BUNNY', 'BAD BUNNY', 'Coctel de autor.', 'Signature cocktail.', 180, '$180', null, 62, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b6e556e5-43d9-58b4-8d60-c9efc75ec1c4', '5081569c-8d00-5dd0-b89f-3fd770dc799c', 'DONALD TRUMP', 'DONALD TRUMP', 'Coctel de autor.', 'Signature cocktail.', 180, '$180', null, 63, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2c6d5b22-fad3-5448-84d1-507fb58e3f1c', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'MOJITO', 'MOJITO', '', '', 150, '$150', null, 64, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('82a18f23-ec56-553d-990b-7c7a5b7cbf13', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'MOJITO FRUTAL', 'FRUIT MOJITO', '', '', 170, '$170', null, 65, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('e67ed6ac-d0e5-5369-9d42-fc45aba9b31f', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'APEROL SPRITZ', 'APEROL SPRITZ', '', '', 185, '$185', null, 66, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('758e94bb-bd93-5d41-953a-1c2fee6f50b0', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'CAIPIRINHA - CAIPIROSKA', 'CAIPIRINHA - CAIPIROSKA', '', '', 170, '$170', null, 67, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('d39c5b5a-7409-5c2b-abb2-e4d35762733e', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'CARAJILLO', 'CARAJILLO', '', '', 180, '$180', 'Recomendado', 68, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8e282dd3-7a6c-5aee-9d5a-3e5429f27201', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'MARTINI', 'MARTINI', '', '', 160, '$160', null, 69, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2486627f-d6f2-5010-b07e-1f4b3ac9f7c8', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'PINA COLADA', 'PINA COLADA', '', '', 150, '$150', null, 70, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('bd5f79bb-26c8-545c-bb56-c7c091729ffb', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'PINA COLADA FRUTAL', 'FRUIT PINA COLADA', '', '', 170, '$170', null, 71, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('6aa13fe8-04d5-54c8-92cc-31258cf88c02', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'DAIQUIRI', 'DAIQUIRI', '', '', 170, '$170', null, 72, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('3a28141c-5bfc-56a7-98e2-c9d14b1eec6c', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'NEGRONI', 'NEGRONI', '', '', 160, '$160', null, 73, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('9d9ceaa7-686d-5d2c-b03a-17b214e79016', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'MARGARITA', 'MARGARITA', '', '', 150, '$150', null, 74, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('73ba2f6f-1252-51bc-ba4f-f807434709ce', 'c37ef948-cfc3-5576-9927-45ec0965d89f', 'MARGARITA FRUTAL', 'FRUIT MARGARITA', '', '', 170, '$170', null, 75, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b58d1c55-338b-5b60-9436-612c1227bd68', '2d757eb9-79a3-592d-b0f1-70135022e23d', 'MOET', 'MOET', '', '', null, null, null, 76, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('4582ac7a-2d96-59a6-af5b-15bde34367de', 'b58d1c55-338b-5b60-9436-612c1227bd68', 'MOET BRUT', 'MOET BRUT', 2500, '$2500', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('48d818b4-c147-5420-a066-d243f9a18fe1', 'b58d1c55-338b-5b60-9436-612c1227bd68', 'MOET ICE', 'MOET ICE', 3200, '$3200', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5378159f-175d-56af-9b25-a1d6ade431a1', 'b58d1c55-338b-5b60-9436-612c1227bd68', 'MOET ROSE', 'MOET ROSE', 2900, '$2900', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('f6ad29d8-7e22-547e-aa3a-b2849b69842a', 'c59a9653-b364-5964-b32f-d0cd057bac45', 'BOMBAY', 'BOMBAY', '', '', null, null, null, 77, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f580f904-05e9-56fb-89c8-f17eb157c1f5', 'f6ad29d8-7e22-547e-aa3a-b2849b69842a', 'Vaso/Shot', 'Glass/Shot', 190, '$190', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('3901d4e7-ca78-5362-86e6-0eb68574fd89', 'f6ad29d8-7e22-547e-aa3a-b2849b69842a', 'Jarra', 'Pitcher', 570, '$570', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f8dc01f6-9e93-5484-8c1f-d653f4ef3205', 'f6ad29d8-7e22-547e-aa3a-b2849b69842a', 'Botella', 'Bottle', 2000, '$2000', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('4ea0b486-0ba7-515d-b2f5-ada32c647499', 'c59a9653-b364-5964-b32f-d0cd057bac45', 'HENDRICK''S', 'HENDRICK''S', '', '', null, null, null, 78, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('ca910cf7-e10e-5b5a-9060-9683ede0d33b', '4ea0b486-0ba7-515d-b2f5-ada32c647499', 'Vaso/Shot', 'Glass/Shot', 240, '$240', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f442145d-3c29-53d4-b190-af1254ac4a4a', '4ea0b486-0ba7-515d-b2f5-ada32c647499', 'Jarra', 'Pitcher', 720, '$720', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8c17de4c-0f13-5304-a9b5-653d8e34138f', '4ea0b486-0ba7-515d-b2f5-ada32c647499', 'Botella', 'Bottle', 2850, '$2850', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b4fcae37-ba4b-501e-9313-91aab0203f92', 'c59a9653-b364-5964-b32f-d0cd057bac45', 'TANQUERAY', 'TANQUERAY', '', '', null, null, null, 79, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5f6ae3cf-fdb8-5f6b-bc10-97ced4a91d05', 'b4fcae37-ba4b-501e-9313-91aab0203f92', 'Vaso/Shot', 'Glass/Shot', 180, '$180', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c9611cb1-b37e-5698-8ca8-c64980692ec4', 'b4fcae37-ba4b-501e-9313-91aab0203f92', 'Jarra', 'Pitcher', 540, '$540', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7ee71354-94d6-5eb6-ba39-250870368611', 'b4fcae37-ba4b-501e-9313-91aab0203f92', 'Botella', 'Bottle', 2000, '$2000', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ed96b9bb-7262-52fe-9334-e59fc743cc90', 'c59a9653-b364-5964-b32f-d0cd057bac45', 'BEEFEATER', 'BEEFEATER', '', '', null, null, null, 80, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('535a599c-0a28-545c-9bce-740d99c88e93', 'ed96b9bb-7262-52fe-9334-e59fc743cc90', 'Vaso/Shot', 'Glass/Shot', 160, '$160', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('a8ec380b-914b-509c-b9c8-71243a369431', 'ed96b9bb-7262-52fe-9334-e59fc743cc90', 'Jarra', 'Pitcher', 480, '$480', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('53b2b2b0-abec-52d5-bc41-bb4feafa3786', 'ed96b9bb-7262-52fe-9334-e59fc743cc90', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('38e20eca-d144-5e8a-b289-f64cdc254fa7', '878f8302-7fdb-534a-9803-11e63067c93e', '400 CONEJOS', '400 CONEJOS', '', '', null, null, null, 81, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('9dd32283-f482-5a3c-b22a-323440ef5d00', '38e20eca-d144-5e8a-b289-f64cdc254fa7', 'Vaso/Shot', 'Glass/Shot', 180, '$180', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b211d7f7-66d2-5135-abaf-16b1db033d0b', '38e20eca-d144-5e8a-b289-f64cdc254fa7', 'Botella', 'Bottle', 2200, '$2200', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('c8c1a4ea-03a0-5064-8ce4-13efa3b887b5', '878f8302-7fdb-534a-9803-11e63067c93e', 'UNION', 'UNION', '', '', null, null, null, 82, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('98399dcd-8519-5ed4-90b9-b40f69480a9d', 'c8c1a4ea-03a0-5064-8ce4-13efa3b887b5', 'Vaso/Shot', 'Glass/Shot', 190, '$190', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b913ea29-e6fc-50f3-baf5-31d4e86d83de', 'c8c1a4ea-03a0-5064-8ce4-13efa3b887b5', 'Botella', 'Bottle', 2200, '$2200', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('26dbf9ee-ee7e-59ae-86f0-f773f4560569', '878f8302-7fdb-534a-9803-11e63067c93e', 'AMARAS ESPADIN JOVEN', 'AMARAS ESPADIN JOVEN', '', '', null, null, null, 83, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('eefb3996-9af8-5f9e-9eb8-1cb9b1f68a10', '26dbf9ee-ee7e-59ae-86f0-f773f4560569', 'Vaso/Shot', 'Glass/Shot', 200, '$200', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('fbea299d-bc03-5a32-9a20-2b6c0ebde8d9', '26dbf9ee-ee7e-59ae-86f0-f773f4560569', 'Botella', 'Bottle', 2400, '$2400', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('38c9f1fb-a1da-518e-9305-13e458652b4b', 'c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', 'CAPITAN MORGAN', 'CAPTAIN MORGAN', '', '', null, null, null, 84, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('e8022257-34ad-5641-ac28-539459c04846', '38c9f1fb-a1da-518e-9305-13e458652b4b', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f104041a-ece7-5bb1-a9b1-f0e93f18a441', '38c9f1fb-a1da-518e-9305-13e458652b4b', 'Jarra', 'Pitcher', 420, '$420', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8c61d585-5149-5daf-9a7c-249a69bfd477', '38c9f1fb-a1da-518e-9305-13e458652b4b', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('7f1416f4-dd55-5f40-bf38-2673f4f4ae01', 'c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', 'BACARDI BLANCO', 'BACARDI WHITE', '', '', null, null, null, 85, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b21c9bd7-329a-5ae2-9917-130e494004fd', '7f1416f4-dd55-5f40-bf38-2673f4f4ae01', 'Vaso/Shot', 'Glass/Shot', 150, '$150', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('26e93ca0-50d3-5f34-a6a2-849e56a324ca', '7f1416f4-dd55-5f40-bf38-2673f4f4ae01', 'Jarra', 'Pitcher', 450, '$450', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('4da9c84c-3ffa-5c40-9804-1e06e4346175', '7f1416f4-dd55-5f40-bf38-2673f4f4ae01', 'Botella', 'Bottle', 1900, '$1900', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('382d20ea-4477-5939-a57d-311699d4d31d', 'c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', 'MATUSALEM', 'MATUSALEM', '', '', null, null, null, 86, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('d3a3f80f-9485-5443-97eb-637edc502a7b', '382d20ea-4477-5939-a57d-311699d4d31d', 'Vaso/Shot', 'Glass/Shot', 170, '$170', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b38b4faa-8d09-5e3a-ba3b-745ce513a7af', '382d20ea-4477-5939-a57d-311699d4d31d', 'Jarra', 'Pitcher', 510, '$510', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('28aa0edb-623c-54f2-9442-f039c080e757', '382d20ea-4477-5939-a57d-311699d4d31d', 'Botella', 'Bottle', 2300, '$2300', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('019790f4-6fa1-55e5-b85e-051858281397', 'c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', 'ZACAPA', 'ZACAPA', '', '', null, null, null, 87, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8a60dac1-255e-53f1-85d8-2b7320accabb', '019790f4-6fa1-55e5-b85e-051858281397', 'Vaso/Shot', 'Glass/Shot', 250, '$250', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('14a03d1a-9340-5144-b9e6-cbb468c29068', '019790f4-6fa1-55e5-b85e-051858281397', 'Botella', 'Bottle', 2300, '$2300', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ec1b92c1-7145-5d9f-a312-99351465ca33', 'c03aaa9a-3b44-5ba4-a0ff-8327a88acb97', 'MALIBU', 'MALIBU', '', '', null, null, null, 88, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('32f492d0-ff29-5e10-b106-5694279e0740', 'ec1b92c1-7145-5d9f-a312-99351465ca33', 'Vaso/Shot', 'Glass/Shot', 160, '$160', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('9329c6e1-c513-5477-9d22-c6433abbd10e', '3230305e-edfd-53bc-a365-0d91adf03d3d', 'SHISHA', 'SHISHA', '', '', null, null, null, 89, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('049593e1-9b21-5b85-aa16-dca5e833e866', '9329c6e1-c513-5477-9d22-c6433abbd10e', 'Simple', 'Simple', 500, '$500', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('46a9a624-a413-5818-9715-6d1cf6056aca', '3230305e-edfd-53bc-a365-0d91adf03d3d', 'CARBONES', 'COALS', '', '', 100, '$100', null, 90, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('406b55cd-822d-5be6-a33c-6f2b799abd9a', '414d7328-9655-5308-bebc-7c210b3e206c', 'REFRESCO', 'SOFT DRINK', '', '', 50, '$50', null, 91, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ca7b139d-1faa-50ac-9232-3791f19968b3', '414d7328-9655-5308-bebc-7c210b3e206c', 'LIMONADA / NARANJADA', 'LEMONADE / ORANGEADE', '', '', null, null, null, 92, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('cf39dfa3-3775-5346-99fb-a44ba4cdef59', 'ca7b139d-1faa-50ac-9232-3791f19968b3', 'Vaso', 'Glass', 50, '$50', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('43b8ee21-c92b-503c-b75e-ccadc2026a90', 'ca7b139d-1faa-50ac-9232-3791f19968b3', 'Jarra', 'Pitcher', 150, '$150', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('3feb72e4-7219-51c1-9ca8-8689d4514454', '414d7328-9655-5308-bebc-7c210b3e206c', 'MANZANITA', 'MANZANITA', '', '', 35, '$35', null, 93, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8756b775-ee61-51f4-89f4-231609932c3e', '414d7328-9655-5308-bebc-7c210b3e206c', 'JUGO', 'JUICE', '', '', null, null, null, 94, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f8ad7f8d-27ba-506e-a6b9-aa29269702c4', '8756b775-ee61-51f4-89f4-231609932c3e', 'Vaso', 'Glass', 50, '$50', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c4eef71f-505a-5b24-81d8-98f76f4f26d4', '8756b775-ee61-51f4-89f4-231609932c3e', 'Jarra', 'Pitcher', 150, '$150', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('b49a0cb0-dfb8-580c-88c2-d9f4abc07913', '414d7328-9655-5308-bebc-7c210b3e206c', 'RED BULL', 'RED BULL', '', '', 120, '$120', null, 95, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('31f78242-8244-567c-8199-03066eb30f68', '414d7328-9655-5308-bebc-7c210b3e206c', 'AGUA NATURAL', 'STILL WATER', '', '', 40, '$40', null, 96, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('e48d815d-400b-57c6-b92c-45d950e1381a', '414d7328-9655-5308-bebc-7c210b3e206c', 'AGUA MINERAL', 'SPARKLING WATER', '', '', 50, '$50', null, 97, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('da024405-0d03-5ee3-9f88-7a5f70d171ef', '9b149a6a-8999-5ab1-92db-28e429511665', 'BAILEYS', 'BAILEYS', '', '', null, null, null, 98, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('709e1312-bd27-522f-9311-b8d355c1e1d8', 'da024405-0d03-5ee3-9f88-7a5f70d171ef', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('096ace5e-e9fd-5919-be32-e38c44a18cc2', '9b149a6a-8999-5ab1-92db-28e429511665', 'FERNET BRANCA', 'FERNET BRANCA', '', '', null, null, null, 99, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('517f4a40-0056-5d23-b064-ed33f71ba20c', '096ace5e-e9fd-5919-be32-e38c44a18cc2', 'Vaso/Shot', 'Glass/Shot', 150, '$150', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b4485582-bed7-56a0-84cd-f6f1fcd92aa6', '096ace5e-e9fd-5919-be32-e38c44a18cc2', 'Jarra', 'Pitcher', 450, '$450', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0892ce27-d6fe-586e-9845-9bd349625913', '096ace5e-e9fd-5919-be32-e38c44a18cc2', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('65fe5968-e37a-58ba-98d5-246efd0e0f88', '9b149a6a-8999-5ab1-92db-28e429511665', 'JÄGERMEISTER', 'JÄGERMEISTER', '', '', null, null, null, 100, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1380227b-0678-5967-94ff-4c80b312ffe2', '65fe5968-e37a-58ba-98d5-246efd0e0f88', 'Vaso/Shot', 'Glass/Shot', 130, '$130', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2737bf8d-7a8c-552b-9e6d-9386fec6dcf2', '65fe5968-e37a-58ba-98d5-246efd0e0f88', 'Jarra', 'Pitcher', 390, '$390', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('85d6f013-77c7-5f94-bcb1-c940df36fb72', '65fe5968-e37a-58ba-98d5-246efd0e0f88', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('341345bf-0d00-577d-8a79-eaac98f50636', '9b149a6a-8999-5ab1-92db-28e429511665', 'FRANGELICO', 'FRANGELICO', '', '', null, null, null, 101, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7a154269-e442-5df6-aa57-d6eb93f42794', '341345bf-0d00-577d-8a79-eaac98f50636', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ba47422c-3e62-5b7a-a3da-60b8fa48f400', '9b149a6a-8999-5ab1-92db-28e429511665', 'HYPNOTIC', 'HYPNOTIC', '', '', null, null, null, 102, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1040c36b-770f-5a21-9c11-90d6a6f869bc', 'ba47422c-3e62-5b7a-a3da-60b8fa48f400', 'Vaso/Shot', 'Glass/Shot', 150, '$150', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('e320a783-3cda-57d2-93ea-135fbaa04904', '9b149a6a-8999-5ab1-92db-28e429511665', 'CAMPARI', 'CAMPARI', '', '', null, null, null, 103, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('abb806bf-b62b-5a43-8995-cedec355ff31', 'e320a783-3cda-57d2-93ea-135fbaa04904', 'Vaso/Shot', 'Glass/Shot', 130, '$130', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('ae2dde7b-41b3-5afd-843e-b07d44ff3c18', '387ab45c-1c5e-5a94-9a68-de002dc76a51', 'JOSE CUERVO', 'JOSE CUERVO', '', '', null, null, null, 104, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1cf4c048-202e-5c9d-b58d-15dcd5c41ac5', 'ae2dde7b-41b3-5afd-843e-b07d44ff3c18', 'Vaso/Shot', 'Glass/Shot', 130, '$130', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1704a908-96a2-5ce0-8a8f-0b2ee388f0ff', 'ae2dde7b-41b3-5afd-843e-b07d44ff3c18', 'Jarra', 'Pitcher', 390, '$390', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5c692d63-e5c8-5aed-afe8-6ea866a442ae', 'ae2dde7b-41b3-5afd-843e-b07d44ff3c18', 'Botella', 'Bottle', 1900, '$1900', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('9fd87566-5adb-57d0-9aa1-411ffaea9104', '387ab45c-1c5e-5a94-9a68-de002dc76a51', 'DON JULIO BLANCO', 'DON JULIO BLANCO', '', '', null, null, null, 105, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2dbbbe07-1232-53d9-bb31-0c292e37d056', '9fd87566-5adb-57d0-9aa1-411ffaea9104', 'Vaso/Shot', 'Glass/Shot', 200, '$200', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c6cad39a-c56a-58d7-bd2c-056d02f33774', '9fd87566-5adb-57d0-9aa1-411ffaea9104', 'Jarra', 'Pitcher', 750, '$750', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0cb38cc9-174d-5461-8d87-41c3d286f8ad', '9fd87566-5adb-57d0-9aa1-411ffaea9104', 'Botella', 'Bottle', 2900, '$2900', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('da3e0aa9-32ce-5a80-979b-a4ea7b5bc024', '387ab45c-1c5e-5a94-9a68-de002dc76a51', 'DON JULIO REPOSADO', 'DON JULIO REPOSADO', '', '', null, null, null, 106, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('b7653631-d27e-5163-b1be-223c8d15fa9a', 'da3e0aa9-32ce-5a80-979b-a4ea7b5bc024', 'Vaso/Shot', 'Glass/Shot', 250, '$250', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2abfff64-4ee7-5d01-9a33-da65fb9051da', 'da3e0aa9-32ce-5a80-979b-a4ea7b5bc024', 'Jarra', 'Pitcher', 750, '$750', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('332a673b-ee41-5567-a042-cda0e7cd7fca', 'da3e0aa9-32ce-5a80-979b-a4ea7b5bc024', 'Botella', 'Bottle', 2900, '$2900', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('33a3862c-1d76-53f7-aa03-72e00c20d17f', '387ab45c-1c5e-5a94-9a68-de002dc76a51', 'DON JULIO 70', 'DON JULIO 70', '', '', null, null, null, 107, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('defc7280-cb0b-54ac-8bc0-fd1c27d10d2e', '33a3862c-1d76-53f7-aa03-72e00c20d17f', 'Vaso/Shot', 'Glass/Shot', 270, '$270', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('67a635fb-f868-56bb-b33e-e5d86a1b9ea8', '33a3862c-1d76-53f7-aa03-72e00c20d17f', 'Botella', 'Bottle', 3600, '$3600', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('da3b5325-8e1f-5526-97ce-c4ba51017c68', '387ab45c-1c5e-5a94-9a68-de002dc76a51', 'MAESTRO DOBEL DIAMANTE', 'MAESTRO DOBEL DIAMANTE', '', '', null, null, null, 108, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c1c59224-8fb5-58c5-ab45-8aa5366e40ad', 'da3b5325-8e1f-5526-97ce-c4ba51017c68', 'Vaso/Shot', 'Glass/Shot', 220, '$220', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('e9e4b3dd-d12a-57af-b49d-d1d9955a4c81', 'da3b5325-8e1f-5526-97ce-c4ba51017c68', 'Jarra', 'Pitcher', 660, '$660', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('092a7a00-c7a4-5b58-b1cc-e1b629b5cb5b', 'da3b5325-8e1f-5526-97ce-c4ba51017c68', 'Botella', 'Bottle', 2500, '$2500', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('915874aa-d33b-5896-8f5a-3b9d1bf940db', '387ab45c-1c5e-5a94-9a68-de002dc76a51', '1800 CRISTALINO', '1800 CRISTALINO', '', '', null, null, null, 109, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('d6a526f7-6b4a-5970-9495-2c1abf68e728', '915874aa-d33b-5896-8f5a-3b9d1bf940db', 'Vaso/Shot', 'Glass/Shot', 240, '$240', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('4d96cfeb-3e1e-518f-b3ea-b3be271abfb6', '915874aa-d33b-5896-8f5a-3b9d1bf940db', 'Botella', 'Bottle', 2500, '$2500', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('46fc89e2-1c83-5575-8e5a-0b77d35a56fc', '88b9e8e0-5dfc-5c45-8469-a48b20e52f1f', 'ABSOLUT', 'ABSOLUT', '', '', null, null, null, 110, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('50dd2436-6764-5b88-9d49-cb4a27731df7', '46fc89e2-1c83-5575-8e5a-0b77d35a56fc', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('ef2c2d38-84ae-59ae-b709-e7fd49efd0a1', '46fc89e2-1c83-5575-8e5a-0b77d35a56fc', 'Jarra', 'Pitcher', 420, '$420', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('4eb619fb-0249-5c9d-a62b-dbca52556238', '46fc89e2-1c83-5575-8e5a-0b77d35a56fc', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('8f8da92a-82f7-5f0b-9d97-ec577bb9543a', '88b9e8e0-5dfc-5c45-8469-a48b20e52f1f', 'SMIRNOFF', 'SMIRNOFF', '', '', null, null, null, 111, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0fecf34b-3baf-5580-9113-13083a444310', '8f8da92a-82f7-5f0b-9d97-ec577bb9543a', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f46ffd03-5732-5edb-a8e0-4d782b0a7ac3', '8f8da92a-82f7-5f0b-9d97-ec577bb9543a', 'Jarra', 'Pitcher', 420, '$420', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('d3dd695e-70cd-5e7d-a4d6-55b400f499bc', '8f8da92a-82f7-5f0b-9d97-ec577bb9543a', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('95b49fe0-e146-5138-8888-ce8a2964ef2f', '88b9e8e0-5dfc-5c45-8469-a48b20e52f1f', 'GREY GOOSE', 'GREY GOOSE', '', '', null, null, null, 112, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('24894c26-4397-5538-a527-1f69b0398bcb', '95b49fe0-e146-5138-8888-ce8a2964ef2f', 'Vaso/Shot', 'Glass/Shot', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('09b778ec-297c-586f-93cc-f1bda219f968', '95b49fe0-e146-5138-8888-ce8a2964ef2f', 'Jarra', 'Pitcher', 690, '$690', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0ca6a39f-f267-5cc7-be7c-5c7afaecbe58', '95b49fe0-e146-5138-8888-ce8a2964ef2f', 'Botella', 'Bottle', 2500, '$2500', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('cecf71d2-5879-5059-8dcc-fcb5bceb85e9', '88b9e8e0-5dfc-5c45-8469-a48b20e52f1f', 'TITO''S', 'TITO''S', '', '', null, null, null, 113, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('39592789-201e-5122-8c28-4891b48039b0', 'cecf71d2-5879-5059-8dcc-fcb5bceb85e9', 'Vaso/Shot', 'Glass/Shot', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('006f576c-9592-55f9-83ac-50d718552ac8', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'JACK DANIELS', 'JACK DANIELS', '', '', null, null, null, 114, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5efad92a-2b3b-5278-a3be-cf469d5bf69d', '006f576c-9592-55f9-83ac-50d718552ac8', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1ed16bdf-251d-5add-a6f7-3357926b528a', '006f576c-9592-55f9-83ac-50d718552ac8', 'Jarra', 'Pitcher', 420, '$420', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('2962f5db-763f-5a0a-9a08-7df358d67310', '006f576c-9592-55f9-83ac-50d718552ac8', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('59534349-4eb1-5d78-b4a6-54d28875457e', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'JOHNNIE WALKER RED LABEL', 'JOHNNIE WALKER RED LABEL', '', '', null, null, null, 115, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('6b72d71d-de65-5618-a01b-677d4460699b', '59534349-4eb1-5d78-b4a6-54d28875457e', 'Vaso/Shot', 'Glass/Shot', 140, '$140', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('bb633fe5-ff7f-5ab7-9d73-5681048f869b', '59534349-4eb1-5d78-b4a6-54d28875457e', 'Jarra', 'Pitcher', 420, '$420', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('c648135d-f536-5392-9da8-3e439e4c751f', '59534349-4eb1-5d78-b4a6-54d28875457e', 'Botella', 'Bottle', 1800, '$1800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('1ccddf8d-1079-5e63-9f83-6e209b56f4ea', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'JOHNNIE WALKER BLACK LABEL', 'JOHNNIE WALKER BLACK LABEL', '', '', null, null, null, 116, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('1aacd3e3-f347-51c1-9812-cb50121ad0cb', '1ccddf8d-1079-5e63-9f83-6e209b56f4ea', 'Vaso/Shot', 'Glass/Shot', 230, '$230', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('8cded3fe-855f-51db-8da0-1e3cd79ab3be', '1ccddf8d-1079-5e63-9f83-6e209b56f4ea', 'Jarra', 'Pitcher', 690, '$690', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7feb7a79-a59d-589f-9c77-92cbbc2f05a8', '1ccddf8d-1079-5e63-9f83-6e209b56f4ea', 'Botella', 'Bottle', 3300, '$3300', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('29873853-4b7b-5193-81d5-4a13ed0b33a3', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'BUCHANNAN''S', 'BUCHANNAN''S', '', '', null, null, null, 117, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5946d029-4d5c-5009-a01f-18b78e8cf229', '29873853-4b7b-5193-81d5-4a13ed0b33a3', 'Vaso/Shot', 'Glass/Shot', 220, '$220', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f9fdd3bf-1375-5aa9-ae5c-cf5c95966637', '29873853-4b7b-5193-81d5-4a13ed0b33a3', 'Jarra', 'Pitcher', 660, '$660', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('f0a59581-88fe-5435-90f9-507fb1fc025a', '29873853-4b7b-5193-81d5-4a13ed0b33a3', 'Botella', 'Bottle', 2800, '$2800', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('177d9151-ed0a-5076-a882-0f2e4fea4278', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'MACALLAN', 'MACALLAN', '', '', null, null, null, 118, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('7459e205-6513-5d6d-a453-983003f42632', '177d9151-ed0a-5076-a882-0f2e4fea4278', 'Vaso/Shot', 'Glass/Shot', 250, '$250', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('0a8d430b-ea43-520c-b74a-aae4e7451f4c', '177d9151-ed0a-5076-a882-0f2e4fea4278', 'Jarra', 'Pitcher', 750, '$750', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('ad443106-9bc6-5ac2-b068-965109bf7429', '177d9151-ed0a-5076-a882-0f2e4fea4278', 'Botella', 'Bottle', 6000, '$6000', 2, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('1eb7c1c6-ac8d-58b8-bc21-0f3a8b81f42a', 'ca7d9280-e71d-5bd5-9672-2b41c2569658', 'BUCHANNAN''S 18 YEARS', 'BUCHANNAN''S 18 YEARS', '', '', null, null, null, 119, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('afd26904-5f5a-545a-b27e-40f53b493dcc', '1eb7c1c6-ac8d-58b8-bc21-0f3a8b81f42a', 'Botella', 'Bottle', 6000, '$6000', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('4fe66ab5-cf71-5cc7-9b8a-05f882a0da75', '12ff775b-16f6-5d95-a5e6-24c828c1bfde', 'UBICACION WINES', 'UBICACION WINES', '', '', null, null, null, 120, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('5c70d15c-20d1-5ee9-ba11-abcc4b4ad63d', '4fe66ab5-cf71-5cc7-9b8a-05f882a0da75', 'Copa', 'Glass', 150, '$150', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('415cdb81-e79f-5141-b9f6-c1ef18381b98', '4fe66ab5-cf71-5cc7-9b8a-05f882a0da75', 'Botella', 'Bottle', 600, '$600', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('2d8542d2-3bfa-5279-9ae9-6d0f2cb838b0', '12ff775b-16f6-5d95-a5e6-24c828c1bfde', 'FINCA LAS MORAS TINTO', 'FINCA LAS MORAS RED', '', '', null, null, null, 121, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('a14cc7eb-5cf9-5997-a7db-130c48b9ca96', '2d8542d2-3bfa-5279-9ae9-6d0f2cb838b0', 'Copa', 'Glass', 120, '$120', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('d4fa4dd0-70c1-5df6-a6dd-8d2d825cd2e5', '2d8542d2-3bfa-5279-9ae9-6d0f2cb838b0', 'Botella', 'Bottle', 450, '$450', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_products (id, category_id, name_es, name_en, description_es, description_en, price, price_label, badge, sort_order, active)
values ('6c097645-e510-56a7-84b8-1078fec6e9d6', '12ff775b-16f6-5d95-a5e6-24c828c1bfde', 'FINCA LAS MORAS BLANCO', 'FINCA LAS MORAS WHITE', '', '', null, null, null, 122, true)
on conflict (id) do update set category_id = excluded.category_id, name_es = excluded.name_es, name_en = excluded.name_en, description_es = excluded.description_es, description_en = excluded.description_en, price = excluded.price, price_label = excluded.price_label, badge = excluded.badge, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('80c90f2a-7043-5eaf-8390-ea6ae4ea7980', '6c097645-e510-56a7-84b8-1078fec6e9d6', 'Copa', 'Glass', 120, '$120', 0, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

insert into public.menu_product_variants (id, product_id, label_es, label_en, price, price_label, sort_order, active)
values ('53614c95-6a0d-5052-86c3-0017e79a8c38', '6c097645-e510-56a7-84b8-1078fec6e9d6', 'Botella', 'Bottle', 450, '$450', 1, true)
on conflict (id) do update set product_id = excluded.product_id, label_es = excluded.label_es, label_en = excluded.label_en, price = excluded.price, price_label = excluded.price_label, sort_order = excluded.sort_order, active = excluded.active;

commit;
