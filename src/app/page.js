"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Drôle");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");

  // Icônes pour les tons (Emoji simple)
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
      alert("Oups, petite erreur...");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    alert("Copié ! 📋");
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 px-6 pt-8 max-w-md mx-auto">
      {/* 1. Header (Comme "Bonjour, Léo") */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2E3A59]">Bonjour, Toi 👋</h1>
          <p className="text-[#8D91AA] text-sm mt-1">Prêt à percer aujourd'hui ?</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-xl border border-gray-100">🔔</div>
      </header>

      {/* 2. Hero Card (La carte bleu foncé de l'image) */}
      <div className="bg-[#2E3A59] rounded-[32px] p-6 text-white shadow-xl shadow-indigo-200 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-1">Objectif du jour</h2>
          <p className="text-indigo-200 text-sm mb-6">Créer un script viral en 30s.</p>

          {/* Input intégré dans la carte */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex items-center border border-white/10">
            <span className="pl-3 text-lg">💡</span>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Sujet (ex: Yoga matin)"
              className="bg-transparent border-none text-white placeholder-indigo-300 text-sm w-full focus:ring-0 px-3 py-2"
            />
          </div>
        </div>
        {/* Cercles décoratifs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -ml-10 -mb-10"></div>
      </div>

      {/* 3. Section "Mes Habitudes" (Sélecteur de Ton) */}
      <div className="mb-8">
        <h3 className="text-[#2E3A59] font-bold text-lg mb-4">L'ambiance</h3>
        <div className="flex justify-between gap-2 overflow-x-auto no-scrollbar">
          {tones.map((t) => (
            <button
              key={t.id}
              onClick={() => setTone(t.id)}
              className={`flex flex-col items-center gap-2 min-w-[70px] transition-all duration-200 ${
                tone === t.id ? "scale-105" : "opacity-60 hover:opacity-100"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-sm border-2 transition-colors ${
                  tone === t.id ? "bg-[#6C63FF] border-[#6C63FF] text-white shadow-indigo-200" : "bg-white border-transparent text-gray-500"
                }`}
              >
                {t.emoji}
              </div>
              <span className={`text-xs font-medium ${tone === t.id ? "text-[#6C63FF]" : "text-gray-400"}`}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Bouton Générer (Floating Action Button style) */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !topic}
        className={`w-full py-5 rounded-[24px] font-bold text-white text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3
          ${isLoading || !topic ? "bg-gray-300 cursor-not-allowed" : "bg-[#2E3A59] hover:bg-[#1F2845] shadow-indigo-200"}`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Création...</span>
          </>
        ) : (
          <>
            <span>✨ Générer</span>
          </>
        )}
      </button>

      {/* 5. Résultat (Apparition douce) */}
      {script && (
        <div className="mt-8 animate-in slide-in-from-bottom-10 fade-in duration-500">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[#2E3A59] font-bold text-lg">Ton Script</h3>
            <button
              onClick={copyToClipboard}
              className="text-[#6C63FF] text-sm font-medium bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
            >
              Copier
            </button>
          </div>
          <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap font-medium leading-relaxed">{script}</div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Décoratif pour le look App) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-8 py-4 flex justify-between items-center text-2xl text-gray-300 z-50">
        <button className="text-[#6C63FF]">
          <span className="block w-1 h-1 bg-current rounded-full mx-auto mb-1"></span>🏠
        </button>
        <button className="hover:text-gray-400">📂</button>
        <div className="w-12 h-12 bg-[#2E3A59] rounded-full flex items-center justify-center text-white -mt-8 border-4 border-[#FDFBF7] shadow-lg">
          +
        </div>
        <button className="hover:text-gray-400">📊</button>
        <button className="hover:text-gray-400">👤</button>
      </div>
    </div>
  );
}
