
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, MapPin, Landmark, Users } from 'lucide-react';

export const ProgressDashboard = () => {
  const { isAuthenticated, userProgress, getCategoryProgress } = useAuth();
  
  if (!isAuthenticated || !userProgress) {
    return (
      <div className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-soft">
        <h3 className="text-2xl font-medium text-gray-900 mb-4 text-center">Ваш прогресс</h3>
        <p className="text-center text-gray-500">Войдите в систему, чтобы отслеживать свой прогресс обучения</p>
      </div>
    );
  }
  
  const historyProgress = getCategoryProgress('history');
  const geographyProgress = getCategoryProgress('geography');
  const cultureProgress = getCategoryProgress('culture');
  const politicsProgress = getCategoryProgress('politics');
  
  // Общий прогресс по всем категориям
  const totalProgress = Math.floor((historyProgress + geographyProgress + cultureProgress + politicsProgress) / 4);
  
  return (
    <div className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-soft">
      <h3 className="text-2xl font-medium text-gray-900 mb-6 text-center">Ваш прогресс</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-900">Общий прогресс</h4>
            <span className="text-sm font-medium text-gray-700">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-greek-blue/10 flex items-center justify-center text-greek-darkBlue">
                <BookOpen size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-700">История</h4>
                <span className="text-xs font-medium text-gray-500">{historyProgress}%</span>
              </div>
            </div>
            <Progress value={historyProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <MapPin size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-700">География</h4>
                <span className="text-xs font-medium text-gray-500">{geographyProgress}%</span>
              </div>
            </div>
            <Progress value={geographyProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Landmark size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-700">Культура</h4>
                <span className="text-xs font-medium text-gray-500">{cultureProgress}%</span>
              </div>
            </div>
            <Progress value={cultureProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Users size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-700">Политика</h4>
                <span className="text-xs font-medium text-gray-500">{politicsProgress}%</span>
              </div>
            </div>
            <Progress value={politicsProgress} className="h-1.5" />
          </div>
        </div>
        
        <div className="pt-2 text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <Clock size={14} /> Прогресс автоматически сохраняется
          </p>
        </div>
      </div>
    </div>
  );
};
