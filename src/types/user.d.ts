
export interface User {
  id: string;
  username: string;
  createdAt: string;
}

export interface UserProgress {
  userId: string;
  history: {
    completedQuestions: string[];
    score: number;
    totalQuestions: number;
  };
  geography: {
    completedQuestions: string[];
    score: number;
    totalQuestions: number;
  };
  culture: {
    completedQuestions: string[];
    score: number;
    totalQuestions: number;
  };
  politics: {
    completedQuestions: string[];
    score: number;
    totalQuestions: number;
  };
}
