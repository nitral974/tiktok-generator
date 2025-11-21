"use client";

import { useState } from "react";

export default function Home() {
  // LA MEMOIRE DE L'APPLICATION
  const [topic, setTopic] = useState(""); // Pour stocker le sujet
  const [tone, setTone] = useState("Drôle"); // Pour stocker le ton choisi
  const [isLoading, setIsLoading] = useState(false); // Pour savoir si ça change
  const [script, setScript] = useState(""); // Pour stocker la réponse de l'IA
  // LA FONCTION DECLENCHEE AU CLICK
  const handleSubmit = async () => {
    setIsLoading(true); // on active le chargement
    // Simulation d'attente
    setScript(""); // On vide l'ancien script s'il y en a un
    try {
      // On appelle notre propre API
      const response = await fetch("api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, tone }),
      });
      const data = await response.json();

      if (data.script) {
        setScript(data.script);
      } else {
        alert("une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur", error);
      alert("Impossible de générer le script");
    } finally {
      setIsLoading(false); // On arrête le chargement quoi qu'il arrive
    }
  };

  // Copier le texte
  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    alert("Script copié dans le presse-papier ! 📋");
  };
  // AFFICHAGE DE L'APPLICATION
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
        {/* En-tête */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">TikTok Gen 🎵</h1>
          <p className="text-slate-500 text-sm">Crée tes scripts viraux en 2 clics</p>
        </div>

        {/* Le Formulaire */}
        <div className="space-y-4">
          {/* Champ Sujet */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sujet de la vidéo</label>
            <input
              type="text"
              placeholder="Ex: Comment faire une pizza..."
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          {/* Champ Ton */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Ton de la vidéo</label>
            <select
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Drôle">🤡 Drôle</option>
              <option value="Éducatif">📚 Éducatif</option>
              <option value="Inspirant">✨ Inspirant</option>
              <option value="Sérieux">🧐 Sérieux</option>
              <option value="Polémique">🔥 Polémique</option>
            </select>
          </div>

          {/* Bouton Générer */}
          <button
            onClick={handleSubmit}
            disabled={isLoading || !topic} // Désactivé si chargement ou pas de sujet
            className={`w-full p-4 rounded-xl font-bold text-white transition-all ${
              isLoading || !topic ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 hover:shadow-lg"
            }`}
          >
            {isLoading ? "Génération en cours..." : "Générer le Script ✨"}
          </button>
        </div>

        {/* Zone de Résultat (s'affiche seulement si on a un script) */}
        {/* Zone de Résultat */}
        {script && (
          <div className="mt-6 animate-pulse-once">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-slate-800">Ton Script :</h3>
              <button
                onClick={copyToClipboard}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs px-3 py-1 rounded-full transition-colors"
              >
                📋 Copier
              </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{script}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
