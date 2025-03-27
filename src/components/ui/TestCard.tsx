
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { Question } from '@/types/questions';
import { useAuth } from '@/contexts/AuthContext';
import { UserAuthDialog } from './UserAuthDialog';

interface TestCardProps {
  question: Question;
  onNext: () => void;
}

const TestCard: React.FC<TestCardProps> = ({ question, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { isAuthenticated, updateProgress } = useAuth();

  const handleOptionClick = (optionId: string) => {
    if (selectedOption) return; // Prevent changing answer after selection
    setSelectedOption(optionId);
    
    // Only update progress if user is authenticated
    if (isAuthenticated) {
      const isCorrect = question.options.find(o => o.id === optionId)?.isCorrect || false;
      updateProgress(question.category, question.id, isCorrect);
    }
  };

  const isCorrectOption = (optionId: string) => {
    return question.options.find(o => o.id === optionId)?.isCorrect || false;
  };

  const getOptionClass = (optionId: string) => {
    if (!selectedOption) return 'border-gray-200 hover:border-greek-blue cursor-pointer';
    
    if (optionId === selectedOption) {
      return isCorrectOption(optionId) 
        ? 'border-green-500 bg-green-50' 
        : 'border-red-500 bg-red-50';
    }
    
    return isCorrectOption(optionId) 
      ? 'border-green-500 bg-green-50' 
      : 'border-gray-200';
  };

  const getOptionIcon = (optionId: string) => {
    if (!selectedOption) return null;
    
    if (isCorrectOption(optionId)) {
      return <CheckCircle2 className="text-green-500" />;
    }
    
    if (optionId === selectedOption && !isCorrectOption(optionId)) {
      return <XCircle className="text-red-500" />;
    }
    
    return null;
  };

  return (
    <Card className="w-full max-w-3xl shadow-soft animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-greek-darkBlue">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex gap-2 items-center">
              <HelpCircle className="text-amber-500" size={20} />
              <p className="text-amber-800 text-sm">
                Войдите в систему, чтобы сохранять свой прогресс:
              </p>
              <UserAuthDialog />
            </div>
          </div>
        )}
      
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`p-4 border rounded-lg flex justify-between items-center transition-all ${getOptionClass(option.id)}`}
              onClick={() => handleOptionClick(option.id)}
            >
              <span>{option.text}</span>
              {getOptionIcon(option.id)}
            </div>
          ))}
        </div>
        
        {selectedOption && (
          <div className="mt-4">
            <Button 
              variant="ghost" 
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-greek-darkBlue hover:text-greek-blue hover:bg-greek-blue/10"
            >
              {showExplanation ? 'Скрыть объяснение' : 'Показать объяснение'}
            </Button>
            
            {showExplanation && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onNext} 
          className="w-full bg-greek-darkBlue hover:bg-greek-blue text-white"
          disabled={!selectedOption}
        >
          Следующий вопрос
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
