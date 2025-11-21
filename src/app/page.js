"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Drôle");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Configuration des tons (Style Cyber)
  const tones = [
    { id: "Drôle", emoji: "🤪", label: "FUN" },
    { id: "Éducatif", emoji: "🧠", label: "PRO" },
    { id: "Inspirant", emoji: "✨", label: "VIBE" },
    { id: "Clash", emoji: "🤬", label: "RANT" },
    { id: "Story", emoji: "🍿", label: "STORY" },
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
    <div className="min-h-screen pb-32 pt-6 px-4 max-w-md mx-auto relative overflow-hidden">
      {/* Décoration d'arrière-plan (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[#FF0050] opacity-[0.08] blur-[100px] pointer-events-none"></div>

      {/* --- HEADER: BRANDING --- */}
      <header className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight italic">
            VIRAL<span className="text-[#00F2EA]">SCRIPT</span>
            <span className="text-[#FF0050] text-xs align-top ml-1">BETA</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-[#1E1E24] px-3 py-1.5 rounded-full border border-[#2D2D39]">
          <span className="text-xs font-bold text-[#FF0050]">🔥 12</span>
          <span className="text-[10px] text-[#A0A0B0] uppercase font-bold">Streak</span>
        </div>
      </header>

      {/* --- ZONE DE CRÉATION (Main) --- */}
      <main className="space-y-6 relative z-10">
        {/* 1. Input Sujet */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#A0A0B0] uppercase tracking-wider ml-1">Sujet du Banger</label>
          <div className="glass-card rounded-2xl p-4 input-focus-effect transition-all">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Pourquoi personne n'achète tes produits..."
              className="w-full bg-transparent border-none text-white placeholder-[#505060] text-lg font-medium focus:ring-0 resize-none h-20 leading-relaxed"
            />
          </div>
        </div>

        {/* 2. Sélecteur de Ton (Cyber Pills) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#A0A0B0] uppercase tracking-wider ml-1">La Vibe</label>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {tones.map((t) => {
              const isActive = tone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTone(t.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full border transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#1E1E24] border-[#00F2EA] text-[#00F2EA] shadow-[0_0_15px_rgba(0,242,234,0.3)]"
                      : "bg-[#0F0F12] border-[#2D2D39] text-[#A0A0B0] hover:border-[#505060]"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <span className="text-xs font-bold tracking-wide">{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Bouton CTA (Electric Pink) */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !topic}
          className={`w-full py-4 rounded-full font-extrabold text-white text-lg uppercase tracking-widest flex items-center justify-center gap-3
            ${isLoading || !topic ? "bg-[#1E1E24] text-[#505060] cursor-not-allowed" : "btn-primary"}`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Cooking...</span>
            </>
          ) : (
            <>
              <span>GÉNÉRER</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </main>

      {/* --- RÉSULTAT (Code Editor Style) --- */}
      {script && (
        <div className="mt-8 animate-[slideUp_0.5s_ease-out]">
          <div className="flex justify-between items-end mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00F2EA] rounded-full animate-pulse shadow-[0_0_8px_#00F2EA]"></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Script Généré</h3>
            </div>
            <button
              onClick={copyToClipboard}
              className={`text-xs font-bold px-3 py-1 rounded border transition-all ${
                isCopied ? "bg-[#00F2EA]/10 border-[#00F2EA] text-[#00F2EA]" : "border-[#2D2D39] text-[#A0A0B0] hover:text-white hover:border-white"
              }`}
            >
              {isCopied ? "COPIED!" : "COPY"}
            </button>
          </div>

          {/* Container Éditeur */}
          <div className="bg-[#151519] border border-[#2D2D39] rounded-2xl overflow-hidden relative">
            {/* Header Éditeur (Faux onglets) */}
            <div className="bg-[#1E1E24] px-4 py-2 flex items-center gap-2 border-b border-[#2D2D39]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <span className="ml-4 text-[10px] font-mono text-[#505060]">script.txt — {script.length} chars</span>
            </div>

            {/* Zone de Texte Monospace */}
            <div className="p-5 max-h-[400px] overflow-y-auto custom-scrollbar">
              <div className="font-editor text-sm leading-loose text-[#E0E0E0] whitespace-pre-wrap">{script}</div>
            </div>
          </div>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION (Glassmorphism) --- */}
      <nav className="fixed bottom-6 left-6 right-6 bg-[#1E1E24]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex justify-between items-center z-50 shadow-2xl">
        <button className="text-[#00F2EA] flex flex-col items-center gap-1">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
          </svg>
        </button>
        <button className="text-[#505060] hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </button>
        <div className="w-[1px] h-6 bg-[#2D2D39]"></div>
        <button className="text-[#505060] hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
        <button className="text-[#505060] hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}
