import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookHeart } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import JournalEntryCard from '../components/JournalEntryCard';
import PillActionButton from '../components/PillActionButton';
import { Link } from 'react-router-dom';
import './JournalPage.css';

const moodFilters = ['semua', 'senang', 'tenang', 'biasa', 'sedih', 'capek', 'cemas'];

const dummyEntries = [
  { date: '7 Oktober 2026', day: 'hari ini', moods: ['senang', 'tenang'], story: 'hari ini cukup produktif, senang bisa menyelesaikan tugas kuliah tepat waktu. habis itu jalan-jalan sore sama teman, seru.', chatCount: 8 },
  { date: '6 Oktober 2026', day: 'kemarin', moods: ['capek', 'cemas'], story: 'deadline menumpuk, rasanya pengen istirahat tapi nggak bisa. semoga besok lebih baik.', chatCount: 12 },
  { date: '5 Oktober 2026', day: '2 hari lalu', moods: ['sedih'], story: '', chatCount: 6 },
  { date: '4 Oktober 2026', day: '3 hari lalu', moods: ['biasa'], story: 'hari biasa aja, nggak ada yang spesial. tapi nggak papa.', chatCount: 4 },
  { date: '3 Oktober 2026', day: '4 hari lalu', moods: ['senang'], story: 'dapat kabar baik dari keluarga. rasanya hangat.', chatCount: 7 },
  { date: '2 Oktober 2026', day: '5 hari lalu', moods: ['capek'], story: 'begadang ngerjain tugas, badan rasanya remuk. tapi selesai juga.', chatCount: 10 },
  { date: '1 Oktober 2026', day: '6 hari lalu', moods: ['tenang', 'senang'], story: 'hari libur, habiskan waktu dengan baca buku dan minum kopi. nikmat.', chatCount: 5 },
];

export default function JournalPage() {
  const [activeFilter, setActiveFilter] = useState('semua');

  const filtered = activeFilter === 'semua'
    ? dummyEntries
    : dummyEntries.filter((e) => e.moods.includes(activeFilter));

  return (
    <DashboardLayout>
      <div className="journal">
        <div className="journal__header">
          <h1>jurnal perasaanmu</h1>
          <p>setiap check-in adalah halaman dalam jurnal hidupmu</p>
        </div>

        <div className="journal__stats">
          <motion.div
            className="journal__stat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="journal__stat-value">7</span>
            <span className="journal__stat-label">total check-in</span>
          </motion.div>
          <motion.div
            className="journal__stat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="journal__stat-value">3</span>
            <span className="journal__stat-label">hari berturut</span>
          </motion.div>
          <motion.div
            className="journal__stat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="journal__stat-value">5</span>
            <span className="journal__stat-label">mood terbanyak</span>
          </motion.div>
        </div>

        <div className="journal__filters">
          {moodFilters.map((f) => (
            <button
              key={f}
              className={`journal__filter-btn ${activeFilter === f ? 'journal__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="journal__entries">
            {filtered.map((entry, i) => (
              <JournalEntryCard key={i} entry={entry} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="journal__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <BookHeart size={48} strokeWidth={1} className="journal__empty-icon" />
            <h2 className="journal__empty-title">belum ada entry</h2>
            <p className="journal__empty-desc">
              belum ada check-in dengan mood "{activeFilter}"
            </p>
            <Link to="/dashboard/check-in">
              <PillActionButton>check-in sekarang</PillActionButton>
            </Link>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
