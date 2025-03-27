
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
  // TestCard translations
  "showExplanation": {
    ru: "Показать объяснение",
    el: "Προβολή επεξήγησης",
  },
  "hideExplanation": {
    ru: "Скрыть объяснение",
    el: "Απόκρυψη επεξήγησης",
  },
  "nextQuestion": {
    ru: "Следующий вопрос",
    el: "Επόμενη ερώτηση",
  },
  "home": {
    ru: "На главную",
    el: "Αρχική",
  },
  "question": {
    ru: "Вопрос",
    el: "Ερώτηση",
  },
  "of": {
    ru: "из",
    el: "από",
  },
  "testComplete": {
    ru: "Тест завершен!",
    el: "Η δοκιμή ολοκληρώθηκε!",
  },
  "testCompleteMessage": {
    ru: "Вы успешно прошли все вопросы по истории Греции.",
    el: "Απαντήσατε με επιτυχία σε όλες τις ερωτήσεις σχετικά με την ιστορία της Ελλάδας.",
  },
  "retakeTest": {
    ru: "Пройти тест снова",
    el: "Επαναλάβετε το τεστ",
  },
  "logInToSave": {
    ru: "Войдите в систему, чтобы сохранять свой прогресс:",
    el: "Συνδεθείτε για να αποθηκεύσετε την πρόοδό σας:",
  },
  // History questions and answers translations
  "history_question_1": {
    ru: "Когда началась Греческая революция?",
    el: "Πότε ξεκίνησε η Ελληνική Επανάσταση;",
  },
  "history_answer_1_1": {
    ru: "1821",
    el: "1821",
  },
  "history_answer_1_2": {
    ru: "1804",
    el: "1804",
  },
  "history_answer_1_3": {
    ru: "1832",
    el: "1832",
  },
  "history_answer_1_4": {
    ru: "1776",
    el: "1776",
  },
  "history_explanation_1": {
    ru: "Греческая революция началась в 1821 году и привела к независимости Греции от Османской империи.",
    el: "Η Ελληνική Επανάσταση ξεκίνησε το 1821 και οδήγησε στην ανεξαρτησία της Ελλάδας από την Οθωμανική Αυτοκρατορία.",
  },
  "history_question_2": {
    ru: "Кто был первым премьер-министром Греции после обретения независимости?",
    el: "Ποιος ήταν ο πρώτος πρωθυπουργός της Ελλάδας μετά την ανεξαρτησία;",
  },
  "history_answer_2_1": {
    ru: "Иоаннис Каподистриас",
    el: "Ιωάννης Καποδίστριας",
  },
  "history_answer_2_2": {
    ru: "Александрос Маврокордатос",
    el: "Αλέξανδρος Μαυροκορδάτος",
  },
  "history_answer_2_3": {
    ru: "Константинос Канарис",
    el: "Κωνσταντίνος Κανάρης",
  },
  "history_answer_2_4": {
    ru: "Теодорос Колокотронис",
    el: "Θεόδωρος Κολοκοτρώνης",
  },
  "history_explanation_2": {
    ru: "Иоаннис Каподистриас был первым премьер-министром Греции, сыгравшим ключевую роль в формировании греческого государства.",
    el: "Ο Ιωάννης Καποδίστριας ήταν ο πρώτος πρωθυπουργός της Ελλάδας και διαδραμάτισε καθοριστικό ρόλο στη διαμόρφωση του ελληνικού κράτους.",
  },
  "history_question_3": {
    ru: "Какое событие считается началом Второй мировой войны?",
    el: "Ποιο γεγονός θεωρείται η έναρξη του Β' Παγκοσμίου Πολέμου;",
  },
  "history_answer_3_1": {
    ru: "Нападение Германии на Польшу",
    el: "Η επίθεση της Γερμανίας στην Πολωνία",
  },
  "history_answer_3_2": {
    ru: "Нападение Японии на Перл-Харбор",
    el: "Η επίθεση της Ιαπωνίας στο Περλ Χάρμπορ",
  },
  "history_answer_3_3": {
    ru: "Вторжение Италии в Эфиопию",
    el: "Η εισβολή της Ιταλίας στην Αιθιοπία",
  },
  "history_answer_3_4": {
    ru: "Аншлюс Австрии",
    el: "Η προσάρτηση της Αυστρίας",
  },
  "history_explanation_3": {
    ru: "Нападение Германии на Польшу 1 сентября 1939 года традиционно считается началом Второй мировой войны.",
    el: "Η επίθεση της Γερμανίας στην Πολωνία την 1η Σεπτεμβρίου 1939 θεωρείται παραδοσιακά η έναρξη του Β' Παγκοσμίου Πολέμου.",
  },
  // Добавьте переводы для остальных вопросов и ответов
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
