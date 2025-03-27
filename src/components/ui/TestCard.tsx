
import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  type?: 'multiple-choice' | 'open-ended';
  category?: 'history' | 'geography' | 'culture' | 'politics';
}

interface TestCardProps {
  question: Question;
  onAnswer?: (wasCorrect: boolean) => void;
  onComplete?: () => void;
  className?: string;
}

const TestCard: React.FC<TestCardProps> = ({ 
  question, 
  onAnswer,
  onComplete,
  className = '' 
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleOptionSelect = (optionId: string) => {
    if (!isSubmitted) {
      setSelectedOptionId(optionId);
    }
  };
  
  const handleSubmit = () => {
    if (selectedOptionId) {
      setIsSubmitted(true);
      const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
      if (selectedOption && onAnswer) {
        onAnswer(selectedOption.isCorrect);
      }
    }
  };
  
  const resetQuestion = () => {
    setSelectedOptionId(null);
    setIsSubmitted(false);
    if (onComplete) {
      onComplete();
    }
  };
  
  const isOpenEnded = question.type === 'open-ended';
  
  if (!question.options || question.options.length === 0) {
    console.error('Question without options:', question);
    return (
      <div className={`p-6 rounded-xl bg-white/90 border border-gray-100 shadow-soft ${className}`}>
        <h3 className="text-xl font-medium text-gray-900 mb-4">{question?.text || 'Вопрос отсутствует'}</h3>
        <p className="text-gray-600 mb-4">Ошибка: У этого вопроса нет вариантов ответа</p>
      </div>
    );
  }
  
  return (
    <div className={`p-6 rounded-xl bg-white/90 border border-gray-100 shadow-soft ${className}`}>
      <h3 className="text-xl font-medium text-gray-900 mb-4">{question.text}</h3>
      
      {!isOpenEnded && (
        <div className="space-y-3 mb-6">
          {question.options.map((option) => {
            if (!option.text && isOpenEnded) return null;
            
            const isSelected = selectedOptionId === option.id;
            const showCorrect = isSubmitted && option.isCorrect;
            const showIncorrect = isSubmitted && isSelected && !option.isCorrect;
            
            return (
              <div 
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer flex items-center ${
                  isSelected 
                    ? 'border-greek-darkBlue bg-greek-blue/10' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  showCorrect 
                    ? 'border-green-500 bg-green-50' 
                    : showIncorrect 
                      ? 'border-red-500 bg-red-50' 
                      : ''
                }`}
              >
                <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${
                  isSelected 
                    ? 'border-greek-darkBlue' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && !isSubmitted && (
                    <div className="w-3 h-3 rounded-full bg-greek-darkBlue"></div>
                  )}
                  {showCorrect && <CheckCircle size={18} className="text-green-500" />}
                  {showIncorrect && <XCircle size={18} className="text-red-500" />}
                </div>
                <span className={`${
                  showCorrect 
                    ? 'text-green-700' 
                    : showIncorrect 
                      ? 'text-red-700' 
                      : 'text-gray-700'
                }`}>
                  {option.text}
                </span>
              </div>
            );
          })}
        </div>
      )}
      
      {isSubmitted && (
        <div className="mb-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Объяснение:</h4>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className={`px-6 py-2 rounded-full font-medium text-white ${
              selectedOptionId 
                ? 'bg-greek-darkBlue hover:bg-opacity-90' 
                : 'bg-gray-300 cursor-not-allowed'
            } transition-colors duration-300`}
          >
            Ответить
          </button>
        ) : (
          <button 
            onClick={resetQuestion}
            className="px-6 py-2 rounded-full font-medium text-greek-darkBlue border border-greek-darkBlue hover:bg-greek-blue/10 transition-colors duration-300"
          >
            Следующий вопрос
          </button>
        )}
      </div>
    </div>
  );
};

export default TestCard;
