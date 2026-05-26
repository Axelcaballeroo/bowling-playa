"use client";

import { usePathname } from "next/navigation";

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6">
      <path d="M16.04 3C8.88 3 3.05 8.8 3.05 15.93c0 2.28.6 4.51 1.75 6.47L3 29l6.78-1.78a12.94 12.94 0 0 0 6.26 1.59c7.16 0 12.99-5.8 12.99-12.94C29.03 8.8 23.2 3 16.04 3Zm0 23.62c-1.9 0-3.76-.5-5.38-1.45l-.39-.23-4.02 1.05 1.07-3.9-.25-.4a10.7 10.7 0 0 1-1.64-5.76c0-5.92 4.86-10.74 10.82-10.74s10.82 4.82 10.82 10.74-4.85 10.69-10.82 10.69Zm5.93-8.03c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.52-.16-.74.16-.21.32-.84 1.05-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.58-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.74-1.78-1.01-2.43-.27-.64-.54-.55-.74-.56h-.64c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.09 1.31 3.3.16.21 2.27 3.46 5.5 4.85.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export default function WhatsappFloatingButton() {
  const pathname = usePathname();
  const phone = "529841234567";
  const text = encodeURIComponent(
    "Hola, quiero informacion sobre Bowling Playa."
  );

  if (pathname === "/menu") {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-[52px] w-[52px] place-items-center rounded-full border border-white/15 bg-emerald-500 text-white shadow-[0_18px_40px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-400 active:scale-95 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      aria-label="WhatsApp"
    >
      <WhatsappIcon />
    </a>
  );
}
