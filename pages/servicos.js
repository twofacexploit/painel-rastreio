import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Servicos() {
  return (
    <>
      <Header />

      <main className="bg-[#F4F6F9] px-6 py-20 font-inter max-w-7xl mx-auto">

        <h1 className="text-4xl font-poppins font-bold text-[#0A3D62] mb-12">
          Nossos Serviços
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins font-semibold text-[#0A3D62]">
              Entrega Expressa
            </h3>
            <p className="mt-3 text-gray-600">
              Priorização total do transporte, ideal para cargas urgentes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins font-semibold text-[#0A3D62]">
              Logística Integrada
            </h3>
            <p className="mt-3 text-gray-600">
              Soluções completas, com visibilidade total da cadeia logística.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-poppins font-semibold text-[#0A3D62]">
              Transporte Rodoviário
            </h3>
            <p className="mt-3 text-gray-600">
              Frota monitorada nacionalmente, com segurança e eficiência.
            </p>
          </div>

        </div>

        <section className="mt-20">
          <h2 className="text-3xl font-poppins font-bold text-[#0A3D62] mb-6">
            Por que escolher a Brava Cargo?
          </h2>

          <ul className="space-y-3 text-gray-700 text-lg">
            <li>✔ Tecnologia própria de rastreamento</li>
            <li>✔ Frota moderna e rastreada</li>
            <li>✔ 99% de entregas dentro do prazo</li>
            <li>✔ Suporte corporativo 24h</li>
          </ul>
        </section>

      </main>

      <Footer />
    </>
  );
}
