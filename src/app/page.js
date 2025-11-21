"use client";

import { useState } from "react";

export default function Home() {
  // --- États (Logique inchangée, Design changé) ---
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Drôle");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

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
      alert("Une erreur est survenue.");
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
    <div className="min-h-screen bg-grid-white flex flex-col items-center p-4 sm:p-8 selection:bg-purple-500/30">
      {/* Effet de spot lumineux en haut */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* --- CONTAINER PRINCIPAL --- */}
      <main className="w-full max-w-2xl z-10 space-y-8 mt-8 sm:mt-12">
        {/* 1. En-tête Identité */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-400">AI Studio v1.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            TikTok <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Genius</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-md mx-auto">
            Transforme tes idées en scripts viraux. <br className="hidden sm:block" />
            <span className="text-gray-500">Architecture par Gemini Pro.</span>
          </p>
        </div>

        {/* 2. La "Control Room" (Formulaire) */}
        <div className="glass-panel rounded-2xl p-1">
          <div className="bg-[#09090b]/80 rounded-xl p-6 sm:p-8 space-y-6">
            {/* Groupe Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Sujet de la vidéo</label>
              <div className="relative group">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: 5 astuces pour mieux dormir..."
                  className="w-full bg-[#18181b] text-white border border-[#27272a] rounded-lg py-4 px-4 pl-11 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-gray-600"
                />
                {/* Icône Search */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Groupe Select & Bouton (Grid sur Desktop, Stack sur Mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Select */}
              <div className="sm:col-span-1 space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Ton</label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-[#18181b] text-white border border-[#27272a] rounded-lg py-4 px-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Drôle">🤡 Fun</option>
                    <option value="Éducatif">🧠 Expert</option>
                    <option value="Inspirant">✨ Motiv</option>
                    <option value="Clash">🔥 Clash</option>
                  </select>
                  {/* Chevron */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bouton Action */}
              <div className="sm:col-span-2 flex items-end">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !topic}
                  className={`w-full h-[58px] rounded-lg font-semibold text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2
                    ${
                      isLoading || !topic
                        ? "bg-[#27272a] text-gray-500 cursor-not-allowed border border-transparent"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border border-white/10 hover:shadow-purple-500/20 active:scale-[0.98]"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Générer le Script</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Résultat (Apparaît avec animation) */}
        {script && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Barre d'outils du document */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Résultat IA</span>
              </div>

              <button onClick={copyToClipboard} className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">
                <span className={`text-xs font-medium transition-colors ${isCopied ? "text-green-400" : "text-gray-400 group-hover:text-white"}`}>
                  {isCopied ? "Copié dans le presse-papier" : "Copier le texte"}
                </span>
                {isCopied ? (
                  <svg width="14" height="14" className="text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    className="text-gray-500 group-hover:text-white transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Le Document "Papier" */}
            <div className="glass-panel rounded-xl overflow-hidden">
              <div className="bg-[#121212]/90 p-6 sm:p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-mono text-sm sm:text-base text-gray-300 leading-relaxed custom-scrollbar max-h-[60vh] overflow-y-auto">
                    {script}
                  </div>
                </div>
              </div>
              {/* Footer du document */}
              <div className="bg-white/5 border-t border-white/5 px-6 py-2 flex justify-between items-center">
                <span className="text-[10px] text-gray-600 font-mono">MODEL: GEMINI-PRO</span>
                <span className="text-[10px] text-gray-600 font-mono">TOKENS: {script.length}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Global */}
      <footer className="mt-auto py-6 text-center text-gray-600 text-xs">
        <p>&copy; 2025 TikTok Genius. Designed for Creators.</p>
      </footer>
    </div>
  );
}
