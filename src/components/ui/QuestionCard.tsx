
import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Question } from '@/types/questions';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  index, 
  expanded, 
  onToggle 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (optionId: string) => {
    if (!selectedOption) {
      setSelectedOption(optionId);
    }
  };

  const isCorrectOption = (optionId: string) => {
    return question.options.find(o => o.id === optionId)?.isCorrect || false;
  };

  const getOptionClass = (optionId: string) => {
    if (!selectedOption) return 'border-gray-200 hover:bg-gray-50';
    
    if (optionId === selectedOption) {
      return isCorrectOption(optionId) 
        ? 'border-green-500 bg-green-50' 
        : 'border-red-500 bg-red-50';
    }
    
    return isCorrectOption(optionId) && selectedOption 
      ? 'border-green-500 bg-green-50' 
      : 'border-gray-200';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "mb-5 overflow-hidden rounded-xl glass border border-gray-100 transition-all duration-300",
        expanded ? "shadow-lg" : "shadow-sm hover:shadow-md"
      )}
    >
      <div 
        onClick={onToggle} 
        className={cn(
          "flex items-center justify-between p-5 cursor-pointer",
          expanded ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white" : "bg-white text-gray-800"
        )}
      >
        <h3 className="font-medium text-lg flex items-center">
          <span className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-semibold",
            expanded ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"
          )}>
            {index + 1}
          </span>
          {question.text}
        </h3>
        <ChevronDown className={cn(
          "h-5 w-5 transition-transform duration-300",
          expanded && "transform rotate-180"
        )} />
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-t border-gray-100">
              <div className="space-y-3 mb-6">
                {question.options.map((option, optIndex) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: optIndex * 0.1 }}
                    onClick={() => handleOptionClick(option.id)}
                    className={cn(
                      "p-4 border rounded-lg flex justify-between items-center transition-all cursor-pointer",
                      getOptionClass(option.id)
                    )}
                  >
                    <div className="flex items-center">
                      <span className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-100 mr-3 font-medium text-sm text-blue-600">
                        {option.id.toUpperCase()}
                      </span>
                      <span>{option.text}</span>
                    </div>
                    
                    {selectedOption && (
                      option.id === selectedOption ? (
                        isCorrectOption(option.id) ? (
                          <CheckCircle2 className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )
                      ) : isCorrectOption(option.id) ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : null
                    )}
                  </motion.div>
                ))}
              </div>
              
              {selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 p-5 rounded-lg border border-blue-100 bg-blue-50"
                >
                  <div className="flex items-start">
                    <AlertCircle className="text-blue-600 mr-3 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-medium text-lg text-blue-800 mb-2">Объяснение:</h4>
                      <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
