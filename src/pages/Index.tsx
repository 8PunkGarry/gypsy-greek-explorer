
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Map, Compass, LandPlot, Sparkles, BookCheck, Clock } from 'lucide-react';
import FeatureCard from '@/components/ui/card/FeatureCard';
import WelcomeHero from '@/components/ui/WelcomeHero';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigateToTopic = (topic: string) => {
    if (isAuthenticated) {
      navigate(`/${topic}`);
    } else {
      // Scroll back to top where they can register
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <WelcomeHero />
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-[#1A2331] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 text-sm font-medium">
                <span>Ключевые блоки обучения</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-medium text-gray-100 mb-4 max-w-2xl mx-auto">
                Выберите раздел для изучения
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                {isAuthenticated 
                  ? "Нажмите на любой из блоков, чтобы начать обучение по этой теме" 
                  : "Создайте аккаунт, чтобы получить доступ к материалам для подготовки к собеседованию"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={BookOpen}
                title="История Греции"
                description="От древних времён до современности. Ключевые события, даты и их значение для греческой идентичности."
                className="md:col-span-2"
                onClick={() => handleNavigateToTopic('history')}
              />
              
              <FeatureCard 
                icon={Map}
                title="География Греции"
                description="Города, острова, горы и реки. Понимание географических особенностей страны и их культурного значения."
                onClick={() => handleNavigateToTopic('geography')}
              />
              
              <FeatureCard 
                icon={Compass}
                title="Культура Греции"
                description="Традиции, праздники, искусство и литература. Погружение в богатое культурное наследие Греции."
                onClick={() => handleNavigateToTopic('culture')}
              />
              
              <FeatureCard 
                icon={LandPlot}
                title="Политическое устройство"
                description="Государственная система, политическое устройство и общественная жизнь современной Греции."
                className="md:col-span-2"
                onClick={() => handleNavigateToTopic('politics')}
              />
            </div>
            
            {!isAuthenticated && (
              <div className="mt-10 text-center">
                <p className="text-gray-400 mb-4">Для доступа к материалам необходимо создать аккаунт</p>
                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="bg-blue-600/80 hover:bg-blue-700 text-white text-sm">
                  Создать аккаунт
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Learning Methods Section */}
        <section className="py-16 bg-[#1B2432] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-3 px-3 py-1 rounded-full bg-blue-900/20 text-blue-300 text-sm font-medium">
                <span>Наш подход</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-medium text-gray-100 mb-4 max-w-2xl mx-auto">
                Эффективные методы подготовки
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Используйте разнообразные инструменты для лучшего усвоения материала
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#2A3441]/50 border border-gray-700/20 rounded-lg p-5">
                <div className="w-10 h-10 rounded-md bg-blue-900/20 text-blue-300 flex items-center justify-center mb-4">
                  <BookCheck size={20} />
                </div>
                <h3 className="text-lg font-medium text-gray-100 mb-2">Тесты с обратной связью</h3>
                <p className="text-gray-400 text-sm">
                  После каждого ответа вы получаете не только оценку, но и полезное пояснение.
                </p>
              </div>
              
              <div className="bg-[#2A3441]/50 border border-gray-700/20 rounded-lg p-5">
                <div className="w-10 h-10 rounded-md bg-blue-900/20 text-blue-300 flex items-center justify-center mb-4">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-lg font-medium text-gray-100 mb-2">Интерактивные задания</h3>
                <p className="text-gray-400 text-sm">
                  Увлекательные упражнения, которые помогают закрепить знания в игровой форме.
                </p>
              </div>
              
              <div className="bg-[#2A3441]/50 border border-gray-700/20 rounded-lg p-5">
                <div className="w-10 h-10 rounded-md bg-blue-900/20 text-blue-300 flex items-center justify-center mb-4">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-medium text-gray-100 mb-2">Организация материала</h3>
                <p className="text-gray-400 text-sm">
                  Все материалы структурированы по темам и уровням сложности для эффективного обучения.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
