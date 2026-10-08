import { motion } from 'framer-motion';
import PillActionButton from './PillActionButton';
import { getMood } from '../lib/moods';
import './CheckinReview.css';

type CheckinReviewProps = {
  selectedMoods: string[];
  story: string;
  onSave: () => void;
  onBack: () => void;
};

export default function CheckinReview({ selectedMoods, story, onSave, onBack }: CheckinReviewProps) {
  return (
    <motion.div
      className="checkin-review"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="checkin-review__title">
        ringkasan check-in
      </h2>

      <div className="checkin-review__card">
        <div className="checkin-review__section">
          <span className="checkin-review__label">mood</span>
          <div className="checkin-review__moods">
            {selectedMoods.map((m) => {
              const mood = getMood(m);
              const Icon = mood.icon;
              return (
                <span key={m} className="checkin-review__mood-tag">
                  <Icon size={14} strokeWidth={1.5} style={{ color: mood.color }} />
                  <span>{mood.label}</span>
                </span>
              );
            })}
          </div>
        </div>

        <div className="checkin-review__section">
          <span className="checkin-review__label">cerita</span>
          {story.trim() ? (
            <p className="checkin-review__story">{story}</p>
          ) : (
            <p className="checkin-review__story-empty">— tidak ada cerita —</p>
          )}
        </div>
      </div>

      <div className="checkin-review__actions">
        <PillActionButton onClick={onSave}>
          simpan check-in
        </PillActionButton>
        <button type="button" className="checkin-review__back" onClick={onBack}>
          kembali
        </button>
      </div>
    </motion.div>
  );
}
