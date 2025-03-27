
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Map, Compass, LandPlot, Sparkles, BookCheck, Clock } from 'lucide-react';
import FeatureCard from '@/components/ui/card/FeatureCard';
import WelcomeHero from '@/components/ui/WelcomeHero';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigateToTopic = (topic: string) => {
    navigate(`/${topic}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <WelcomeHero />
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-greek-offWhite relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium">
                <span>Ключевые блоки обучения</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Всестороннее погружение в греческую культуру
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Наша программа охватывает все аспекты, необходимые для успешного прохождения собеседования на греческое гражданство.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
          </div>
        </section>
        
        {/* Learning Methods Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium">
                <span>Наш подход</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Эффективные методы подготовки
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Используйте разнообразные инструменты, которые помогут вам лучше усвоить материал и подготовиться к собеседованию.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mr-4">
                  <BookCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Тесты с обратной связью</h3>
                  <p className="text-gray-600">
                    После каждого ответа вы получаете не только оценку, но и полезное пояснение.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mr-4">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Интерактивные задания</h3>
                  <p className="text-gray-600">
                    Увлекательные упражнения, которые помогают закрепить знания в игровой форме.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-lg bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mr-4">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Организация материала</h3>
                  <p className="text-gray-600">
                    Все материалы структурированы по темам и уровням сложности для эффективного обучения.
                  </p>
                </div>
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
