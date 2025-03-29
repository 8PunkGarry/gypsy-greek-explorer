
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

const Interview = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Simple practice questions
  const practiceQuestions = [
    {
      id: "practice-1",
      text: "Вопрос 1",
      options: [
        { id: "a", text: "Вариант A", isCorrect: false },
        { id: "b", text: "Вариант B", isCorrect: true },
        { id: "c", text: "Вариант C", isCorrect: false },
        { id: "d", text: "Вариант D", isCorrect: false },
      ],
      explanation: "Объяснение к вопросу 1",
      category: "history" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "practice-2",
      text: "Вопрос 2",
      options: [
        { id: "a", text: "Вариант A", isCorrect: false },
        { id: "b", text: "Вариант B", isCorrect: false },
        { id: "c", text: "Вариант C", isCorrect: true },
        { id: "d", text: "Вариант D", isCorrect: false },
      ],
      explanation: "Объяснение к вопросу 2",
      category: "history" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "practice-3",
      text: "Вопрос 3",
      options: [
        { id: "a", text: "Вариант A", isCorrect: false },
        { id: "b", text: "Вариант B", isCorrect: false },
        { id: "c", text: "Вариант C", isCorrect: false },
        { id: "d", text: "Вариант D", isCorrect: true },
      ],
      explanation: "Объяснение к вопросу 3",
      category: "history" as "history" | "geography" | "culture" | "politics"
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
    if (nextIndex < practiceQuestions.length) {
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
                    Создав аккаунт, вы сможете пройти все тесты подготовки к собеседованию
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
                  <CardTitle className="text-2xl font-medium text-center">Результаты практики</CardTitle>
                  <CardDescription className="text-center">
                    Вы ответили правильно на {score} из {practiceQuestions.length} вопросов
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-greek-darkBlue mb-6">
                    {Math.round((score / practiceQuestions.length) * 100)}%
                  </p>
                  
                  <Button onClick={restartTest} className="mt-4">
                    Попробовать снова
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-medium text-gray-900">Практика</h1>
                  <div className="text-gray-600">
                    Вопрос {currentQuestionIndex + 1} из {practiceQuestions.length}
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-greek-darkBlue h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestionIndex / practiceQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <TestCard
                  question={practiceQuestions[currentQuestionIndex]}
                  onNext={handleNext}
                  onAnswer={handleAnswer}
                  onComplete={() => {}}
                  currentQuestionNumber={currentQuestionIndex + 1}
                  totalQuestions={practiceQuestions.length}
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

export default Interview;
