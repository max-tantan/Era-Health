import { motion } from 'framer-motion';
import PillActionButton from './PillActionButton';
import { MOODS } from '../lib/moods';
import './MoodPicker.css';

type MoodPickerProps = {
  selected: string[];
  onSelect: (ids: string[]) => void;
  onNext: () => void;
};

export default function MoodPicker({ selected, onSelect, onNext }: MoodPickerProps) {
  function toggle(id: string) {
    if (selected.includes(id)) {
      onSelect(selected.filter((s) => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  }

  return (
    <motion.div
      className="mood-picker"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', alignItems: 'center' }}>
        <h2 className="mood-picker__question">
          bagaimana perasaanmu hari ini?
        </h2>
        <p className="mood-picker__hint">bisa pilih lebih dari satu</p>
      </div>

      <div className="mood-picker__grid">
        {MOODS.map((mood, i) => {
          const Icon = mood.icon;
          return (
            <motion.button
              key={mood.id}
              type="button"
              className={`mood-picker__item ${selected.includes(mood.id) ? 'mood-picker__item--selected' : ''}`}
              onClick={() => toggle(mood.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={32} strokeWidth={1.5} className="mood-picker__emoji" style={{ color: mood.color }} />
              <span className="mood-picker__label">{mood.label}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        className="mood-picker__actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <PillActionButton onClick={onNext} disabled={selected.length === 0}>
          lanjut
        </PillActionButton>
      </motion.div>
    </motion.div>
  );
}
