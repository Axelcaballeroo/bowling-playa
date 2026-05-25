import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bowling Playa Menu | Food & Drinks",
  description:
    "Digital menu for Bowling Playa. Food, drinks, cocktails, beers and more in Playa del Carmen.",
  alternates: {
    canonical: "https://bowlingplaya.com/menu",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
