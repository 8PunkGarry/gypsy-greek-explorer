
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, MapPin, Landmark, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const ProgressDashboard = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  // Since we removed progress tracking, we'll use static demo values
  const historyProgress = 25;
  const geographyProgress = 40;
  const cultureProgress = 15;
  const politicsProgress = 30;
  
  // Calculate overall progress based on static values
  const totalProgress = Math.floor((historyProgress + geographyProgress + cultureProgress + politicsProgress) / 4);
  
  if (!isAuthenticated) {
    return (
      <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-md">
        <h3 className="text-2xl font-medium text-gray-100 mb-4 text-center">{t('yourProgress')}</h3>
        <p className="text-center text-gray-400">{t('loginToTrackProgress')}</p>
      </div>
    );
  }
  
  return (
    <div className="p-6 rounded-xl glass-light shadow-md">
      <h3 className="text-2xl font-medium text-gray-100 mb-6 text-center">{t('yourProgress')}</h3>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-200">{t('overallProgress')}</h4>
            <span className="text-sm font-medium text-gray-300">{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-300">
                <BookOpen size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-300">{t('history')}</h4>
                <span className="text-xs font-medium text-gray-400">{historyProgress}%</span>
              </div>
            </div>
            <Progress value={historyProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-300">
                <MapPin size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-300">{t('geography')}</h4>
                <span className="text-xs font-medium text-gray-400">{geographyProgress}%</span>
              </div>
            </div>
            <Progress value={geographyProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-300">
                <Landmark size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-300">{t('culture')}</h4>
                <span className="text-xs font-medium text-gray-400">{cultureProgress}%</span>
              </div>
            </div>
            <Progress value={cultureProgress} className="h-1.5" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-300">
                <Users size={16} />
              </div>
              <div className="flex justify-between items-center w-full">
                <h4 className="text-sm font-medium text-gray-300">{t('politics')}</h4>
                <span className="text-xs font-medium text-gray-400">{politicsProgress}%</span>
              </div>
            </div>
            <Progress value={politicsProgress} className="h-1.5" />
          </div>
        </div>
        
        <div className="pt-2 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
            <Clock size={14} /> {t('progressAutoSaved')}
          </p>
        </div>
      </div>
    </div>
  );
};
