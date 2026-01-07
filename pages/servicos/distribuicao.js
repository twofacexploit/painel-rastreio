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
            Atuamos com distribuição rodoviária nacional para operações B2B e
            B2C, garantindo eficiência, segurança e cumprimento de prazos.
          </p>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Nossa malha logística atende os 27 estados brasileiros com gestão
            operacional centralizada.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Modalidades
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>✔ Distribuição urbana</li>
            <li>✔ Distribuição regional</li>
            <li>✔ Cargas fracionadas</li>
            <li>✔ Operações dedicadas</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">
            Diferenciais
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Controle total de rotas, indicadores de performance e integração com
            sistemas de rastreamento.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  );
}
