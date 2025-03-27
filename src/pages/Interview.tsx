
import React, { useState } from 'react';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TestCard from '@/components/ui/TestCard';

const Interview = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  
  // Example practice questions
  const practiceQuestions = [
    {
      id: "practice-1",
      text: "Какой была основная форма правления в Древней Греции?",
      options: [
        { id: "p1-a", text: "Монархия", isCorrect: false },
        { id: "p1-b", text: "Демократия", isCorrect: true },
        { id: "p1-c", text: "Коммунизм", isCorrect: false },
        { id: "p1-d", text: "Теократия", isCorrect: false },
      ],
      explanation: "Древняя Греция, особенно Афины, известна как колыбель демократии. Хотя там существовали и другие формы правления, демократия была инновационной формой, которая оказала огромное влияние на современные политические системы.",
      category: "history" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "practice-2",
      text: "Какой греческий остров является самым большим?",
      options: [
        { id: "p2-a", text: "Санторини", isCorrect: false },
        { id: "p2-b", text: "Миконос", isCorrect: false },
        { id: "p2-c", text: "Крит", isCorrect: true },
        { id: "p2-d", text: "Родос", isCorrect: false },
      ],
      explanation: "Крит — самый большой греческий остров с площадью около 8,336 км². Он известен своей древней минойской цивилизацией и богатым историческим наследием.",
      category: "geography" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "practice-3",
      text: "Кто из следующих НЕ является греческим философом?",
      options: [
        { id: "p3-a", text: "Сократ", isCorrect: false },
        { id: "p3-b", text: "Платон", isCorrect: false },
        { id: "p3-c", text: "Цицерон", isCorrect: true },
        { id: "p3-d", text: "Аристотель", isCorrect: false },
      ],
      explanation: "Цицерон был древнеримским государственным деятелем, оратором и философом, а не греческим философом. Сократ, Платон и Аристотель — знаменитые древнегреческие философы.",
      category: "culture" as "history" | "geography" | "culture" | "politics"
    }
  ];

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleComplete = () => {
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
                  onAnswer={handleAnswer}
                  onComplete={handleComplete}
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
