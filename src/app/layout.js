import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TikTok Generator AI",
  description: "Génère tes scripts viraux en 2 secondes",
  manifest: "/manifest.json", // On lie le fichier manifeste ici
  themeColor: "#9333ea", // La couleur de la barre de statut (violet)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1, // Empêche de zoomer par erreur sur mobile
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
