
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserAuthDialog } from './UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

const WelcomeHero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const handleStartLearning = () => {
    const learningBlocksSection = document.getElementById('features');
    if (learningBlocksSection) {
      learningBlocksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="absolute top-4 right-4">
        <UserAuthDialog />
      </div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-900/30 text-blue-300 font-medium animate-fade-in">
          <span>{t('pathToGreekCitizenship')}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-gray-100 mb-6 max-w-4xl mx-auto leading-tight animate-scale-in" style={{
          animationDelay: '300ms'
        }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-300">
            {t('interviewPreparation')}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in" style={{
          animationDelay: '600ms'
        }}>
          {t('immersionDescription')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '900ms'
        }}>
          {isAuthenticated ? (
            <Button 
              className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300" 
              onClick={handleStartLearning}
            >
              {t('startLearning')}
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#2A3441] p-6 rounded-xl shadow-md border border-gray-700/30">
              <div className="text-gray-300 text-lg">
                <h3 className="font-medium text-xl mb-2 text-blue-300">{t('createAccount')}</h3>
                <p className="mb-4">{t('saveProgress')}</p>
                <UserAuthDialog />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
