
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/ui/TestCard";
import { Question } from '@/types/questions';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlurBackground from "@/components/ui/BlurBackground";

const historyQuestions: Question[] = [
  {
    id: "1",
    category: "history",
    text: "Какие великие цивилизации Древней Греции вы знаете? И в каких областях Греции они развивались?",
    options: [
      { id: "a", text: "Минойская на Крите, Микенская на Пелопоннесе, Классическая в Афинах и Эллинистическая по всему миру", isCorrect: true },
      { id: "b", text: "Только Классическая в Афинах и Спарте", isCorrect: false },
      { id: "c", text: "Только Минойская на Крите и Микенская на Пелопоннесе", isCorrect: false },
      { id: "d", text: "Дорийская, Ионийская и Эолийская по всей Греции", isCorrect: false },
    ],
    explanation: "Цивилизаций Древней Греции было четыре. Первая — Микенская цивилизация, которая развивалась на Пелопоннесе с центром в Микенах; вторая — Минойская цивилизация, которая развивалась на Крите в городах Кносс и Фестос; третья — «Классическая Древность» с эпицентром в Афинах; четвертая — «Эллинистический период», во время которого греческая культура распространилась на весь мир.",
  },
  {
    id: "2",
    category: "history",
    text: "В древние времена Древняя Греция была единым государством, как сегодня?",
    options: [
      { id: "a", text: "Да, с центром в Афинах", isCorrect: false },
      { id: "b", text: "Нет, она была разделена на города-полисы со своими правителями и законами", isCorrect: true },
      { id: "c", text: "Да, под властью македонских царей", isCorrect: false },
      { id: "d", text: "Нет, она была разделена на множество племен, но не имела городов", isCorrect: false },
    ],
    explanation: "Нет. Она была разделена на города-полисы. Каждый город был государством со своим правителем, деньгами и законами. Наиболее важными городами были Афины, Спарта, Фивы, и они вели друг с другом постоянную войну, подобно Пелопоннесской, которая длилась 27 лет. Это была война между Афинами и Спартой.",
  },
  {
    id: "3",
    category: "history",
    text: "Когда древние Афины продемонстрировали самое большое развитие?",
    options: [
      { id: "a", text: "В 5 веке до нашей эры, при Перикле", isCorrect: true },
      { id: "b", text: "В 8 веке до нашей эры, при Гомере", isCorrect: false },
      { id: "c", text: "В 4 веке до нашей эры, при Александре Македонском", isCorrect: false },
      { id: "d", text: "В 2 веке до нашей эры, при римлянах", isCorrect: false },
    ],
    explanation: "В 5 веке до нашей эры, который называется Золотым веком Перикла, принесшим демократию.",
  },
  {
    id: "4",
    category: "history",
    text: "Почему \"Золотой век\" так называется?",
    options: [
      { id: "a", text: "Из-за большого количества золотых монет в обращении", isCorrect: false },
      { id: "b", text: "Из-за развития литературы и искусства, создания шедевров, включая Парфенон", isCorrect: true },
      { id: "c", text: "Из-за доминирования Афин над другими греческими полисами", isCorrect: false },
      { id: "d", text: "Из-за открытия золотых рудников в Аттике", isCorrect: false },
    ],
    explanation: "Потому что получили развитие литература и искусство, главным достижением или шедевром был Парфенон. Парфенон — это центральный храм на Акрополе, который построен после греко-персидских войн.",
  },
  {
    id: "5",
    category: "history",
    text: "Что такое Акрополь?",
    options: [
      { id: "a", text: "Военный лагерь древних греков", isCorrect: false },
      { id: "b", text: "Священная скала с храмами, существовавшая во многих греческих городах", isCorrect: true },
      { id: "c", text: "Резиденция царя в Древних Афинах", isCorrect: false },
      { id: "d", text: "Рыночная площадь в древнегреческих городах", isCorrect: false },
    ],
    explanation: "Акрополь — это священная скала афинян. Во многих городах существовал Акрополь. На афинском Акрополе был построен Парфенон — храм, возведенный в честь богини Афины.",
  },
  {
    id: "6",
    category: "history",
    text: "Кто самые важные древние поэты, писатели и т.д.?",
    options: [
      { id: "a", text: "Только Гомер с его произведениями «Илиада» и «Одиссея»", isCorrect: false },
      { id: "b", text: "Гомер, драматурги Эсхил, Софокл, Еврипид и философы Сократ, Платон и Аристотель", isCorrect: true },
      { id: "c", text: "Только философы Сократ, Платон и Аристотель", isCorrect: false },
      { id: "d", text: "Только драматурги Эсхил, Софокл и Еврипид", isCorrect: false },
    ],
    explanation: "Первым был Гомер, который написал два великих произведения: а) «Одиссея», рассказывающая о возвращении Одиссея после войны на родину в Итаку, и б) «Илиада», повествующая о Троянской войне. В Афинах классического периода творили три блестящих драматурга: Эсхил, Софокл и Еврипид. Афины прославились своими философами. Самыми известными были Сократ, его ученик Платон и ученик Платона — Аристотель, который был учителем Александра Македонского.",
  },
  {
    id: "7",
    category: "history",
    text: "Кто объединил всех древних греков?",
    options: [
      { id: "a", text: "Перикл из Афин", isCorrect: false },
      { id: "b", text: "Царь Македонии Филипп и его сын Александр Македонский", isCorrect: true },
      { id: "c", text: "Леонид из Спарты", isCorrect: false },
      { id: "d", text: "Троянский царь Приам", isCorrect: false },
    ],
    explanation: "Царь Македонии Филипп, а затем его сын Александр Македонский, который «донес» Грецию до глубины Малой Азии в Индию и был назван Великим, потому что он распространил греческий язык, греческую цивилизацию и греческую культуру повсюду.",
  },
  {
    id: "8",
    category: "history",
    text: "После Александра Великого и эллинистической эпохи что происходит?",
    options: [
      { id: "a", text: "Сразу начинается Османская империя", isCorrect: false },
      { id: "b", text: "Римская Империя, потом Византия и после Османская Империя", isCorrect: true },
      { id: "c", text: "Греция становится независимой республикой", isCorrect: false },
      { id: "d", text: "Персидская империя захватывает Грецию", isCorrect: false },
    ],
    explanation: "Римская Империя, потом Византия и после Османская Империя, история которой началась в 1453 году.",
  },
  {
    id: "9",
    category: "history",
    text: "После 400 лет рабства у турок, когда произошла греческая революция?",
    options: [
      { id: "a", text: "25 марта 1821 года", isCorrect: true },
      { id: "b", text: "28 октября 1940 года", isCorrect: false },
      { id: "c", text: "14 июля 1789 года", isCorrect: false },
      { id: "d", text: "4 июля 1776 года", isCorrect: false },
    ],
    explanation: "Она произошла 25 марта 1821 года.",
  },
  {
    id: "10",
    category: "history",
    text: "Некоторые герои греческой революции 1821 года.",
    options: [
      { id: "a", text: "Теодорос Колокотронис, Караискакис, Бубулина", isCorrect: true },
      { id: "b", text: "Платон, Аристотель, Сократ", isCorrect: false },
      { id: "c", text: "Метаксас, Венизелос, Трикупис", isCorrect: false },
      { id: "d", text: "Александр Македонский, Леонид, Перикл", isCorrect: false },
    ],
    explanation: "Теодорос Колокотронис, Караискакис, Бубулина.",
  },
  {
    id: "11",
    category: "history",
    text: "Когда Греция была признана иностранными державами как свободное государство?",
    options: [
      { id: "a", text: "В 1821 году", isCorrect: false },
      { id: "b", text: "В 1830 году по Лондонскому договору", isCorrect: true },
      { id: "c", text: "В 1843 году после восстания", isCorrect: false },
      { id: "d", text: "В 1922 году после обмена населением", isCorrect: false },
    ],
    explanation: "Она была признана в 1830 году по Лондонскому договору.",
  },
  {
    id: "12",
    category: "history",
    text: "Какой город был первой столицей и кто был первым правителем?",
    options: [
      { id: "a", text: "Афины, Иоаннис Каподистриас", isCorrect: false },
      { id: "b", text: "Нафплион, Иоаннис Каподистриас", isCorrect: true },
      { id: "c", text: "Афины, Отто", isCorrect: false },
      { id: "d", text: "Салоники, Элефтериос Венизелос", isCorrect: false },
    ],
    explanation: "Это был Нафплион, а первым правителем был Иоаннис Каподистриас, который был убит через три года.",
  },
  {
    id: "13",
    category: "history",
    text: "После Иоанниса Каподистриаса кто правил?",
    options: [
      { id: "a", text: "Элефтериос Венизелос", isCorrect: false },
      { id: "b", text: "Баварский принц Отто", isCorrect: true },
      { id: "c", text: "Харилаос Трикупис", isCorrect: false },
      { id: "d", text: "Метаксас", isCorrect: false },
    ],
    explanation: "Великие державы привели баварского Отто, который, однако, не правил должным образом. В 1834 году столицей стали Афины. В 1843 году греки восстали, и тогда Отто был вынужден принять первую Конституцию Греции.",
  },
  {
    id: "14",
    category: "history",
    text: "После Отто какие великие премьер-министры были?",
    options: [
      { id: "a", text: "Только Харилаос Трикупис", isCorrect: false },
      { id: "b", text: "Только Элефтериос Венизелос", isCorrect: false },
      { id: "c", text: "Харилаос Трикупис и Элефтериос Венизелос", isCorrect: true },
      { id: "d", text: "Только Метаксас", isCorrect: false },
    ],
    explanation: "Харилаос Трикупис, построивший первую железнодорожную сеть в Греции и Коринфский перешеек. Был еще Элефтериос Венизелос, у которого была Великая идея расширить границы Греции. В его время, в 1922 году, произошла большая катастрофа в Смирне. Многие люди были убиты. Затем произошел обмен населением. Оттуда в Грецию приехало около 800 000 греков, а многие турки уехали отсюда.",
  },
  {
    id: "15",
    category: "history",
    text: "Когда второй большой национальный праздник, после 25 марта 1821 г.?",
    options: [
      { id: "a", text: "28 октября 1940 года", isCorrect: true },
      { id: "b", text: "17 ноября 1973 года", isCorrect: false },
      { id: "c", text: "24 июля 1974 года", isCorrect: false },
      { id: "d", text: "23 апреля 1967 года", isCorrect: false },
    ],
    explanation: "28 октября 1940 года. Мы празднуем ОХИ, которое сказал Метаксас и не позволил итальянцам пройти через Грецию.",
  },
  {
    id: "16",
    category: "history",
    text: "С 1967 по 1974 года было трудное время для Греции.",
    options: [
      { id: "a", text: "Это было время экономического процветания", isCorrect: false },
      { id: "b", text: "Это было время гражданской войны", isCorrect: false },
      { id: "c", text: "Это была военная диктатура Хунты", isCorrect: true },
      { id: "d", text: "Это был период иностранной оккупации", isCorrect: false },
    ],
    explanation: "Это была военная диктатура Хунты, и праздник Политехнического университета.",
  },
  {
    id: "17",
    category: "history",
    text: "Кто написал гимн Греции?",
    options: [
      { id: "a", text: "Дионисий Соломос (текст) и Николаос Мандзарос (музыка)", isCorrect: true },
      { id: "b", text: "Иоаннис Каподистриас", isCorrect: false },
      { id: "c", text: "Адамантиос Кораис", isCorrect: false },
      { id: "d", text: "Константинос Кавафис", isCorrect: false },
    ],
    explanation: "Дионисий Соломос, а Николаос Мандзарос положил его на музыку.",
  },
];

const History = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<number>(0);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < historyQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setAnsweredCorrectly((prev) => prev + 1);
    }
  };

  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setAnsweredCorrectly(0);
    setTestCompleted(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 relative">
      <BlurBackground className="opacity-40" />
      <Navbar />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-3.5 w-3.5 mr-1" />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>History</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-center text-greek-darkBlue mb-4">
            {t('greekHistory')}
          </h1>
          <p className="text-center text-gray-600 max-w-2xl mb-8">
            {t('keyEvents')}
          </p>

          {testCompleted ? (
            <Card className="w-full max-w-3xl shadow-soft bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-greek-blue">
                    {t('testComplete')}
                  </h2>
                  <p className="text-lg">
                    {t('testCompleteMessage')}
                  </p>
                  <p className="text-xl font-medium">
                    {answeredCorrectly} / {historyQuestions.length} {answeredCorrectly === 1 ? 'question' : 'questions'} answered correctly
                  </p>
                  <Button onClick={restartTest} className="mt-4 bg-greek-darkBlue hover:bg-greek-blue text-white">
                    {t('retakeTest')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <TestCard
              question={historyQuestions[currentQuestionIndex]}
              onNext={handleNextQuestion}
              onAnswer={handleAnswer}
              currentQuestionNumber={currentQuestionIndex + 1}
              totalQuestions={historyQuestions.length}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default History;
