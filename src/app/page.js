"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("FUN");
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const tones = [
    { id: "FUN", emoji: "🤪", label: "FUN" },
    { id: "PRO", emoji: "🧠", label: "PRO" },
    { id: "VIBE", emoji: "✨", label: "VIBE" },
    { id: "RANT", emoji: "🤬", label: "CLASH" },
    { id: "STORY", emoji: "🍿", label: "STORY" },
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
    <div className="min-h-screen bg-[#050505] text-white pb-32 pt-4 px-5 max-w-md mx-auto relative font-sans">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-center mb-8 mt-2">
        <h1 className="text-2xl font-black tracking-tighter italic">
          VIRAL<span className="text-[#00F2EA]">SCRIPT</span>
          <span className="text-[#FF0050] text-[10px] align-top ml-1 not-italic">BETA</span>
        </h1>
        <div className="flex items-center gap-1.5 bg-[#121212] px-3 py-1 rounded-full border border-[#222]">
          <span className="text-sm">🔥</span>
          <span className="text-xs font-bold text-gray-400">12 STREAK</span>
        </div>
      </header>

      {/* --- FORMULAIRE --- */}
      <main className="space-y-6">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#666] uppercase tracking-widest">Sujet du Banger</label>
          <div className="bg-[#121212] rounded-xl p-4 border border-[#222] focus-within:border-[#FF0050] focus-within:shadow-[0_0_15px_rgba(255,0,80,0.1)] transition-all">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Pourquoi personne n'achète tes produits..."
              className="w-full bg-transparent border-none text-white placeholder-[#444] text-base font-medium focus:ring-0 resize-none h-24 outline-none"
            />
          </div>
        </div>

        {/* Tones */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#666] uppercase tracking-widest">La Vibe</label>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {tones.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all whitespace-nowrap ${
                  tone === t.id
                    ? "bg-[#121212] border-[#00F2EA] text-[#00F2EA] shadow-[0_0_10px_rgba(0,242,234,0.2)]"
                    : "bg-black border-[#222] text-[#666]"
                }`}
              >
                <span className="text-base">{t.emoji}</span>
                <span className="text-xs font-bold">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton GÉNÉRER (Fixé) */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || !topic}
          className={`w-full py-4 rounded-xl font-black text-white text-lg uppercase tracking-widest flex items-center justify-center gap-3 btn-glow transition-transform active:scale-95`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>GÉNÉRER</span>
              {/* SVG avec taille forcée en style inline pour éviter le bug */}
              <svg style={{ width: "20px", height: "20px" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </>
          )}
        </button>
      </main>

      {/* --- RÉSULTAT --- */}
      {script && (
        <div className="mt-8 animate-pulse-once">
          <div className="flex justify-between items-end mb-2 px-1">
            <h3 className="text-xs font-bold text-[#00F2EA] uppercase tracking-widest">Script Prêt</h3>
            <button onClick={copyToClipboard} className="text-xs font-bold text-gray-400 hover:text-white">
              {isCopied ? "COPIÉ !" : "COPIER"}
            </button>
          </div>
          <div className="bg-[#111] border border-[#222] rounded-xl p-5 font-mono text-sm text-gray-300 leading-relaxed whitespace-pre-wrap shadow-2xl">
            {script}
          </div>
        </div>
      )}

      {/* --- NAVIGATION (Fixe en bas) --- */}
      <nav className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-[#222] flex justify-around items-center py-4 px-2 z-50 safe-pb">
        <NavIcon
          active
          icon={
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          }
        />
        <NavIcon
          icon={
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          }
        />
        <NavIcon icon={<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} />
      </nav>
    </div>
  );
}

// Petit composant pour les icônes du bas (plus propre)
function NavIcon({ icon, active }) {
  return (
    <button className={`p-2 rounded-full transition-colors ${active ? "text-[#00F2EA]" : "text-[#444] hover:text-white"}`}>
      <svg style={{ width: "24px", height: "24px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        {icon}
      </svg>
    </button>
  );
}
