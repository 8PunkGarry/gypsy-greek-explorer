
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHero from '@/components/ui/WelcomeHero';
import LearningPath from '@/components/ui/LearningPath';
import FeatureCard from '@/components/ui/card/FeatureCard';
import TestCard from '@/components/ui/TestCard';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Map, Compass, LandPlot, Sparkles, BookCheck, Users, BookText, Clock } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  // Sample test question
  const sampleQuestion = {
    id: 'q1',
    text: 'В каком году началась Греческая война за независимость?',
    options: [
      { id: 'a', text: '1821', isCorrect: true },
      { id: 'b', text: '1832', isCorrect: false },
      { id: 'c', text: '1801', isCorrect: false },
      { id: 'd', text: '1840', isCorrect: false },
    ],
    explanation: 'Греческая война за независимость началась в 1821 году и продолжалась до 1832 года. Эта дата считается одной из самых важных в современной греческой истории.'
  };

  const handleStartLearning = () => {
    navigate('/history');
  };

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
        
        {/* Philosophy Section */}
        <section id="philosophy" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium animate-fade-in">
                <span>Наша философия</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Подход, основанный на понимании, а не заучивании
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Мы верим, что подготовка к собеседованию — это возможность по-настоящему погрузиться в греческую культуру и историю.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={BookOpen}
                title="Понимание вместо заучивания"
                description="Материалы объясняют контекст и значение исторических и культурных аспектов для греческой идентичности."
              />
              
              <FeatureCard 
                icon={Sparkles}
                title="Комфортное обучение"
                description="Дружелюбный тон, интуитивный интерфейс и контент, разбитый на удобные для изучения блоки."
              />
              
              <FeatureCard 
                icon={Users}
                title="Уважение к индивидуальности"
                description="Выбор темпа и формата обучения в соответствии с вашими предпочтениями и целями."
              />
            </div>
          </div>
        </section>
        
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <FeatureCard 
                icon={BookText}
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
        
        {/* Learning Tools Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium">
                <span>Инструменты обучения</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Эффективные методы подготовки
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Используйте разнообразные инструменты, которые помогут вам лучше усвоить материал и подготовиться к собеседованию.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-lg bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mr-4">
                      <BookCheck size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Тесты с обратной связью</h3>
                      <p className="text-gray-600">
                        После каждого ответа вы получаете не только оценку, но и полезное пояснение, которое поможет лучше понять материал.
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
                        Увлекательные упражнения, которые помогают закрепить знания в игровой форме и сделать обучение более увлекательным.
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
                        Все материалы структурированы по темам и уровням сложности, что позволяет эффективно планировать процесс обучения.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={handleStartLearning}
                >
                  Начать обучение
                </button>
              </div>
              
              <div>
                <TestCard question={sampleQuestion} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-2xl bg-gradient-to-r from-greek-darkBlue to-[#1D3D61] text-white text-center shadow-medium overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDEwMEw1MDAgNTAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTUwMCAxMDBMMTAwIDUwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg==')] opacity-20"></div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6 relative z-10">
                Начните свое путешествие к греческому гражданству сегодня
              </h2>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto relative z-10">
                Присоединяйтесь к нашей платформе и подготовьтесь к собеседованию с уверенностью и глубоким пониманием греческой культуры.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button 
                  className="px-8 py-3 bg-white text-greek-darkBlue rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  onClick={handleStartLearning}
                >
                  Начать обучение
                </button>
                <button 
                  className="px-8 py-3 bg-transparent border border-white text-white rounded-full text-lg font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300"
                  onClick={() => handleNavigateToTopic('questions')}
                >
                  Загрузка вопросов
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Learning Path Mobile */}
        <section className="py-20 relative lg:hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium">
                <span>Ваш прогресс</span>
              </div>
              <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Последовательное обучение
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Шаг за шагом вы пройдете все необходимые темы для успешного собеседования.
              </p>
            </div>
            
            <LearningPath />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
