
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/ui/TestCard";
import { Question } from '@/types/questions';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';

const historyQuestions: Question[] = [
  {
    id: "1",
    category: "history",
    text: "Когда началась Греческая революция?",
    options: [
      { id: "a", text: "1821", isCorrect: true },
      { id: "b", text: "1804", isCorrect: false },
      { id: "c", text: "1832", isCorrect: false },
      { id: "d", text: "1776", isCorrect: false },
    ],
    explanation: "Греческая революция началась в 1821 году и привела к независимости Греции от Османской империи.",
  },
  {
    id: "2",
    category: "history",
    text: "Кто был первым премьер-министром Греции после обретения независимости?",
    options: [
      { id: "a", text: "Иоаннис Каподистриас", isCorrect: true },
      { id: "b", text: "Александрос Маврокордатос", isCorrect: false },
      { id: "c", text: "Константинос Канарис", isCorrect: false },
      { id: "d", text: "Теодорос Колокотронис", isCorrect: false },
    ],
    explanation: "Иоаннис Каподистриас был первым премьер-министром Греции, сыгравшим ключевую роль в формировании греческого государства.",
  },
  {
    id: "3",
    category: "history",
    text: "Какое событие считается началом Второй мировой войны?",
    options: [
      { id: "a", text: "Нападение Германии на Польшу", isCorrect: true },
      { id: "b", text: "Нападение Японии на Перл-Харбор", isCorrect: false },
      { id: "c", text: "Вторжение Италии в Эфиопию", isCorrect: false },
      { id: "d", text: "Аншлюс Австрии", isCorrect: false },
    ],
    explanation: "Нападение Германии на Польшу 1 сентября 1939 года традиционно считается началом Второй мировой войны.",
  },
  {
    id: "4",
    category: "history",
    text: "Кто был лидером Советского Союза во время Второй мировой войны?",
    options: [
      { id: "a", text: "Иосиф Сталин", isCorrect: true },
      { id: "b", text: "Владимир Ленин", isCorrect: false },
      { id: "c", text: "Никита Хрущев", isCorrect: false },
      { id: "d", text: "Леонид Брежнев", isCorrect: false },
    ],
    explanation: "Иосиф Сталин был лидером Советского Союза во время Второй мировой войны.",
  },
  {
    id: "5",
    category: "history",
    text: "Какое событие привело к вступлению США во Вторую мировую войну?",
    options: [
      { id: "a", text: "Нападение на Перл-Харбор", isCorrect: true },
      { id: "b", text: "Нападение Германии на Польшу", isCorrect: false },
      { id: "c", text: "Битва за Британию", isCorrect: false },
      { id: "d", text: "Вторжение в Нормандию", isCorrect: false },
    ],
    explanation: "Нападение японской авиации на Перл-Харбор 7 декабря 1941 года привело к вступлению США во Вторую мировую войну.",
  },
];

const History = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['historyQuestions'],
    queryFn: () => Promise.resolve(historyQuestions),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load questions. Please try again.");
    }
  }, [isError]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (data?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTestComplete(true);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  if (isError) {
    return <div className="text-center py-8">Failed to load questions. Please try again.</div>;
  }

  if (isTestComplete) {
    return (
      <div className="relative min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-greek-darkBlue">История Греции</h1>
              <p className="text-lg text-gray-600">Ключевые события и их значение для греческой идентичности</p>
            </div>
            <div className="flex items-center gap-4">
              <UserAuthDialog />
            </div>
          </div>
          <Card className="w-full max-w-3xl mx-auto shadow-soft animate-fadeIn">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-semibold text-green-500 mb-4">Тест завершен!</h2>
              <p className="text-gray-700">Вы успешно прошли все вопросы по истории Греции.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-greek-darkBlue">История Греции</h1>
            <p className="text-lg text-gray-600">Ключевые события и их значение для греческой идентичности</p>
          </div>
          <div className="flex items-center gap-4">
            <UserAuthDialog />
          </div>
        </div>

        {data && data.length > 0 && (
          <TestCard
            question={data[currentQuestionIndex]}
            onNext={handleNextQuestion}
          />
        )}
      </div>
    </div>
  );
};

export default History;
