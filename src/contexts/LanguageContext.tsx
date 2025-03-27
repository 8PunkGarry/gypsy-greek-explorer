
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'ru' | 'el';

// Define translation structure
type Translations = {
  [key: string]: {
    [key in Language]: string;
  };
};

// Define translation data
export const translations: Translations = {
  // Navbar translations
  "history": {
    ru: "История",
    el: "Ιστορία",
  },
  "geography": {
    ru: "География",
    el: "Γεωγραφία",
  },
  "culture": {
    ru: "Культура",
    el: "Πολιτισμός",
  },
  "politics": {
    ru: "Политика",
    el: "Πολιτική",
  },
  "practice": {
    ru: "Практика",
    el: "Πρακτική",
  },
  // Hero section translations
  "pathToGreekCitizenship": {
    ru: "Путь к греческому гражданству",
    el: "Πορεία προς την ελληνική ιθαγένεια",
  },
  "interviewPreparation": {
    ru: "Подготовка к собеседованию на греческое гражданство",
    el: "Προετοιμασία για τη συνέντευξη ελληνικής ιθαγένειας",
  },
  "immersionDescription": {
    ru: "Погрузитесь в историю, культуру и дух Греции. Готовьтесь осмысленно, с пониманием и вдохновением.",
    el: "Βυθιστείτε στην ιστορία, τον πολιτισμό και το πνεύμα της Ελλάδας. Προετοιμαστείτε με κατανόηση και έμπνευση.",
  },
  "startLearning": {
    ru: "Начать обучение",
    el: "Ξεκινήστε τη μάθηση",
  },
  "createAccount": {
    ru: "Создайте аккаунт",
    el: "Δημιουργήστε λογαριασμό",
  },
  "saveProgress": {
    ru: "Сохраняйте свой прогресс и отслеживайте успехи",
    el: "Αποθηκεύστε την πρόοδό σας και παρακολουθήστε τα επιτεύγματά σας",
  },
  // LearningPath translations
  "yourLearningPath": {
    ru: "Ваш путь обучения",
    el: "Η διαδρομή μάθησής σας",
  },
  "greekHistory": {
    ru: "История Греции",
    el: "Ιστορία της Ελλάδας",
  },
  "keyEvents": {
    ru: "Ключевые события и их значение для современной Греции",
    el: "Σημαντικά γεγονότα και η σημασία τους για τη σύγχρονη Ελλάδα",
  },
  "greekGeography": {
    ru: "География Греции",
    el: "Γεωγραφία της Ελλάδας",
  },
  "citiesIslands": {
    ru: "Города, острова и их культурное значение",
    el: "Πόλεις, νησιά και η πολιτιστική τους σημασία",
  },
  "greekCulture": {
    ru: "Культура Греции",
    el: "Πολιτισμός της Ελλάδας",
  },
  "traditionsArt": {
    ru: "Традиции, искусство и национальная идентичность",
    el: "Παραδόσεις, τέχνη και εθνική ταυτότητα",
  },
  "politicalSystem": {
    ru: "Политическое устройство",
    el: "Πολιτικό σύστημα",
  },
  "stateSystem": {
    ru: "Государственная система современной Греции",
    el: "Κρατικό σύστημα της σύγχρονης Ελλάδας",
  },
  "continueLearning": {
    ru: "Продолжить обучение",
    el: "Συνεχίστε τη μάθηση",
  },
  // Language selector
  "language": {
    ru: "Язык",
    el: "Γλώσσα",
  },
  "russian": {
    ru: "Русский",
    el: "Ρωσικά",
  },
  "greek": {
    ru: "Греческий",
    el: "Ελληνικά",
  },
};

// Create the language context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = 'ru';

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage && ['ru', 'el'].includes(savedLanguage) ? savedLanguage : defaultLanguage;
  });

  // Save the language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
