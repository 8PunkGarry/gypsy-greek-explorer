
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TestCard from "@/components/ui/TestCard";
import { Question } from '@/types/questions';
import { UserAuthDialog } from '@/components/ui/UserAuthDialog';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Home, Book, Map, Compass, LandPlot } from 'lucide-react';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const historyQuestions: Question[] = [
  {
    id: "1",
    category: "history",
    text: "Когда началась Греческая революция?",
    options: [
      { id: "a", text: "1821", isCorrect: true },
      { id: "b", text: "1804", isCorrect: false },
      { id: "c", text: "1832", isCorrect: false },
      { id: "d", text: "1776", isCorrect: false },
    ],
    explanation: "Греческая революция началась в 1821 году и привела к независимости Греции от Османской империи.",
  },
  {
    id: "2",
    category: "history",
    text: "Кто был первым премьер-министром Греции после обретения независимости?",
    options: [
      { id: "a", text: "Иоаннис Каподистриас", isCorrect: true },
      { id: "b", text: "Александрос Маврокордатос", isCorrect: false },
      { id: "c", text: "Константинос Канарис", isCorrect: false },
      { id: "d", text: "Теодорос Колокотронис", isCorrect: false },
    ],
    explanation: "Иоаннис Каподистриас был первым премьер-министром Греции, сыгравшим ключевую роль в формировании греческого государства.",
  },
  {
    id: "3",
    category: "history",
    text: "Какое событие считается началом Второй мировой войны?",
    options: [
      { id: "a", text: "Нападение Германии на Польшу", isCorrect: true },
      { id: "b", text: "Нападение Японии на Перл-Харбор", isCorrect: false },
      { id: "c", text: "Вторжение Италии в Эфиопию", isCorrect: false },
      { id: "d", text: "Аншлюс Австрии", isCorrect: false },
    ],
    explanation: "Нападение Германии на Польшу 1 сентября 1939 года традиционно считается началом Второй мировой войны.",
  },
  {
    id: "4",
    category: "history",
    text: "Кто был лидером Советского Союза во время Второй мировой войны?",
    options: [
      { id: "a", text: "Иосиф Сталин", isCorrect: true },
      { id: "b", text: "Владимир Ленин", isCorrect: false },
      { id: "c", text: "Никита Хрущев", isCorrect: false },
      { id: "d", text: "Леонид Брежнев", isCorrect: false },
    ],
    explanation: "Иосиф Сталин был лидером Советского Союза во время Второй мировой войны.",
  },
  {
    id: "5",
    category: "history",
    text: "Какое событие привело к вступлению США во Вторую мировую войну?",
    options: [
      { id: "a", text: "Нападение на Перл-Харбор", isCorrect: true },
      { id: "b", text: "Нападение Германии на Польшу", isCorrect: false },
      { id: "c", text: "Битва за Британию", isCorrect: false },
      { id: "d", text: "Вторжение в Нормандию", isCorrect: false },
    ],
    explanation: "Нападение японской авиации на Перл-Харбор 7 декабря 1941 года привело к вступлению США во Вторую мировую войну.",
  },
  {
    id: "6",
    category: "history",
    text: "В каком году была основана первая греческая цивилизация?",
    options: [
      { id: "a", text: "3000 до н.э.", isCorrect: true },
      { id: "b", text: "1500 до н.э.", isCorrect: false },
      { id: "c", text: "800 до н.э.", isCorrect: false },
      { id: "d", text: "500 до н.э.", isCorrect: false },
    ],
    explanation: "Первая греческая цивилизация, известная как минойская, была основана примерно в 3000 году до нашей эры на острове Крит.",
  },
  {
    id: "7",
    category: "history",
    text: "Кто был основателем древнегреческой философии?",
    options: [
      { id: "a", text: "Фалес Милетский", isCorrect: true },
      { id: "b", text: "Сократ", isCorrect: false },
      { id: "c", text: "Платон", isCorrect: false },
      { id: "d", text: "Аристотель", isCorrect: false },
    ],
    explanation: "Фалес Милетский (624-546 до н.э.) считается первым философом в западной традиции и основателем ионийской школы философии.",
  },
  {
    id: "8",
    category: "history",
    text: "Когда произошло сражение при Фермопилах?",
    options: [
      { id: "a", text: "480 до н.э.", isCorrect: true },
      { id: "b", text: "430 до н.э.", isCorrect: false },
      { id: "c", text: "323 до н.э.", isCorrect: false },
      { id: "d", text: "146 до н.э.", isCorrect: false },
    ],
    explanation: "Сражение при Фермопилах произошло в 480 году до н.э. во время греко-персидских войн.",
  },
  {
    id: "9",
    category: "history",
    text: "Кто построил Парфенон в Афинах?",
    options: [
      { id: "a", text: "Перикл", isCorrect: true },
      { id: "b", text: "Александр Македонский", isCorrect: false },
      { id: "c", text: "Леонид", isCorrect: false },
      { id: "d", text: "Солон", isCorrect: false },
    ],
    explanation: "Парфенон был построен по инициативе афинского государственного деятеля Перикла в V веке до н.э.",
  },
  {
    id: "10",
    category: "history",
    text: "Когда произошла битва при Марафоне?",
    options: [
      { id: "a", text: "490 до н.э.", isCorrect: true },
      { id: "b", text: "480 до н.э.", isCorrect: false },
      { id: "c", text: "431 до н.э.", isCorrect: false },
      { id: "d", text: "338 до н.э.", isCorrect: false },
    ],
    explanation: "Битва при Марафоне произошла в 490 году до н.э. между персидской армией и греческими силами.",
  },
  {
    id: "11",
    category: "history",
    text: "Какой период считается \"золотым веком\" древних Афин?",
    options: [
      { id: "a", text: "V век до н.э.", isCorrect: true },
      { id: "b", text: "IV век до н.э.", isCorrect: false },
      { id: "c", text: "VI век до н.э.", isCorrect: false },
      { id: "d", text: "III век до н.э.", isCorrect: false },
    ],
    explanation: "V век до н.э. считается \"золотым веком\" древних Афин, особенно период правления Перикла (461-429 до н.э.).",
  },
  {
    id: "12",
    category: "history",
    text: "Когда был основан город Константинополь?",
    options: [
      { id: "a", text: "330 н.э.", isCorrect: true },
      { id: "b", text: "410 н.э.", isCorrect: false },
      { id: "c", text: "280 до н.э.", isCorrect: false },
      { id: "d", text: "120 до н.э.", isCorrect: false },
    ],
    explanation: "Константинополь был основан императором Константином I в 330 году н.э. на месте древнего города Византий.",
  },
  {
    id: "13",
    category: "history",
    text: "Какой год считается концом Византийской империи?",
    options: [
      { id: "a", text: "1453", isCorrect: true },
      { id: "b", text: "1204", isCorrect: false },
      { id: "c", text: "1389", isCorrect: false },
      { id: "d", text: "1571", isCorrect: false },
    ],
    explanation: "1453 год считается концом Византийской империи, когда Константинополь был захвачен османскими турками под предводительством султана Мехмеда II.",
  },
  {
    id: "14",
    category: "history",
    text: "Кто был основателем Олимпийских игр в Древней Греции?",
    options: [
      { id: "a", text: "Геракл", isCorrect: true },
      { id: "b", text: "Зевс", isCorrect: false },
      { id: "c", text: "Аполлон", isCorrect: false },
      { id: "d", text: "Посейдон", isCorrect: false },
    ],
    explanation: "Согласно древнегреческой мифологии, Геракл основал Олимпийские игры в честь своего отца Зевса после завершения одного из своих двенадцати подвигов.",
  },
  {
    id: "15",
    category: "history",
    text: "Какой древнегреческий полис был известен своим милитаризмом?",
    options: [
      { id: "a", text: "Спарта", isCorrect: true },
      { id: "b", text: "Афины", isCorrect: false },
      { id: "c", text: "Коринф", isCorrect: false },
      { id: "d", text: "Фивы", isCorrect: false },
    ],
    explanation: "Спарта была известна своим милитаризмом, строгой дисциплиной и воинским воспитанием граждан.",
  },
  {
    id: "16",
    category: "history",
    text: "Какую территорию завоевал Александр Македонский?",
    options: [
      { id: "a", text: "От Греции до Индии", isCorrect: true },
      { id: "b", text: "Только Грецию и Египет", isCorrect: false },
      { id: "c", text: "От Рима до Персии", isCorrect: false },
      { id: "d", text: "Только Малую Азию", isCorrect: false },
    ],
    explanation: "Александр Македонский создал империю, простиравшуюся от Греции и Египта на западе до Индии на востоке.",
  },
  {
    id: "17",
    category: "history",
    text: "Когда произошла гражданская война в Греции?",
    options: [
      { id: "a", text: "1946-1949", isCorrect: true },
      { id: "b", text: "1939-1945", isCorrect: false },
      { id: "c", text: "1967-1974", isCorrect: false },
      { id: "d", text: "1922-1924", isCorrect: false },
    ],
    explanation: "Гражданская война в Греции происходила в 1946-1949 годах между правительственными силами и коммунистическими повстанцами.",
  },
  {
    id: "18",
    category: "history",
    text: "В каком году Греция стала членом Европейского союза?",
    options: [
      { id: "a", text: "1981", isCorrect: true },
      { id: "b", text: "1973", isCorrect: false },
      { id: "c", text: "1986", isCorrect: false },
      { id: "d", text: "2002", isCorrect: false },
    ],
    explanation: "Греция стала членом Европейского экономического сообщества (предшественника ЕС) в 1981 году.",
  },
  {
    id: "19",
    category: "history",
    text: "Какой период греческой истории называют \"режимом полковников\"?",
    options: [
      { id: "a", text: "1967-1974", isCorrect: true },
      { id: "b", text: "1956-1963", isCorrect: false },
      { id: "c", text: "1945-1949", isCorrect: false },
      { id: "d", text: "1981-1989", isCorrect: false },
    ],
    explanation: "\"Режим полковников\" - диктатура военной хунты в Греции, существовавшая с 1967 по 1974 год после государственного переворота.",
  }
];

const History = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['historyQuestions'],
    queryFn: () => Promise.resolve(historyQuestions),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load questions. Please try again.");
    }
  }, [isError]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (data?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsTestComplete(true);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  if (isError) {
    return <div className="text-center py-8">Failed to load questions. Please try again.</div>;
  }

  if (isTestComplete) {
    return (
      <div className="relative min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/"><Home className="h-4 w-4" /></Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('history')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-greek-darkBlue">{t('greekHistory')}</h1>
              <p className="text-lg text-gray-600">{t('keyEvents')}</p>
            </div>
            <div className="flex items-center gap-4">
              <UserAuthDialog />
            </div>
          </div>
          <Card className="w-full max-w-3xl mx-auto shadow-soft animate-fadeIn">
            <CardContent className="text-center py-8">
              <h2 className="text-2xl font-semibold text-green-500 mb-4">{t('testComplete')}</h2>
              <p className="text-gray-700 mb-4">{t('testCompleteMessage')}</p>
              <div className="flex gap-3 justify-center mt-6">
                <Button asChild variant="outline">
                  <Link to="/">{t('home')}</Link>
                </Button>
                <Button onClick={() => {
                  setCurrentQuestionIndex(0);
                  setIsTestComplete(false);
                }}>
                  {t('retakeTest')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/"><Home className="h-4 w-4" /></Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('history')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-greek-darkBlue">{t('greekHistory')}</h1>
            <p className="text-lg text-gray-600">{t('keyEvents')}</p>
          </div>
          <div className="flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('practice')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <NavigationMenuLink asChild>
                        <Link to="/history" className="flex items-center gap-2 p-2 rounded hover:bg-greek-blue/10">
                          <Book size={16} />
                          <span>{t('history')}</span>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/geography" className="flex items-center gap-2 p-2 rounded hover:bg-greek-blue/10">
                          <Map size={16} />
                          <span>{t('geography')}</span>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/culture" className="flex items-center gap-2 p-2 rounded hover:bg-greek-blue/10">
                          <Compass size={16} />
                          <span>{t('culture')}</span>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/politics" className="flex items-center gap-2 p-2 rounded hover:bg-greek-blue/10">
                          <LandPlot size={16} />
                          <span>{t('politics')}</span>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button asChild variant="outline" size="sm">
              <Link to="/">{t('home')}</Link>
            </Button>
            <UserAuthDialog />
          </div>
        </div>

        {data && data.length > 0 && (
          <TestCard
            question={data[currentQuestionIndex]}
            onNext={handleNextQuestion}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={data.length}
          />
        )}
      </div>
    </div>
  );
};

export default History;
