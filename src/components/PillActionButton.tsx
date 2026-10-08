import { motion } from 'framer-motion';
import './PillActionButton.css';

type PillActionButtonProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof motion.button>;

export default function PillActionButton({ children, ...props }: PillActionButtonProps) {
  return (
    <motion.button
      className="pill-action-button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
