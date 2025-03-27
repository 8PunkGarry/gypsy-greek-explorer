
export interface Question {
  id: string;
  category: "history" | "geography" | "culture" | "politics";
  text: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}
