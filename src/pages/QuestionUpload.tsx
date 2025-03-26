
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurBackground from '@/components/ui/BlurBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, History as HistoryIcon, Globe, Coffee, Landmark } from 'lucide-react';
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

const QuestionUpload = () => {
  const [customQuestions, setCustomQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'history' | 'geography' | 'culture' | 'politics'>('history');

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

  const handleAddQuestion = (newQuestion: InterviewQuestion) => {
    const updatedQuestions = [...customQuestions, newQuestion];
    setCustomQuestions(updatedQuestions);
    localStorage.setItem('customInterviewQuestions', JSON.stringify(updatedQuestions));
    toast.success("Вопрос успешно добавлен", {
      description: `Добавлен новый вопрос в категорию: ${getCategoryName(newQuestion.category)}`
    });
  };

  const handleDeleteAllQuestions = (category: 'history' | 'geography' | 'culture' | 'politics' | null) => {
    if (category) {
      // Delete all questions in specific category
      const filteredQuestions = customQuestions.filter(q => q.category !== category);
      setCustomQuestions(filteredQuestions);
      localStorage.setItem('customInterviewQuestions', JSON.stringify(filteredQuestions));
      toast.success(`Все вопросы в категории ${getCategoryName(category)} удалены`);
    } else {
      // Delete all questions
      setCustomQuestions([]);
      localStorage.setItem('customInterviewQuestions', JSON.stringify([]));
      toast.success("Все вопросы удалены");
    }
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case 'history': return 'История';
      case 'geography': return 'География';
      case 'culture': return 'Культура';
      case 'politics': return 'Политика';
      default: return category;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'history': return <HistoryIcon className="h-5 w-5" />;
      case 'geography': return <Globe className="h-5 w-5" />;
      case 'culture': return <Coffee className="h-5 w-5" />;
      case 'politics': return <Landmark className="h-5 w-5" />;
      default: return <Upload className="h-5 w-5" />;
    }
  };

  const getCategoryQuestionsCount = (category: string): number => {
    return customQuestions.filter(q => q.category === category).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
              Загрузка вопросов
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Создайте свои собственные вопросы для симуляции собеседования на получение греческого гражданства
            </p>
          </div>
          
          <Tabs defaultValue="history" className="mb-12">
            <TabsList className="w-full mb-6">
              <TabsTrigger 
                value="history" 
                onClick={() => setSelectedCategory('history')}
                className="flex-1 gap-2"
              >
                <HistoryIcon className="h-4 w-4" />
                История ({getCategoryQuestionsCount('history')})
              </TabsTrigger>
              <TabsTrigger 
                value="geography" 
                onClick={() => setSelectedCategory('geography')}
                className="flex-1 gap-2"
              >
                <Globe className="h-4 w-4" />
                География ({getCategoryQuestionsCount('geography')})
              </TabsTrigger>
              <TabsTrigger 
                value="culture" 
                onClick={() => setSelectedCategory('culture')}
                className="flex-1 gap-2"
              >
                <Coffee className="h-4 w-4" />
                Культура ({getCategoryQuestionsCount('culture')})
              </TabsTrigger>
              <TabsTrigger 
                value="politics" 
                onClick={() => setSelectedCategory('politics')}
                className="flex-1 gap-2"
              >
                <Landmark className="h-4 w-4" />
                Политика ({getCategoryQuestionsCount('politics')})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HistoryIcon className="h-5 w-5" />
                    Вопросы по истории Греции
                  </CardTitle>
                  <CardDescription>
                    Создавайте вопросы о важных исторических событиях, датах и личностях в истории Греции
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuestionUploader 
                    onQuestionAdd={handleAddQuestion} 
                    category="history" 
                  />
                  
                  {getCategoryQuestionsCount('history') > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Созданные вопросы ({getCategoryQuestionsCount('history')})</h3>
                      <div className="space-y-3">
                        {customQuestions
                          .filter(q => q.category === 'history')
                          .map((question) => (
                            <div key={question.id} className="p-4 border rounded-md bg-white">
                              <div className="font-medium">{question.text}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Тип: {question.type === 'multiple-choice' ? 'С вариантами ответа' : 'Открытый вопрос'}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteAllQuestions('history')}
                          className="mt-4"
                        >
                          Удалить все вопросы по истории
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geography">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Вопросы по географии Греции
                  </CardTitle>
                  <CardDescription>
                    Добавьте вопросы об островах, регионах, морях, горах и других географических особенностях Греции
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuestionUploader 
                    onQuestionAdd={handleAddQuestion} 
                    category="geography" 
                  />
                  
                  {getCategoryQuestionsCount('geography') > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Созданные вопросы ({getCategoryQuestionsCount('geography')})</h3>
                      <div className="space-y-3">
                        {customQuestions
                          .filter(q => q.category === 'geography')
                          .map((question) => (
                            <div key={question.id} className="p-4 border rounded-md bg-white">
                              <div className="font-medium">{question.text}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Тип: {question.type === 'multiple-choice' ? 'С вариантами ответа' : 'Открытый вопрос'}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteAllQuestions('geography')}
                          className="mt-4"
                        >
                          Удалить все вопросы по географии
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="culture">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coffee className="h-5 w-5" />
                    Вопросы по культуре Греции
                  </CardTitle>
                  <CardDescription>
                    Создавайте вопросы о традициях, обычаях, искусстве, кухне и других аспектах греческой культуры
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuestionUploader 
                    onQuestionAdd={handleAddQuestion} 
                    category="culture" 
                  />
                  
                  {getCategoryQuestionsCount('culture') > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Созданные вопросы ({getCategoryQuestionsCount('culture')})</h3>
                      <div className="space-y-3">
                        {customQuestions
                          .filter(q => q.category === 'culture')
                          .map((question) => (
                            <div key={question.id} className="p-4 border rounded-md bg-white">
                              <div className="font-medium">{question.text}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Тип: {question.type === 'multiple-choice' ? 'С вариантами ответа' : 'Открытый вопрос'}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteAllQuestions('culture')}
                          className="mt-4"
                        >
                          Удалить все вопросы по культуре
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="politics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="h-5 w-5" />
                    Вопросы по политике Греции
                  </CardTitle>
                  <CardDescription>
                    Добавьте вопросы о политической системе, государственном устройстве и важных политических событиях Греции
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuestionUploader 
                    onQuestionAdd={handleAddQuestion} 
                    category="politics" 
                  />
                  
                  {getCategoryQuestionsCount('politics') > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium mb-4">Созданные вопросы ({getCategoryQuestionsCount('politics')})</h3>
                      <div className="space-y-3">
                        {customQuestions
                          .filter(q => q.category === 'politics')
                          .map((question) => (
                            <div key={question.id} className="p-4 border rounded-md bg-white">
                              <div className="font-medium">{question.text}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Тип: {question.type === 'multiple-choice' ? 'С вариантами ответа' : 'Открытый вопрос'}
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="mt-4">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteAllQuestions('politics')}
                          className="mt-4"
                        >
                          Удалить все вопросы по политике
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {customQuestions.length > 0 && (
            <Button 
              variant="destructive"
              onClick={() => handleDeleteAllQuestions(null)}
              className="mb-8"
            >
              Удалить все вопросы
            </Button>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuestionUpload;
