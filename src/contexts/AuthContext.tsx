
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProgress } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '@/types/questions';

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  updateProgress: (category: "history" | "geography" | "culture" | "politics", questionId: string, isCorrect: boolean) => void;
  getCategoryProgress: (category: "history" | "geography" | "culture" | "politics") => number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Загрузка данных пользователя из localStorage при инициализации
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProgress = localStorage.getItem('userProgress');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    if (storedProgress) {
      setUserProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Функция для входа в систему
  const login = (username: string) => {
    const newUser: User = {
      id: uuidv4(),
      username,
      createdAt: new Date().toISOString()
    };
    
    const newProgress: UserProgress = {
      userId: newUser.id,
      history: { completedQuestions: [], score: 0, totalQuestions: 0 },
      geography: { completedQuestions: [], score: 0, totalQuestions: 0 },
      culture: { completedQuestions: [], score: 0, totalQuestions: 0 },
      politics: { completedQuestions: [], score: 0, totalQuestions: 0 }
    };
    
    setUser(newUser);
    setUserProgress(newProgress);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('userProgress', JSON.stringify(newProgress));
  };

  // Функция для выхода из системы
  const logout = () => {
    setUser(null);
    setUserProgress(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('user');
    localStorage.removeItem('userProgress');
  };

  // Функция для обновления прогресса пользователя
  const updateProgress = (
    category: "history" | "geography" | "culture" | "politics", 
    questionId: string, 
    isCorrect: boolean
  ) => {
    if (!user || !userProgress) return;
    
    setUserProgress(prev => {
      if (!prev) return null;
      
      const updatedProgress = { ...prev };
      const categoryProgress = { ...updatedProgress[category] };
      
      // Проверяем, уже ответил ли пользователь на этот вопрос
      if (!categoryProgress.completedQuestions.includes(questionId)) {
        categoryProgress.completedQuestions.push(questionId);
        categoryProgress.totalQuestions += 1;
        if (isCorrect) {
          categoryProgress.score += 1;
        }
      }
      
      updatedProgress[category] = categoryProgress;
      
      // Сохраняем обновленный прогресс в localStorage
      localStorage.setItem('userProgress', JSON.stringify(updatedProgress));
      
      return updatedProgress;
    });
  };

  // Функция для получения процента прогресса по категории
  const getCategoryProgress = (category: "history" | "geography" | "culture" | "politics") => {
    if (!userProgress) return 0;
    
    const { completedQuestions, totalQuestions } = userProgress[category];
    if (totalQuestions === 0) return 0;
    
    return Math.floor((completedQuestions.length / totalQuestions) * 100);
  };

  const value = {
    user,
    userProgress,
    isAuthenticated,
    login,
    logout,
    updateProgress,
    getCategoryProgress
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
