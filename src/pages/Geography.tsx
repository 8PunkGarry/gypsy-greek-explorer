
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlurBackground from '@/components/ui/BlurBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from 'lucide-react';
import TestCard from '@/components/ui/TestCard';
import { Question } from '@/types/questions';
import { shuffleArray } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/components/ui/use-toast";

const Geography = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { toast } = useToast();

  // Initialize and shuffle questions and their options
  useEffect(() => {
    const geographyQuestions: Question[] = [
      {
        id: 'geo1',
        text: 'Где находится Греция? И каковы ее границы?',
        options: [
          {
            id: 'geo1_1',
            text: 'Она расположена в юго-восточной части Европы на Балканском полуострове. Её границы — Албания, Северная Македония, Болгария, Турция.',
            isCorrect: true
          },
          {
            id: 'geo1_2',
            text: 'Греция расположена в юго-западной части Европы, между Средиземным и Черным морями. Граничит с Италией, Албанией и Северной Македонией.',
            isCorrect: false
          },
          {
            id: 'geo1_3',
            text: 'Находится в центральной части Средиземноморья, на полуострове Апеннины. Её сухопутные границы включают Албанию, Сербию и Хорватию.',
            isCorrect: false
          },
          {
            id: 'geo1_4',
            text: 'Расположена в восточной части Средиземного моря, исключительно на островах. Не имеет сухопутных границ с другими странами.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Географическое положение Греции</h3>
          <p class="mb-3">Греция действительно расположена в <strong>юго-восточной части Европы</strong> на <strong>Балканском полуострове</strong>.</p>
          
          <h4 class="font-medium mb-1">Сухопутные границы Греции:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>На севере:</strong> Албания (282 км), Северная Македония (234 км), Болгария (494 км)</li>
            <li><strong>На востоке:</strong> Турция (206 км)</li>
          </ul>
          
          <h4 class="font-medium mb-1">Для запоминания:</h4>
          <p class="mb-2">Можно представить Балканский полуостров как "ладонь", где Греция находится на "кончиках пальцев", протянутых в Средиземное море.</p>
          
          <p class="italic text-sm">Греция имеет одну из самых длинных береговых линий в мире (около 13,676 км), что делает её морской страной, несмотря на континентальное расположение.</p>
        `
      },
      {
        id: 'geo2',
        text: 'Каковы ее моря и каковы группы островов в них?',
        options: [
          {
            id: 'geo2_1',
            text: 'Это: Ионическое море, где находятся Ионические острова (Корфу, Закинф, Кефалония, Лефкада); Эгейское море с Критом, Додеканесами, Кикладами и Спорадами; Ливийское море.',
            isCorrect: true
          },
          {
            id: 'geo2_2',
            text: 'Греция омывается только Средиземным морем, в котором расположены острова Сицилия, Родос, Корсика и архипелаг Саронические острова.',
            isCorrect: false
          },
          {
            id: 'geo2_3',
            text: 'Страну окружают Адриатическое море с островами Корфу и Кефалония, Черное море с островами Тасос и Самотраки, и Мраморное море с Принцевыми островами.',
            isCorrect: false
          },
          {
            id: 'geo2_4',
            text: 'Греция омывается Эгейским морем с архипелагом Эвбея, Критским морем с островом Крит, и Фракийским морем с островами Лесбос и Хиос.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Моря и острова Греции</h3>
          <p class="mb-3">Греция омывается несколькими морями, каждое из которых содержит важные группы островов:</p>
          
          <h4 class="font-medium mb-1">1. Ионическое море (западное побережье):</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Ионические острова:</strong> Корфу (Керкира), Закинф, Кефалония, Лефкада, Итака, Паксос и Антипаксос</li>
            <li>Эти острова известны своими пышными зелеными пейзажами и венецианским влиянием</li>
          </ul>
          
          <h4 class="font-medium mb-1">2. Эгейское море (восточное побережье):</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Киклады:</strong> Более 30 островов, включая Миконос, Санторини, Наксос, Парос, Андрос</li>
            <li><strong>Додеканес:</strong> 12 основных островов, включая Родос, Кос, Патмос, Карпатос</li>
            <li><strong>Спорады:</strong> Скиатос, Скопелос, Алонисос, Скирос</li>
            <li><strong>Северо-Эгейские острова:</strong> Лесбос, Хиос, Самос, Икария, Лимнос</li>
          </ul>
          
          <h4 class="font-medium mb-1">3. Крит и Ливийское море:</h4>
          <ul class="list-disc pl-5 mb-2">
            <li><strong>Крит</strong> — крупнейший греческий остров, расположен в южной части Эгейского моря</li>
            <li><strong>Ливийское море</strong> — часть Средиземного моря к югу от Крита</li>
          </ul>
          
          <p class="italic text-sm mt-2">Для запоминания: Эгейское море можно представить как "бассейн" с разбросанными в нем "пятнами" (островами), а Ионическое море — как "ворота" в Грецию с запада.</p>
        `
      },
      {
        id: 'geo3',
        text: 'Каковы географические области Греции?',
        options: [
          {
            id: 'geo3_1',
            text: 'Десять областей: Фракия, Македония, Эпир, Фессалия, Центральная Греция, Пелопоннес, Аттика, Эгейские острова, Ионические острова, Крит.',
            isCorrect: true
          },
          {
            id: 'geo3_2',
            text: 'Семь основных регионов: Эллада, Аттика, Спарта, Дельфы, Олимп, Архипелаг и Критская область.',
            isCorrect: false
          },
          {
            id: 'geo3_3',
            text: 'Пять исторических районов: Северная Греция, Южная Греция, Центральная Греция, Восточные острова и Западные острова.',
            isCorrect: false
          },
          {
            id: 'geo3_4',
            text: 'Восемь административных областей: Афинская, Салоникская, Патрасская, Ираклионская, Родосская, Корфская, Халкидикская и Олимпийская.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Географические области Греции</h3>
          <p class="mb-3">Греция традиционно разделена на десять географических областей:</p>
          
          <h4 class="font-medium mb-1">Континентальная Греция:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Фракия</strong> — северо-восточная часть, граничит с Турцией и Болгарией</li>
            <li><strong>Македония</strong> — северная часть, крупнейшая область с центром в Салониках</li>
            <li><strong>Эпир</strong> — северо-западная часть, гористая местность, граничит с Албанией</li>
            <li><strong>Фессалия</strong> — центральная часть, плодородная равнина</li>
            <li><strong>Центральная Греция (Стереа Эллада)</strong> — исторический центр, включает Дельфы</li>
            <li><strong>Аттика</strong> — область вокруг Афин, политический и культурный центр</li>
            <li><strong>Пелопоннес</strong> — полуостров на юге, соединен с материком Коринфским перешейком</li>
          </ul>
          
          <h4 class="font-medium mb-1">Островная Греция:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Эгейские острова</strong> — включают Киклады, Додеканес, Спорады и Северо-Эгейские острова</li>
            <li><strong>Ионические острова</strong> — западное побережье, известны как "Семь Островов" (Эптаниса)</li>
            <li><strong>Крит</strong> — крупнейший остров, с богатой минойской историей</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Представьте Грецию как "руку" с "пальцами" (полуостровами), где центральная часть — "ладонь" (Центральная Греция), а вокруг расположены "браслеты" (островные группы).</p>
        `
      },
      {
        id: 'geo4',
        text: 'Какие реки и озера Греции вы знаете?',
        options: [
          {
            id: 'geo4_1',
            text: 'Реки: Эврос, Стримонас, Нестос, Аксиос, Ахелос. Озера: Преспа, Вистонида, Кастория, Мессолонги.',
            isCorrect: true
          },
          {
            id: 'geo4_2',
            text: 'Реки: Дунай, Вардар, Марица, Струма. Озера: Охридское, Янинское, Волвское, Корфское.',
            isCorrect: false
          },
          {
            id: 'geo4_3',
            text: 'Реки: Илисос, Кифисос, Пиньос, Альфиос. Озера: Трихонида, Коринфское, Волосское, Эгинское.',
            isCorrect: false
          },
          {
            id: 'geo4_4',
            text: 'Реки: Ахерон, Рубикон, Стикс, Эридан. Озера: Стимфальское, Копаидское, Дельфийское, Спартанское.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Водные ресурсы Греции</h3>
          <p class="mb-3">Греция не богата большими реками, но имеет несколько значимых водных артерий и озер:</p>
          
          <h4 class="font-medium mb-1">Основные реки:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Эврос (Марица)</strong> — самая длинная река, образует границу с Турцией (длина 480 км)</li>
            <li><strong>Стримонас (Струма)</strong> — течет из Болгарии через Македонию</li>
            <li><strong>Нестос (Места)</strong> — берет начало в Болгарии, впадает в Эгейское море</li>
            <li><strong>Аксиос (Вардар)</strong> — основная река Македонии, берет начало в Северной Македонии</li>
            <li><strong>Ахелос (Ахелоос)</strong> — самая длинная река, полностью протекающая по территории Греции, впадает в Ионическое море</li>
            <li><strong>Пиньос</strong> — главная река Фессалии, протекает через долину Темпе</li>
            <li><strong>Алиакмон</strong> — самая длинная река Греции (297 км), используется для гидроэнергетики</li>
          </ul>
          
          <h4 class="font-medium mb-1">Значимые озера:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Преспа</strong> — два озера (Малая и Большая Преспа) на границе с Албанией и Северной Македонией</li>
            <li><strong>Вистонида</strong> — солоноватое озеро во Фракии, важная орнитологическая территория</li>
            <li><strong>Кастория</strong> — живописное озеро на северо-западе, у города Кастория</li>
            <li><strong>Мессолонги</strong> — лагуна на западном побережье, известный центр рыболовства</li>
            <li><strong>Трихонида</strong> — крупнейшее естественное озеро Греции, в западной части</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Большинство крупных рек Греции находятся в северной части страны и зачастую берут начало в соседних странах.</p>
        `
      },
      {
        id: 'geo5',
        text: 'Какие самые большие города в Греции?',
        options: [
          {
            id: 'geo5_1',
            text: 'Афины, Салоники, Патры, Лариса, Кавала, Янина.',
            isCorrect: true
          },
          {
            id: 'geo5_2',
            text: 'Афины, Салоники, Ираклион, Волос, Корфу, Делос.',
            isCorrect: false
          },
          {
            id: 'geo5_3',
            text: 'Афины, Пирей, Спарта, Фивы, Микены, Олимпия.',
            isCorrect: false
          },
          {
            id: 'geo5_4',
            text: 'Салоники, Афины, Родос, Ханья, Нафплион, Мистра.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Крупнейшие города Греции</h3>
          <p class="mb-3">В Греции проживает около 10,7 миллионов человек, причем почти половина населения сосредоточена в крупных городах:</p>
          
          <h4 class="font-medium mb-1">Основные городские центры:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Афины</strong> — столица и крупнейший город (около 3,1 млн в агломерации)
              <ul class="list-circle pl-4">
                <li>Политический, экономический и культурный центр</li>
                <li>Расположен в регионе Аттика</li>
              </ul>
            </li>
            <li><strong>Салоники</strong> — второй по величине (около 1 млн в агломерации)
              <ul class="list-circle pl-4">
                <li>"Северная столица" Греции</li>
                <li>Крупный порт и университетский центр</li>
              </ul>
            </li>
            <li><strong>Патры</strong> — третий по величине (около 260 тыс.)
              <ul class="list-circle pl-4">
                <li>Главный порт Пелопоннеса и западной Греции</li>
                <li>Важный транспортный узел между Грецией и Италией</li>
              </ul>
            </li>
            <li><strong>Лариса</strong> — четвертый по величине (около 145 тыс.)
              <ul class="list-circle pl-4">
                <li>Центр плодородной равнины Фессалии</li>
                <li>Важный сельскохозяйственный и промышленный центр</li>
              </ul>
            </li>
            <li><strong>Кавала</strong> — значимый портовый город (около 70 тыс.) на северо-востоке</li>
            <li><strong>Янина (Иоаннина)</strong> — исторический центр (около 65 тыс.) Эпира на северо-западе</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Греческие города можно упорядочить по размеру как "А-С-П-Л" (Афины, Салоники, Патры, Лариса), что составляет аббревиатуру похожую на "АСПИД".</p>
        `
      },
      {
        id: 'geo6',
        text: 'Какой мыс является самым северным, а какой — самым южным?',
        options: [
          {
            id: 'geo6_1',
            text: 'Северный — Орменио в Эвросе, а южный — Гавдос южнее Крита.',
            isCorrect: true
          },
          {
            id: 'geo6_2',
            text: 'Северный — Олимпос в Македонии, а южный — мыс Сунион в Аттике.',
            isCorrect: false
          },
          {
            id: 'geo6_3',
            text: 'Северный — Александруполис на границе с Турцией, а южный — Матапан на Пелопоннесе.',
            isCorrect: false
          },
          {
            id: 'geo6_4',
            text: 'Северный — Преспа на границе с Албанией, а южный — Ретимно на Крите.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Крайние географические точки Греции</h3>
          <p class="mb-3">Греция простирается с севера на юг более чем на 800 км, от Фракии до острова Гавдос:</p>
          
          <h4 class="font-medium mb-1">Крайние точки материковой и островной Греции:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Самая северная точка</strong> — Орменио, деревня в регионе Эврос (Фракия), на границе с Болгарией и Турцией
              <ul class="list-circle pl-4">
                <li>Географические координаты: 41°45′ с. ш.</li>
                <li>Находится в самой северо-восточной части страны</li>
              </ul>
            </li>
            <li><strong>Самая южная точка</strong> — остров Гавдос, расположенный южнее Крита
              <ul class="list-circle pl-4">
                <li>Географические координаты: 34°48′ с. ш.</li>
                <li>Является самой южной территорией не только Греции, но и всей Европы</li>
                <li>Небольшой остров площадью около 30 км²</li>
              </ul>
            </li>
          </ul>
          
          <h4 class="font-medium mb-1">Другие значимые крайние точки Греции:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Самая западная точка</strong> — остров Отони в Ионическом море</li>
            <li><strong>Самая восточная точка</strong> — остров Стронгили в архипелаге Додеканес</li>
            <li><strong>Самая южная точка материковой Греции</strong> — мыс Тенаро (Матапан) на Пелопоннесе</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Орменио на севере можно ассоциировать со словом "ориентир" (начальная точка), а Гавдос на юге — с "гаванью" (конечный пункт маршрута).</p>
        `
      },
      {
        id: 'geo7',
        text: 'Что такое греческий флаг?',
        options: [
          {
            id: 'geo7_1',
            text: 'Пять синих горизонтальных линий и четыре белых и крест слева вверху.',
            isCorrect: true
          },
          {
            id: 'geo7_2',
            text: 'Три горизонтальные полосы: синяя, белая и синяя, с изображением двуглавого орла в центре.',
            isCorrect: false
          },
          {
            id: 'geo7_3',
            text: 'Девять чередующихся красных и белых полос с золотым солнцем Вергины в верхнем углу.',
            isCorrect: false
          },
          {
            id: 'geo7_4',
            text: 'Белый фон с синим крестом в центре и оливковыми ветвями по углам флага.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Греческий флаг и его символика</h3>
          <p class="mb-3">Современный флаг Греции, известный как "Кианолефки" (сине-белый), состоит из:</p>
          
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Девяти равновеликих горизонтальных полос</strong> — пять синих и четыре белых, чередующихся</li>
            <li><strong>Синего креста на белом квадратном фоне</strong> в левом верхнем углу (у древка)</li>
          </ul>
          
          <h4 class="font-medium mb-1">Символическое значение элементов флага:</h4>
          <ul class="list-disc pl-5 mb-3">
            <li><strong>Девять полос</strong> символизируют девять слогов революционного девиза "Ελευθερία ή Θάνατος" ("Свобода или смерть")</li>
            <li>По другой версии, девять полос представляют девять муз греческой мифологии</li>
            <li><strong>Синий цвет</strong> олицетворяет море и небо Греции</li>
            <li><strong>Белый цвет</strong> символизирует чистоту борьбы за независимость</li>
            <li><strong>Крест</strong> представляет православное христианство, которое сыграло важную роль в сохранении греческой идентичности во время османского владычества</li>
          </ul>
          
          <h4 class="font-medium mb-1">Историческая справка:</h4>
          <ul class="list-disc pl-5 mb-2">
            <li>Современный флаг был официально принят в 1978 году</li>
            <li>Прототип этого флага был впервые использован во время Греческой войны за независимость (1821-1832)</li>
            <li>В разные периоды истории Греции использовались различные варианты сине-белого флага</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Флаг Греции можно представить как "волны моря" (синие полосы) чередующиеся с "пеной" (белые полосы), с православным крестом, указывающим на важность религии.</p>
        `
      },
      {
        id: 'geo8',
        text: 'Какие великие археологические памятники Греции вы знаете?',
        options: [
          {
            id: 'geo8_1',
            text: 'Эпидавр, Олимпия, Афины — Акрополь, Филиппы.',
            isCorrect: true
          },
          {
            id: 'geo8_2',
            text: 'Пирамиды Эпира, Колосс Родосский, Храм Зевса в Спарте, Дворец Агамемнона.',
            isCorrect: false
          },
          {
            id: 'geo8_3',
            text: 'Александрийский маяк, Библиотека Пергама, Храм Артемиды в Коринфе, Стены Константинополя.',
            isCorrect: false
          },
          {
            id: 'geo8_4',
            text: 'Святилище Аполлона в Дельтах, Римский форум Салоник, Амфитеатр Крита, Храм Геры на Самосе.',
            isCorrect: false
          }
        ],
        explanation: `
          <h3 class="text-lg font-medium mb-2">Археологические памятники Греции</h3>
          <p class="mb-3">Греция известна своими многочисленными археологическими памятниками, отражающими богатую историю этой древней цивилизации:</p>
          
          <h4 class="font-medium mb-1">Ключевые археологические объекты:</h4>
          <ul class="list-disc pl-5 mb-4">
            <li><strong>Акрополь в Афинах</strong> — главный символ древнегреческой цивилизации
              <ul class="list-circle pl-4">
                <li>Включает Парфенон, Эрехтейон, Пропилеи и храм Ники Аптерос</li>
                <li>Построен в V веке до н.э. под руководством Перикла и архитектора Фидия</li>
                <li>Объект Всемирного наследия ЮНЕСКО с 1987 года</li>
              </ul>
            </li>
            <li><strong>Эпидавр</strong> — античный театр и святилище Асклепия
              <ul class="list-circle pl-4">
                <li>Знаменит театром с уникальной акустикой, вмещающим до 14,000 зрителей</li>
                <li>Был центром лечения и религиозного культа бога медицины</li>
                <li>Объект Всемирного наследия ЮНЕСКО с 1988 года</li>
              </ul>
            </li>
            <li><strong>Олимпия</strong> — родина Олимпийских игр
              <ul class="list-circle pl-4">
                <li>Включает стадион, храм Зевса, храм Геры, мастерскую Фидия</li>
                <li>Место проведения античных Олимпийских игр с 776 г. до н.э.</li>
                <li>Объект Всемирного наследия ЮНЕСКО с 1989 года</li>
              </ul>
            </li>
            <li><strong>Филиппы</strong> — древний город в Македонии
              <ul class="list-circle pl-4">
                <li>Основан Филиппом II Македонским в IV веке до н.э.</li>
                <li>Место важного сражения римской гражданской войны в 42 г. до н.э.</li>
                <li>Связан с апостолом Павлом и распространением христианства</li>
                <li>Объект Всемирного наследия ЮНЕСКО с 2016 года</li>
              </ul>
            </li>
          </ul>
          
          <h4 class="font-medium mb-1">Другие значимые археологические памятники:</h4>
          <ul class="list-disc pl-5 mb-2">
            <li><strong>Дельфы</strong> — святилище Аполлона и место Дельфийского оракула</li>
            <li><strong>Кносский дворец</strong> на Крите — центр минойской цивилизации</li>
            <li><strong>Микены</strong> — древний город с циклопическими стенами и Львиными воротами</li>
            <li><strong>Древняя Агора в Афинах</strong> — центр общественной и политической жизни</li>
            <li><strong>Дион</strong> — священный город македонян у подножия горы Олимп</li>
          </ul>
          
          <p class="italic text-sm">Для запоминания: Можно связать эти места с их функциями — Акрополь (власть/религия), Эпидавр (медицина/искусство), Олимпия (спорт), Филиппы (военное дело/христианство).</p>
        `
      }
    ];

    // Shuffle both the questions and the options within each question
    const shuffledQuestions = shuffleArray([...geographyQuestions]);
    const fullyShuffledQuestions = shuffledQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    
    setQuestions(fullyShuffledQuestions);
    setIsLoading(false);
  }, []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const handleAnswer = (wasCorrect: boolean) => {
    if (wasCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Правильный ответ!",
        description: "Вы ответили верно.",
        variant: "success"
      });
    } else {
      toast({
        title: "Неправильный ответ",
        description: "Попробуйте еще раз в следующий раз.",
        variant: "destructive"
      });
    }
  };

  const resetTest = () => {
    // Re-shuffle questions and options
    const shuffledQuestions = shuffleArray([...questions]);
    const fullyShuffledQuestions = shuffledQuestions.map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    
    setQuestions(fullyShuffledQuestions);
    setCurrentQuestionIndex(0);
    setShowCompletion(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BlurBackground />
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-green-100 text-green-800">
              <Map className="mr-2" size={18} />
              <span className="font-medium">География</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-4">
              Тест по географии Греции
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Проверьте свои знания о географическом положении, островах, городах и других географических особенностях Греции.
            </p>
          </div>
          
          <div className="flex justify-center">
            {isLoading ? (
              <Card className="w-full max-w-3xl shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-greek-darkBlue">Загрузка вопросов...</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-t-greek-darkBlue border-r-greek-darkBlue border-b-greek-blue border-l-greek-blue rounded-full animate-spin"></div>
                </CardContent>
              </Card>
            ) : showCompletion ? (
              <Card className="w-full max-w-3xl shadow-soft animate-fadeIn">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-greek-darkBlue">{t('testComplete')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center py-8">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <Map className="text-green-600" size={40} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium">Поздравляем!</h3>
                  <p className="text-gray-600">
                    Вы успешно прошли все вопросы по географии Греции.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mt-4">
                    <p className="text-xl font-medium">Ваш результат: {score} из {questions.length}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-green-600 h-2.5 rounded-full" 
                        style={{ width: `${(score / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <div className="w-full flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate('/')}
                    >
                      На главную
                    </Button>
                    <Button 
                      onClick={resetTest}
                      className="flex-1 bg-greek-darkBlue hover:bg-greek-blue text-white"
                    >
                      {t('retakeTest')}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <TestCard 
                question={questions[currentQuestionIndex]}
                onNext={handleNextQuestion}
                onAnswer={handleAnswer}
                onComplete={() => setShowCompletion(true)}
                currentQuestionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Geography;
