
import React from 'react';

interface BlurBackgroundProps {
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-[-10%] right-[10%] w-[35%] h-[35%] bg-blue-400/5 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[10%] left-[5%] w-[25%] h-[25%] bg-indigo-400/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-blue-300/5 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[20%] right-[30%] w-[15%] h-[15%] bg-white/5 rounded-full blur-[60px] animate-float" style={{ animationDelay: '6s' }} />
    </div>
  );
};

export default BlurBackground;
