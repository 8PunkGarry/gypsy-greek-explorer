
export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  category: "history" | "geography" | "culture" | "politics";
  text: string;
  options: Option[];
  explanation: string;
}
