import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/* ================= FORMAT DATE ================= */
function formatDateBR(date) {
  return new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ================= STATE MAP ================= */
const stateMap = {
  Acre: "AC",
  Alagoas: "AL",
  Amapá: "AP",
  Amazonas: "AM",
  Bahia: "BA",
  Ceará: "CE",
  "Distrito Federal": "DF",
  "Espírito Santo": "ES",
  Goiás: "GO",
  Maranhão: "MA",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
  "Minas Gerais": "MG",
  Pará: "PA",
  Paraíba: "PB",
  Paraná: "PR",
  Pernambuco: "PE",
  Piauí: "PI",
  "Rio de Janeiro": "RJ",
  "Rio Grande do Norte": "RN",
  "Rio Grande do Sul": "RS",
  Rondônia: "RO",
  Roraima: "RR",
  "Santa Catarina": "SC",
  "São Paulo": "SP",
  Sergipe: "SE",
  Tocantins: "TO",
};

/* ================= ICONS ================= */
const Icons = {
  postado: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7" />
    </svg>
  ),
  transito: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 13V6h11v7H3Z" />
      <path d="M14 8h5l2 3v5h-7V8Z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  entrega: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 9v4" />
      <circle cx="12" cy="17" r="1" />
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
    </svg>
  ),
  entregue: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 13l4 4L19 7" />
    </svg>
  ),
};

/* ================= STEPS ================= */
const steps = [
  { label: "Postado", icon: Icons.postado },
  { label: "Em Trânsito", icon: Icons.transito },
  { label: "Saiu para Entrega", icon: Icons.entrega },
  { label: "Entregue", icon: Icons.entregue },
];

export default function Rastreio() {
  const router = useRouter();
  const { codigo } = router.query;

  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    if (!codigo) return;
    async function load() {
      const res = await fetch(`/api/rastreio/${codigo}`);
      const data = await res.json();
      setTracking(data);
      setLoading(false);
    }
    load();
  }, [codigo]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E1624] text-gray-400">
        Carregando rastreamento...
      </div>
    );
  }

  if (!tracking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0E1624] text-red-500">
        Código não encontrado.
      </div>
    );
  }

  /* ================= EVENTOS (LÓGICA CORRIGIDA) ================= */

  // 🔒 BASE IMUTÁVEL: SEMPRE O POSTADO
  const postadoDate = new Date(tracking.events?.[0]?.date || "2026-01-04T01:01:00");

  function addDaysWithHour(days, hour) {
    const d = new Date(postadoDate);
    d.setDate(d.getDate() + days);
    d.setHours(hour, 0, 0, 0);
    return d;
  }

 const events = [
  {
    title: "Objeto coletado",
    description: "",
    location: "Unidade Operacional – São Paulo/SP",
    date: new Date(postadoDate),
  },

  {
    title: "Objeto postado",
    description: "Seu pedido foi postado e está em processamento.",
    location: "Agência de Postagem – São Paulo/SP",
    date: new Date(postadoDate.getTime() + 30 * 60 * 1000), // +30 min
  },

  {
    title: "Objeto em processo de triagem",
    description: "",
    location: "Unidade de Tratamento – São Paulo/SP",
    date: addDaysWithHour(1, 9),
  },

  {
    title: "Objeto encaminhado",
    description: "",
    location: "Unidade de Tratamento – São Paulo/SP",
    date: addDaysWithHour(2, 11),
  },

  {
    title: "Objeto recebido na unidade de transbordo",
    description: "",
    location: "Unidade de Transbordo – São Paulo/SP",
    date: addDaysWithHour(3, 17),
  },

  {
    title: "Objeto em trânsito para Cidade Destino",
    description: "",
    location: "Unidade de Transbordo – São José dos Campos/SP",
    date: addDaysWithHour(4, 10),
  },

  {
    title: "Objeto chegou à unidade de destino",
    description: "",
    location: `Unidade de Distribuição – ${tracking.destinationCity}/${stateMap[tracking.destinationState]}`,
    date: addDaysWithHour(5, 15),
  },

  {
    title: "Objeto conferido e separado para entrega",
    description: "",
    location: `Centro de Distribuição – ${tracking.destinationCity}/${stateMap[tracking.destinationState]}`,
    date: addDaysWithHour(6, 18),
  },

  {
    title: "Saiu para entrega",
    description: "",
    location: `Centro de Distribuição – ${tracking.destinationCity}/${stateMap[tracking.destinationState]}`,
    date: addDaysWithHour(7, 8),
  },

  {
    title: "Destinatário Ausente",
    description: "Aguarde uma nova tentativa de entrega.",
    location: `Centro de Distribuição – ${tracking.destinationCity}/${stateMap[tracking.destinationState]}`,
    date: addDaysWithHour(8, 14),
  },

  {
    title: "Tentativa de Entrega Adiada",
    description: "Previsto para próxima semana útil.",
    location: `Centro de Distribuição – ${tracking.destinationCity}/${stateMap[tracking.destinationState]}`,
    date: addDaysWithHour(9, 16),
  },
];

  const now = new Date();
  const visibleEvents = events.filter(e => e.date <= now).sort((a, b) => b.date - a.date);
  const lastEvent = visibleEvents[0];

  function progressIndex(title = "") {
    const t = title.toLowerCase();
    if (t.includes("postado")) return 0;
    if (t.includes("triagem") || t.includes("encaminhado") || t.includes("transbordo") || t.includes("trânsito")) return 1;
    if (t.includes("saiu") || t.includes("destinatário") || t.includes("tentativa")) return 2;
    if (t.includes("entregue")) return 3;
    return 0;
  }

  const currentStep = progressIndex(lastEvent.title)

  /* ================= RENDER ================= */
  return (
    <div className="bg-[#0E1624] text-gray-200 min-h-screen">

      {/* HEADER */}
      <header className="bg-[#0E1624] border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Image src="/images/logo.png" alt="Brava Cargo" width={180} height={60} />
          <button onClick={() => router.push("/")} className="text-sm text-gray-400 hover:text-[#1E90FF]">
            ← Voltar
          </button>
        </div>
      </header>
      {/* ================= PROGRESSO ================= */}
      <section className="max-w-5xl mx-auto px-6 mt-10">
        <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6 md:p-8 overflow-x-auto">
          <div className="min-w-[520px] grid grid-cols-4 items-center relative">

            <div className="absolute left-0 right-0 top-7 h-[2px] bg-[#1E293B]" />

            <div
              className="absolute left-0 top-7 h-[2px] bg-[#1E90FF] transition-all duration-500"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />

            {steps.map((s, i) => {
              const active = currentStep >= i;
              return (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                    ${active ? "bg-[#1E90FF] text-white" : "bg-[#020617] text-gray-500"}`}
                  >
                    {s.icon}
                  </div>
                  <p
                    className={`mt-2 text-xs md:text-sm font-semibold text-center
                    ${active ? "text-white" : "text-gray-500"}`}
                  >
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= ORIGEM / DESTINO ================= */}
      <section className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
        <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6">
          <p className="text-xs uppercase tracking-widest text-gray-400">Origem</p>
          <p className="font-bold text-white mt-2">Brava Cargo</p>
          <p className="text-sm text-gray-400">São Paulo - SP</p>
        </div>

        <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-6">
          <p className="text-xs uppercase tracking-widest text-gray-400">Destino</p>
          <p className="font-bold text-white mt-2">
            {tracking.destinationFull?.first_name}{" "}
            {tracking.destinationFull?.last_name}
          </p>
          <p className="text-sm text-gray-400">
            {tracking.destinationCity} -{" "}
            {stateMap[tracking.destinationState] ||
              tracking.destinationState}
          </p>
        </div>
      </section>

      {/* ================= HISTÓRICO ================= */}
      <section className="max-w-5xl mx-auto px-6 mt-14 mb-20">
        <div className="bg-[#0A1220] border border-[#1E293B] rounded-xl p-8">
          <h3 className="font-extrabold text-lg mb-10">
            Histórico de Movimentações
          </h3>

          <div className="relative border-l border-[#1E90FF]/40 pl-8 space-y-10">
            {visibleEvents.map((e, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#1E90FF]" />

                <div className="bg-[#020617] border border-[#1E293B] rounded-lg p-5">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                    <p className="font-semibold text-white">{e.title}</p>
                    <span className="text-xs text-gray-400">
                      {formatDateBR(e.date)}
                    </span>
                  </div>

                  {e.description && (
                    <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                      {e.description}
                    </p>
                  )}

                  <p className="text-xs text-[#1E90FF] mt-3 font-medium">
                    {e.location}
                  </p>
                </div>
              </div>
            ))}
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