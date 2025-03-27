
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WelcomeHero: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/history');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium animate-fade-in">
          <span>Путь к греческому гражданству</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight animate-scale-in" style={{ animationDelay: '300ms' }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-greek-darkBlue to-greek-olive">
            Подготовка к собеседованию на греческое гражданство
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '600ms' }}>
          Погрузитесь в историю, культуру и дух Греции. Готовьтесь осмысленно, с пониманием и вдохновением.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '900ms' }}>
          <button
            className="px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            onClick={handleStartLearning}
          >
            Начать обучение
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="text-greek-darkBlue/60 hover:text-greek-darkBlue flex flex-col items-center transition-colors duration-300">
          <span className="mb-2 text-sm font-medium">Узнать больше</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default WelcomeHero;
