
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurBackground from '@/components/ui/BlurBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle, Clock, Lightbulb } from 'lucide-react';
import { toast } from "sonner";
import TestCard from '@/components/ui/TestCard';

const History = () => {
  // Исторические вопросы для тестирования
  const historyQuestions = [
    {
      id: 'h1',
      text: 'В каком году началась Греческая война за независимость?',
      options: [
        { id: 'a', text: '1821', isCorrect: true },
        { id: 'b', text: '1832', isCorrect: false },
        { id: 'c', text: '1801', isCorrect: false },
        { id: 'd', text: '1840', isCorrect: false },
      ],
      explanation: 'Греческая война за независимость началась в 1821 году и продолжалась до 1832 года, когда была признана независимость Греции от Османской империи.'
    },
    {
      id: 'h2',
      text: 'Кто был первым президентом независимой Греции?',
      options: [
        { id: 'a', text: 'Иоаннис Каподистрия', isCorrect: true },
        { id: 'b', text: 'Теодорос Колокотронис', isCorrect: false },
        { id: 'c', text: 'Георгиос Папандреу', isCorrect: false },
        { id: 'd', text: 'Александрос Маврокордатос', isCorrect: false },
      ],
      explanation: 'Иоаннис Каподистрия был первым главой независимого греческого государства с 1828 по 1831 год, до своего убийства.'
    },
    {
      id: 'h3',
      text: 'Что такое "День Охи" и когда его отмечают?',
      options: [
        { id: 'a', text: '28 октября, день отказа Греции подчиниться ультиматуму Муссолини', isCorrect: true },
        { id: 'b', text: '25 марта, день начала войны за независимость', isCorrect: false },
        { id: 'c', text: '17 ноября, день восстания студентов против хунты', isCorrect: false },
        { id: 'd', text: '1 января, день вступления Греции в ЕС', isCorrect: false },
      ],
      explanation: '"День Охи" (День "Нет") отмечается 28 октября в память о том, как в 1940 году греческий премьер-министр Метаксас ответил отказом на ультиматум Муссолини.'
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < historyQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      toast.success("Вы завершили все вопросы по истории!", {
        description: "Вы можете продолжить изучение или перейти к другим темам."
      });
    }
  };

  const handleQuestionCompleted = (questionId: string) => {
    if (!completedQuestions.includes(questionId)) {
      setCompletedQuestions(prev => [...prev, questionId]);
    }
    
    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
              История Греции
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              От древних времён до современности — изучите ключевые исторические события, 
              которые сформировали греческую идентичность и культуру.
            </p>
          </div>
          
          <Tabs defaultValue="learning" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="learning" className="text-base">
                <BookOpen className="w-4 h-4 mr-2" /> Обучение
              </TabsTrigger>
              <TabsTrigger value="practice" className="text-base">
                <CheckCircle className="w-4 h-4 mr-2" /> Практика
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="learning" className="space-y-8">
              {/* Блок с историческими периодами */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <HistoricalPeriodCard 
                  title="Древняя Греция" 
                  period="3000 до н.э. - 146 до н.э."
                  description="Колыбель европейской цивилизации, эпоха полисов, философии и демократии."
                  highlights={["Золотой век Афин (V век до н.э.)", "Александр Македонский", "Греко-персидские войны"]}
                />
                
                <HistoricalPeriodCard 
                  title="Византийский период" 
                  period="330 - 1453"
                  description="Греция как часть Византийской империи, распространение христианства."
                  highlights={["Православие становится государственной религией", "Расцвет искусства и архитектуры", "Падение Константинополя"]}
                />
              </div>
              
              <Separator className="my-8" />
              
              {/* Ключевые события современной истории */}
              <div>
                <h3 className="text-2xl font-medium mb-6">Ключевые события современной истории</h3>
                
                <div className="space-y-6">
                  <HistoricalEventCard 
                    year="1821-1832"
                    title="Греческая война за независимость"
                    description="Восстание против Османской империи привело к созданию современного греческого государства."
                    importance="Это событие отмечается как День независимости Греции 25 марта. Оно символизирует возрождение греческой нации после почти 400 лет османского владычества."
                  />
                  
                  <HistoricalEventCard 
                    year="1940-1941"
                    title="День Охи и Итало-греческая война"
                    description="28 октября 1940 года премьер-министр Метаксас ответил 'Охи' (Нет) на ультиматум Муссолини."
                    importance="День Охи — один из важнейших национальных праздников, символизирующий сопротивление фашизму и национальную гордость греков."
                  />
                  
                  <HistoricalEventCard 
                    year="1967-1974"
                    title="Режим 'черных полковников'"
                    description="Военная хунта, свергнувшая правительство и установившая диктатуру."
                    importance="Падение хунты 24 июля 1974 года отмечается как восстановление демократии в Греции. 17 ноября — день памяти восстания в Афинском Политехническом университете против диктатуры."
                  />
                  
                  <HistoricalEventCard 
                    year="1981"
                    title="Вступление в Европейское Экономическое Сообщество"
                    description="Греция присоединилась к ЕЭС (предшественнику ЕС)."
                    importance="Это событие обозначило новую эпоху в истории страны, интеграцию с Европой и экономические перспективы."
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="practice" className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-soft p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-greek-darkBlue mr-2" />
                    <h3 className="text-xl font-medium">Проверьте свои знания</h3>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Вопрос {currentQuestionIndex + 1} из {historyQuestions.length}
                  </div>
                </div>
                
                <TestCard 
                  question={historyQuestions[currentQuestionIndex]}
                  onComplete={() => handleQuestionCompleted(historyQuestions[currentQuestionIndex].id)}
                />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-4">
                    <Lightbulb size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">Совет для собеседования</h4>
                    <p className="text-gray-600">
                      Помните, что во время собеседования важно не только знать даты, но и понимать 
                      значение исторических событий для греческой идентичности. Будьте готовы объяснить, 
                      почему День Охи или Война за независимость важны для современных греков.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="my-12 text-center">
            <h3 className="text-2xl font-medium mb-6">Хотите добавить свои вопросы?</h3>
            <button 
              className="px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              onClick={() => {
                window.location.href = "/questions";
              }}
            >
              Перейти к загрузке вопросов
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Компонент карточки исторического периода
const HistoricalPeriodCard = ({ 
  title, 
  period, 
  description, 
  highlights 
}: { 
  title: string;
  period: string;
  description: string;
  highlights: string[];
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-soft p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mr-4">
          <Clock size={24} />
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{period}</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <h4 className="text-sm font-medium text-gray-700 mb-2">Ключевые события:</h4>
      <ul className="space-y-1">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="text-greek-darkBlue mr-2">•</span>
            <span className="text-gray-600">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Компонент карточки исторического события
const HistoricalEventCard = ({ 
  year, 
  title, 
  description, 
  importance 
}: { 
  year: string;
  title: string;
  description: string;
  importance: string;
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-soft p-6">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-1/5 mb-4 md:mb-0">
          <div className="inline-block px-4 py-2 rounded-full bg-greek-blue/10 text-greek-darkBlue font-semibold">
            {year}
          </div>
        </div>
        
        <div className="md:w-4/5">
          <h4 className="text-xl font-medium text-gray-900 mb-2">{title}</h4>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="bg-gray-50 rounded p-4 border-l-4 border-greek-darkBlue">
            <h5 className="text-sm font-medium uppercase text-gray-500 mb-1">Почему это важно:</h5>
            <p className="text-gray-700">{importance}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
