
import React, { useState, useEffect } from 'react';
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
import { Question } from '@/types/questions';

const Politics = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Original questions data
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
          text: "Греция — это президентская республика, в которой Президент избирается всенародным голосованием и обладает исполнительной властью. Он формирует правительство и назначает министров. Парламент состоит из 250 депутатов и выполняет законодательную функцию, но не может влиять на состав правительства. Президент имеет право вето на законы.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Греция — это конституционная монархия с парламентом. Король является главой государства, но его власть ограничена конституцией. Парламент состоит из двух палат: Сената (верхняя палата) и Национального собрания (нижняя палата). Премьер-министр назначается королем из числа лидеров партий и руководит правительством.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Греция — это федеративное государство, разделенное на 13 автономных регионов, каждый из которых имеет свой парламент и правительство. Центральное правительство во главе с Премьер-министром решает только вопросы обороны, внешней политики и экономики, а все остальные полномочия делегированы регионам.", 
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
          text: "В греческой политической системе существуют четыре вида выборов: президентские (когда Парламент избирает главу государства), национальные или парламентские (когда граждане выбирают депутатов в законодательный орган), муниципальные (для избрания местных руководителей и губернаторов) и европарламентские (для выбора представителей страны в Европейский парламент, всего 24 депутата).", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "В Греции существуют три вида выборов: всеобщие парламентские выборы, которые проводятся раз в четыре года для избрания 300 депутатов; президентские выборы, на которых все граждане напрямую голосуют за кандидатов в президенты; и региональные выборы, которые проводятся для избрания губернаторов и местных советов в 13 регионах страны. Представители в Европарламент назначаются правительством.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Греческая избирательная система включает только два типа выборов: национальные парламентские выборы, проводимые каждые пять лет для избрания 350 депутатов по пропорциональной системе, и объединенные местные выборы, на которых одновременно избираются мэры, губернаторы и члены региональных советов. Президента избирает специальная коллегия выборщиков, а европейские депутаты назначаются парламентом.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "В современной Греции существует единая избирательная система, основанная на принципе всеобщих выборов, проводимых каждые четыре года. В ходе этих выборов граждане одновременно голосуют за кандидатов в парламент, президенты, местные органы власти и представителей в Европарламент с использованием электронной системы голосования, внедренной в 2018 году для упрощения процесса.", 
          isCorrect: false 
        },
      ],
      explanation: "<div className='space-y-2'><p className='font-medium'>В Греции существует четыре вида выборов:</p><ul className='list-disc pl-5 space-y-1'><li><span className='font-medium'>Президентские выборы</span> — Парламент выбирает Президента Республики</li><li><span className='font-medium'>Национальные (парламентские) выборы</span> — граждане выбирают депутатов в Парламент</li><li><span className='font-medium'>Муниципальные выборы</span> — граждане выбирают мэров и губернаторов регионов</li><li><span className='font-medium'>Европарламентские выборы</span> — граждане выбирают 24 представителя страны в Европейский парламент</li></ul></div>",
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-4",
      text: "Какие высшие суды существуют в государстве?",
      options: [
        { 
          id: "a", 
          text: "— Верховный суд 'Ареопаг' для гражданских дел.\n— Совет госбезопасности для административных вопросов.\n— Контролирующий совет для финансовых вопросов.", 
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
      explanation: "<div className='space-y-2'><p className='font-medium'>В Греции существуют три высших суда:</p><ul className='list-disc pl-5 space-y-1'><li><span className='font-medium'>Верховный суд 'Ареопаг'</span> — для гражданских и уголовных дел</li><li><span className='font-medium'>Совет госбезопасности</span> — для административных вопросов</li><li><span className='font-medium'>Контролирующий совет</span> — для финансовых вопросов</li></ul></div>",
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

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle questions and their options on component mount
  useEffect(() => {
    // Create a deep copy of questions with shuffled options
    const questionsWithShuffledOptions = politicsQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));

    // Shuffle the questions themselves
    setShuffledQuestions(shuffleArray(questionsWithShuffledOptions));
    
    // Reset states
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions(0);
  }, []);

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const restartTest = () => {
    // Re-shuffle questions and options when restarting
    const questionsWithShuffledOptions = politicsQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    setShuffledQuestions(shuffleArray(questionsWithShuffledOptions));
    
    // Reset states
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

  // Guard clause for when questions haven't been shuffled yet
  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlurBackground />
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greek-darkBlue"></div>
              </div>
              <p className="text-center mt-4">Загрузка вопросов...</p>
            </CardContent>
          </Card>
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
                    Вы ответили правильно на {score} из {shuffledQuestions.length} вопросов
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-greek-darkBlue mb-6">
                    {Math.round((score / shuffledQuestions.length) * 100)}%
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
                    Вопрос {currentQuestionIndex + 1} из {shuffledQuestions.length}
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-greek-darkBlue h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestionIndex / shuffledQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <TestCard
                  question={shuffledQuestions[currentQuestionIndex]}
                  onNext={handleNext}
                  onAnswer={handleAnswer}
                  onComplete={() => {}}
                  currentQuestionNumber={currentQuestionIndex + 1}
                  totalQuestions={shuffledQuestions.length}
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

