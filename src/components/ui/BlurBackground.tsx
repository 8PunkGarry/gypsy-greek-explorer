
import React from 'react';

interface BlurBackgroundProps {
  className?: string;
}

const BlurBackground: React.FC<BlurBackgroundProps> = ({ className }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-greek-blue/40 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] bg-greek-olive/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[30%] w-[25%] h-[25%] bg-greek-darkBlue/15 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s' }} />
    </div>
  );
};

export default BlurBackground;
