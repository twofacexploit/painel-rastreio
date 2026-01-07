import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Distribuicao() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E1624] text-gray-200">

      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-4xl font-extrabold text-white mb-6">
            Distribuição Nacional
          </h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A Brava Cargo opera serviços de distribuição rodoviária nacional
            voltados para operações B2B e B2C, atendendo desde pequenos volumes
            até grandes contratos logísticos.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Nossa estrutura permite controle completo de rotas, prazos,
            tentativas de entrega e gestão de ocorrências, garantindo
            previsibilidade e transparência.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Tipos de operação
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Distribuição urbana e regional</li>
            <li>✔ Entregas dedicadas e fracionadas</li>
            <li>✔ Operações com SLA contratado</li>
            <li>✔ Gestão de tentativas e retornos</li>
            <li>✔ Relatórios operacionais</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Diferenciais operacionais
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Toda a operação é integrada a sistemas de rastreamento e controle,
            permitindo acompanhamento em tempo real por clientes e gestores.
          </p>

        </div>
      </main>

      <Footer />

    </div>
  );
}
