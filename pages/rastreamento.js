import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Rastreamento() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/rastreio/${code}`);
  };

  return (
    <>
      <Header />

      {/* MAIN CORRIGIDO */}
      <main className="bg-[#F4F6F9] min-h-screen flex flex-col justify-center items-center px-6 py-20 font-inter">

        <div className="bg-white p-10 rounded-xl shadow max-w-md w-full">
          <h1 className="text-3xl font-poppins font-bold text-[#0A3D62] text-center mb-6">
            Consulte seu Rastreamento
          </h1>

          <p className="text-gray-600 text-center mb-6">
            Acompanhe sua entrega em tempo real. Digite o código abaixo:
          </p>

          <form onSubmit={submit} className="flex flex-col gap-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: BRV123456"
              className="border px-4 py-3 rounded-lg"
            />

            <button className="bg-[#1E90FF] text-white py-3 rounded-lg font-semibold hover:bg-[#0A66C2]">
              Consultar
            </button>
          </form>

          <p className="text-xs mt-6 text-gray-500 text-center">
            🔒 Seus dados são protegidos por criptografia SSL.
          </p>
        </div>

      </main>

      {/* FOOTER SEM MARGEM */}
      <Footer />
    </>
  );
}
