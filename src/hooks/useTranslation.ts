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
    'stats.aboutTitle': 'Join Our Growing Community',
    'stats.aboutDescription': 'Be part of a vibrant learning ecosystem where students from around the world come together to master new skills, share knowledge, and build the future together.',
    
    // Application Form
    'form.title.language': 'Apply for Language Learning',
    'form.title.coding': 'Apply for Coding Bootcamp',
    'form.title.office': 'Join The Office Club',
    'form.description.language': 'Join our immersive language learning program',
    'form.description.coding': 'Start your programming journey with us',
    'form.description.office': 'Be part of our Monday learning community',
    'form.firstName': 'First Name',
    'form.lastName': 'Last Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.age': 'Age',
    'form.preferredLanguages': 'Preferred Languages (select multiple)',
    'form.programmingExperience': 'Programming Experience',
    'form.availability': 'Availability (select all that apply)',
    'form.motivation': 'Why do you want to join?',
    'form.motivationPlaceholder': 'Tell us about your goals and motivation...',
    'form.submit': 'Submit Application',
    'form.submitting': 'Submitting...',
    'form.cancel': 'Cancel',
    'form.selectLevel': 'Select your level',
    'form.beginner': 'Beginner',
    'form.intermediate': 'Intermediate',
    'form.advanced': 'Advanced',
    
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
    'brand.name': 'أكاديمية رايزين',
    
    // Hero Section
    'hero.badge': 'مرحباً بك في مستقبل التعلم',
    'hero.title1': 'أكاديمية',
    'hero.title2': 'رايزين',
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
    'stats.aboutTitle': 'انضم لمجتمعنا المتنامي',
    'stats.aboutDescription': 'كن جزءاً من نظام تعليمي نابض بالحياة حيث يجتمع الطلاب من جميع أنحاء العالم لإتقان مهارات جديدة ومشاركة المعرفة وبناء المستقبل معاً.',
    
    // Application Form
    'form.title.language': 'التقديم لتعلم اللغات',
    'form.title.coding': 'التقديم لمعسكر البرمجة',
    'form.title.office': 'انضم لنادي المكتب',
    'form.description.language': 'انضم لبرنامج تعلم اللغات الغامر',
    'form.description.coding': 'ابدأ رحلة البرمجة معنا',
    'form.description.office': 'كن جزءاً من مجتمع التعلم يوم الاثنين',
    'form.firstName': 'الاسم الأول',
    'form.lastName': 'اسم العائلة',
    'form.email': 'البريد الإلكتروني',
    'form.phone': 'رقم الهاتف',
    'form.age': 'العمر',
    'form.preferredLanguages': 'اللغات المفضلة (اختر متعددة)',
    'form.programmingExperience': 'خبرة البرمجة',
    'form.availability': 'الأوقات المتاحة (اختر كل ما ينطبق)',
    'form.motivation': 'لماذا تريد الانضمام؟',
    'form.motivationPlaceholder': 'أخبرنا عن أهدافك ودوافعك...',
    'form.submit': 'إرسال الطلب',
    'form.submitting': 'جاري الإرسال...',
    'form.cancel': 'إلغاء',
    'form.selectLevel': 'اختر مستواك',
    'form.beginner': 'مبتدئ',
    'form.intermediate': 'متوسط',
    'form.advanced': 'متقدم',
    
    // Admin
    'admin.title': 'تسجيل دخول الإدارة',
    'admin.subtitle': 'الوصول إلى لوحة إدارة أكاديمية رايزين',
    'admin.email': 'عنوان البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.signIn': 'تسجيل الدخول',
    'admin.dashboard': 'إدارة أكاديمية رايزين',
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
    'brand.name': 'Rising Academy',
    
    // Hero Section
    'hero.badge': 'Bienvenue dans l\'avenir de l\'apprentissage',
    'hero.title1': 'Rising',
    'hero.title2': 'Academy',
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
    'stats.aboutTitle': 'Rejoignez Notre Communauté Grandissante',
    'stats.aboutDescription': 'Faites partie d\'un écosystème d\'apprentissage dynamique où les étudiants du monde entier se rassemblent pour maîtriser de nouvelles compétences, partager des connaissances et construire l\'avenir ensemble.',
    
    // Application Form
    'form.title.language': 'Postuler pour l\'Apprentissage des Langues',
    'form.title.coding': 'Postuler pour le Bootcamp de Programmation',
    'form.title.office': 'Rejoindre le Club du Bureau',
    'form.description.language': 'Rejoignez notre programme d\'apprentissage des langues immersif',
    'form.description.coding': 'Commencez votre parcours de programmation avec nous',
    'form.description.office': 'Faites partie de notre communauté d\'apprentissage du lundi',
    'form.firstName': 'Prénom',
    'form.lastName': 'Nom de famille',
    'form.email': 'E-mail',
    'form.phone': 'Téléphone',
    'form.age': 'Âge',
    'form.preferredLanguages': 'Langues préférées (sélectionnez plusieurs)',
    'form.programmingExperience': 'Expérience en programmation',
    'form.availability': 'Disponibilité (sélectionnez tout ce qui s\'applique)',
    'form.motivation': 'Pourquoi voulez-vous nous rejoindre?',
    'form.motivationPlaceholder': 'Parlez-nous de vos objectifs et de votre motivation...',
    'form.submit': 'Soumettre la candidature',
    'form.submitting': 'Envoi en cours...',
    'form.cancel': 'Annuler',
    'form.selectLevel': 'Sélectionnez votre niveau',
    'form.beginner': 'Débutant',
    'form.intermediate': 'Intermédiaire',
    'form.advanced': 'Avancé',
    
    // Admin
    'admin.title': 'Connexion Admin',
    'admin.subtitle': 'Accéder au panneau d\'administration de Rising Academy',
    'admin.email': 'Adresse e-mail',
    'admin.password': 'Mot de passe',
    'admin.signIn': 'Se connecter',
    'admin.dashboard': 'Admin Rising Academy',
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
    // Remove RTL for Arabic to avoid design issues
    document.documentElement.dir = 'ltr';
    
    // Force re-render of the entire app
    window.dispatchEvent(new Event('languageChanged'));
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Force page refresh to ensure all components update
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return {
    language,
    changeLanguage,
    t,
    isRTL: false // Disabled RTL to avoid design issues
  };
};