import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Institucional() {
  return (
    <>
      <Header />

      <main className="px-6 py-20 bg-[#F4F6F9] text-gray-800 font-inter max-w-6xl mx-auto">

        <h1 className="text-4xl font-poppins font-bold text-[#0A3D62] mb-8">
          Sobre a Brava Cargo
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          A Brava Cargo é referência nacional em soluções logísticas, oferecendo transporte de cargas,
          rastreamento inteligente e gestão integrada para empresas de todos os portes.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          Nossa cultura prioriza inovação, eficiência operacional e compromisso com prazos,
          garantindo qualidade em cada etapa da cadeia logística.
        </p>

        <h2 className="text-3xl font-poppins font-bold text-[#0A3D62] mt-12">
          Missão, Visão e Valores
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins text-[#0A3D62] font-semibold">Missão</h3>
            <p className="text-gray-700 mt-3">
              Entregar soluções logísticas eficientes que conectem empresas e clientes com agilidade e segurança.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins text-[#0A3D62] font-semibold">Visão</h3>
            <p className="text-gray-700 mt-3">
              Ser referência nacional em logística integrada, com foco em tecnologia e alta performance operacional.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins text-[#0A3D62] font-semibold">Valores</h3>
            <ul className="mt-3 text-gray-700 space-y-2">
              <li>✔ Integridade e Transparência</li>
              <li>✔ Excelência Operacional</li>
              <li>✔ Inovação Constante</li>
              <li>✔ Respeito ao Cliente</li>
            </ul>
          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}
