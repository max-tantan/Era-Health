import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getMood } from '../lib/moods';
import './JournalEntryCard.css';

type JournalEntry = {
  date: string;
  day: string;
  moods: string[];
  story: string;
  chatCount: number;
};

type JournalEntryCardProps = {
  entry: JournalEntry;
  index: number;
};

export default function JournalEntryCard({ entry, index }: JournalEntryCardProps) {
  return (
    <motion.div
      className="journal-entry-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <div className="journal-entry-card__header">
        <span className="journal-entry-card__day">{entry.day}</span>
        <span className="journal-entry-card__date">{entry.date}</span>
      </div>

      <div className="journal-entry-card__moods">
        {entry.moods.map((m) => {
          const mood = getMood(m);
          const Icon = mood.icon;
          return (
            <span key={m} className="journal-entry-card__mood-tag">
              <Icon size={14} strokeWidth={1.5} style={{ color: mood.color }} />
              <span>{mood.label}</span>
            </span>
          );
        })}
      </div>

      {entry.story ? (
        <p className="journal-entry-card__story">{entry.story}</p>
      ) : (
        <p className="journal-entry-card__story-empty">— tidak ada catatan —</p>
      )}

      <div className="journal-entry-card__footer">
        <MessageCircle size={14} strokeWidth={1.5} className="journal-entry-card__footer-icon" />
        <span className="journal-entry-card__footer-text">{entry.chatCount} pesan dengan era</span>
      </div>
    </motion.div>
  );
}
