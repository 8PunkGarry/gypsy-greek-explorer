
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`relative overflow-hidden p-6 rounded-lg bg-[#2A3441]/80 border border-white/5 shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-1 group ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-blue-400/40 via-indigo-400/30 to-transparent transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
      
      <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/10 text-blue-300 group-hover:bg-white/15 transition-colors duration-300">
        <Icon size={20} />
      </div>
      
      <h3 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-200 text-sm">{description}</p>
      
      {onClick && (
        <div className="mt-4 text-blue-300 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="mr-1">Подробнее</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
