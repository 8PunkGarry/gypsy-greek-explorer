
import React, { useState } from 'react';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TestCard from '@/components/ui/TestCard';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useLanguage } from '@/contexts/LanguageContext';

const Politics = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Politics questions
  const politicsQuestions = [
    {
      id: "politics-1",
      text: "Что такое Конституция?",
      options: [
        { 
          id: "a", 
          text: "Конституция — это высший Закон государства. Все остальные законы должны соответствовать ей. В ней 120 статей.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Конституция — это свод правил поведения граждан.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Конституция — это договор между гражданами и президентом.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Конституция — это документ, определяющий только права граждан.", 
          isCorrect: false 
        },
      ],
      explanation: "Конституция — это высший Закон государства. Все остальные законы должны соответствовать ей. В ней 120 статей.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-2",
      text: "Какое у Греции устройство государства и как вы его понимаете? Опишите его.",
      options: [
        { 
          id: "a", 
          text: "Наше устройство государства — это Республика с парламентской системой правления. Это означает, что у нас есть Президент Республики, который является высшим должностным лицом, избираемым Парламентом. Также есть Парламент, состоящий из 300 депутатов, которые выбираются народом и затем голосуют за Президента и законы. Имеется также Демократия, так как именно мы, народ, избираем депутатов.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Греция — это президентская республика, где президент имеет всю полноту власти.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Греция — это конституционная монархия с парламентом.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Греция — это федеративное государство, состоящее из автономных регионов.", 
          isCorrect: false 
        },
      ],
      explanation: "Наше устройство государства — это Республика с парламентской системой правления. Это означает, что у нас есть Президент Республики, который является высшим должностным лицом, избираемым Парламентом. Также есть Парламент, состоящий из 300 депутатов, которые выбираются народом и затем голосуют за Президента и законы. Имеется также Демократия, так как именно мы, народ, избираем депутатов.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-3",
      text: "Сколько видов выборов существует?",
      options: [
        { 
          id: "a", 
          text: "а) Президентские — Парламент выбирает Президента. б) Национальные (или парламентские) — народ выбирает депутатов. в) Муниципальные — народ выбирает мэров и губернаторов регионов. г) Европарламентские — народ выбирает 24 наших европейских депутата.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Существует только два вида выборов: парламентские и президентские.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Существует только один вид выборов - всенародные выборы.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "В Греции не проводятся выборы, все должностные лица назначаются.", 
          isCorrect: false 
        },
      ],
      explanation: "а) Президентские — Парламент выбирает Президента. б) Национальные (или парламентские) — народ выбирает депутатов. в) Муниципальные — народ выбирает мэров и губернаторов регионов. г) Европарламентские — народ выбирает 24 наших европейских депутата.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-4",
      text: "Какие высшие суды существуют в государстве?",
      options: [
        { 
          id: "a", 
          text: "— Верховный суд 'Ареопаг' для гражданских дел. — Совет госбезопасности для административных вопросов. — Контролирующий совет для финансовых вопросов.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "В Греции существует только один Верховный суд.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Европейский суд по правам человека является высшим судом Греции.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "В Греции нет высших судов, все судебные решения принимает парламент.", 
          isCorrect: false 
        },
      ],
      explanation: "— Верховный суд 'Ареопаг' для гражданских дел. — Совет госбезопасности для административных вопросов. — Контролирующий совет для финансовых вопросов.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-5",
      text: "За кого мы голосуем, и как появляется Премьер-министр?",
      options: [
        { 
          id: "a", 
          text: "Мы голосуем за депутатов, и та партия, которая получает 151 место в Парламенте, формирует Премьер-министра.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Мы голосуем напрямую за Премьер-министра.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Премьер-министра назначает Президент Республики.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Премьер-министра выбирают судьи Верховного суда.", 
          isCorrect: false 
        },
      ],
      explanation: "Мы голосуем за депутатов, и та партия, которая получает 151 место в Парламенте, формирует Премьер-министра.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-6",
      text: "Кто наш Премьер-министр и кто Президент Республики?",
      options: [
        { 
          id: "a", 
          text: "Премьер-министром является Кириакос Мицотакис, а Президентом — госпожа Сакелларопулу.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Премьер-министром является Алексис Ципрас, а Президентом — Прокопис Павлопулос.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Премьер-министром является Костас Караманлис, а Президентом — Костис Стефанопулос.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Премьер-министром является Антонис Самарас, а Президентом — Каролос Папульяс.", 
          isCorrect: false 
        },
      ],
      explanation: "Премьер-министром является Кириакос Мицотакис, а Президентом — госпожа Сакелларопулу.",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    }
  ];

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < politicsQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const restartTest = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setAnsweredQuestions(0);
  };

  const redirectToHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlurBackground />
        <Navbar />
        
        <main className="flex-grow pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-medium text-center">Требуется аккаунт</CardTitle>
                  <CardDescription className="text-center">
                    Для доступа к тестам необходимо создать аккаунт
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">
                    Создав аккаунт, вы сможете пройти все тесты по политике Греции
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={redirectToHome} variant="outline" className="mb-4">
                      Вернуться на главную страницу
                    </Button>
                    <UserAuthDialog />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {showResults ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-medium text-center">Результаты теста</CardTitle>
                  <CardDescription className="text-center">
                    Вы ответили правильно на {score} из {politicsQuestions.length} вопросов
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-greek-darkBlue mb-6">
                    {Math.round((score / politicsQuestions.length) * 100)}%
                  </p>
                  
                  <Button onClick={restartTest} className="mt-4">
                    Попробовать снова
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-medium text-gray-900">Политическое устройство Греции</h1>
                  <div className="text-gray-600">
                    Вопрос {currentQuestionIndex + 1} из {politicsQuestions.length}
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-greek-darkBlue h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestionIndex / politicsQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <TestCard
                  question={politicsQuestions[currentQuestionIndex]}
                  onNext={handleNext}
                  onAnswer={handleAnswer}
                  onComplete={() => {}}
                  currentQuestionNumber={currentQuestionIndex + 1}
                  totalQuestions={politicsQuestions.length}
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Politics;
