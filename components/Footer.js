import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-[#1E293B] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        <div>
          <Image src="/images/logo.png" alt="Brava Cargo" width={120} height={40} />
          <p className="mt-3 text-gray-400">
            Operador logístico rodoviário nacional com foco em rastreabilidade,
            controle operacional e excelência em entrega.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold">Institucional</h4>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="/institucional/sobre">Sobre a Empresa</a></li>
            <li><a href="/institucional/governanca">Governança</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold">Serviços</h4>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="/servicos/rastreamento">Rastreamento</a></li>
            <li><a href="/servicos/distribuicao">Distribuição</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold">Contato</h4>
          <p className="mt-3 text-gray-400">
            atendimento@bravacargo.com<br />
            São Paulo – SP
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-[#1E293B]">
        © 2008 Brava Cargo • Todos os direitos reservados
      </div>
    </footer>
  );
}
