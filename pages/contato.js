import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contato() {
  return (
    <>
      <Header />

      {/* MAIN CORRIGIDO */}
      <main className="px-6 py-20 bg-[#F4F6F9] font-inter max-w-6xl mx-auto min-h-screen flex flex-col justify-center">

        <h1 className="text-4xl font-poppins font-bold text-[#0A3D62] mb-8">
          Fale Conosco
        </h1>

        <p className="text-gray-700 text-lg mb-10">
          Entre em contato para suporte, parcerias e informações corporativas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-poppins font-semibold text-[#0A3D62]">
              Central de Atendimento
            </h2>

            <p className="mt-4 text-gray-700">
              📞 (11) 3090-5544
            </p>
            <p className="mt-2 text-gray-700">
              📧 atendimento@bravacargo.com
            </p>
            <p className="mt-2 text-gray-700">
              📍 São Paulo/SP
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-poppins font-semibold text-[#0A3D62]">
              Comercial
            </h2>

            <p className="mt-4 text-gray-700">
              📞 (11) 3000-5522
            </p>
            <p className="mt-2 text-gray-700">
              📧 comercial@bravacargo.com
            </p>
          </div>

        </div>

      </main>

      {/* FOOTER SEM MARGEM */}
      <Footer />
    </>
  );
}
