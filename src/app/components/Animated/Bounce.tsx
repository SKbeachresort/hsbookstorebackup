// components/Bounce.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface BounceProps {
  children: React.ReactNode;
  className?: string;
}

const Bounce: React.FC<BounceProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -100 }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};

export default Bounce;
