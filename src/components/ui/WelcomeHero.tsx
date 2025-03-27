
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserAuthDialog } from './UserAuthDialog';
import { ProgressDashboard } from './ProgressDashboard';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeHero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
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
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium animate-fade-in">
          <span>Путь к греческому гражданству</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight animate-scale-in" style={{
          animationDelay: '300ms'
        }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-greek-darkBlue to-greek-olive">
            Подготовка к собеседованию на греческое гражданство
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in" style={{
          animationDelay: '600ms'
        }}>
          Погрузитесь в историю, культуру и дух Греции. Готовьтесь осмысленно, с пониманием и вдохновением.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '900ms'
        }}>
          {isAuthenticated ? (
            <Button 
              className="px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300" 
              onClick={handleStartLearning}
            >
              Начать обучение
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-6 rounded-xl shadow-md">
              <div className="text-gray-700 text-lg">
                <h3 className="font-medium text-xl mb-2 text-greek-darkBlue">Создайте аккаунт</h3>
                <p className="mb-4">Сохраняйте свой прогресс и отслеживайте успехи</p>
                <UserAuthDialog />
              </div>
            </div>
          )}
        </div>
        
        {isAuthenticated && (
          <div className="mt-16 max-w-3xl mx-auto animate-fade-in" style={{
            animationDelay: '1200ms'
          }}>
            <ProgressDashboard />
          </div>
        )}
      </div>
    </section>
  );
};

export default WelcomeHero;
