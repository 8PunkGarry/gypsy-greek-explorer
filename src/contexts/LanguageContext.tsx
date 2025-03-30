import React, { createContext, useContext, useState } from 'react';

type Language = 'ru' | 'el';

interface LanguageContextProps {
  language: Language;
  setRussian: () => void;
  setGreek: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  const setRussian = () => {
    setLanguage('ru');
  };

  const setGreek = () => {
    setLanguage('el');
  };

  const translations = {
    ru: {
      home: 'Главная',
      history: 'История',
      geography: 'География',
      culture: 'Культура',
      politics: 'Политика',
      question: 'Вопрос',
      of: 'из',
      logInToSave: 'Войдите, чтобы сохранить свой прогресс',
      showExplanation: 'Показать объяснение',
      hideExplanation: 'Скрыть объяснение',
      nextQuestion: 'Следующий вопрос',
      correctAnswer: 'Правильный ответ',
      youAnsweredCorrectly: 'Вы ответили правильно!',
      incorrectAnswer: 'Неправильный ответ',
      tryAgainNextTime: 'Попробуйте в следующий раз.',
      testOnPolitics: 'Тест по политическому устройству Греции',
      checkYourKnowledgeAboutPolitics: 'Проверьте свои знания о политической системе, конституции и государственном устройстве Греции.',
      testOnCulture: 'Тест по культуре Греции',
      checkYourKnowledgeAboutCulture: 'Проверьте свои знания о греческой культуре, традициях, искусстве и повседневной жизни.',
    },
    el: {
      home: 'Αρχική σελίδα',
      history: 'Ιστορία',
      geography: 'Γεωγραφία',
      culture: 'Πολιτισμός',
      politics: 'Πολιτική',
      question: 'Ερώτηση',
      of: 'από',
      logInToSave: 'Συνδεθείτε για να αποθηκεύσετε την πρόοδό σας',
      showExplanation: 'Εμφάνιση εξήγησης',
      hideExplanation: 'Απόκρυψη εξήγησης',
      nextQuestion: 'Επόμενη ερώτηση',
      correctAnswer: 'Σωστή απάντηση',
      youAnsweredCorrectly: 'Απαντήσατε σωστά!',
      incorrectAnswer: 'Λανθασμένη απάντηση',
      tryAgainNextTime: 'Προσπαθήστε ξανά την επόμενη φορά.',
      testOnPolitics: 'Τεστ για το πολιτικό σύστημα της Ελλάδας',
      checkYourKnowledgeAboutPolitics: 'Ελέγξτε τις γνώσεις σας για το πολιτικό σύστημα, το σύνταγμα και τη δομή του κράτους της Ελλάδας.',
      testOnCulture: 'Τεστ για τον πολιτισμό της Ελλάδας',
      checkYourKnowledgeAboutCulture: 'Ελέγξτε τις γνώσεις σας για τον ελληνικό πολιτισμό, τις παραδόσεις, την τέχνη και την καθημερινή ζωή.',
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value: LanguageContextProps = {
    language,
    setRussian,
    setGreek,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
