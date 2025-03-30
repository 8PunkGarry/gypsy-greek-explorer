
import React, { useState } from 'react';
import { Book, ChevronDown, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Question } from '@/types/questions';
import QuestionCard from '@/components/ui/QuestionCard';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
      { id: "a", text: "Только Гомер, написавший 'Илиаду' и 'Одиссею'", isCorrect: false },
      { id: "b", text: "Эсхил, Софокл и Еврипид, но не было философов", isCorrect: false },
      { id: "c", text: "Гомер, драматурги Эсхил, Софокл, Еврипид и философы Сократ, Платон и Аристотель", isCorrect: true },
      { id: "d", text: "Только философы Сократ, Платон и Аристотель", isCorrect: false },
    ],
    explanation: "Первым был Гомер, который написал два великих произведения: а) «Одиссея», рассказывающая о возвращении Одиссея после войны на родину в Итаку, и б) «Илиада», повествующая о Троянской войне. В Афинах классического периода творили три блестящих драматурга: Эсхил, Софокл и Еврипид. Афины прославились своими философами. Самыми известными были Сократ, его ученик Платон и ученик Платона — Аристотель, который был учителем Александра Македонского.",
  },
  {
    id: "7",
    category: "history",
    text: "Кто объединил всех древних греков?",
    options: [
      { id: "a", text: "Царь Спарты Леонид", isCorrect: false },
      { id: "b", text: "Афинский стратег Перикл", isCorrect: false },
      { id: "c", text: "Царь Македонии Филипп и его сын Александр Македонский", isCorrect: true },
      { id: "d", text: "Философ Сократ своими идеями", isCorrect: false },
    ],
    explanation: "Царь Македонии Филипп, а затем его сын Александр Македонский, который «донес» Грецию до глубины Малой Азии в Индию и был назван Великим, потому что он распространил греческий язык, греческую цивилизацию и греческую культуру повсюду.",
  },
  {
    id: "8",
    category: "history",
    text: "После Александра Великого и эллинистической эпохи что происходит?",
    options: [
      { id: "a", text: "Сразу наступает Османская империя", isCorrect: false },
      { id: "b", text: "Римская Империя, затем Византия и после Османская Империя", isCorrect: true },
      { id: "c", text: "Греки сохраняют независимость до прихода Османской империи", isCorrect: false },
      { id: "d", text: "Персидская империя завоёвывает греческие земли", isCorrect: false },
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
      { id: "c", text: "15 мая 1801 года", isCorrect: false },
      { id: "d", text: "12 июня 1835 года", isCorrect: false },
    ],
    explanation: "Она произошла 25 марта 1821 года.",
  },
  {
    id: "10",
    category: "history",
    text: "Некоторые герои греческой революции 1821 года:",
    options: [
      { id: "a", text: "Теодорос Колокотронис, Караискакис, Бубулина", isCorrect: true },
      { id: "b", text: "Иоаннис Каподистриас, Перикл, Одиссей", isCorrect: false },
      { id: "c", text: "Элефтериос Венизелос, Теодорос Колокотронис", isCorrect: false },
      { id: "d", text: "Леонид, Фемистокл, Мильтиад", isCorrect: false },
    ],
    explanation: "Теодорос Колокотронис, Караискакис, Бубулина - одни из главных героев греческой революции 1821 года.",
  },
  {
    id: "11",
    category: "history",
    text: "Когда Греция была признана иностранными державами как свободным государством?",
    options: [
      { id: "a", text: "В 1821 году после начала революции", isCorrect: false },
      { id: "b", text: "В 1830 году по Лондонскому договору", isCorrect: true },
      { id: "c", text: "В 1834 году, когда Афины стали столицей", isCorrect: false },
      { id: "d", text: "В 1843 году после принятия первой Конституции", isCorrect: false },
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
      { id: "c", text: "Нафплион, Отто Баварский", isCorrect: false },
      { id: "d", text: "Афины, Отто Баварский", isCorrect: false },
    ],
    explanation: "Это был Нафплион, а первым правителем был Иоаннис Каподистриас, который был убит через три года.",
  },
  {
    id: "13",
    category: "history",
    text: "После Каподистриаса кто правил?",
    options: [
      { id: "a", text: "Греческий король Константин", isCorrect: false },
      { id: "b", text: "Баварский Отто, при котором Афины стали столицей и была принята первая Конституция", isCorrect: true },
      { id: "c", text: "Элефтериос Венизелос", isCorrect: false },
      { id: "d", text: "Британский наместник Корфорд", isCorrect: false },
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
      { id: "d", text: "Метаксас и Караманлис", isCorrect: false },
    ],
    explanation: "Харилаос Трикупис, построивший первую железнодорожную сеть в Греции и Коринфский перешеек. Был еще Элефтериос Венизелос, у которого была Великая идея расширить границы Греции. В его время, в 1922 году, произошла большая катастрофа в Смирне. Многие люди были убиты. Затем произошел обмен населением. Оттуда в Грецию приехало около 800 000 греков, а многие турки уехали отсюда.",
  },
  {
    id: "15",
    category: "history",
    text: "Когда второй большой национальный праздник, после 25 марта 1821 г.?",
    options: [
      { id: "a", text: "28 октября 1940 года, день когда Греция сказала 'Охи' итальянцам", isCorrect: true },
      { id: "b", text: "17 ноября 1973 года, день восстания в Политехническом университете", isCorrect: false },
      { id: "c", text: "3 сентября 1843 года, день принятия первой Конституции", isCorrect: false },
      { id: "d", text: "9 мая 1945 года, день победы над фашизмом", isCorrect: false },
    ],
    explanation: "28 октября 1940 года. Мы празднуем ОХИ, которое сказал Метаксас и не позволил итальянцам пройти через Грецию.",
  },
  {
    id: "16",
    category: "history",
    text: "С 1967 по 1974 года было трудное время для Греции. Что происходило?",
    options: [
      { id: "a", text: "Гражданская война", isCorrect: false },
      { id: "b", text: "Военная диктатура Хунты", isCorrect: true },
      { id: "c", text: "Экономический кризис", isCorrect: false },
      { id: "d", text: "Война с Турцией", isCorrect: false },
    ],
    explanation: "Это была военная диктатура Хунты, и праздник Политехнического университета.",
  },
  {
    id: "17",
    category: "history",
    text: "Кто написал гимн Греции?",
    options: [
      { id: "a", text: "Дионисий Соломос (текст) и Николаос Мандзарос (музыка)", isCorrect: true },
      { id: "b", text: "Константин Кавафис", isCorrect: false },
      { id: "c", text: "Одисеас Элитис", isCorrect: false },
      { id: "d", text: "Георгиос Сеферис", isCorrect: false },
    ],
    explanation: "Дионисий Соломос, а Николаос Мандзарос положил его на музыку.",
  },
];

const History = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>История</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="bg-gradient-to-r from-greek-darkBlue to-blue-600 p-6 md:p-12 rounded-2xl text-white mb-8 shadow-lg">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <Book size={32} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">История Греции</h1>
              <p className="text-lg text-white/90">
                Познакомьтесь с ключевыми событиями и периодами греческой истории от древних цивилизаций 
                до современной Греции. Изучите вопросы, которые помогут вам подготовиться к интервью.
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-greek-darkBlue">
              <ChevronRight className="mr-2 h-6 w-6 text-greek-blue" />
              Вопросы по истории Греции
            </h2>
            
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {historyQuestions.map((question, index) => (
                <motion.div key={question.id} variants={item}>
                  <QuestionCard
                    question={question}
                    index={index}
                    expanded={expandedIndex === index}
                    onToggle={() => handleToggle(index)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default History;
