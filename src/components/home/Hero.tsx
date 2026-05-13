export default function Hero() {
  return (
    <section className="text-center py-24 px-6">
      <h2 className="text-5xl font-bold mb-6">
        Viví la experiencia <span className="text-blue-500">Bowling Playa</span>
      </h2>

      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        Reservá tu pista en segundos y disfrutá con amigos, familia o eventos especiales.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="/reservas"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Reservar ahora
        </a>

        <a
          href="#"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Promociones
        </a>
      </div>
    </section>
  );
}