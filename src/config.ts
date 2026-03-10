import { staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";

// ─── Font ────────────────────────────────────────────────
export const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
});

// ─── Video settings (9:16 portrait) ─────────────────────
export const VIDEO = {
  width: 1080,
  height: 1920,
  fps: 30,
  durationInFrames: 2700, // 90s
} as const;

// ─── Scene timings (in frames) ───────────────────────────
export const SCENES = {
  intro:      { from: 0,    duration: 120  }, // 0-4s     770 Lab présente
  splash:     { from: 120,  duration: 150  }, // 4-9s     Splash plein écran
  home:       { from: 270,  duration: 120  }, // 9-13s    Home screen dans le phone
  shabbat:    { from: 390,  duration: 180  }, // 13-19s   Card Shabbat
  objectifs:  { from: 570,  duration: 180  }, // 19-25s   Objectifs
  tefila:     { from: 750,  duration: 180  }, // 25-31s   Tefila
  tehilim:    { from: 930,  duration: 180  }, // 31-37s   Tehilim
  ayeka:      { from: 1110, duration: 180  }, // 37-43s   Ayeka
  rabbi:      { from: 1290, duration: 180  }, // 43-49s   Ecrire au Rabbi
  club:       { from: 1470, duration: 180  }, // 49-55s   Chabad Club
  jewtube:    { from: 1650, duration: 180  }, // 55-61s   JewTube
  tsedakif:   { from: 1830, duration: 180  }, // 61-67s   Tsedakif
  halakhia:   { from: 2010, duration: 180  }, // 67-73s   Halakh'IA
  etudes:     { from: 2190, duration: 240  }, // 73-81s   4 études ensemble
  outro:      { from: 2430, duration: 270  }, // 81-90s   Outro
} as const;

// ─── Colors ──────────────────────────────────────────────
export const COLORS = {
  bg: {
    dark: "#FFFFFF",
    darker: "#F5F5F5",
    card: "#F0F0F0",
    cardLight: "#FAFAFA",
  },
  accent: "#E8772E",
  accentLight: "#F5A623",
  accentGlow: "rgba(232, 119, 46, 0.15)",
  text: {
    primary: "#1a1a1a",
    secondary: "rgba(0, 0, 0, 0.55)",
    muted: "rgba(0, 0, 0, 0.3)",
  },
  gradient: {
    warm: "linear-gradient(135deg, #E8772E 0%, #F5A623 100%)",
    insta: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #F77737 100%)",
    subtle: "linear-gradient(135deg, #f8f8f8 0%, #ffffff 50%, #f0f0f0 100%)",
    glow: "radial-gradient(circle, rgba(232,119,46,0.08) 0%, transparent 70%)",
  },
} as const;

// ─── Card data ───────────────────────────────────────────
export const CARDS = [
  {
    id: "shabbat",
    image: staticFile("video2/shabbat-card.png"),
    label: "Shabbat",
    subtitle: "Ne rate plus jamais l'allumage",
    bullets: ["Géolocalisation en direct", "Horaires précis partout dans le monde", "Parasha de la semaine", "Partage en un clic"],
  },
  {
    id: "objectifs",
    image: staticFile("video2/objectifs.jpg"),
    label: "Objectifs du jour",
    subtitle: "13 mitsvot quotidiennes à accomplir",
    bullets: ["Suivi personnalisé", "Progression visible", "Matin, après-midi & soir", "Synchronisé sur le cloud"],
  },
  {
    id: "tefila",
    image: staticFile("video2/tefila.jpg"),
    label: "Téfila",
    subtitle: "Tout le Siddour dans ta poche",
    bullets: ["Hébreu, phonétique & français", "Cha'harit, Min'ha & Arvit", "Kriat Chéma al Hamita", "Guide des Brakhot"],
  },
  {
    id: "tehilim",
    image: staticFile("video2/tehilim.jpg"),
    label: "Tehilim",
    subtitle: "Les 150 Psaumes de David",
    bullets: ["Tehilim du jour", "Par Perek ou chapitre", "Tehilim au cimetière", "Demandes personnelles"],
  },
  {
    id: "ayeka",
    image: staticFile("video2/ayeka.jpg"),
    label: "Ayeka",
    subtitle: "Trouve un Beth Chabad près de toi",
    bullets: ["Géolocalisation en direct", "✦Complète un miniane", "Restaurants casher"],
  },
  {
    id: "rabbi",
    image: staticFile("video2/rabbi.jpg"),
    label: "Écrire au Rabbi",
    subtitle: "Envoie ta lettre au Ohel",
    bullets: ["Connexion directe au Rabbi", "Prière & demande de brakha"],
  },
  {
    id: "club",
    image: staticFile("video2/club.jpg"),
    label: "Chabad Club",
    subtitle: "Soutiens les Beth Chabad",
    bullets: ["50% du Maasser reversé", "Tsédaka intégrée", "From Crown Heights to the World"],
  },
  {
    id: "jewtube",
    image: staticFile("video2/jewtube.png"),
    label: "JewTube",
    subtitle: "Vidéos juives en famille",
    bullets: ["Contenu éducatif sélectionné", "JEM & Torah-Box intégrés", "Streaming familial sécurisé"],
  },
  {
    id: "tsedakif",
    image: staticFile("video2/tsedakif-logo.webp"),
    label: "Tsedakif",
    subtitle: "La tsédaka en un clic",
    bullets: ["Montants symboliques (Chai, Hessed)", "Reçu fiscal automatique"],
  },
  {
    id: "halakhia",
    image: "",
    label: "Halakh'IA",
    subtitle: "L'IA au service de la Halakha",
    bullets: ["Réponses du Choulkhan Aroukh", "Sources citées", "Disponible 24h/24"],
  },
] as const;

export const ETUDES = [
  { image: staticFile("video2/etude-hayom-yom.jpg"), label: "Hayom Yom" },
  { image: staticFile("video2/etude-tanya.jpg"),     label: "Tanya" },
  { image: staticFile("video2/etude-rambam.jpg"),    label: "Rambam" },
  { image: staticFile("video2/etude-houmach.jpg"),   label: "'Houmach" },
] as const;

// ─── Assets ──────────────────────────────────────────────
export const ASSETS = {
  logo: staticFile("video2/logo.png"),
  logo770: staticFile("video2/770lab-logo.png"),
  crown: staticFile("video2/crown-logo.png"),
  iphoneFront: staticFile("video2/iphone-front.png"),
  iphoneBack: staticFile("video2/iphone-back.png"),
  iphoneSide: staticFile("video2/iphone-side.png"),
  splashScreen: staticFile("video2/splash-screen.png"),
  homeScreen: staticFile("video2/home-screen.png"),
} as const;
