// components/AnimateOnScroll.tsx
import React from 'react';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animationType: string;
  duration?: number;
  delay?: number;
};

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ 
    children, 
    animationType, 
    duration = 400,
    delay = 0 
}) => {
  return (
    <div
      data-aos={animationType} 
      data-aos-duration={duration.toString()} 
      data-aos-delay={delay.toString()} 
      className="animated-section"
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;