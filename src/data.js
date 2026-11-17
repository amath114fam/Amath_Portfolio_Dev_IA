// ✏️ TOUT LE CONTENU DU PORTFOLIO SE MODIFIE ICI
export const profile = {
  name: 'Amath Fam',
  role: 'Développeur Full-Stack Web & Mobile',
  location: 'Dakar, Sénégal',
  email: 'amathfam2002@gmail.com',
  phone: '+221 70 864 85 15',
  cvUrl: '/CV_Amath_Fam_Fullstack.pdf', // fichier placé dans /public
  photo: 'photo.png',                            // ← ex: '/photo.jpg' (fichier dans /public). Vide = monogramme
  intro: "Développeur Web / Web Mobile + IA certifié par Simplon Sénégal. Je conçois des applications web modernes, agréables à utiliser sur ordinateur comme sur mobile, et j'y intègre l'intelligence artificielle pour les rendre plus utiles.",
  rotating: [
    'des applications web',
    'des interfaces intuitives',
    'des APIs sécurisées',
    'des solutions intelligentes'
  ],
  socials: [
    { label: 'GitHub', icon: 'github', url: 'https://github.com/amath114fam' },
    { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/' },          // ← colle ton lien de profil
    { label: 'WhatsApp', icon: 'whatsapp', url: 'https://wa.me/221708648515' },
  ],
}

export const services = [
  {
    title: 'Développement Web & Mobile',
    text: 'Conception d’applications web modernes, interactives et responsives avec Vue.js, JavaScript et les technologies adaptées.',
    icon: 'web'
  },
  {
    title: 'Backend & API',
    text: 'Développement de systèmes backend robustes, d’API REST et de services sécurisés avec Django, Django REST Framework et FastAPI.',
    icon: 'api'
  },
  {
    title: 'UI/UX Design',
    text: 'Conception d’interfaces intuitives, de maquettes et de prototypes interactifs avec Figma, en plaçant l’expérience utilisateur au centre.',
    icon: 'mobile'
  },
  {
    title: 'Intelligence Artificielle',
    text: 'Intégration de fonctionnalités intelligentes dans les applications : assistants conversationnels, modèles de langage et automatisation de tâches.',
    icon: 'ai'
  },
];

export const projects = [
  {
    id: 1, name: 'YESS NAA CONNECT', category: 'Full-Stack', kind: 'Gestion et distribution de riz',
    desc: "Application web de gestion et de distribution de riz, réalisée en équipe. J'ai contribué à la gestion des stocks, au suivi des commandes et à la distribution des produits.",
    tags: ['Travail en équipe', 'Gestion des stocks', 'Suivi des commandes'],
    color: '#1f7a5c', image: '', demo: 'https://yeesnaa.com', code: '',
  },
  {
    id: 2, name: 'AgriMétéo Sénégal', category: 'Web', kind: 'Monitoring climatique agricole',
    desc: "Plateforme de monitoring climatique pour les 14 régions du Sénégal. Agriculteurs, coopératives et autorités locales consultent la météo en temps réel et évaluent les risques climatiques.",
    tags: ['14 régions', 'Météo en temps réel', 'Risques climatiques'],
    color: '#c2641f', image: '', demo: 'https://agri-meteo-eight.vercel.app/', code: '',
  },
  {
    id: 3, name: 'Sunu-Khasida', category: 'Web', kind: 'Streaming de Khassaïdes',
    desc: "Application de streaming dédiée aux Khassaïdes mourides du Ramadan 2026 : catalogue d'albums, écoute dans le navigateur, recherche en temps réel et favoris personnels.",
    tags: ['Streaming audio', 'Recherche en temps réel', 'Favoris'],
    color: '#4a3b8f', image: '', demo: 'https://sunn-khasida.vercel.app/', code: '',
  },
]

export const stats = [
  { value: 3, suffix: '', label: 'projets en ligne' },
  { value: 14, suffix: '', label: 'régions couvertes par AgriMétéo' },
  { value: 2, suffix: '', label: 'formations suivies' },
  { value: 3, suffix: '', label: 'langues parlées' },
]

export const skills = [
  'Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap',
  'Python', 'Django', 'Django REST', 'FastAPI',
  'PostgreSQL', 'MySQL', 'RAG', 'LLM', 'Figma', 'Git', 'Docker',
]