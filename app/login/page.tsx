"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../src/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("admin@bowlingplaya.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Email o contraseña incorrectos.");
        return;
      }

      router.push("/admin");
router.refresh();

      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030b18] px-6 py-20 text-white">
      <section className="mx-auto max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-2xl">
        <span className="rounded-full bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
          Acceso interno
        </span>

        <h1 className="mt-6 text-4xl font-black">Panel de reservas</h1>

        <p className="mt-3 text-slate-400">
          Ingresá con tu usuario autorizado para acceder al panel privado.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-300">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-bold text-red-200">
              {error}
            </div>
          )}

          <button
            disabled={isLoading}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {isLoading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
}