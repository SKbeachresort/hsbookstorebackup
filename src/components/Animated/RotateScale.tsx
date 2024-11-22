// components/RotateScale.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RotateScaleProps {
  children: React.ReactNode;
  className?: string;
}

const RotateScale: React.FC<RotateScaleProps> = ({ children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
      animate={{ opacity: inView ? 1 : 0, rotate: inView ? 0 : 90, scale: inView ? 1 : 0.5 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default RotateScale;