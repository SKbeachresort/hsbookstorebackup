// components/ZoomInSlideUp.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ZoomInSlideUpProps {
  children: React.ReactNode;
  className?: string;
}

const ZoomInSlideUp: React.FC<ZoomInSlideUpProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  
    threshold: 0.5,    
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5, y: inView ? 0 : 100 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomInSlideUp;
