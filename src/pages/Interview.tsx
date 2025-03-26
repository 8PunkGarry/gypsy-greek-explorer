import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurBackground from '@/components/ui/BlurBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, UserCircle, UserRound, MessageCircle, RotateCw, XCircle, Upload, Filter } from 'lucide-react';
import { toast } from "sonner";
import TestCard from '@/components/ui/TestCard';
import QuestionUploader from '@/components/ui/QuestionUploader';

// Типы вопросов для симуляции собеседования
interface InterviewQuestion {
  id: string;
  category: 'history' | 'geography' | 'culture' | 'politics';
  text: string;
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  explanation: string;
  type: 'multiple-choice' | 'open-ended';
}

const defaultInterviewQuestions: InterviewQuestion[] = [
  // История
  {
    id: 'hist1',
    category: 'history',
    text: 'Когда Греция получила независимость от Османской империи?',
    options: [
      { id: 'h1a', text: '1821 (начало войны за независимость)', isCorrect: false },
      { id: 'h1b', text: '1830 (Лондонский протокол)', isCorrect: true },
      { id: 'h1c', text: '1832 (Константинопольский договор)', isCorrect: false },
      { id: 'h1d', text: '1834 (перенос столицы в Афины)', isCorrect: false },
    ],
    explanation: 'Хотя Греческая война за независимость началась в 1821 году, официально независимость была признана в 1830 году с подписанием Лондонского протокола.',
    type: 'multiple-choice'
  },
  {
    id: 'hist2',
    category: 'history',
    text: 'Что означает "День Охи" (ΟΧИ) и когда его отмечают?',
    options: [
      { id: 'h2a', text: '28 октября, день отказа Греции подчиниться фашистской Италии', isCorrect: true },
      { id: 'h2b', text: '25 марта, начало восстания против османского владычества', isCorrect: false },
      { id: 'h2c', text: '17 ноября, день восстания студентов против военной хунты', isCorrect: false },
      { id: 'h2d', text: '3 сентября, день принятия первой конституции', isCorrect: false },
    ],
    explanation: '"День Охи" (День "Нет") отмечается 28 октября в память о решительном отказе премьер-министра Иоанниса Метаксаса подчиниться ультиматуму Муссолини в 1940 году.',
    type: 'multiple-choice'
  },
  // География
  {
    id: 'geo1',
    category: 'geography',
    text: 'Какой самый крупный остров Греции?',
    options: [
      { id: 'g1a', text: 'Крит', isCorrect: true },
      { id: 'g1b', text: 'Родос', isCorrect: false },
      { id: 'g1c', text: 'Корфу', isCorrect: false },
      { id: 'g1d', text: 'Санторини', isCorrect: false },
    ],
    explanation: 'Крит – самый большой греческий остров с площадью около 8,336 км². Он имеет богатую историю, включая минойскую цивилизацию, и является важным культурным и туристическим центром Греции.',
    type: 'multiple-choice'
  },
  // Культура
  {
    id: 'cult1',
    category: 'culture',
    text: 'Ка��ой танец считается неофициальным национальным танцем Греции?',
    options: [
      { id: 'c1a', text: 'Сиртаки', isCorrect: true },
      { id: 'c1b', text: 'Каламатьянос', isCorrect: false },
      { id: 'c1c', text: 'Зейбекико', isCorrect: false },
      { id: 'c1d', text: 'Хасапико', isCorrect: false },
    ],
    explanation: 'Сиртаки, хотя и сравнительно новый танец (созданный для фильма "Грек Зорба" в 1964 году), стал наиболее узнаваемым греческим танцем в мире и символом греческой культуры.',
    type: 'multiple-choice'
  },
  // Политика
  {
    id: 'pol1',
    category: 'politics',
    text: 'Какая форма правления в Греции?',
    options: [
      { id: 'p1a', text: 'Парламентская республика', isCorrect: true },
      { id: 'p1b', text: 'Конституционная монархия', isCorrect: false },
      { id: 'p1c', text: 'Президентская республика', isCorrect: false },
      { id: 'p1d', text: 'Федеративная республика', isCorrect: false },
    ],
    explanation: 'Греция является парламентской республикой с 1975 года, после падения военной диктатуры. Глава государства – президент, а правительство возглавляет премьер-министр.',
    type: 'multiple-choice'
  },
  // Открытые вопросы
  {
    id: 'open1',
    category: 'culture',
    text: 'Почему сохранение греческого языка и культуры важно для вас?',
    correctAnswer: 'Это открытый вопрос, направленный на ваше личное отношение к греческой культуре и языку.',
    explanation: 'На собеседовании важно показать искреннюю связь с греческой культурой и языком. Можно рассказать о личном интересе к истории Греции, значимости сохранения культурного наследия, желании передать традиции следующим поколениям.',
    type: 'open-ended'
  },
  {
    id: 'open2',
    category: 'politics',
    text: 'Как вы понимаете обязанности гражданина Греции?',
    correctAnswer: 'Этот вопрос проверяет ваше понимание гражданских обязанностей.',
    explanation: 'Хороший ответ включает: уважение к законам страны, участие в демократических процессах (голосование), уплата налогов, защита национальных интересов, сохранение культурного наследия, участие в общественной жизни.',
    type: 'open-ended'
  },
];

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{questionId: string, response: string, correct?: boolean}[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(defaultInterviewQuestions);
  const [customQuestions, setCustomQuestions] = useState<InterviewQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<InterviewQuestion[]>(defaultInterviewQuestions);
  
  const currentQuestion = activeQuestions[currentQuestionIndex];

  useEffect(() => {
    // Retrieve saved custom questions from localStorage, if any
    const savedQuestions = localStorage.getItem('customInterviewQuestions');
    if (savedQuestions) {
      try {
        const parsedQuestions = JSON.parse(savedQuestions);
        setCustomQuestions(parsedQuestions);
      } catch (e) {
        console.error("Error parsing saved questions:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save custom questions to localStorage whenever they change
    localStorage.setItem('customInterviewQuestions', JSON.stringify(customQuestions));
  }, [customQuestions]);

  useEffect(() => {
    // Filter questions based on selected category
    let filteredQuestions = [...interviewQuestions, ...customQuestions];
    
    if (selectedCategory) {
      filteredQuestions = filteredQuestions.filter(q => q.category === selectedCategory);
    }
    
    setActiveQuestions(filteredQuestions);
    // Reset index if needed
    if (currentQuestionIndex >= filteredQuestions.length) {
      setCurrentQuestionIndex(0);
    }
  }, [selectedCategory, interviewQuestions, customQuestions, currentQuestionIndex]);

  const handleStartInterview = () => {
    setInterviewStarted(true);
    toast.success("Симуляция собеседования началась", {
      description: "Отвечайте на вопросы как на реальном собеседовании"
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setCurrentAnswer('');
    } else {
      setInterviewComplete(true);
      toast.success("Собеседование завершено!", {
        description: "Вы ответили на все вопросы. Вы можете просмотреть свои результаты."
      });
    }
  };

  const handleMultipleChoiceAnswer = (wasCorrect: boolean) => {
    setResponses(prev => [...prev, {
      questionId: currentQuestion.id,
      response: '',
      correct: wasCorrect
    }]);
  };

  const handleOpenEndedSubmit = () => {
    if (currentAnswer.trim()) {
      setResponses(prev => [...prev, {
        questionId: currentQuestion.id,
        response: currentAnswer
      }]);
      toast.info("Ответ записан");
      
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      toast.error("Пожалуйста, введите ваш ответ");
    }
  };

  const restartInterview = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setInterviewComplete(false);
    setCurrentAnswer('');
    toast.info("Начинаем собеседование заново");
  };

  const handleAddQuestion = (newQuestion: InterviewQuestion) => {
    setCustomQuestions(prev => [...prev, newQuestion]);
  };

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setInterviewComplete(false);
    
    if (category) {
      toast.info(`Выбрана категория: ${
        category === 'history' ? 'История' :
        category === 'geography' ? 'География' :
        category === 'culture' ? 'Культура' : 'Политика'
      }`);
    } else {
      toast.info("Выбраны все категории");
    }
  };

  const getCorrectAnswersCount = () => {
    return responses.filter(r => r.correct === true).length;
  };

  const getMultipleChoiceQuestionsCount = () => {
    return activeQuestions.filter(q => q.type === 'multiple-choice').length;
  };

  const getCategoryQuestionsCount = (category: string) => {
    return [...interviewQuestions, ...customQuestions].filter(q => q.category === category).length;
  };

  const getCustomQuestionsCount = () => {
    return customQuestions.length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
              Симуляция собеседования
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Проверьте свою готовность к реальному собеседованию на получение греческого гражданства с помощью нашей интерактивной симуляции.
            </p>
          </div>
          
          {!interviewStarted && !interviewComplete && (
            <>
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Фильтр по категории:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedCategory === null ? "default" : "outline"} 
                      onClick={() => handleSelectCategory(null)}
                      className="rounded-full"
                      size="sm"
                    >
                      Все ({interviewQuestions.length + customQuestions.length})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'history' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('history')}
                      className="rounded-full"
                      size="sm"
                    >
                      История ({getCategoryQuestionsCount('history')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'geography' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('geography')}
                      className="rounded-full"
                      size="sm"
                    >
                      География ({getCategoryQuestionsCount('geography')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'culture' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('culture')}
                      className="rounded-full"
                      size="sm"
                    >
                      Культура ({getCategoryQuestionsCount('culture')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'politics' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('politics')}
                      className="rounded-full"
                      size="sm"
                    >
                      Политика ({getCategoryQuestionsCount('politics')})
                    </Button>
                  </div>
                </div>

                {getCustomQuestionsCount() > 0 && (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-green-800 mb-1">Пользовательские вопросы</h3>
                    <p className="text-green-700 mb-2">У вас есть {getCustomQuestionsCount()} собственных вопросов.</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <QuestionUploader onQuestionAdd={handleAddQuestion} />
                  
                  {selectedCategory && (
                    <QuestionUploader 
                      onQuestionAdd={handleAddQuestion} 
                      category={selectedCategory as 'history' | 'geography' | 'culture' | 'politics'} 
                    />
                  )}
                </div>
              </div>
            
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>О симуляции собеседования</CardTitle>
                    <CardDescription>Как подготовиться и что ожидать</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>Эта симуляция содержит примерные вопросы, которые вам могут задать на реальном собеседовании при получении греческого гражданства.</p>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Симуляция включает:</h3>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Вопросы с выбором ответа по истории, географии, политике и культуре</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Открытые вопросы, требующие развернутого ответа</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Подробные объяснения и рекомендации по ответам</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>Возможность добавить свои собственные вопросы</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" onClick={() => navigate('/history')}>Повторить материал</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-greek-darkBlue/5 border-greek-darkBlue/20">
                  <CardHeader>
                    <CardTitle>Готовы начать?</CardTitle>
                    <CardDescription>Проверьте свои знания о Греции</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6">Симуляция включает {getMultipleChoiceQuestionsCount()} вопросов с выбором ответа и {activeQuestions.length - getMultipleChoiceQuestionsCount()} открытых вопросов.</p>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-amber-800">Совет:</h3>
                      <p className="text-amber-700">Отвечайте на вопросы так, как если бы вы были на настоящем собеседовании. Помните, что в открытых вопросах важно показать свою связь с греческой культурой и ценностями.</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleStartInterview}
                      className="w-full bg-greek-darkBlue hover:bg-greek-darkBlue/90"
                      disabled={activeQuestions.length === 0}
                    >
                      Начать симуляцию <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </>
          )}
          
          {interviewStarted && !interviewComplete && activeQuestions.length > 0 && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-500">
                  Вопрос {currentQuestionIndex + 1} из {activeQuestions.length}
                </span>
                <span className="bg-greek-darkBlue/10 text-greek-darkBlue px-3 py-1 rounded-full text-sm font-medium">
                  Категория: {
                    currentQuestion.category === 'history' ? 'История' :
                    currentQuestion.category === 'geography' ? 'География' :
                    currentQuestion.category === 'culture' ? 'Культура' : 'Политика'
                  }
                </span>
              </div>
              
              {currentQuestion.type === 'multiple-choice' ? (
                <TestCard 
                  question={currentQuestion as any}
                  onAnswer={handleMultipleChoiceAnswer}
                  onComplete={handleNextQuestion}
                  className="mb-8"
                />
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-soft p-6 mb-8">
                  <div className="flex items-start mb-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-greek-blue/20 text-greek-darkBlue mr-4">
                      <UserRound size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-3">{currentQuestion.text}</h3>
                      <p className="text-gray-600 mb-2">Это открытый вопрос. Напишите развернутый ответ, как на реальном собеседовании.</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <textarea 
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-greek-blue focus:border-transparent"
                      placeholder="Введите ваш ответ здесь..."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleOpenEndedSubmit}
                      className="bg-greek-darkBlue hover:bg-greek-darkBlue/90"
                    >
                      Отправить ответ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {interviewComplete && (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-8">
                <CardHeader className="bg-greek-blue/5 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Результаты собеседования</CardTitle>
                      <CardDescription>Ваша подготовка к получению греческого гражданства</CardDescription>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-green-50 border-4 border-green-500 flex items-center justify-center text-xl font-bold text-green-700">
                      {getCorrectAnswersCount()}/{getMultipleChoiceQuestionsCount()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Тестовые вопросы</h3>
                  
                  <div className="space-y-4 mb-8">
                    {responses.filter(r => r.correct !== undefined).map((response, index) => {
                      const question = activeQuestions.find(q => q.id === response.questionId);
                      return (
                        <div key={response.questionId} className={`p-4 rounded-lg border ${response.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                          <div className="flex items-center">
                            {response.correct ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            )}
                            <span className="font-medium">{question?.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-medium mb-4">Открытые вопросы</h3>
                  
                  <div className="space-y-6">
                    {responses.filter(r => r.correct === undefined).map((response) => {
                      const question = activeQuestions.find(q => q.id === response.questionId);
                      return (
                        <div key={response.questionId} className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="bg-gray-50 p-4 border-b">
                            <span className="font-medium">{question?.text}</span>
                          </div>
                          <div className="p-4">
                            <div className="flex items-start mb-4">
                              <UserCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                              <span className="text-gray-700">{response.response}</span>
                            </div>
                            
                            <div className="bg-blue-50 border border-blue-100 rounded p-4">
                              <div className="flex items-start">
                                <MessageCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-blue-700 mb-1">Рекомендация:</p>
                                  <p className="text-blue-700">{question?.explanation}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={restartInterview}>
                    <RotateCw className="mr-2 h-4 w-4" /> Начать заново
                  </Button>
                  <Button onClick={() => navigate('/')}>
                    Вернуться на главную
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interview;
