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

  const handleInterviewSimulation = () => {
    navigate('/interview');
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
                Используйте разнообразные инструменты, которые помогут вам лучше усвоить материа�� и подготовиться к собеседованию.
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
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Симулятор собеседования</h3>
                      <p className="text-gray-600">
                        Диалоговые сценарии с вопросами из реальных собеседований, чтобы вы могли практиковаться в безопасной среде.
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
                </div>
                
                <button className="px-8 py-3 bg-greek-darkBlue text-white rounded-full text-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  Попробовать сейчас
                </button>
              </div>
              
              <div>
                <TestCard question={sampleQuestion} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Learning Paths Section */}
        <section className="py-20 bg-greek-blue/5 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-greek-blue/10 text-greek-darkBlue font-medium">
                <span>Индивидуальный подход</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-6 max-w-3xl mx-auto">
                Выберите свой темп обучения
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Мы предлагаем различные программы обучения, адаптированные под ваше расписание и цели.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Быстрая подготовка</h3>
                <p className="text-gray-600 mb-4">
                  Интенсивный курс для тех, кому нужно подготовиться к собеседованию за 2 недели. Фокус на ключевых вопросах и концепциях.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    10-15 минут обучения в день
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    Фокус на самых важных вопросах
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    Экспресс-симулятор собеседования
                  </li>
                </ul>
                <button className="w-full py-2 rounded-full border border-greek-darkBlue text-greek-darkBlue font-medium hover:bg-greek-blue/10 transition-colors duration-300">
                  Выбрать план
                </button>
              </div>
              
              <div className="p-6 rounded-xl bg-greek-darkBlue text-white border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-greek-blue/20 px-4 py-1 text-xs font-medium rounded-bl-lg">
                  Популярный выбор
                </div>
                <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-medium mb-3">Стандартная подготовка</h3>
                <p className="text-white/80 mb-4">
                  Сбалансированный курс для подготовки за 1 мес��ц. Охватывает все аспекты с достаточным временем для усвоения материала.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-white/80">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mr-2 text-xs">✓</span>
                    30 минут обучения в день
                  </li>
                  <li className="flex items-center text-white/80">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mr-2 text-xs">✓</span>
                    Полное покрытие всех тем
                  </li>
                  <li className="flex items-center text-white/80">
                    <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center mr-2 text-xs">✓</span>
                    3 полных симулятора собеседования
                  </li>
                </ul>
                <button className="w-full py-2 rounded-full bg-white text-greek-darkBlue font-medium hover:bg-opacity-90 transition-colors duration-300">
                  Выбрать план
                </button>
              </div>
              
              <div className="p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-greek-blue/20 text-greek-darkBlue flex items-center justify-center mb-6">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Глубокое погружение</h3>
                <p className="text-gray-600 mb-4">
                  Комплексный курс для тех, кто хочет не только пройти собеседование, но и глубоко понять греческую культуру и историю.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    45+ минут обучения в день
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    Углубленное изучение каждой темы
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2 text-xs">✓</span>
                    Неограниченное количество симуляций
                  </li>
                </ul>
                <button className="w-full py-2 rounded-full border border-greek-darkBlue text-greek-darkBlue font-medium hover:bg-greek-blue/10 transition-colors duration-300">
                  Выбрать план
                </button>
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
                  Начать бесплатно
                </button>
                <button 
                  className="px-8 py-3 bg-transparent border border-white text-white rounded-full text-lg font-medium hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300"
                  onClick={handleInterviewSimulation}
                >
                  Узнать больше
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
