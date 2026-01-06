import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50 font-inter">

      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* LOGO NOVO */}
        <Link href="/" className="flex items-center gap-3 group">

          {/* ÍCONE moderno */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#1E90FF] to-[#0A66C2] rounded-xl 
                          flex items-center justify-center text-white font-extrabold text-xl shadow-md
                          group-hover:scale-105 transition">
            🚚
          </div>

          {/* TEXTO do LOGO moderno */}
          <div className="flex flex-col leading-tight">
            <span className="text-[22px] font-poppins font-bold text-[#0A3D62] tracking-wide group-hover:text-[#1E90FF] transition">
              Brava Cargo
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#1E90FF] font-semibold">
              logística & transporte
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex gap-10 font-poppins text-sm uppercase text-[#0A3D62]">
          <Link href="/institucional" className="hover:text-[#1E90FF] transition">Institucional</Link>
          <Link href="/servicos" className="hover:text-[#1E90FF] transition">Serviços</Link>
          <Link href="/rastreamento" className="hover:text-[#1E90FF] transition">Rastreamento</Link>
          <Link href="/contato" className="hover:text-[#1E90FF] transition">Contato</Link>
        </nav>

        {/* MENU MOBILE */}
        <button
          className="md:hidden text-3xl text-[#0A3D62]"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden absolute left-0 top-20 w-full bg-white border-t shadow-xl px-6 py-6 flex flex-col gap-6 font-poppins text-lg text-[#0A3D62]">
          <Link href="/institucional" onClick={() => setOpen(false)}>Institucional</Link>
          <Link href="/servicos" onClick={() => setOpen(false)}>Serviços</Link>
          <Link href="/rastreamento" onClick={() => setOpen(false)}>Rastreamento</Link>
          <Link href="/contato" onClick={() => setOpen(false)}>Contato</Link>
        </div>
      )}

    </header>
  );
}
