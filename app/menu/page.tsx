import MenuClient from "./MenuClient";
import { getPublicMenuData } from "../../src/lib/menu";
import { connection } from "next/server";

export default async function MenuPage() {
  await connection();

  const menuData = await getPublicMenuData();

  return (
    <MenuClient
      menuProducts={menuData.products}
      menuSections={menuData.sections}
      menuSubcategories={menuData.subcategories}
      showUnavailableNotice={menuData.source === "fallback"}
    />
  );
}
