import { useState, useEffect } from 'react';

export type Language = 'en' | 'ar' | 'fr';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    'nav.languages': 'Languages',
    'nav.coding': 'Coding',
    'nav.office': 'The Office',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.joinNow': 'Join Now',
    'nav.backToHome': 'Back to Home',
    
    // Brand
    'brand.name': 'Rising Academy',
    
    // Hero Section
    'hero.badge': 'Welcome to the Future of Learning',
    'hero.title1': 'Rising',
    'hero.title2': 'Academy',
    'hero.subtitle': 'Master languages, conquer code, and connect with like-minded learners in our exclusive Monday club sessions at The Office',
    'hero.startLearning': 'Start Learning Today',
    'hero.joinOffice': 'Join The Office Club',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive learning experiences designed to elevate your skills and connect you with a community of learners',
    'services.language.title': 'Language Learning',
    'services.language.description': 'Master multiple languages with our immersive teaching methods and native speaker instructors.',
    'services.coding.title': 'Coding Bootcamp',
    'services.coding.description': 'Learn programming from scratch or advance your skills with cutting-edge technologies.',
    'services.office.title': 'The Office Club',
    'services.office.description': 'Join our exclusive Monday sessions for networking, collaboration, and skill sharing.',
    'services.applyNow': 'Apply Now',
    
    // Stats
    'stats.title': 'Our Impact',
    'stats.subtitle': 'Numbers that speak to our commitment to excellence and student success',
    'stats.students': 'Active Students',
    'stats.languages': 'Languages Taught',
    'stats.programming': 'Programming Languages',
    'stats.success': 'Success Rate',
    
    // Admin
    'admin.title': 'Admin Login',
    'admin.subtitle': 'Access the Rising Academy admin panel',
    'admin.email': 'Email Address',
    'admin.password': 'Password',
    'admin.signIn': 'Sign In',
    'admin.dashboard': 'Rising Academy Admin',
    'admin.logout': 'Logout',
    'admin.settings': 'Settings',
    'admin.refresh': 'Refresh Applications',
    'admin.total': 'Total',
    'admin.pending': 'Pending',
    'admin.approved': 'Approved',
    'admin.rejected': 'Rejected',
    'admin.languages': 'Languages',
    'admin.coding': 'Coding',
    'admin.office': 'Office Club',
    
    // Common
    'common.loading': 'Loading...',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.approve': 'Approve',
    'common.reject': 'Reject'
  },
  ar: {
    // Navigation
    'nav.languages': 'اللغات',
    'nav.coding': 'البرمجة',
    'nav.office': 'المكتب',
    'nav.about': 'حولنا',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    'nav.joinNow': 'انضم الآن',
    'nav.backToHome': 'العودة للرئيسية',
    
    // Brand
    'brand.name': 'أكاديمية النهوض',
    
    // Hero Section
    'hero.badge': 'مرحباً بك في مستقبل التعلم',
    'hero.title1': 'أكاديمية',
    'hero.title2': 'النهوض',
    'hero.subtitle': 'أتقن اللغات، اقهر البرمجة، وتواصل مع المتعلمين المتشابهين في جلسات نادي الاثنين الحصرية في المكتب',
    'hero.startLearning': 'ابدأ التعلم اليوم',
    'hero.joinOffice': 'انضم لنادي المكتب',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'تجارب تعليمية شاملة مصممة لرفع مهاراتك وربطك بمجتمع من المتعلمين',
    'services.language.title': 'تعلم اللغات',
    'services.language.description': 'أتقن لغات متعددة بطرق التدريس الغامرة والمدربين الناطقين الأصليين.',
    'services.coding.title': 'معسكر البرمجة',
    'services.coding.description': 'تعلم البرمجة من الصفر أو طور مهاراتك بأحدث التقنيات.',
    'services.office.title': 'نادي المكتب',
    'services.office.description': 'انضم لجلساتنا الحصرية يوم الاثنين للتواصل والتعاون ومشاركة المهارات.',
    'services.applyNow': 'قدم الآن',
    
    // Stats
    'stats.title': 'تأثيرنا',
    'stats.subtitle': 'أرقام تتحدث عن التزامنا بالتميز ونجاح الطلاب',
    'stats.students': 'الطلاب النشطون',
    'stats.languages': 'اللغات المُدرسة',
    'stats.programming': 'لغات البرمجة',
    'stats.success': 'معدل النجاح',
    
    // Admin
    'admin.title': 'تسجيل دخول الإدارة',
    'admin.subtitle': 'الوصول إلى لوحة إدارة أكاديمية النهوض',
    'admin.email': 'عنوان البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.signIn': 'تسجيل الدخول',
    'admin.dashboard': 'إدارة أكاديمية النهوض',
    'admin.logout': 'تسجيل الخروج',
    'admin.settings': 'الإعدادات',
    'admin.refresh': 'تحديث الطلبات',
    'admin.total': 'المجموع',
    'admin.pending': 'قيد الانتظار',
    'admin.approved': 'مقبول',
    'admin.rejected': 'مرفوض',
    'admin.languages': 'اللغات',
    'admin.coding': 'البرمجة',
    'admin.office': 'نادي المكتب',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.view': 'عرض',
    'common.approve': 'قبول',
    'common.reject': 'رفض'
  },
  fr: {
    // Navigation
    'nav.languages': 'Langues',
    'nav.coding': 'Programmation',
    'nav.office': 'Le Bureau',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.joinNow': 'Rejoignez-nous',
    'nav.backToHome': 'Retour à l\'accueil',
    
    // Brand
    'brand.name': 'Académie Rising',
    
    // Hero Section
    'hero.badge': 'Bienvenue dans l\'avenir de l\'apprentissage',
    'hero.title1': 'Académie',
    'hero.title2': 'Rising',
    'hero.subtitle': 'Maîtrisez les langues, conquérez le code et connectez-vous avec des apprenants partageant les mêmes idées dans nos sessions exclusives du club du lundi au Bureau',
    'hero.startLearning': 'Commencer à apprendre aujourd\'hui',
    'hero.joinOffice': 'Rejoindre le Club du Bureau',
    
    // Services
    'services.title': 'Nos Services',
    'services.subtitle': 'Expériences d\'apprentissage complètes conçues pour élever vos compétences et vous connecter à une communauté d\'apprenants',
    'services.language.title': 'Apprentissage des Langues',
    'services.language.description': 'Maîtrisez plusieurs langues avec nos méthodes d\'enseignement immersives et nos instructeurs natifs.',
    'services.coding.title': 'Bootcamp de Programmation',
    'services.coding.description': 'Apprenez la programmation à partir de zéro ou perfectionnez vos compétences avec des technologies de pointe.',
    'services.office.title': 'Le Club du Bureau',
    'services.office.description': 'Rejoignez nos sessions exclusives du lundi pour le réseautage, la collaboration et le partage de compétences.',
    'services.applyNow': 'Postuler maintenant',
    
    // Stats
    'stats.title': 'Notre Impact',
    'stats.subtitle': 'Des chiffres qui témoignent de notre engagement envers l\'excellence et le succès des étudiants',
    'stats.students': 'Étudiants Actifs',
    'stats.languages': 'Langues Enseignées',
    'stats.programming': 'Langages de Programmation',
    'stats.success': 'Taux de Réussite',
    
    // Admin
    'admin.title': 'Connexion Admin',
    'admin.subtitle': 'Accéder au panneau d\'administration de l\'Académie Rising',
    'admin.email': 'Adresse e-mail',
    'admin.password': 'Mot de passe',
    'admin.signIn': 'Se connecter',
    'admin.dashboard': 'Admin Académie Rising',
    'admin.logout': 'Déconnexion',
    'admin.settings': 'Paramètres',
    'admin.refresh': 'Actualiser les candidatures',
    'admin.total': 'Total',
    'admin.pending': 'En attente',
    'admin.approved': 'Approuvé',
    'admin.rejected': 'Rejeté',
    'admin.languages': 'Langues',
    'admin.coding': 'Programmation',
    'admin.office': 'Club du Bureau',
    
    // Common
    'common.loading': 'Chargement...',
    'common.cancel': 'Annuler',
    'common.save': 'Sauvegarder',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.view': 'Voir',
    'common.approve': 'Approuver',
    'common.reject': 'Rejeter'
  }
};

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    changeLanguage,
    t,
    isRTL: language === 'ar'
  };
};