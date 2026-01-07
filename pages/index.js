import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  // ================= ESTADOS =================
  // Código digitado no campo de rastreio
  const [code, setCode] = useState("");

  // Controla se o menu mobile está aberto ou fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Router do Next.js para navegação entre páginas
  const router = useRouter();

  // ================= FUNÇÃO DE RASTREIO =================
  function handleSearch(e) {
    e.preventDefault();

    // Não faz nada se o campo estiver vazio
    if (!code.trim()) return;

    // Redireciona para /rastreio/CODIGO
    router.push(`/rastreio/${code.trim()}`);

    // Fecha o menu mobile (caso esteja aberto)
    setMenuOpen(false);
  }

  return (
    <div className="bg-[#0E1624] text-gray-200 font-sans min-h-screen">

      {/* ===================================================
         HEADER (CABEÇALHO)
         =================================================== */}
      <header className="relative z-40 bg-[#0E1624]/90 backdrop-blur border-b border-[#1E293B]">

        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

          {/* LOGO */}
          <Image
            src="/images/logo.png"
            alt="Brava Cargo"
            width={140}
            height={44}
            className="object-contain"
            priority
          />

          {/* BOTÃO MOBILE (☰ / ✕) */}
          {/* Só aparece no mobile */}
          <button
            className="lg:hidden text-2xl text-white"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* MENU DESKTOP */}
          {/* Só aparece no desktop */}
          <nav className="hidden lg:flex gap-10 text-sm font-semibold text-gray-300">

            <a
              href="/#rastreamento"
              className="hover:text-[#1E90FF] transition"
            >
              Rastrear
            </a>

            <a
              href="/contato"
              className="hover:text-[#1E90FF] transition"
            >
              Contato
            </a>

          </nav>
        </div>

        {/* ================= MENU MOBILE ================= */}
        {/* Aparece apenas quando menuOpen === true */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0A1220] border-b border-[#1E293B]">

            <nav className="flex flex-col px-6 py-6 gap-6 text-base font-semibold text-gray-200">

              {/* RASTREAR (SCROLL PARA O CARD) */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById("rastreamento")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-between py-3 border-b border-[#1E293B]/60 hover:text-[#1E90FF]"
              >
                Rastrear
                <span className="text-gray-500">›</span>
              </button>

              {/* CONTATO (REDIRECIONA PARA /contato) */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/contato");
                }}
                className="flex items-center justify-between py-3 hover:text-[#1E90FF]"
              >
                Contato
                <span className="text-gray-500">›</span>
              </button>

              {/* TEXTO INFORMATIVO */}
              <p className="pt-4 text-xs text-gray-500 text-center">
                Plataforma segura • Rastreamento em tempo real
              </p>

            </nav>
          </div>
        )}
      </header>

      {/* ===================================================
         HERO (TOPO DO SITE)
         =================================================== */}
      <section className="relative overflow-hidden border-b border-[#1E293B] pt-28 sm:pt-32">

        {/* FUNDO DECORATIVO */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1220] via-[#0E1624] to-[#020617]" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#1E90FF]/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[400px] h-[400px] bg-[#0A66C2]/20 rounded-full blur-3xl" />

        {/* CONTEÚDO PRINCIPAL */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* TEXTO */}
          <div>
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#1E90FF]/10 text-[#1E90FF] text-xs font-bold tracking-widest uppercase">
              Logística Nacional
            </span>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Controle total da sua entrega
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
              Transporte rodoviário nacional com rastreamento em tempo real,
              controle de ocorrências e histórico completo de movimentações.
            </p>

            <ul className="mt-8 space-y-3 text-sm sm:text-base text-gray-300">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#1E90FF] rounded-full" />
                Frota monitorada 24h
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#1E90FF] rounded-full" />
                Centros logísticos estratégicos
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#1E90FF] rounded-full" />
                Controle de tentativas e ocorrências
              </li>
            </ul>
          </div>

          {/* CARD DE RASTREAMENTO */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#1E90FF] to-[#0A66C2] rounded-2xl blur opacity-30" />

            <div
              id="rastreamento"
              className="relative scroll-mt-32 bg-[#0A1220] border border-[#1E293B] rounded-2xl p-6 sm:p-8 shadow-2xl"
            >
              <span className="inline-block mb-3 text-xs font-bold tracking-widest text-[#1E90FF] uppercase">
                Rastreamento
              </span>

              <h2 className="text-xl font-extrabold text-white">
                Acompanhe sua encomenda
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Informe o código de rastreio para consultar o status atualizado.
              </p>

              <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-4">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Digite o código de rastreamento"
                  className="bg-[#020617] border border-[#1E293B] px-4 py-4 rounded-lg text-base text-white focus:ring-2 focus:ring-[#1E90FF]"
                />

                <button className="bg-gradient-to-r from-[#1E90FF] to-[#0A66C2] text-white py-4 rounded-lg font-extrabold tracking-wide text-base hover:opacity-90 transition">
                  CONSULTAR RASTREIO
                </button>
              </form>

              <div className="mt-5 text-xs text-gray-500">
                Plataforma segura • Atualizações automáticas • Histórico completo
              </div>
            </div>
          </div>

        </div>
      </section>

{/* ================= MÉTRICAS ================= */}
<section className="py-14 bg-gradient-to-b from-[#0A1220] to-[#0E1624] border-b border-[#1E293B]">
  <div className="max-w-7xl mx-auto px-4">

    <div className="text-center mb-10">
      <h3 className="text-lg sm:text-2xl font-extrabold text-white">
        Números que comprovam nossa operação
      </h3>
      <p className="text-sm text-gray-400 mt-2">
        Indicadores reais de performance logística nacional
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* CARD */}
      <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 text-center shadow-lg">
        <div className="text-[#1E90FF] text-4xl font-extrabold">+18</div>
        <p className="mt-2 text-sm font-semibold text-white">
          Anos de Atuação
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Experiência sólida no mercado logístico
        </p>
      </div>

      {/* CARD */}
      <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 text-center shadow-lg">
        <div className="text-[#1E90FF] text-4xl font-extrabold">27</div>
        <p className="mt-2 text-sm font-semibold text-white">
          Estados Atendidos
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Cobertura nacional completa
        </p>
      </div>

      {/* CARD */}
      <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 text-center shadow-lg">
        <div className="text-[#1E90FF] text-4xl font-extrabold">1.5M+</div>
        <p className="mt-2 text-sm font-semibold text-white">
          Entregas por Ano
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Operação em larga escala
        </p>
      </div>

      {/* CARD */}
      <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 text-center shadow-lg">
        <div className="text-[#1E90FF] text-4xl font-extrabold">99.8%</div>
        <p className="mt-2 text-sm font-semibold text-white">
          SLA Cumprido
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Alto índice de pontualidade
        </p>
      </div>

    </div>
  </div>
</section>

{/* ================= FOOTER ================= */}
<footer className="bg-[#020617]">

  {/* CONTEÚDO PRINCIPAL DO FOOTER */}
  <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

    {/* LOGO + DESCRIÇÃO */}
    <div>
      <Image
        src="/images/logo.png"
        alt="Brava Cargo"
        width={120}
        height={40}
        className="object-contain"
      />
      <p className="mt-3 text-gray-400 text-sm">
        Logística rodoviária nacional com rastreamento e controle operacional.
      </p>
    </div>

    {/* INSTITUCIONAL */}
    <div>
      <h4 className="text-white font-bold">Institucional</h4>
      <ul className="mt-3 space-y-2 text-gray-400 text-sm">

        <li>
          <a
            href="/institucional/sobre"
            className="hover:text-[#1E90FF] transition"
          >
            Sobre a Empresa
          </a>
        </li>

        <li>
          <a
            href="/institucional/governanca"
            className="hover:text-[#1E90FF] transition"
          >
            Governança
          </a>
        </li>

      </ul>
    </div>

    {/* SERVIÇOS */}
    <div>
      <h4 className="text-white font-bold">Serviços</h4>
      <ul className="mt-3 space-y-2 text-gray-400 text-sm">

        <li>
          <a
            href="/servicos/rastreamento"
            className="hover:text-[#1E90FF] transition"
          >
            Rastreamento
          </a>
        </li>

        <li>
          <a
            href="/servicos/distribuicao"
            className="hover:text-[#1E90FF] transition"
          >
            Distribuição
          </a>
        </li>

      </ul>
    </div>

    {/* CONTATO */}
    <div>
      <h4 className="text-white font-bold">Contato</h4>
      <p className="mt-3 text-gray-400 text-sm">
        (11) 3090-5544<br />
        atendimento@bravacargo.com<br />
        São Paulo – SP
      </p>
    </div>

  </div>

  {/* BARRA INFERIOR */}
  <div className="border-t border-[#1E293B] py-3 text-center text-xs text-gray-500">
    © 2008 Brava Cargo • Todos os direitos reservados
  </div>

      </footer>

    </div>
  );
}