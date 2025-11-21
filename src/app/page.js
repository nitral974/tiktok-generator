"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Drôle");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const tones = [
    { id: "Drôle", emoji: "🤡", label: "Fun" },
    { id: "Éducatif", emoji: "🧠", label: "Expert" },
    { id: "Inspirant", emoji: "✨", label: "Boost" },
    { id: "Clash", emoji: "🔥", label: "Clash" },
  ];

  const handleSubmit = async () => {
    if (!topic) return;
    setIsLoading(true);
    setScript("");

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
      alert("Erreur réseau");
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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans pb-28 pt-8 px-6 max-w-md mx-auto relative overflow-hidden">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Bonjour 👋</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Prêt à percer aujourd'hui ?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-indigo-50 flex items-center justify-center text-lg">🔔</div>
      </header>

      {/* --- CARTE PRINCIPALE (Bleu Foncé) --- */}
      <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">
        {/* Cercles décoratifs de fond */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-1 text-white">Objectif du jour</h2>
          <p className="text-indigo-200 text-sm mb-6 opacity-90">Créer un script viral en 30s.</p>

          {/* Champ de saisie intégré */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-1 flex items-center border border-white/20 focus-within:bg-white/20 transition-all">
            <span className="pl-4 text-lg">💡</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sujet (ex: Yoga matin)"
              className="bg-transparent border-none text-white placeholder-indigo-300 text-sm w-full focus:ring-0 px-3 py-3 font-medium outline-none"
            />
          </div>
        </div>
      </div>

      {/* --- SÉLECTION DE L'AMBIANCE --- */}
      <div className="mb-8">
        <h3 className="text-indigo-900 font-bold text-lg mb-4 px-1">L'ambiance</h3>

        {/* Liste horizontale scrollable */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {tones.map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={`flex flex-col items-center gap-2 min-w-[72px] transition-all duration-200 outline-none ${
                tone === t.id ? "transform scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              {/* Cercle de l'icône */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm border-2 transition-all ${
                  tone === t.id ? "bg-indigo-500 border-indigo-500 text-white shadow-indigo-300" : "bg-white border-transparent text-slate-400"
                }`}
              >
                {t.emoji}
              </div>
              {/* Label */}
              <span className={`text-xs font-bold ${tone === t.id ? "text-indigo-600" : "text-slate-400"}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* --- BOUTON D'ACTION --- */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !topic}
        className={`w-full py-4 rounded-3xl font-bold text-white text-lg shadow-lg shadow-indigo-200 transform transition-all active:scale-95 flex items-center justify-center gap-3
          ${isLoading || !topic ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-indigo-900 hover:bg-indigo-800"}`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Magie en cours...</span>
          </>
        ) : (
          <>
            <span>✨ Générer le Script</span>
          </>
        )}
      </button>

      {/* --- RÉSULTAT --- */}
      {script && (
        <div className="mt-10 animate-in slide-in-from-bottom-10 fade-in duration-500 pb-8">
          <div className="flex justify-between items-end mb-4 px-2">
            <h3 className="text-indigo-900 font-bold text-xl">Ton Script</h3>
            <button
              onClick={copyToClipboard}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                isCopied ? "bg-green-100 text-green-600" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {isCopied ? "Copié ! ✅" : "Copier 📋"}
            </button>
          </div>

          {/* Zone de texte propre */}
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-100 border border-slate-50">
            <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap font-medium leading-relaxed text-sm">{script}</div>
          </div>
        </div>
      )}

      {/* --- NAVIGATION DU BAS (Fixe) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-around items-center z-50 pb-safe">
        <button className="text-indigo-600 flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-indigo-400 flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </button>

        {/* Bouton central + flottant */}
        <div className="relative -top-6">
          <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-300 border-4 border-[#FDFBF7]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        <button className="text-slate-400 hover:text-indigo-400 flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2v6"
            />
          </svg>
        </button>
        <button className="text-slate-400 hover:text-indigo-400 flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
