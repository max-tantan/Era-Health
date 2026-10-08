import { motion } from 'framer-motion';
import './HandwrittenCaption.css';

type HandwrittenCaptionProps = {
  children: React.ReactNode;
};

export default function HandwrittenCaption({ children }: HandwrittenCaptionProps) {
  return (
    <motion.span
      className="handwritten-caption"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {children}
    </motion.span>
  );
}
