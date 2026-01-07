import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Governanca() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E1624] text-gray-200">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-4xl font-extrabold text-white mb-6">
            Governança Corporativa
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A Brava Cargo adota práticas de governança corporativa baseadas em
            ética, transparência e responsabilidade operacional.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Todas as decisões estratégicas são orientadas por políticas internas
            claras, visando a sustentabilidade do negócio e a segurança das
            operações.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Princípios
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Ética e conformidade</li>
            <li>✔ Transparência nos processos</li>
            <li>✔ Gestão de riscos operacionais</li>
            <li>✔ Responsabilidade com clientes e parceiros</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Controles internos
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Nossos controles internos asseguram o cumprimento de contratos,
            monitoramento de SLA e integridade das informações operacionais.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
