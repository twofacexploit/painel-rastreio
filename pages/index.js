import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [code, setCode] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/rastreio/${code.trim()}`);
  }

  return (
    <div className="bg-[#0E1624] text-gray-200 font-sans">

      {/* ================= TOP BAR ================= */}
      <div className="bg-[#0A1220] border-b border-[#1E293B] text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row justify-between gap-2">
        </div>
      </div>

      {/* ================= HEADER ================= */}
      <header className="bg-[#0E1624] border-b border-[#1E293B] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

          {/* LOGO (ÚNICA ALTERAÇÃO REAL) */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Brava Cargo"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </div>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex gap-10 text-sm font-semibold text-gray-300">
            <a className="hover:text-[#1E90FF] transition">Institucional</a>
            <a className="hover:text-[#1E90FF] transition">Serviços</a>
            <a className="hover:text-[#1E90FF] transition">Rastreamento</a>
            <a className="hover:text-[#1E90FF] transition">Contato</a>
          </nav>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-3xl text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menu Mobile */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0A1220] border-t border-[#1E293B]">
            <nav className="flex flex-col px-4 sm:px-6 py-4 space-y-4 text-sm font-semibold">
              <a>Institucional</a>
              <a>Serviços</a>
              <a>Rastreamento</a>
              <a>Contato</a>
            </nav>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <section className="py-20 sm:py-24 md:py-32 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Logística Nacional com<br />
              Controle, Segurança e Escala
            </h2>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
              A Brava Cargo é uma transportadora especializada em operações
              rodoviárias nacionais, oferecendo soluções completas de transporte,
              distribuição e rastreamento de encomendas com alto padrão
              operacional, tecnologia aplicada e controle de SLA.
            </p>

            <ul className="mt-6 sm:mt-8 space-y-3 text-gray-300 font-medium text-sm sm:text-base">
              <li>✔ Frota própria e agregada monitorada 24h</li>
              <li>✔ Centros logísticos estratégicos</li>
              <li>✔ Controle de tentativas e ocorrências</li>
              <li>✔ Rastreamento com histórico completo</li>
            </ul>
          </div>

          {/* ================= RASTREAMENTO ================= */}
          <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 sm:p-8 md:p-10 shadow-xl">
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Rastreamento de Encomendas
            </h3>

            <p className="text-sm text-gray-400 mt-3">
              Consulte o status da sua remessa em tempo real, com eventos,
              localizações e tentativas registradas.
            </p>

            <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-4">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Informe o código de rastreamento"
                className="bg-[#020617] border border-[#1E293B] px-4 py-3 rounded-md text-sm text-white focus:ring-2 focus:ring-[#1E90FF]"
              />
              <button className="bg-[#1E90FF] hover:bg-[#0A66C2] text-white py-3 rounded-md font-extrabold tracking-wide">
                CONSULTAR
              </button>
            </form>

            <div className="mt-5 text-xs text-gray-500 space-y-1">
              <p>Plataforma segura • Dados criptografados</p>
              <p>Atualizações automáticas por centro logístico</p>
              <p>Histórico completo de movimentações</p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MÉTRICAS ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#0A1220] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-14 text-center">

          {[
            ["+18", "Anos de Atuação"],
            ["27", "Estados Atendidos"],
            ["1.5M+", "Entregas/Ano"],
            ["99.8%", "SLA Cumprido"],
          ].map(([num, label], i) => (
            <div key={i}>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-[#1E90FF]">
                {num}
              </h4>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                {label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12">

          <div>
            <Image
              src="/images/logo.png"
              alt="Brava Cargo"
              width={160}
              height={50}
              className="object-contain"
            />
            <p className="text-sm mt-4 text-gray-400">
              Transportadora nacional especializada em logística rodoviária,
              com foco em confiabilidade, rastreabilidade e excelência
              operacional.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold">Institucional</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Sobre a Empresa</li>
              <li>Missão e Valores</li>
              <li>Governança</li>
              <li>Política de Privacidade</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold">Serviços</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Rastreamento</li>
              <li>Transporte Rodoviário</li>
              <li>Distribuição</li>
              <li>Logística Integrada</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold">Contato</h4>
            <p className="text-sm mt-4 text-gray-400">
              (11) 3090-5544<br />
              atendimento@bravacargo.com<br />
              São Paulo – SP
            </p>
          </div>

        </div>

        <div className="border-t border-[#1E293B] py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Brava Cargo • Todos os direitos reservados
        </div>
      </footer>

    </div>
  );
}
