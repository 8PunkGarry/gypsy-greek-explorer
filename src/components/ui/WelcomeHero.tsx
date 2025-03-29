
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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-900/20 text-blue-300 font-medium animate-fade-in">
          <span className="text-sky-300">{t('pathToGreekCitizenship')}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold mb-6 max-w-4xl mx-auto leading-tight animate-scale-in text-gradient-blue" style={{
          animationDelay: '300ms'
        }}>
          {t('interviewPreparation')}
        </h1>
        
        <p className="text-xl text-cyan-100 max-w-2xl mx-auto mb-10 animate-fade-in" style={{
          animationDelay: '600ms'
        }}>
          {t('immersionDescription')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '900ms'
        }}>
          {isAuthenticated ? (
            <Button 
              className="px-8 py-6 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white rounded-md text-lg font-medium shadow-md hover:bg-blue-700 transition-all duration-300" 
              onClick={handleStartLearning}
            >
              {t('startLearning')}
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#2A3441]/80 p-6 rounded-lg border border-gray-700/30">
              <div className="text-gray-300 text-lg">
                <h3 className="font-medium text-xl mb-2 text-gradient-teal">{t('createAccount')}</h3>
                <p className="mb-4 text-blue-100">{t('saveProgress')}</p>
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
