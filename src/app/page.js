"use client";

import { useState } from "react";

export default function Home() {
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
      alert("Erreur lors de la génération");
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-[#ff0050] selection:text-white">
      {/* Décoration d'arrière-plan subtile (Néons TikTok) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f2ea] via-white to-[#ff0050] opacity-80 shadow-[0_0_20px_rgba(0,242,234,0.5)]"></div>

      <div className="w-full max-w-lg space-y-8 z-10">
        {/* --- HEADER --- */}
        <div className="text-center space-y-2">
          <div className="inline-block relative">
            <h1 className="text-5xl font-black tracking-tighter text-white mb-1 drop-shadow-[2px_2px_0px_rgba(255,0,80,0.8)]">
              TikTok<span className="text-[#00f2ea] drop-shadow-[-2px_-2px_0px_rgba(0,0,0,1)]">Genius</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">Générateur de scripts viraux</p>
        </div>

        {/* --- CARD PRINCIPALE --- */}
        <div className="bg-[#121212] border border-[#333] p-6 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Formulaire */}
          <div className="space-y-6 relative z-10">
            {/* Input Sujet */}
            <div>
              <label className="text-[#00f2ea] text-xs font-bold uppercase tracking-wider mb-2 block">Sujet de la vidéo</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Comment devenir riche..."
                className="w-full bg-[#1E1E1E] text-white border-b-2 border-[#333] focus:border-[#ff0050] placeholder-gray-600 text-lg py-3 px-2 focus:outline-none transition-colors"
              />
            </div>

            {/* Select Ton */}
            <div>
              <label className="text-[#ff0050] text-xs font-bold uppercase tracking-wider mb-2 block">Ton & Ambiance</label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[#1E1E1E] text-white border-b-2 border-[#333] focus:border-[#00f2ea] text-lg py-3 px-2 pr-10 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Drôle">🤡 Drôle & Fun</option>
                  <option value="Éducatif">📚 Éducatif & Sérieux</option>
                  <option value="Inspirant">✨ Inspirant & Storytelling</option>
                  <option value="Clash">🔥 Polémique & Cash</option>
                </select>
                <div className="absolute right-2 top-4 pointer-events-none text-gray-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bouton Générer */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || !topic}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-200 transform active:scale-95
                ${
                  isLoading || !topic
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-[#00f2ea] hover:shadow-[0_0_20px_rgba(0,242,234,0.6)]"
                }`}
            >
              {isLoading ? "Création en cours..." : "Générer le Script ⚡️"}
            </button>
          </div>
        </div>

        {/* --- RESULTAT --- */}
        {script && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-end mb-3 px-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Résultat</span>
              <button
                onClick={copyToClipboard}
                className={`text-xs px-3 py-1 rounded border transition-all ${
                  isCopied ? "bg-green-500 border-green-500 text-black" : "border-gray-700 text-gray-400 hover:text-white hover:border-white"
                }`}
              >
                {isCopied ? "Copié !" : "Copier le texte"}
              </button>
            </div>

            {/* Zone de texte style "Terminal" ou "Notes" */}
            <div className="bg-[#121212] border-l-4 border-[#00f2ea] p-6 rounded-r-xl shadow-lg">
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300 font-light leading-relaxed custom-scrollbar max-h-[60vh] overflow-y-auto">
                {script}
              </div>
            </div>

            <p className="text-center text-[#333] text-[10px] mt-4 uppercase tracking-widest">Powered by Gemini AI</p>
          </div>
        )}
      </div>
    </div>
  );
}
