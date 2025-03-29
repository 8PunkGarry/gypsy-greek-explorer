
import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface StepProps {
  number: number;
  title: string;
  description: string;
  isActive?: boolean;
  isComplete?: boolean;
}

const Step: React.FC<StepProps> = ({ 
  number, 
  title, 
  description, 
  isActive = false, 
  isComplete = false 
}) => {
  return (
    <div className={`relative flex ${isActive ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`}>
      <div className="flex flex-col items-center mr-4">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
          isComplete 
            ? 'bg-blue-500/80 text-white' 
            : isActive 
              ? 'bg-white/10 text-blue-300 ring-2 ring-blue-400/50' 
              : 'bg-white/5 text-gray-400'
        } transition-all duration-300`}>
          {isComplete ? <CheckCircle size={20} /> : <span>{number}</span>}
        </div>
        {number < 4 && (
          <div className={`w-0.5 h-full ${
            isComplete ? 'bg-blue-500/50' : 'bg-white/10'
          } transition-colors duration-300`}></div>
        )}
      </div>
      <div className="pt-1 pb-8">
        <h4 className={`font-medium text-lg mb-1 ${
          isActive || isComplete ? 'text-gray-100' : 'text-gray-400'
        }`}>
          {title}
        </h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const LearningPath: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="px-4 py-8 rounded-xl bg-[#2A3441]/60 backdrop-blur-sm border border-white/10 shadow-md max-w-lg mx-auto">
      <h3 className="text-2xl font-medium text-gray-100 mb-6 text-center">{t('yourLearningPath')}</h3>
      
      <div className="space-y-2">
        <Step 
          number={1} 
          title={t('greekHistory')} 
          description={t('keyEvents')} 
          isActive={true}
          isComplete={false}
        />
        
        <Step 
          number={2} 
          title={t('greekGeography')} 
          description={t('citiesIslands')}
          isActive={false}
          isComplete={false}
        />
        
        <Step 
          number={3} 
          title={t('greekCulture')} 
          description={t('traditionsArt')}
          isActive={false}
          isComplete={false}
        />
        
        <Step 
          number={4} 
          title={t('politicalSystem')} 
          description={t('stateSystem')}
          isActive={false}
          isComplete={false}
        />
      </div>
      
      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 hover:from-blue-600/90 hover:to-indigo-700/90 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300">
          {t('continueLearning')}
        </button>
      </div>
    </div>
  );
};

export default LearningPath;
