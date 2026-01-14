import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Contato() {
  const router = useRouter();

  // Estado fake (não envia nada)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    setForm({ nome: "", email: "", assunto: "", mensagem: "" });
  }

  return (
    <div className="bg-[#0E1624] text-gray-200 min-h-screen font-sans">

      {/* ================= HEADER SIMPLES ================= */}
      <header className="border-b border-[#1E293B] bg-[#0E1624]/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Image
            src="/images/logo.png"
            alt="Brava Cargo"
            width={140}
            height={44}
            className="object-contain"
          />

          <button
            onClick={() => router.push("/")}
            className="text-sm text-gray-300 hover:text-[#1E90FF]"
          >
            ← Voltar
          </button>
        </div>
      </header>

      {/* ================= HERO CONTATO ================= */}
      <section className="border-b border-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#1E90FF]/10 text-[#1E90FF] text-xs font-bold tracking-widest uppercase">
            Contato
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Fale com a Brava Cargo
          </h1>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            Utilize o formulário abaixo para entrar em contato com nossa equipe.
          </p>
        </div>
      </section>

      {/* ================= FORMULÁRIO ================= */}
      <section className="py-16">
        <div className="max-w-xl mx-auto px-4">

          <div className="bg-[#0A1220] border border-[#1E293B] rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NOME */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Nome completo
                </label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome"
                  className="w-full bg-[#020617] border border-[#1E293B] px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  E-mail
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full bg-[#020617] border border-[#1E293B] px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>

              {/* ASSUNTO */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Assunto
                </label>
                <input
                  name="assunto"
                  value={form.assunto}
                  onChange={handleChange}
                  placeholder="Ex: Informações sobre entrega"
                  className="w-full bg-[#020617] border border-[#1E293B] px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>

              {/* MENSAGEM */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Mensagem
                </label>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Digite sua mensagem"
                  className="w-full bg-[#020617] border border-[#1E293B] px-4 py-3 rounded-lg text-white focus:ring-2 focus:ring-[#1E90FF]"
                />
              </div>

              {/* BOTÃO */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E90FF] to-[#0A66C2] text-white font-extrabold tracking-wide hover:opacity-90 transition"
              >
                ENVIAR MENSAGEM
              </button>

            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#1E293B] bg-[#020617] py-6 text-center text-xs text-gray-500">
        © 2008 Brava Cargo • Todos os direitos reservados
      </footer>

    </div>
  );
}
