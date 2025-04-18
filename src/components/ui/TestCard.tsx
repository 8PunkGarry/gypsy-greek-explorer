
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, HelpCircle, Home } from 'lucide-react';
import { Question } from '@/types/questions';
import { useAuth } from '@/contexts/AuthContext';
import { UserAuthDialog } from './UserAuthDialog';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";

interface TestCardProps {
  question: Question;
  onNext: () => void;
  onAnswer?: (wasCorrect: boolean) => void;
  onComplete?: () => void;
  currentQuestionNumber?: number;
  totalQuestions?: number;
}

const TestCard: React.FC<TestCardProps> = ({ 
  question, 
  onNext, 
  onAnswer, 
  onComplete, 
  currentQuestionNumber = 1, 
  totalQuestions = 1 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleOptionClick = (optionId: string) => {
    if (selectedOption) return; // Prevent changing answer after selection
    setSelectedOption(optionId);
    
    // Call onAnswer callback if provided
    const isCorrect = question.options.find(o => o.id === optionId)?.isCorrect || false;
    if (onAnswer) {
      onAnswer(isCorrect);
      
      // Show toast notification based on answer correctness
      if (isCorrect) {
        toast({
          title: t('correctAnswer'),
          description: t('youAnsweredCorrectly'),
          variant: "default"
        });
      } else {
        toast({
          title: t('incorrectAnswer'),
          description: t('tryAgainNextTime'),
          variant: "destructive"
        });
      }
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
    
    return isCorrectOption(optionId) && selectedOption 
      ? 'border-green-500 bg-green-50' 
      : 'border-gray-200';
  };

  const getOptionIcon = (optionId: string) => {
    if (!selectedOption) return null;
    
    if (isCorrectOption(optionId) && selectedOption) {
      return <CheckCircle2 className="text-green-500" />;
    }
    
    if (optionId === selectedOption && !isCorrectOption(optionId)) {
      return <XCircle className="text-red-500" />;
    }
    
    return null;
  };

  const handleNext = () => {
    onNext();
    setSelectedOption(null); // Reset selection for next question
    setShowExplanation(false); // Reset explanation visibility
    if (currentQuestionNumber === totalQuestions && onComplete) {
      onComplete();
    }
  };

  return (
    <Card className="w-full max-w-3xl shadow-soft animate-fadeIn">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-medium text-greek-darkBlue">{question.text}</CardTitle>
          <span className="text-sm font-medium text-gray-500">
            {t('question')} {currentQuestionNumber} {t('of')} {totalQuestions}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isAuthenticated && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex gap-2 items-center">
              <HelpCircle className="text-amber-500" size={20} />
              <p className="text-amber-800 text-sm">
                {t('logInToSave')}
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
              {showExplanation ? t('hideExplanation') : t('showExplanation')}
            </Button>
            
            {showExplanation && (
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div 
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: question.explanation }}
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <div className="w-full flex justify-between items-center">
          <Button 
            asChild
            variant="outline" 
            size="sm"
            className="text-gray-600"
          >
            <Link to="/"><Home className="mr-1" size={16} /> {t('home')}</Link>
          </Button>
          <Button 
            onClick={handleNext} 
            className="bg-greek-darkBlue hover:bg-greek-blue text-white"
            disabled={!selectedOption}
          >
            {t('nextQuestion')}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
