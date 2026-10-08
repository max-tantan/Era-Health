import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import './StreakTracker.css';

export default function StreakTracker() {
  return (
    <motion.div
      className="streak-tracker"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div className="streak-tracker__icon">
        <Flame size={22} strokeWidth={1.5} color="#fdfbf9" />
      </div>
      <div className="streak-tracker__info">
        <span className="streak-tracker__count">
          <span>3</span> hari berturut-turut
        </span>
        <span className="streak-tracker__desc">
          kamu sudah check-in 3 hari ini. teruskan, ya!
        </span>
      </div>
    </motion.div>
  );
}
