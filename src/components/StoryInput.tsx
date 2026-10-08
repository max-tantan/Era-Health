import { motion } from 'framer-motion';
import PillActionButton from './PillActionButton';
import './StoryInput.css';

type StoryInputProps = {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onSkip: () => void;
};

export default function StoryInput({ value, onChange, onNext, onSkip }: StoryInputProps) {
  return (
    <motion.div
      className="story-input"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)', alignItems: 'center' }}>
        <h2 className="story-input__question">
          ada yang ingin kamu ceritakan?
        </h2>
        <p className="story-input__hint">
          nggak apa-apa kalau belum ingin cerita
        </p>
      </div>

      <textarea
        className="story-input__textarea"
        placeholder="Ceritakan apa yang kamu rasakan hari ini..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="story-input__actions">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button type="button" className="story-input__skip" onClick={onSkip}>
            lewati
          </button>
        </motion.div>
        <PillActionButton onClick={onNext}>
          lanjut
        </PillActionButton>
      </div>
    </motion.div>
  );
}
