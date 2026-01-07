import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="relative z-40 bg-[#0E1624]/90 backdrop-blur border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Image
          src="/images/logo.png"
          alt="Brava Cargo"
          width={140}
          height={44}
          className="object-contain"
          priority
        />

        {/* BOTÃO MOBILE */}
        <button
          className="lg:hidden text-2xl text-white"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* ================= MENU DESKTOP ================= */}
        <nav className="hidden lg:flex gap-10 text-sm font-semibold text-gray-300">

          {/* RASTREAR */}
          <button
            onClick={() => {
              if (router.pathname === "/") {
                document
                  .getElementById("rastreamento")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#rastreamento");
              }
            }}
            className="hover:text-[#1E90FF] transition"
          >
            Rastrear
          </button>

          {/* CONTATO */}
          <button
            onClick={() => router.push("/contato")}
            className="hover:text-[#1E90FF] transition"
          >
            Contato
          </button>

        </nav>
      </div>

      {/* ================= MENU MOBILE ================= */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A1220] border-b border-[#1E293B]">
          <nav className="flex flex-col px-6 py-6 gap-6 text-base font-semibold text-gray-200">

            {/* RASTREAR */}
            <button
              onClick={() => {
                setMenuOpen(false);
                if (router.pathname === "/") {
                  document
                    .getElementById("rastreamento")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  router.push("/#rastreamento");
                }
              }}
              className="flex items-center justify-between py-3 border-b border-[#1E293B]/60 hover:text-[#1E90FF]"
            >
              Rastrear
              <span className="text-gray-500">›</span>
            </button>

            {/* CONTATO */}
            <button
              onClick={() => {
                setMenuOpen(false);
                router.push("/contato");
              }}
              className="flex items-center justify-between py-3 hover:text-[#1E90FF]"
            >
              Contato
              <span className="text-gray-500">›</span>
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}
