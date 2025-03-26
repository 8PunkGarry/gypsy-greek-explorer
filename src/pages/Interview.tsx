
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BlurBackground from '@/components/ui/BlurBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle, UserCircle, UserRound, MessageCircle, RotateCw, XCircle, Upload, Filter } from 'lucide-react';
import { toast } from "sonner";
import TestCard from '@/components/ui/TestCard';
import QuestionUploader from '@/components/ui/QuestionUploader';

interface InterviewQuestion {
  id: string;
  category: 'history' | 'geography' | 'culture' | 'politics';
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  explanation: string;
  type: 'multiple-choice' | 'open-ended';
}

const defaultInterviewQuestions: InterviewQuestion[] = [
  // История
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
    explanation: 'Хотя Греческая война за независимость началась в 1821 году, официально независимость была признана в 1830 году с подписанием Лондонского протокола.',
    type: 'multiple-choice'
  },
  {
    id: 'hist2',
    category: 'history',
    text: 'Что означает "День Охи" (ΟΧИ) и когда его отмечают?',
    options: [
      { id: 'h2a', text: '28 октября, день отказа Греции подчиниться фашистской Италии', isCorrect: true },
      { id: 'h2b', text: '25 марта, начало восстания против османского владычества', isCorrect: false },
      { id: 'h2c', text: '17 ноября, день восстания студентов против военной хунты', isCorrect: false },
      { id: 'h2d', text: '3 сентября, день принятия первой конституции', isCorrect: false },
    ],
    explanation: '"День Охи" (День "Нет") отмечается 28 октября в память о решительном отказе премьер-министра Иоанниса Метаксаса подчиниться ультиматуму Муссолини в 1940 году.',
    type: 'multiple-choice'
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
    explanation: 'Цивилизаций Древней Греции было четыре: Микенская (Пелопоннес), Минойская (Крит), классическая античность (Афины) и эллинистический период, во время которого греческая культура распространилась по всему тогдашнему миру.',
    type: 'multiple-choice'
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
    explanation: 'Древняя Греция была разделена на города-государства. Каждый город был отдельным государством со своим царём, монетами и законами. Самыми значительными городами были Афины, Спарта, Фивы, и между ними постоянно велись войны, например, Пелопоннесская война, длившаяся 27 лет.',
    type: 'multiple-choice'
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
    explanation: 'Афины достигли наивысшего расцвета в 5-м веке до н. э., который назвали золотым веком Перикла, принесшего демократию.',
    type: 'multiple-choice'
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
    explanation: 'Этот период назвали золотым веком, потому что развивались литература и искусство, а главным достижением или шедевром стал Парфенон. Парфенон — это центральный храм на Акрополе, построенный после греко-персидских войн.',
    type: 'multiple-choice'
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
    explanation: 'Акрополь — это священная скала афинян. Во многих городах был свой акрополь. На афинском Акрополе был построен Парфенон — храм в честь богини Афины.',
    type: 'multiple-choice'
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
    explanation: 'Первым был Гомер, написавший "Одиссею" и "Илиаду". В Афинах классического периода творили три выдающихся драматурга — Эсхил, Софокл и Еврипид. Самые известные философы — Сократ, его ученик Платон и ученик Платона Аристотель, который был учителем Александра Великого.',
    type: 'multiple-choice'
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
    explanation: 'Король Македонии Филипп, а затем его сын Александр Великий, объединили греков и распространили греческую культуру до Малой Азии и Индии. Александр получил прозвище Великий, потому что повсюду распространил греческий язык, культуру и традиции.',
    type: 'multiple-choice'
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
    explanation: 'После Александра Великого и эллинистической эпохи наступила Римская империя, затем Византия, а после — Османская империя, начавшая свою историю в 1453 году.',
    type: 'multiple-choice'
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
    explanation: 'Греческая революция началась 25 марта 1821 года после почти 400 лет османского владычества.',
    type: 'multiple-choice'
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
    explanation: 'Героями Греческой революции 1821 года были Теодорос Колокотронис, Караискакис, Бубулина и многие другие, кто боролся за независимость Греции от Османской империи.',
    type: 'multiple-choice'
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
    explanation: 'Греция была признана независимым государством в 1830 году согласно Лондонскому договору, подписанному Великобританией, Францией и Россией.',
    type: 'multiple-choice'
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
    explanation: 'Первой столицей независимой Греции был Нафплион, а первым губернатором — Иоаннис Каподистриас, который был убит через три года после назначения.',
    type: 'multiple-choice'
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
    explanation: 'После Каподистриаса великие державы привели баварца Оттона в качестве правителя Греции. В 1834 году столицей стали Афины. В 1843 году греки восстали, и Оттон был вынужден дать Греции первую конституцию.',
    type: 'multiple-choice'
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
    explanation: 'Среди выдающихся премьер-министров после Оттона были Харилаос Трикупис, создавший первую железнодорожную сеть Греции и Истм Коринфа, и Элефтериос Венизелос с его "Великой идеей" расширения границ Греции.',
    type: 'multiple-choice'
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
    explanation: 'Второй большой национальный праздник отмечается 28 октября 1940 года. Греки празднуют "НЕТ" (Охи), которое премьер-министр Метаксас сказал итальянцам, не позволив им пройти через Грецию во время Второй мировой войны.',
    type: 'multiple-choice'
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
    explanation: 'С 1967 по 1974 годы в Греции была военная диктатура (хунта). В память о сопротивлении диктатуре отмечается праздник Политехнио (17 ноября) в честь студенческого восстания 1973 года.',
    type: 'multiple-choice'
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
    explanation: 'Национальный гимн Греции "Гимн свободе" написал поэт Дионисиос Соломос, а музыку сочинил композитор Николаос Мандзарос.',
    type: 'multiple-choice'
  },
  // География
  {
    id: 'geo1',
    category: 'geography',
    text: 'Какой самый крупный остров Греции?',
    options: [
      { id: 'g1a', text: 'Крит', isCorrect: true },
      { id: 'g1b', text: 'Родос', isCorrect: false },
      { id: 'g1c', text: 'Корфу', isCorrect: false },
      { id: 'g1d', text: 'Санторини', isCorrect: false },
    ],
    explanation: 'Крит – самый большой греческий остров с площадью около 8,336 км². Он имеет богатую историю, включая минойскую цивилизацию, и является важным культурным и туристическим центром Греции.',
    type: 'multiple-choice'
  },
  // Культура
  {
    id: 'cult1',
    category: 'culture',
    text: 'Какой танец считается неофициальным национальным танцем Греции?',
    options: [
      { id: 'c1a', text: 'Сиртаки', isCorrect: true },
      { id: 'c1b', text: 'Каламатьянос', isCorrect: false },
      { id: 'c1c', text: 'Зейбекико', isCorrect: false },
      { id: 'c1d', text: 'Хасапико', isCorrect: false },
    ],
    explanation: 'Сиртаки, хотя и сравнительно новый танец (созданный для фильма "Грек Зорба" в 1964 году), стал наиболее узнаваемым греческим танцем в мире и символом греческой культуры.',
    type: 'multiple-choice'
  },
  // Политика
  {
    id: 'pol1',
    category: 'politics',
    text: 'Какая форма правления в Греции?',
    options: [
      { id: 'p1a', text: 'Парламентская республика', isCorrect: true },
      { id: 'p1b', text: 'Конституционная монархия', isCorrect: false },
      { id: 'p1c', text: 'Президентская республика', isCorrect: false },
      { id: 'p1d', text: 'Федеративная республика', isCorrect: false },
    ],
    explanation: 'Греция является парламентской республикой с 1975 года, после падения военной диктатуры. Глава государства – президент, а правительство возглавляет премьер-министр.',
    type: 'multiple-choice'
  },
  // Открытые вопросы
  {
    id: 'open1',
    category: 'culture',
    text: 'Почему сохранение греческого языка и культуры важно для вас?',
    options: [{ id: 'open1-option', text: '', isCorrect: true }],
    correctAnswer: 'Это открытый вопрос, направленный на ваше личное отношение к греческой культуре и языку.',
    explanation: 'На собеседовании важно показать искреннюю связь с греческой культурой и языком. Можно рассказать о личном интересе к истории Греции, значимости сохранения культурного наследия, желании передать традиции следующим поколениям.',
    type: 'open-ended'
  },
  {
    id: 'open2',
    category: 'politics',
    text: 'Как вы понимаете обязанности гражданина Греции?',
    options: [{ id: 'open2-option', text: '', isCorrect: true }],
    correctAnswer: 'Этот вопрос проверяет ваше понимание гражданских обязанностей.',
    explanation: 'Хороший ответ включает: уважение к законам страны, участие в демократических процессах (голосование), уплата налогов, защита национальных интересов, сохранение культурного наследия, участие в общественной жизни.',
    type: 'open-ended'
  },
];

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{questionId: string, response: string, correct?: boolean}[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(defaultInterviewQuestions);
  const [customQuestions, setCustomQuestions] = useState<InterviewQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<InterviewQuestion[]>([]);
  
  const hasQuestions = activeQuestions.length > 0;
  const currentQuestion = hasQuestions ? activeQuestions[currentQuestionIndex] : null;

  useEffect(() => {
    const savedQuestions = localStorage.getItem('customInterviewQuestions');
    if (savedQuestions) {
      try {
        const parsedQuestions = JSON.parse(savedQuestions);
        console.log('Loaded custom questions:', parsedQuestions);

        // Ensure all loaded questions have options array for consistency
        const processedCustomQuestions = parsedQuestions.map((q: any) => {
          if (!q.options || q.options.length === 0) {
            return {
              ...q,
              options: [{ id: `${q.id}-option`, text: '', isCorrect: true }]
            };
          }
          return q;
        });
        
        setCustomQuestions(processedCustomQuestions);
      } catch (e) {
        console.error("Error parsing saved questions:", e);
      }
    } else {
      console.log('No custom questions found in localStorage');
    }
  }, []);

  useEffect(() => {
    // Debug state values
    console.log('DEBUG - Current state:', {
      selectedCategory,
      interviewQuestionsLength: interviewQuestions.length,
      customQuestionsLength: customQuestions.length,
      activeQuestionsLength: activeQuestions.length,
      historyQuestionsCount: interviewQuestions.filter(q => q.category === 'history').length
    });
    
    const currentPath = window.location.pathname;
    console.log('DEBUG - Current path:', currentPath);
    
    // Determine category from URL
    let categoryFromPath: string | null = null;
    
    if (currentPath.includes('/history')) {
      categoryFromPath = 'history';
    } else if (currentPath.includes('/geography')) {
      categoryFromPath = 'geography';
    } else if (currentPath.includes('/culture')) {
      categoryFromPath = 'culture';
    } else if (currentPath.includes('/politics')) {
      categoryFromPath = 'politics';
    } else if (currentPath.includes('/practice')) {
      // For practice page, use the selected category
      categoryFromPath = selectedCategory;
    }
    
    // Update category if determined from URL and different from current
    if (categoryFromPath && selectedCategory !== categoryFromPath) {
      console.log('DEBUG - Setting category from path:', categoryFromPath);
      setSelectedCategory(categoryFromPath);
      return; // Exit as the selectedCategory change will trigger another useEffect run
    }
    
    // Collect all questions
    let allQuestions = [...interviewQuestions];
    console.log('DEBUG - Default questions count:', interviewQuestions.length);
    console.log('DEBUG - History questions in default:', interviewQuestions.filter(q => q.category === 'history').length);
    
    // Add custom questions with options array for consistency
    if (customQuestions.length > 0) {
      const validCustomQuestions = customQuestions.map(q => {
        if (!q.options || q.options.length === 0) {
          return {
            ...q,
            options: [{ id: `${q.id}-option`, text: '', isCorrect: true }]
          };
        }
        return q;
      });
      
      allQuestions = [...allQuestions, ...validCustomQuestions];
      console.log('DEBUG - Added custom questions, new total:', allQuestions.length);
    }
    
    // Filter by selected category
    let filteredQuestions = allQuestions;
    if (selectedCategory) {
      filteredQuestions = allQuestions.filter(q => q.category === selectedCategory);
      console.log(`DEBUG - Filtered questions for category ${selectedCategory}:`, filteredQuestions.length);
      
      // Log history questions for debugging
      if (selectedCategory === 'history') {
        console.log('DEBUG - History questions after filtering:', 
          filteredQuestions.map(q => q.id));
      }
    }
    
    // Set active questions
    console.log('DEBUG - Setting active questions, count:', filteredQuestions.length);
    setActiveQuestions(filteredQuestions);
    
    // Reset index if out of bounds for new filtered list
    if (currentQuestionIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentQuestionIndex(0);
    }
  }, [selectedCategory, interviewQuestions, customQuestions, currentQuestionIndex]);

  const handleStartInterview = () => {
    setInterviewStarted(true);
    toast.success("Практика началась", {
      description: "Отвечайте на вопросы, чтобы проверить свои знания"
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setCurrentAnswer('');
    } else {
      setInterviewComplete(true);
      toast.success("Практика завершена!", {
        description: "Вы ответили на все вопросы. Вы можете просмотреть свои результаты."
      });
    }
  };

  const handleMultipleChoiceAnswer = (wasCorrect: boolean) => {
    if (!currentQuestion) return;
    
    setResponses(prev => [...prev, {
      questionId: currentQuestion.id,
      response: '',
      correct: wasCorrect
    }]);
  };

  const handleOpenEndedSubmit = () => {
    if (!currentQuestion) return;
    
    if (currentAnswer.trim()) {
      setResponses(prev => [...prev, {
        questionId: currentQuestion.id,
        response: currentAnswer
      }]);
      toast.info("Ответ записан");
      
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      toast.error("Пожалуйста, введите ваш ответ");
    }
  };

  const restartInterview = () => {
    setCurrentQuestionIndex(0);
    setResponses([]);
    setInterviewComplete(false);
    setCurrentAnswer('');
    toast.info("Начинаем практику заново");
  };

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setInterviewComplete(false);
    
    if (category) {
      toast.info(`Выбрана категория: ${
        category === 'history' ? 'История' :
        category === 'geography' ? 'География' :
        category === 'culture' ? 'Культура' : 'Политика'
      }`);
    } else {
      toast.info("Выбраны все категории");
    }
  };

  const getCorrectAnswersCount = () => {
    return responses.filter(r => r.correct === true).length;
  };

  const getMultipleChoiceQuestionsCount = () => {
    return activeQuestions.filter(q => q.type === 'multiple-choice').length;
  };

  const getCategoryQuestionsCount = (category: string) => {
    return [...interviewQuestions, ...customQuestions].filter(q => q.category === category).length;
  };

  if (!hasQuestions && interviewStarted) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlurBackground />
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Нет доступных вопросов</CardTitle>
                  <CardDescription>Добавьте вопросы или выберите другую категорию</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>В выбранной категории нет вопросов. Пожалуйста, добавьте новые вопросы в разделе "Вопросы" или выберите другую категорию.</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/questions')}
                  >
                    Добавить вопросы
                  </Button>
                  <Button 
                    onClick={() => {
                      setInterviewStarted(false);
                      setSelectedCategory(null);
                    }}
                  >
                    Вернуться назад
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
              Практика
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Проверьте свои знания о Греции с помощью практических вопросов.
              {selectedCategory === 'history' && ` Текущая категория: История (${activeQuestions.length} вопросов)`}
              {selectedCategory === 'geography' && ` Текущая категория: География (${activeQuestions.length} вопросов)`}
              {selectedCategory === 'culture' && ` Текущая категория: Культура (${activeQuestions.length} вопросов)`}
              {selectedCategory === 'politics' && ` Текущая категория: Политика (${activeQuestions.length} вопросов)`}
            </p>
          </div>
          
          {!interviewStarted && !interviewComplete && (
            <>
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Фильтр по категории:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedCategory === null ? "default" : "outline"} 
                      onClick={() => handleSelectCategory(null)}
                      className="rounded-full"
                      size="sm"
                    >
                      Все ({interviewQuestions.length + customQuestions.length})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'history' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('history')}
                      className="rounded-full"
                      size="sm"
                    >
                      История ({getCategoryQuestionsCount('history')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'geography' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('geography')}
                      className="rounded-full"
                      size="sm"
                    >
                      География ({getCategoryQuestionsCount('geography')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'culture' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('culture')}
                      className="rounded-full"
                      size="sm"
                    >
                      Культура ({getCategoryQuestionsCount('culture')})
                    </Button>
                    <Button 
                      variant={selectedCategory === 'politics' ? "default" : "outline"} 
                      onClick={() => handleSelectCategory('politics')}
                      className="rounded-full"
                      size="sm"
                    >
                      Политика ({getCategoryQuestionsCount('politics')})
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <Card className="bg-white/90 hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-greek-blue/10 flex items-center justify-center text-greek-darkBlue">
                          <CheckCircle size={24} />
                        </div>
                        <CardTitle className="text-xl">Проверьте свои знания</CardTitle>
                      </div>
                      <CardDescription>Ответьте на вопросы о Греции и подготовьтесь к собеседованию</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Пройдите тест из {activeQuestions.length} вопросов и узнайте насколько хорошо вы знаете Грецию.
                      </p>
                      <Button 
                        onClick={handleStartInterview}
                        className="w-full"
                      >
                        Начать практику
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/90 hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-greek-blue/10 flex items-center justify-center text-greek-darkBlue">
                          <UserRound size={24} />
                        </div>
                        <CardTitle className="text-xl">Симуляция собеседования</CardTitle>
                      </div>
                      <CardDescription>Практикуйтесь отвечать на реальные вопросы собеседования</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Потренируйтесь отвечать на вопросы, которые могут быть заданы на официальном собеседовании.
                      </p>
                      <Button 
                        onClick={() => navigate('/questions')}
                        variant="outline"
                        className="w-full"
                      >
                        К вопросам собеседования
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/90 hover:shadow-md transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-greek-blue/10 flex items-center justify-center text-greek-darkBlue">
                          <Upload size={24} />
                        </div>
                        <CardTitle className="text-xl">Добавьте свои вопросы</CardTitle>
                      </div>
                      <CardDescription>Создайте свои вопросы для подготовки к собеседованию</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">
                        Создавайте собственные вопросы и ответы, чтобы лучше подготовиться к собеседованию.
                      </p>
                      <Button 
                        onClick={() => navigate('/questions')}
                        variant="outline"
                        className="w-full"
                      >
                        Создать вопросы
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
          
          {interviewStarted && !interviewComplete && currentQuestion && (
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-sm text-gray-500">Категория: {
                    currentQuestion.category === 'history' ? 'История' :
                    currentQuestion.category === 'geography' ? 'География' :
                    currentQuestion.category === 'culture' ? 'Культура' :
                    'Политика'
                  }</span>
                  <h2 className="text-2xl font-heading font-medium text-gray-900">Вопрос {currentQuestionIndex + 1} из {activeQuestions.length}</h2>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setInterviewStarted(false);
                    setCurrentQuestionIndex(0);
                    setResponses([]);
                  }}
                >
                  Вернуться
                </Button>
              </div>
              
              {currentQuestion.type === 'multiple-choice' && (
                <TestCard 
                  question={currentQuestion}
                  onAnswer={handleMultipleChoiceAnswer}
                  onComplete={handleNextQuestion}
                  className="mb-6"
                />
              )}
              
              {currentQuestion.type === 'open-ended' && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{currentQuestion.text}</CardTitle>
                    <CardDescription>
                      Ответьте на вопрос своими словами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea
                      className="w-full min-h-[150px] p-4 border border-gray-200 rounded-lg"
                      placeholder="Введите ваш ответ здесь..."
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                    <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Подсказка:</h4>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleOpenEndedSubmit}>
                      Отправить ответ
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          )}
          
          {interviewComplete && (
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Результаты теста</CardTitle>
                  <CardDescription>
                    Вы ответили на все вопросы! Вот ваши результаты:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-heading font-semibold relative">
                      {getCorrectAnswersCount()}
                      <span className="text-sm text-gray-500 absolute -bottom-8">из {getMultipleChoiceQuestionsCount()}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Правильных ответов:</h3>
                      <p className="text-gray-600">{getCorrectAnswersCount()} из {getMultipleChoiceQuestionsCount()} ({Math.round(getCorrectAnswersCount() / getMultipleChoiceQuestionsCount() * 100)}%)</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Пройденные вопросы:</h3>
                      <p className="text-gray-600">{responses.length} из {activeQuestions.length}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Категория:</h3>
                      <p className="text-gray-600">{selectedCategory ? 
                        selectedCategory === 'history' ? 'История' :
                        selectedCategory === 'geography' ? 'География' :
                        selectedCategory === 'culture' ? 'Культура' : 'Политика'
                        : 'Все категории'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setInterviewStarted(false);
                      setInterviewComplete(false);
                    }}
                  >
                    Вернуться
                  </Button>
                  <Button onClick={restartInterview}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Пройти снова
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Interview;
