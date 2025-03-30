
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react'; 
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen, Map, Compass, LandPlot, Sparkles, BookCheck, Clock, BarChart, Award, Lightbulb } from 'lucide-react';
import FeatureCard from '@/components/ui/card/FeatureCard';
import WelcomeHero from '@/components/ui/WelcomeHero';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

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
        <section id="features" className="py-24 bg-gradient-to-b from-white to-blue-50 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100"
              >
                <span>Ключевые блоки обучения</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 max-w-3xl mx-auto"
              >
                Выберите раздел для изучения
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
              >
                {isAuthenticated 
                  ? "Нажмите на любой из блоков, чтобы начать обучение по этой теме" 
                  : "Создайте аккаунт, чтобы получить доступ к материалам для подготовки к собеседованию"}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard 
                index={0}
                icon={BookOpen}
                title="История Греции"
                description="От древних времён до современности. Ключевые события, даты и их значение для греческой идентичности."
                className="md:col-span-2"
                onClick={() => handleNavigateToTopic('history')}
              />
              
              <FeatureCard 
                index={1}
                icon={Map}
                title="География Греции"
                description="Города, острова, горы и реки. Понимание географических особенностей страны и их культурного значения."
                onClick={() => handleNavigateToTopic('geography')}
              />
              
              <FeatureCard 
                index={2}
                icon={Compass}
                title="Культура Греции"
                description="Традиции, праздники, искусство и литература. Погружение в богатое культурное наследие Греции."
                onClick={() => handleNavigateToTopic('culture')}
              />
              
              <FeatureCard 
                index={3}
                icon={LandPlot}
                title="Политическое устройство"
                description="Государственная система, политическое устройство и общественная жизнь современной Греции."
                className="md:col-span-2"
                onClick={() => handleNavigateToTopic('politics')}
              />
            </div>
            
            {!isAuthenticated && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-700 mb-6 text-lg">Для доступа к материалам необходимо создать аккаунт</p>
                <Button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  Создать аккаунт
                </Button>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Learning Methods Section */}
        <section className="py-24 bg-white relative">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 opacity-50 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 opacity-50 rounded-tr-full"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100"
              >
                <span>Наш подход</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 max-w-3xl mx-auto"
              >
                Эффективные методы подготовки
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
              >
                Используйте разнообразные инструменты, которые помогут вам лучше усвоить материал и подготовиться к собеседованию.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <MethodCard 
                icon={BookCheck}
                index={0}
                title="Тесты с обратной связью"
                description="После каждого ответа вы получаете не только оценку, но и полезное пояснение."
              />
              
              <MethodCard 
                icon={Sparkles}
                index={1}
                title="Интерактивные задания"
                description="Увлекательные упражнения, которые помогают закрепить знания в игровой форме."
              />
              
              <MethodCard 
                icon={BarChart}
                index={2}
                title="Отслеживание прогресса"
                description="Наблюдайте за своим прогрессом и концентрируйтесь на областях, требующих внимания."
              />
              
              <MethodCard 
                icon={Clock}
                index={3}
                title="Организация материала"
                description="Все материалы структурированы по темам и уровням сложности для эффективного обучения."
              />
              
              <MethodCard 
                icon={Award}
                index={4}
                title="Система достижений"
                description="Получайте награды за успешное прохождение тестов и заданий, отслеживайте свой прогресс."
              />
              
              <MethodCard 
                icon={Lightbulb}
                index={5}
                title="Практические советы"
                description="Рекомендации от людей, которые уже успешно прошли процесс получения гражданства."
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-heading font-bold mb-6"
            >
              Готовы начать подготовку?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-blue-50 max-w-2xl mx-auto mb-10"
            >
              Присоединяйтесь к нам сегодня и начните свой путь к успешному получению греческого гражданства
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button 
                onClick={() => isAuthenticated ? navigate('/practice') : window.scrollTo({ top: 0, behavior: 'smooth' })} 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {isAuthenticated ? 'Начать практику' : 'Создать аккаунт'}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

const MethodCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index = 0 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string;
  index?: number;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Index;
