
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  onClick,
  index = 0
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onClick={onClick}
      className={cn(
        `relative overflow-hidden p-8 rounded-2xl glass border border-blue-100/30 shadow-md 
        hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group`,
        className, 
        onClick ? 'cursor-pointer' : ''
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80 z-0"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
      
      <div className="relative z-10">
        <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md group-hover:from-blue-600 group-hover:to-blue-700 transition-colors duration-300">
          <Icon size={28} />
        </div>
        
        <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        
        {onClick && (
          <div className="text-blue-600 font-medium text-sm flex items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="mr-1">Подробнее</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FeatureCard;
