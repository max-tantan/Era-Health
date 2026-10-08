import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOODS } from '../lib/moods';
import './QuickMoodSelector.css';

export default function QuickMoodSelector() {
  return (
    <motion.div
      className="quick-mood"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {MOODS.map((m) => {
        const Icon = m.icon;
        return (
          <Link
            key={m.id}
            to={`/dashboard/check-in?mood=${m.id}`}
            className="quick-mood__item"
          >
            <Icon size={24} strokeWidth={1.5} className="quick-mood__icon" style={{ color: m.color }} />
            <span className="quick-mood__label">{m.label}</span>
          </Link>
        );
      })}
    </motion.div>
  );
}
