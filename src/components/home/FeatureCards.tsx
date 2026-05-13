export default function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6 py-12">
      {[
        "Reservas rápidas",
        "Horarios flexibles",
        "Experiencia premium",
      ].map((item) => (
        <div
          key={item}
          className="bg-[#111827] p-6 rounded-2xl border border-white/10"
        >
          <h3 className="text-lg font-semibold mb-2">{item}</h3>
          <p className="text-gray-400 text-sm">
            Sistema moderno para reservar sin complicaciones.
          </p>
        </div>
      ))}
    </section>
  );
}