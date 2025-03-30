import React, { useState, useEffect } from 'react';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TestCard from '@/components/ui/TestCard';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Question } from '@/types/questions';
import { Landmark } from 'lucide-react';

const Politics = () => {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Original questions data
  const politicsQuestions = [
    {
      id: "politics-1",
      text: "Что такое Конституция?",
      options: [
        { 
          id: "a", 
          text: "Конституция — это высший Закон государства. Все остальные законы должны соответствовать ей. В ней 120 статей.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Конституция — это свод правил поведения граждан.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Конституция — это договор между гражданами и президентом.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Конституция — это документ, определяющий только права граждан.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-2">
        <p class="font-medium">Конституция — это высший Закон государства.</p>
        <ul class="list-disc pl-5 space-y-1">
          <li>Принята в 1975 году после падения диктатуры "черных полковников".</li>
          <li>Состоит из 120 статей, разделенных на 4 части.</li>
          <li>Устанавливает Грецию как парламентскую республику.</li>
          <li>Все остальные законы должны соответствовать Конституции.</li>
          <li>Гарантирует основные права и свободы граждан.</li>
          <li>Для внесения изменений требуется специальная процедура пересмотра.</li>
        </ul>
        <p>Запомните: Конституция — это фундамент правовой системы Греции, определяющий структуру государства, права граждан и принципы функционирования власти.</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-2",
      text: "Какое у Греции устройство государства и как вы его понимаете? Опишите его.",
      options: [
        { 
          id: "a", 
          text: "Наше устройство государства — это Республика с парламентской системой правления. Это означает, что у нас есть Президент Республики, который является высшим должностным лицом, избираемым Парламентом. Также есть Парламент, состоящий из 300 депутатов, которые выбираются народом и затем голосуют за Президента и законы. Имеется также Демократия, так как именно мы, народ, избираем депутатов.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Греция — это президентская республика, в которой Президент избирается всенародным голосованием и обладает исполнительной властью. Он формирует правительство и назначает министров. Парламент состоит из 250 депутатов и выполняет законодательную функцию, но не может влиять на состав правительства. Президент имеет право вето на законы.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Греция — это конституционная монархия с парламентом. Король является главой государства, но его власть ограничена конституцией. Парламент состоит из двух палат: Сената (верхняя палата) и Национального собрания (нижняя палата). Премьер-министр назначается королем из числа лидеров партий и руководит правительством.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Греция — это федеративное государство, разделенное на 13 автономных регионов, каждый из которых имеет свой парламент и правительство. Центральное правительство во главе с Премьер-министром решает только вопросы обороны, внешней политики и экономики, а все остальные полномочия делегированы регионам.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-3">
        <p class="font-medium">Греция — это парламентская республика с демократической системой правления.</p>
        
        <div>
          <p class="font-medium mb-1">Основные элементы государственного устройства:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li><span class="font-medium">Президент Республики</span> — глава государства, избираемый Парламентом на 5-летний срок. Имеет ограниченные полномочия, в основном представительского характера.</li>
            <li><span class="font-medium">Парламент (Вули)</span> — однопалатный законодательный орган, состоящий из 300 депутатов, избираемых народом на 4 года.</li>
            <li><span class="font-medium">Премьер-министр</span> — глава правительства, лидер партии, получившей большинство в парламенте (не менее 151 места).</li>
            <li><span class="font-medium">Судебная система</span> — независимая ветвь власти, включающая три высших суда (Ареопаг, Совет госбезопасности и Контролирующий совет).</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">Особенности греческой демократии:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Прямые выборы парламента гражданами.</li>
            <li>Пропорциональная система с "бонусом" для партии-победителя.</li>
            <li>Разделение властей на законодательную, исполнительную и судебную.</li>
            <li>Многопартийная система.</li>
          </ul>
        </div>

        <p>Запомните: В Греции парламент избирается народом, а президент — парламентом; основная исполнительная власть сосредоточена в руках премьер-министра, а не президента.</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-3",
      text: "Сколько видов выборов существует?",
      options: [
        { 
          id: "a", 
          text: "В греческой политической системе существуют четыре вида выборов: президентские (когда Парламент избирает главу государства), национальные или парламентские (когда граждане выбирают депутатов в законодательный орган), муниципальные (для избрания местных руководителей и губернаторов) и европарламентские (для выбора представителей страны в Европейский парламент, всего 24 депутата).", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "В Греции существуют три вида выборов: всеобщие парламентские выборы, которые проводятся раз в четыре года для избрания 300 депутатов; президентские выборы, на которых все граждане напрямую голосуют за кандидатов в президенты; и региональные выборы, которые проводятся для избрания губернаторов и местных советов в 13 регионах страны. Представители в Европарламент назначаются правительством.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Греческая избирательная система включает только два типа выборов: национальные парламентские выборы, проводимые каждые пять лет для избрания 350 депутатов по пропорциональной системе, и объединенные местные выборы, на которых одновременно избираются мэры, губернаторы и члены региональных советов. Президента избирает специальная коллегия выборщиков, а европейские депутаты назначаются парламентом.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "В современной Греции существует единая избирательная система, основанная на принципе всеобщих выборов, проводимых каждые четыре года. В ходе этих выборов граждане одновременно голосуют за кандидатов в парламент, президенты, местные органы власти и представителей в Европарламент с использованием электронной системы голосования, внедренной в 2018 году для упрощения процесса.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-3">
        <p class="font-medium">В Греции существует четыре вида выборов, каждый со своими особенностями и значением:</p>
        
        <div>
          <p class="font-medium mb-1">1. Президентские выборы</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Проводятся в парламенте, а не всенародным голосованием</li>
            <li>Требуется квалифицированное большинство голосов депутатов (200 голосов в первых двух турах, 180 в третьем)</li>
            <li>Если парламент не может избрать президента после трех туров, он распускается, и назначаются новые парламентские выборы</li>
            <li>Президент избирается на 5-летний срок, с правом одного переизбрания</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">2. Национальные (парламентские) выборы</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Проводятся каждые 4 года (или досрочно при определенных условиях)</li>
            <li>Избираются 300 депутатов в однопалатный парламент (Вули)</li>
            <li>Партия, получившая большинство, формирует правительство</li>
            <li>С 2016 года используется усовершенствованная пропорциональная система</li>
            <li>Партия-победитель получает дополнительные места ("бонус") для обеспечения стабильного большинства</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">3. Муниципальные выборы</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Проводятся каждые 5 лет для выборов мэров, муниципальных советов и губернаторов 13 регионов</li>
            <li>Обеспечивают местное самоуправление на уровне муниципалитетов и регионов</li>
            <li>Важны для решения локальных вопросов и распределения местных бюджетов</li>
            <li>Используется двухтуровая система голосования</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">4. Европарламентские выборы</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Проводятся раз в 5 лет одновременно со всеми странами ЕС</li>
            <li>Греция избирает 24 депутата в Европейский парламент</li>
            <li>Используется пропорциональная система без "бонуса"</li>
            <li>Результаты часто рассматриваются как барометр популярности партий внутри страны</li>
          </ul>
        </div>
        
        <p>Запомните: отличительная особенность греческой системы — президента избирает парламент, а не граждане напрямую.</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-4",
      text: "Какие высшие суды существуют в государстве?",
      options: [
        { 
          id: "a", 
          text: "— Верховный суд 'Ареопаг' для гражданских дел.\n— Совет госбезопасности для административных вопросов.\n— Контролирующий совет для финансовых вопросов.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "В Греции существует только один Верховный суд.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Европейский суд по правам человека является высшим судом Греции.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "В Греции нет высших судов, все судебные решения принимает парламент.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-3">
        <p class="font-medium">В Греции существуют три высших суда, каждый со своей специализацией и юрисдикцией:</p>
        
        <div>
          <p class="font-medium mb-1">1. Верховный суд "Ареопаг" (Άρειος Πάγος)</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Высший суд по гражданским и уголовным делам</li>
            <li>Название происходит от древнегреческого суда, заседавшего на холме Ареса в Афинах</li>
            <li>Рассматривает апелляции на решения нижестоящих судов</li>
            <li>Обеспечивает единообразное толкование гражданского и уголовного законодательства</li>
            <li>Состоит из Председателя и 10 заместителей председателя, а также множества судей-советников</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">2. Совет госбезопасности (Συμβούλιο της Επικρατείας)</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Высший административный суд</li>
            <li>Рассматривает жалобы на действия и акты органов государственной власти</li>
            <li>Осуществляет контроль за соответствием административных решений закону</li>
            <li>Может отменять незаконные административные акты</li>
            <li>Дает толкование норм административного права</li>
            <li>Играет важную роль в защите прав граждан от произвола власти</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">3. Контролирующий совет (Ελεγκτικό Συνέδριο)</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Высший финансовый суд и орган финансового контроля</li>
            <li>Осуществляет предварительный и последующий контроль расходов государства</li>
            <li>Рассматривает споры по пенсионным вопросам государственных служащих</li>
            <li>Проверяет законность крупных государственных контрактов</li>
            <li>Следит за исполнением государственного бюджета</li>
            <li>Является независимым органом, подчиняющимся только Конституции и законам</li>
          </ul>
        </div>
        
        <p>Запомните: Система трех высших судов обеспечивает разделение судебной власти по специализации, что позволяет более эффективно осуществлять правосудие в разных сферах общественных отношений.</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-5",
      text: "За кого мы голосуем, и как появляется Премьер-министр?",
      options: [
        { 
          id: "a", 
          text: "Мы голосуем за депутатов, и та партия, которая получает 151 место в Парламенте, формирует Премьер-министра.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Мы голосуем напрямую за Премьер-министра.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Премьер-министра назначает Президент Республики.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Премьер-министра выбирают судьи Верховного суда.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-3">
        <p class="font-medium">Процесс формирования правительства в Греции:</p>
        
        <div>
          <p class="font-medium mb-1">Парламентские выборы и голосование:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Граждане Греции голосуют за политические партии и их кандидатов в депутаты</li>
            <li>В парламент избираются 300 депутатов</li>
            <li>Используется пропорциональная система с "бонусом" для партии-победителя</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">Формирование правительства:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Для формирования правительства партии необходимо иметь большинство в парламенте (не менее 151 места из 300)</li>
            <li>Если ни одна партия не получает абсолютного большинства, могут формироваться коалиции</li>
            <li>Президент дает мандат на формирование правительства лидеру партии, получившей наибольшее число мест</li>
            <li>Лидер победившей партии автоматически становится кандидатом на пост Премьер-министра</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">Назначение Премьер-министра:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>После формирования парламентского большинства лидер партии/коалиции приносит присягу и становится Премьер-министром</li>
            <li>Президент официально назначает Премьер-министра, но это формальность, основанная на результатах выборов</li>
            <li>Премьер-министр формирует кабинет министров</li>
            <li>Новое правительство должно получить вотум доверия от парламента</li>
          </ul>
        </div>
        
        <p>Запомните: граждане не голосуют напрямую за Премьер-министра, а голосуют за партии и их кандидатов в депутаты. Премьер-министром становится лидер партии, получившей большинство в парламенте (151+ мест).</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    },
    {
      id: "politics-6",
      text: "Кто наш Премьер-министр и кто Президент Республики?",
      options: [
        { 
          id: "a", 
          text: "Премьер-министром является Кириакос Мицотакис, а Президентом — госпожа Сакелларопулу.", 
          isCorrect: true 
        },
        { 
          id: "b", 
          text: "Премьер-министром является Алексис Ципрас, а Президентом — Прокопис Павлопулос.", 
          isCorrect: false 
        },
        { 
          id: "c", 
          text: "Премьер-министром является Костас Караманлис, а Президентом — Костис Стефанопулос.", 
          isCorrect: false 
        },
        { 
          id: "d", 
          text: "Премьер-министром является Антонис Самарас, а Президентом — Каролос Папульяс.", 
          isCorrect: false 
        },
      ],
      explanation: `<div class="space-y-3">
        <p class="font-medium">Нынешние лидеры Греции:</p>
        
        <div>
          <p class="font-medium mb-1">Премьер-министр — Кириакос Мицотакис (Κυριάκος Μητσοτάκης):</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Лидер партии "Новая Демократия" (правоцентристская партия)</li>
            <li>Занимает пост с 8 июля 2019 года</li>
            <li>Переизбран на второй срок в июне 2023 года</li>
            <li>Родился 4 марта 1968 года (55 лет) в Афинах</li>
            <li>Имеет образование в области социальных наук (Гарвардский университет) и международных отношений (Стэнфордский университет)</li>
            <li>Сын бывшего премьер-министра Греции Константиноса Мицотакиса</li>
            <li>До политической карьеры работал в финансовом секторе</li>
          </ul>
        </div>
        
        <div>
          <p class="font-medium mb-1">Президент — Катерина Сакелларопулу (Αικατερίνη Σακελλαροπούλου):</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Первая женщина-президент в истории Греции</li>
            <li>Вступила в должность 13 марта 2020 года</li>
            <li>Избрана парламентом с рекордной поддержкой (261 голос из 300)</li>
            <li>Родилась 30 мая 1956 года (67 лет) в Салониках</li>
            <li>По профессии — юрист, специалист по конституционному и экологическому праву</li>
            <li>До избрания президентом была председателем Верховного административного суда (2018-2020)</li>
            <li>Срок полномочий — 5 лет (до 2025 года)</li>
          </ul>
        </div>
        
        <p>Запомните: На выборах 2023 года Кириакос Мицотакис и его партия "Новая Демократия" получили большинство в парламенте, что позволило ему сформировать правительство на второй срок. Катерина Сакелларопулу стала первой женщиной-президентом и была избрана с широкой поддержкой всех основных политических партий.</p>
      </div>`,
      category: "politics" as "history" | "geography" | "culture" | "politics"
    }
  ];

  // Function to shuffle an array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle questions and their options on component mount
  useEffect(() => {
    // Create a deep copy of questions with shuffled options
    const questionsWithShuffledOptions = politicsQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));

    // Shuffle the questions themselves
    setShuffledQuestions(shuffleArray(questionsWithShuffledOptions));
    
    // Reset states
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions(0);
  }, []);

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < shuffledQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResults(true);
    }
  };

  const restartTest = () => {
    // Re-shuffle questions and options when restarting
    const questionsWithShuffledOptions = politicsQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    setShuffledQuestions(shuffleArray(questionsWithShuffledOptions));
    
    // Reset states
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setAnsweredQuestions(0);
  };

  const redirectToHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlurBackground />
        <Navbar />
        
        <main className="flex-grow pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-medium text-center">Требуется аккаунт</CardTitle>
                  <CardDescription className="text-center">
                    Для доступа к тестам необходимо создать аккаунт
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="mb-6">
                    Создав аккаунт, вы сможете пройти все тесты по политике Греции
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button onClick={redirectToHome} variant="outline" className="mb-4">
                      Вернуться на главную страницу
                    </Button>
                    <UserAuthDialog />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Guard clause for when questions haven't been shuffled yet
  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <BlurBackground />
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="p-8">
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greek-darkBlue"></div>
              </div>
              <p className="text-center mt-4">Загрузка вопросов...</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {showResults ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-medium text-center">Результаты теста</CardTitle>
                  <CardDescription className="text-center">
                    Вы ответили правильно на {score} из {shuffledQuestions.length} вопросов
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-4xl font-bold text-greek-darkBlue mb-6">
                    {Math.round((score / shuffledQuestions.length) * 100)}%
                  </p>
                  
                  <Button onClick={restartTest} className="mt-4">
                    Попробовать снова
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Updated header section to match Geography style */}
                <div className="bg-green-50 py-2 px-4 rounded-full inline-flex items-center mb-4">
                  <Landmark className="w-5 h-5 mr-2 text-green-600" />
                  <span className="text-green-700 font-medium">{t('politics')}</span>
                </div>
                
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                  {t('testOnPolitics')}
                </h1>
                
                <p className="text-lg text-gray-600 mb-8">
                  {t('checkYourKnowledgeAboutPolitics')}
                </p>
                
                <div className="mb-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-greek-darkBlue h-2.5 rounded-full transition-all duration-300" 
                      style={{ width: `${(currentQuestionIndex / shuffledQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <TestCard
                  question={shuffledQuestions[currentQuestionIndex]}
                  onNext={handleNext}
                  onAnswer={handleAnswer}
                  onComplete={() => {}}
                  currentQuestionNumber={currentQuestionIndex + 1}
                  totalQuestions={shuffledQuestions.length}
                />
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Politics;
