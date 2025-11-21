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
    setTimeout(() => setIsCopied(false), 2000); // Reset après 2 sec
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-slate-100">
      {/* --- ARRIÈRE-PLAN ANIMÉ --- */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* --- CONTENEUR PRINCIPAL (Effet Glassmorphism) --- */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl overflow-hidden z-10">
        {/* En-tête */}
        <div className="p-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg mb-4">
            {/* Icône Play */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-purple-200">
            TikTok Genius
          </h1>
          <p className="text-slate-400 text-sm mt-2">Ton assistant IA pour percer 🚀</p>
        </div>

        {/* Formulaire */}
        <div className="px-8 pb-8 space-y-5">
          {/* Input Sujet */}
          <div className="group">
            <label className="block text-xs font-medium text-purple-300 uppercase tracking-wider mb-2 ml-1">De quoi on parle ?</label>
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Les meilleures astuces pour..."
                className="w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block w-full p-4 pl-12 transition-all shadow-inner"
              />
              {/* Icône Recherche */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Select Ton */}
          <div>
            <label className="block text-xs font-medium text-purple-300 uppercase tracking-wider mb-2 ml-1">Quelle ambiance ?</label>
            <div className="relative">
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent block w-full p-4 pl-12 appearance-none cursor-pointer shadow-inner hover:bg-slate-800/80 transition-colors"
              >
                <option value="Drôle">🤡 Drôle & Fun</option>
                <option value="Éducatif">🧠 Éducatif & Clair</option>
                <option value="Inspirant">✨ Inspirant & Motivant</option>
                <option value="Polémique">🔥 Polémique & Cash</option>
                <option value="Mystérieux">🕵️‍♂️ Mystérieux & Teasing</option>
              </select>
              {/* Icône Humeur */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              {/* Flèche custom */}
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Bouton Action Principal */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !topic}
            className={`w-full relative p-4 rounded-xl font-bold text-white shadow-lg transform transition-all duration-200 active:scale-95 flex items-center justify-center gap-2
              ${
                isLoading || !topic
                  ? "bg-slate-700 cursor-not-allowed text-slate-400"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/25 border border-white/10"
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Rédaction en cours...
              </>
            ) : (
              <>
                <span>Générer le Script</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- RESULTAT (Carte qui apparaît en dessous) --- */}
      {script && (
        <div className="w-full max-w-md mt-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            {/* Barre d'outils du résultat */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/50">
              <h3 className="font-bold text-purple-400 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Script Généré
              </h3>
              <button
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all
                  ${
                    isCopied
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
                  }`}
              >
                {isCopied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copié !
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                      ></path>
                    </svg>
                    Copier
                  </>
                )}
              </button>
            </div>

            {/* Contenu du script */}
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">{script}</div>
            </div>
          </div>

          <p className="text-center text-slate-500 text-xs mt-4 pb-8">Généré par IA • Vérifie toujours le contenu</p>
        </div>
      )}
    </div>
  );
}
