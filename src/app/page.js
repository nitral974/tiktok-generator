"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Drôle");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Configuration des tons avec emojis et couleurs actives
  const tones = [
    { id: "Drôle", emoji: "🤡", label: "Fun" },
    { id: "Éducatif", emoji: "🧠", label: "Expert" },
    { id: "Inspirant", emoji: "✨", label: "Boost" },
    { id: "Clash", emoji: "🔥", label: "Clash" },
  ];

  const handleSubmit = async () => {
    if (!topic) return;
    setIsLoading(true);
    setScript(""); // Reset script

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone }),
      });
      const data = await response.json();
      if (data.script) setScript(data.script);
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-32 pt-10 px-6 max-w-md mx-auto relative">
      {/* --- HEADER: SALUTATION --- */}
      <header className="flex justify-between items-start mb-8 animate-slide-up">
        <div>
          <h1 className="text-4xl font-bold text-[#2D3250] leading-tight">
            Bonjour,
            <br />
            Creator 👋
          </h1>
        </div>
        <button className="p-3 bg-white rounded-full shadow-sm border border-[#F0EAE0] text-xl">🛎️</button>
      </header>

      {/* --- CARTE PRINCIPALE (HERO) --- */}
      <div
        className="bg-[#2D3250] rounded-[32px] p-8 text-white shadow-xl shadow-[#2D3250]/20 mb-10 relative overflow-hidden animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        {/* Formes abstraites en fond */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#6C63FF] opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Objectif du jour</h2>
              <p className="text-[#8D91AA] text-sm">Un script viral en 1 clic.</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#6C63FF]/30 flex items-center justify-center font-bold text-sm">GO</div>
          </div>

          {/* Champ de Saisie Intégré */}
          <div className="bg-[#3D4366] rounded-2xl p-1 flex items-center border border-white/10 focus-within:border-[#6C63FF] focus-within:bg-[#3D4366] transition-all">
            <span className="pl-4 text-xl">💡</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sujet (ex: Pizza Maison)"
              className="w-full bg-transparent border-none text-white placeholder-[#8D91AA] px-4 py-4 outline-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* --- SÉLECTEUR DE TON (Habitudes) --- */}
      <div className="mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-[#2D3250] font-bold text-lg mb-5">L'ambiance</h3>
        <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar">
          {tones.map((t) => {
            const isActive = tone === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`flex flex-col items-center gap-3 min-w-[70px] transition-all duration-300 ${
                  isActive ? "transform -translate-y-1" : "opacity-60"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 transition-all shadow-sm ${
                    isActive ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-[#6C63FF]/40" : "bg-white border-transparent text-gray-400"
                  }`}
                >
                  {t.emoji}
                </div>
                <span className={`text-xs font-bold ${isActive ? "text-[#6C63FF]" : "text-[#8D91AA]"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- BOUTON GÉNÉRER --- */}
      <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !topic}
          className={`w-full py-5 rounded-[24px] font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3
            ${
              isLoading || !topic
                ? "bg-[#E0D8CC] text-[#A0988C] cursor-not-allowed shadow-none"
                : "bg-[#2D3250] text-white shadow-[#2D3250]/30 hover:scale-[1.02] active:scale-95"
            }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Magie en cours...</span>
            </>
          ) : (
            "✨ Générer le Script"
          )}
        </button>
      </div>

      {/* --- RÉSULTAT --- */}
      {script && (
        <div className="mt-10 animate-slide-up pb-6">
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-[#2D3250] font-bold text-xl">Résultat</h3>
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                isCopied ? "bg-green-100 text-green-700" : "bg-white text-[#6C63FF]"
              }`}
            >
              {isCopied ? "Copié !" : "Copier"}
            </button>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#F0EAE0] leading-relaxed text-[#4A4F6B] whitespace-pre-wrap">
            {script}
          </div>
        </div>
      )}

      {/* --- NAVIGATION BAS (Fixe & Propre) --- */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-lg border-t border-white/20 px-8 pb-8 pt-4 flex justify-between items-end z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <button className="flex flex-col items-center gap-1 text-[#6C63FF]">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-[#8D91AA] hover:text-[#2D3250]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span className="text-[10px] font-medium">Historique</span>
        </button>

        {/* Le bouton central flottant (décoratif ici car l'action est plus haut) */}
        <div className="relative -top-5">
          <div className="w-14 h-14 bg-[#2D3250] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#2D3250]/40 border-[6px] border-[#FFF9F0]">
            <span className="text-2xl pb-1">+</span>
          </div>
        </div>

        <button className="flex flex-col items-center gap-1 text-[#8D91AA] hover:text-[#2D3250]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span className="text-[10px] font-medium">Stats</span>
        </button>

        <button className="flex flex-col items-center gap-1 text-[#8D91AA] hover:text-[#2D3250]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-medium">Profil</span>
        </button>
      </nav>
    </div>
  );
}
