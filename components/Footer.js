export default function Footer() {
  return (
    <footer className="bg-[#0A3D62] text-white font-inter mt-20 w-full">

      {/* Fundo azul em 100% */}
      <div className="w-full">

        {/* Conteúdo central */}
        <div className="max-w-7xl mx-auto px-6 py-14">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

            {/* SOBRE */}
            <div>
              <h3 className="text-xl font-poppins font-bold mb-3">Brava Cargo</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Soluções logísticas completas, rastreamento inteligente e atendimento corporativo
                especializado para empresas de todos os portes.
              </p>
            </div>

            {/* NAVEGAÇÃO */}
            <div>
              <h4 className="font-poppins font-semibold mb-3 text-lg">Navegação</h4>
              <ul className="space-y-2 text-gray-200 text-sm">
                <li><a href="/institucional" className="hover:text-white">Institucional</a></li>
                <li><a href="/servicos" className="hover:text-white">Serviços</a></li>
                <li><a href="/rastreamento" className="hover:text-white">Rastreamento</a></li>
                <li><a href="/contato" className="hover:text-white">Contato</a></li>
              </ul>
            </div>

            {/* CONTATO */}
            <div>
              <h4 className="font-poppins font-semibold mb-3 text-lg">Contato</h4>
              <p className="text-gray-200 text-sm leading-relaxed">
                📞 (11) 3090-5544 <br />
                📧 atendimento@bravacargo.com <br />
                📍 São Paulo/SP
              </p>
            </div>

          </div>

          {/* Linha e texto final */}
          <div className="border-t border-[#144a71] mt-10 pt-4 text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Brava Cargo — Todos os direitos reservados.
          </div>

        </div>

      </div>

    </footer>
  );
}
