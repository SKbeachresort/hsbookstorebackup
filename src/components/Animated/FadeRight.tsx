// components/FadeRight.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FadeRightProps {
  children: React.ReactNode;
  className?: string;
}

const FadeRight: React.FC<FadeRightProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeRight;
