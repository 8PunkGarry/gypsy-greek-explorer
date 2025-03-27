
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurBackground from '@/components/ui/BlurBackground';
import TestCard from '@/components/ui/TestCard';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

// Define the history questions directly in this component
const historyQuestions = [
  {
    id: 'hist1',
    category: 'history',
    text: 'Когда Греция получила независимость от Османской империи?',
    options: [
      { id: 'h1a', text: '1821 (начало войны за независимость)', isCorrect: false },
      { id: 'h1b', text: '1830 (Лондонский протокол)', isCorrect: true },
      { id: 'h1c', text: '1832 (Константинопольский договор)', isCorrect: false },
      { id: 'h1d', text: '1834 (перенос столицы в Афины)', isCorrect: false },
    ],
    explanation: 'Хотя Греческая война за независимость началась в 1821 году, официально независимость была признана в 1830 году с подписанием Лондонского протокола.'
  },
  {
    id: 'hist2',
    category: 'history',
    text: 'Что означает "День Охи" (ΟΧΙ) и когда его отмечают?',
    options: [
      { id: 'h2a', text: '28 октября, день отказа Греции подчиниться фашистской Италии', isCorrect: true },
      { id: 'h2b', text: '25 марта, начало восстания против османского владычества', isCorrect: false },
      { id: 'h2c', text: '17 ноября, день восстания студентов против военной хунты', isCorrect: false },
      { id: 'h2d', text: '3 сентября, день принятия первой конституции', isCorrect: false },
    ],
    explanation: '"День Охи" (День "Нет") отмечается 28 октября в память о решительном отказе премьер-министра Иоанниса Метаксаса подчиниться ультиматуму Муссолини в 1940 году.'
  },
  // Новые вопросы по истории
  {
    id: 'hist_civ1',
    category: 'history',
    text: 'Какие великие цивилизации Древней Греции вы знаете?',
    options: [
      { id: 'civ1a', text: 'Микенская, Минойская, Классическая и Эллинистическая', isCorrect: true },
      { id: 'civ1b', text: 'Древнегреческая, Афинская, Спартанская и Коринфская', isCorrect: false },
      { id: 'civ1c', text: 'Аргосская, Византийская, Александрийская и Пелопоннесская', isCorrect: false },
      { id: 'civ1d', text: 'Троянская, Ионическая, Дорическая и Критская', isCorrect: false },
    ],
    explanation: 'Цивилизаций Древней Греции было четыре: Микенская (Пелопоннес), Минойская (Крит), классическая античность (Афины) и эллинистический период, во время которого греческая культура распространилась по всему тогдашнему миру.'
  },
  {
    id: 'hist_state1',
    category: 'history',
    text: 'Была ли Греция в древности единым государством?',
    options: [
      { id: 'state1a', text: 'Нет, она была разделена на города-государства', isCorrect: true },
      { id: 'state1b', text: 'Да, с единым правителем и законами', isCorrect: false },
      { id: 'state1c', text: 'Только во время правления Александра Македонского', isCorrect: false },
      { id: 'state1d', text: 'Только во время Римской империи', isCorrect: false },
    ],
    explanation: 'Древняя Греция была разделена на города-государства. Каждый город был отдельным государством со своим царём, монетами и законами. Самыми значительными городами были Афины, Спарта, Фивы, и между ними постоянно велись войны, например, Пелопоннесская война, длившаяся 27 лет.'
  },
  {
    id: 'hist_athens1',
    category: 'history',
    text: 'Когда древние Афины достигли наивысшего расцвета?',
    options: [
      { id: 'athens1a', text: 'В 5-м веке до н.э. (золотой век Перикла)', isCorrect: true },
      { id: 'athens1b', text: 'В 8-м веке до н.э. (эпоха Гомера)', isCorrect: false },
      { id: 'athens1c', text: 'В 3-м веке до н.э. (эллинистический период)', isCorrect: false },
      { id: 'athens1d', text: 'В 1-м веке н.э. (период Римской империи)', isCorrect: false },
    ],
    explanation: 'Афины достигли наивысшего расцвета в 5-м веке до н. э., который назвали золотым веком Перикла, принесшего демократию.'
  },
  {
    id: 'hist_golden1',
    category: 'history',
    text: 'Почему период 5-го века до н.э. в Афинах назвали золотым веком?',
    options: [
      { id: 'golden1a', text: 'Из-за развития литературы, искусства и строительства Парфенона', isCorrect: true },
      { id: 'golden1b', text: 'Из-за большого количества золота, добытого в это время', isCorrect: false },
      { id: 'golden1c', text: 'Из-за побед в Пелопоннессской войне', isCorrect: false },
      { id: 'golden1d', text: 'Из-за торговых связей с Персией', isCorrect: false },
    ],
    explanation: 'Этот период назвали золотым веком, потому что развивались литература и искусство, а главным достижением или шедевром стал Парфенон. Парфенон — это центральный храм на Акрополе, построенный после греко-персидских войн.'
  },
  {
    id: 'hist_acropolis1',
    category: 'history',
    text: 'Что такое Акрополь?',
    options: [
      { id: 'acropolis1a', text: 'Священная скала с храмами, включая Парфенон', isCorrect: true },
      { id: 'acropolis1b', text: 'Древнегреческий город на севере Греции', isCorrect: false },
      { id: 'acropolis1c', text: 'Дворец, где жили правители Афин', isCorrect: false },
      { id: 'acropolis1d', text: 'Место проведения Олимпийских игр', isCorrect: false },
    ],
    explanation: 'Акрополь — это священная скала афинян. Во многих городах был свой акрополь. На афинском Акрополе был построен Парфенон — храм в честь богини Афины.'
  },
  {
    id: 'hist_writers1',
    category: 'history',
    text: 'Кто были величайшими древнегреческими поэтами и философами?',
    options: [
      { id: 'writers1a', text: 'Гомер, Эсхил, Софокл, Еврипид, Сократ, Платон, Аристотель', isCorrect: true },
      { id: 'writers1b', text: 'Цезарь, Цицерон, Овидий, Гораций', isCorrect: false },
      { id: 'writers1c', text: 'Геродот, Фукидид, Ксенофонт, Пиндар', isCorrect: false },
      { id: 'writers1d', text: 'Александр Великий, Перикл, Фемистокл, Агамемнон', isCorrect: false },
    ],
    explanation: 'Первым был Гомер, написавший "Одиссею" и "Илиаду". В Афинах классического периода творили три выдающихся драматурга — Эсхил, Софокл и Еврипид. Самые известные философы — Сократ, его ученик Платон и ученик Платона Аристотель, который был учителем Александра Великого.'
  },
  {
    id: 'hist_unite1',
    category: 'history',
    text: 'Кто объединил всех древних греков?',
    options: [
      { id: 'unite1a', text: 'Филипп Македонский и его сын Александр Великий', isCorrect: true },
      { id: 'unite1b', text: 'Перикл из Афин', isCorrect: false },
      { id: 'unite1c', text: 'Леонид из Спарты', isCorrect: false },
      { id: 'unite1d', text: 'Клисфен, основатель демократии', isCorrect: false },
    ],
    explanation: 'Король Македонии Филипп, а затем его сын Александр Великий, объединили греков и распространили греческую культуру до Малой Азии и Индии. Александр получил прозвище Великий, потому что повсюду распространил греческий язык, культуру и традиции.'
  },
  {
    id: 'hist_after_alex1',
    category: 'history',
    text: 'Что последовало за Александром Великим и эллинистической эпохой?',
    options: [
      { id: 'after_alex1a', text: 'Римская империя, затем Византия, затем Османская империя', isCorrect: true },
      { id: 'after_alex1b', text: 'Персидская империя, затем Османская империя', isCorrect: false },
      { id: 'after_alex1c', text: 'Период независимости до 19 века', isCorrect: false },
      { id: 'after_alex1d', text: 'Возвращение к системе городов-государств', isCorrect: false },
    ],
    explanation: 'После Александра Великого и эллинистической эпохи наступила Римская империя, затем Византия, а после — Османская империя, начавшая свою историю в 1453 году.'
  },
  {
    id: 'hist_revolution1',
    category: 'history',
    text: 'Когда произошла Греческая революция после 400 лет османского владычества?',
    options: [
      { id: 'revolution1a', text: '25 марта 1821 года', isCorrect: true },
      { id: 'revolution1b', text: '12 июня 1812 года', isCorrect: false },
      { id: 'revolution1c', text: '28 октября 1940 года', isCorrect: false },
      { id: 'revolution1d', text: '17 ноября 1973 года', isCorrect: false },
    ],
    explanation: 'Греческая революция началась 25 марта 1821 года после почти 400 лет османского владычества.'
  },
  {
    id: 'hist_heroes1',
    category: 'history',
    text: 'Каких героев Греческой революции 1821 года вы знаете?',
    options: [
      { id: 'heroes1a', text: 'Теодорос Колокотронис, Караискакис, Бубулина', isCorrect: true },
      { id: 'heroes1b', text: 'Перикл, Фемистокл, Аристид', isCorrect: false },
      { id: 'heroes1c', text: 'Метаксас, Венизелос, Каподистриас', isCorrect: false },
      { id: 'heroes1d', text: 'Константин Палеолог, Константин I, Георг I', isCorrect: false },
    ],
    explanation: 'Героями Греческой революции 1821 года были Теодорос Колокотронис, Караискакис, Бубулина и многие другие, кто боролся за независимость Греции от Османской империи.'
  },
  {
    id: 'hist_recognition1',
    category: 'history',
    text: 'Когда Греция была признана иностранными державами свободным государством?',
    options: [
      { id: 'recognition1a', text: 'В 1830 году по Лондонскому договору', isCorrect: true },
      { id: 'recognition1b', text: 'В 1821 году с началом революции', isCorrect: false },
      { id: 'recognition1c', text: 'В 1832 году по Константинопольскому договору', isCorrect: false },
      { id: 'recognition1d', text: 'В 1913 году после Балканских войн', isCorrect: false },
    ],
    explanation: 'Греция была признана независимым государством в 1830 году согласно Лондонскому договору, подписанному Великобританией, Францией и Россией.'
  },
  {
    id: 'hist_capital1',
    category: 'history',
    text: 'Какая была первая столица независимой Греции и кто был первым губернатором?',
    options: [
      { id: 'capital1a', text: 'Нафплион, Иоаннис Каподистриас', isCorrect: true },
      { id: 'capital1b', text: 'Афины, Оттон Баварский', isCorrect: false },
      { id: 'capital1c', text: 'Патры, Теодорос Колокотронис', isCorrect: false },
      { id: 'capital1d', text: 'Салоники, Элефтериос Венизелос', isCorrect: false },
    ],
    explanation: 'Первой столицей независимой Греции был Нафплион, а первым губернатором — Иоаннис Каподистриас, который был убит через три года после назначения.'
  },
  {
    id: 'hist_ruler1',
    category: 'history',
    text: 'Кто правил Грецией после Каподистриаса?',
    options: [
      { id: 'ruler1a', text: 'Оттон Баварский, который в 1843 году был вынужден дать Греции конституцию', isCorrect: true },
      { id: 'ruler1b', text: 'Георг I из династии Глюксбургов', isCorrect: false },
      { id: 'ruler1c', text: 'Элефтериос Венизелос как премьер-министр', isCorrect: false },
      { id: 'ruler1d', text: 'Временное правительство Теодороса Колокотрониса', isCorrect: false },
    ],
    explanation: 'После Каподистриаса великие державы привели баварца Оттона в качестве правителя Греции. В 1834 году столицей стали Афины. В 1843 году греки восстали, и Оттон был вынужден дать Греции первую конституцию.'
  },
  {
    id: 'hist_ministers1',
    category: 'history',
    text: 'Каких выдающихся премьер-министров Греции после Оттона вы знаете?',
    options: [
      { id: 'ministers1a', text: 'Харилаос Трикупис и Элефтериос Венизелос', isCorrect: true },
      { id: 'ministers1b', text: 'Константин Караманлис и Андреас Папандреу', isCorrect: false },
      { id: 'ministers1c', text: 'Иоаннис Метаксас и Георгиос Папандреу', isCorrect: false },
      { id: 'ministers1d', text: 'Александрос Маврокордатос и Спиридон Трикупис', isCorrect: false },
    ],
    explanation: 'Среди выдающихся премьер-министров после Оттона были Харилаос Трикупис, создавший первую железнодорожную сеть Греции и Истм Коринфа, и Элефтериос Венизелос с его "Великой идеей" расширения границ Греции.'
  },
  {
    id: 'hist_holiday1',
    category: 'history',
    text: 'Когда отмечается второй большой национальный праздник Греции после 25 марта?',
    options: [
      { id: 'holiday1a', text: '28 октября 1940 года ("День Охи")', isCorrect: true },
      { id: 'holiday1b', text: '17 ноября 1973 года (восстание в Политехническом институте)', isCorrect: false },
      { id: 'holiday1c', text: '12 октября 1944 года (освобождение Афин)', isCorrect: false },
      { id: 'holiday1d', text: '23 июля 1974 года (падение военной хунты)', isCorrect: false },
    ],
    explanation: 'Второй большой национальный праздник отмечается 28 октября 1940 года. Греки празднуют "НЕТ" (Охи), которое премьер-министр Метаксас сказал итальянцам, не позволив им пройти через Грецию во время Второй мировой войны.'
  },
  {
    id: 'hist_junta1',
    category: 'history',
    text: 'Что происходило в Греции с 1967 по 1974 годы?',
    options: [
      { id: 'junta1a', text: 'Военная диктатура (хунта)', isCorrect: true },
      { id: 'junta1b', text: 'Гражданская война', isCorrect: false },
      { id: 'junta1c', text: 'Экономический бум "греческого чуда"', isCorrect: false },
      { id: 'junta1d', text: 'Правление короля Константина II', isCorrect: false },
    ],
    explanation: 'С 1967 по 1974 годы в Греции была военная диктатура (хунта). В память о сопротивлении диктатуре отмечается праздник Политехнио (17 ноября) в честь студенческого восстания 1973 года.'
  },
  {
    id: 'hist_anthem1',
    category: 'history',
    text: 'Кто написал национальный гимн Греции?',
    options: [
      { id: 'anthem1a', text: 'Дионисиос Соломос (слова) и Николаос Мандзарос (музыка)', isCorrect: true },
      { id: 'anthem1b', text: 'Адамантиос Кораис и Ригас Фереос', isCorrect: false },
      { id: 'anthem1c', text: 'Константин Кавафис и Микис Теодоракис', isCorrect: false },
      { id: 'anthem1d', text: 'Элефтериос Венизелос и Димитриос Митропулос', isCorrect: false },
    ],
    explanation: 'Национальный гимн Греции "Гимн свободе" написал поэт Дионисиос Соломос, а музыку сочинил композитор Николаос Мандзарос.'
  },
];

const History = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  console.log('History page loaded with', historyQuestions.length, 'questions');

  const handleAnswer = (wasCorrect: boolean) => {
    setTotalAnswered(prev => prev + 1);
    if (wasCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < historyQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setTotalAnswered(0);
    setShowResults(false);
  };

  const currentQuestion = historyQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            История Греции
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Узнайте больше о богатой и древней истории Греции, от древних цивилизаций до современного государства.
          </p>
        </div>
        
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-medium text-gray-900">
                Проверьте свои знания
              </h2>
              <div className="text-sm text-gray-500">
                Вопрос {currentQuestionIndex + 1} из {historyQuestions.length}
              </div>
            </div>
            
            {currentQuestion && (
              <TestCard 
                question={currentQuestion}
                onAnswer={handleAnswer}
                onComplete={handleNextQuestion}
                className="mb-6"
              />
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-soft">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-greek-blue/10 text-greek-darkBlue mb-4">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                Результаты теста
              </h2>
              <p className="text-gray-600">
                Вы ответили правильно на {correctAnswers} из {totalAnswered} вопросов
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetQuiz} className="flex-1 sm:flex-none">
                Пройти тест снова
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none" asChild>
                <Link to="/practice">
                  Больше практики
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
