
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserAuthDialog } from './UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div 
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100"
        >
          <span className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            {t('pathToGreekCitizenship')}
          </span>
        </motion.div>
        
        <motion.h1 
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto leading-tight"
        >
          Путь к <span className="gradient-text">греческому гражданству</span> начинается здесь
        </motion.h1>
        
        <motion.p 
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          {t('immersionDescription')}
        </motion.p>
        
        <motion.div 
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {isAuthenticated ? (
            <Button 
              className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center" 
              onClick={handleStartLearning}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {t('startLearning')}
            </Button>
          ) : (
            <div className="glass p-8 rounded-2xl shadow-xl max-w-md">
              <h3 className="font-medium text-2xl mb-3 text-gray-800">{t('createAccount')}</h3>
              <p className="text-gray-600 mb-6">{t('saveProgress')}</p>
              <UserAuthDialog />
            </div>
          )}
        </motion.div>
        
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <button 
            onClick={handleStartLearning} 
            className="flex flex-col items-center text-gray-400 hover:text-blue-600 transition-colors"
          >
            <span className="text-sm mb-1">Узнать больше</span>
            <ChevronDown className="animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeHero;
