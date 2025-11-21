import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // --- AJOUTE CES 3 LIGNES ---
    console.log("--- DÉBUT DU TEST ---");
    console.log("Clé API détectée ?", process.env.GEMINI_API_KEY ? "OUI" : "NON (C'est ça le problème !)");
    console.log("Modèle choisi : gemini-1.5-flash");
    console.log(process.env.GEMINI_API_KEY);
    // ------------
    // 1. on récupère les données envoyées par le formulaire
    const { topic, tone } = await req.json();
    // 2. on prépare l'IA avec ta clé secrète
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    // 3. on construit la consigne (le prompt) pour Gemini
    const prompt = `
      Agis comme un expert mondial de TikTok et du marketing viral.
      Je veux un script pour une vidéo courte sur le sujet : "${topic}".
      Le ton doit être strictement : ${tone}.
      
      La réponse DOIT suivre exactement cette structure, avec des sauts de ligne :
      
      TITRE (Accrocheur) : [Ton Titre Ici]
      
      HOOK VISUEL (Ce qu'on voit à l'écran dès la 1ère seconde) : [Description]
      HOOK AUDIO (La première phrase choc pour retenir l'attention) : "[Phrase]"
      
      CORPS DU SCRIPT (Ce qu'il faut dire, rythmé et dynamique) :
      - [Partie 1]
      - [Partie 2]
      - [Partie 3]
      
      CTA (Appel à l'action clair) : "[Phrase de fin]"
      
      DESCRIPTION VIDEO : [Texte court pour la description]
      HASHTAGS (5 pertinents) : #...
      
      Utilise des émojis. Sois concis. Fais en sorte que la vidéo dure environ 30 à 60 secondes.
    `;
    // 4. on demande à Gemini de générer
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const script = response.text();
    // 5. on renvoie la réponse au frontend

    return NextResponse.json({ script: script });
  } catch (error) {
    console.error("🔴 ERREUR DÉTAILLÉE :", error.message);
    console.error("🔴 CAUSE :", error);
    return NextResponse.json(
      {
        error: "erreur lors de la génération",
      },
      {
        status: 500,
      }
    );
  }
}
