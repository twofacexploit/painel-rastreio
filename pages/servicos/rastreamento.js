import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RastreamentoServico() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E1624] text-gray-200">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-4xl font-extrabold text-white mb-6">
            Rastreamento de Encomendas
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Nosso sistema de rastreamento permite acompanhamento completo das
            encomendas em tempo real, desde a coleta até a entrega final.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            O histórico detalhado de eventos garante transparência total para
            clientes e gestores logísticos.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Informações disponíveis
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Status atualizado da entrega</li>
            <li>✔ Localização da encomenda</li>
            <li>✔ Registro de tentativas</li>
            <li>✔ Ocorrências operacionais</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Benefícios
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Redução de chamados, aumento da previsibilidade e maior controle
            operacional.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
