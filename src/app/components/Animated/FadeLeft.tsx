// components/FadeLeft.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeLeftProps {
  children: React.ReactNode;
  className?: string;
}

const FadeLeft: React.FC<FadeLeftProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  // Trigger animation once when the element is in view
    threshold: 0.5,     // Trigger when 50% of the element is in view
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeLeft;