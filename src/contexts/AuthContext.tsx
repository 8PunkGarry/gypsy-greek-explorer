
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (username: string) => {
    const newUser: User = {
      id: uuidv4(),
      username,
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
