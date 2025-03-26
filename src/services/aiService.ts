
// This is a mock AI service for generating question options and explanations
// In a production environment, this would be replaced with a real AI API call

export interface AIGeneratedContent {
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer?: string;
  explanation: string;
}

export const generateQuestionContent = async (questionText: string, questionType: 'multiple-choice' | 'open-ended', category: string): Promise<AIGeneratedContent> => {
  console.log('Generating AI content for question:', questionText);
  console.log('Category:', category);
  console.log('Type:', questionType);
  
  // In a real implementation, this would call an AI API
  // For now, we'll simulate with mock data based on the category and question type
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (questionType === 'multiple-choice') {
    // Generate mock multiple choice options based on category
    const options = getRandomOptions(category);
    
    return {
      options,
      explanation: getExplanationByCategory(category, questionText),
    };
  } else {
    // Generate mock answer for open-ended question
    return {
      correctAnswer: `Это ответ на открытый вопрос по теме "${getCategoryName(category)}".`,
      explanation: getExplanationByCategory(category, questionText),
    };
  }
};

function getRandomOptions(category: string) {
  // Generate 4 options, with the first one being correct
  return [
    { id: '1', text: getCorrectAnswerByCategory(category), isCorrect: true },
    { id: '2', text: getIncorrectAnswerByCategory(category, 1), isCorrect: false },
    { id: '3', text: getIncorrectAnswerByCategory(category, 2), isCorrect: false },
    { id: '4', text: getIncorrectAnswerByCategory(category, 3), isCorrect: false },
  ];
}

function getCorrectAnswerByCategory(category: string): string {
  switch (category) {
    case 'history':
      return 'В 1821 году начинается Греческая революция';
    case 'geography':
      return 'Греция расположена на юге Балканского полуострова';
    case 'culture':
      return 'Сиртаки - известный греческий танец';
    case 'politics':
      return 'Греция является парламентской республикой';
    default:
      return 'Правильный ответ';
  }
}

function getIncorrectAnswerByCategory(category: string, index: number): string {
  const answers = {
    history: [
      'В 1765 году Греция стала независимой',
      'В 1901 году начинается Греческая революция',
      'В 1950 году Греция присоединилась к Европейскому союзу'
    ],
    geography: [
      'Греция граничит с Италией по суше',
      'Столица Греции - Салоники',
      'Греция не имеет выхода к морю'
    ],
    culture: [
      'Гироскопос - традиционный греческий танец',
      'Основа греческой кухни - рис и острые специи',
      'Зорба - национальный греческий герой'
    ],
    politics: [
      'Греция имеет президентскую форму правления',
      'Греция является монархией',
      'Греция не входит в Европейский союз'
    ]
  };
  
  return answers[category as keyof typeof answers][index - 1] || 'Неправильный ответ';
}

function getExplanationByCategory(category: string, questionText: string): string {
  switch (category) {
    case 'history':
      return `Данный вопрос относится к истории Греции. ${questionText} Греческая революция началась в 1821 году и привела к независимости Греции от Османской империи. Это было важное историческое событие для формирования современного греческого государства.`;
    case 'geography':
      return `Этот вопрос о географии Греции. ${questionText} Греция расположена на юге Балканского полуострова и включает многочисленные острова. Страна омывается Эгейским, Ионическим и Средиземным морями.`;
    case 'culture':
      return `Вопрос относится к культуре Греции. ${questionText} Греческая культура имеет богатую историю, включающую литературу, философию, архитектуру, музыку и кулинарные традиции, которые повлияли на западную цивилизацию.`;
    case 'politics':
      return `Этот вопрос касается политического устройства Греции. ${questionText} Греция является парламентской республикой с президентом в качестве главы государства и премьер-министром как главой правительства. Страна является членом Европейского союза и НАТО.`;
    default:
      return `Объяснение к вопросу: ${questionText}`;
  }
}

function getCategoryName(category: string): string {
  switch (category) {
    case 'history': return 'История';
    case 'geography': return 'География';
    case 'culture': return 'Культура';
    case 'politics': return 'Политика';
    default: return category;
  }
}

