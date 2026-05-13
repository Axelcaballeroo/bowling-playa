export default function WhatsappFloatingButton() {
  const phone = "529841234567";
  const text = encodeURIComponent(
    "Hola, quiero información sobre Bowling Playa."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-xl font-black text-white shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-400"
      aria-label="WhatsApp"
    >
      W
    </a>
  );
}