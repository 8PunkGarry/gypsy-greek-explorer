
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
      className={`relative overflow-hidden p-6 rounded-xl bg-white/90 border border-gray-100 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 group ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-greek-blue to-greek-darkBlue transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
      
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-greek-blue/20 text-greek-darkBlue group-hover:bg-greek-darkBlue group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-greek-darkBlue transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-600">{description}</p>
      
      {onClick && (
        <div className="mt-4 text-greek-darkBlue font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
