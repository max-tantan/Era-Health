import { motion } from 'framer-motion';
import './DailyAffirmation.css';

const affirmations = [
  { text: 'Hari ini boleh istirahat. Kamu sudah berusaha cukup.', source: '— daily affirmation' },
  { text: 'Nggak semua hari harus produktif. Beberapa hari cukup untuk bernapas.', source: '— daily affirmation' },
  { text: 'Perasaanmu valid, apapun itu. Nggak perlu dibandingkan dengan orang lain.', source: '— daily affirmation' },
  { text: 'Kamu tidak sendiri. Ada banyak orang yang peduli, termasuk aku.', source: '— era' },
  { text: 'Pelan-pelan aja. Hidup bukan lari cepat, ini marathon.', source: '— daily affirmation' },
  { text: 'Menangis itu bukan tanda lemah. Itu tanda kamu manusia.', source: '— daily affirmation' },
  { text: 'Coba tarik napas dulu. Dalam-dalam. Lepaskan pelan-pelan.', source: '— era' },
  { text: 'Kamu hebat karena masih bertahan sampai detik ini.', source: '— daily affirmation' },
  { text: 'Nggak apa-apa nggak baik-baik saja. Aku di sini buat dengerin.', source: '— era' },
];

export default function DailyAffirmation() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % affirmations.length;
  const affirmation = affirmations[index];

  return (
    <motion.div
      className="daily-affirmation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <span className="daily-affirmation__deco">"</span>
      <p className="daily-affirmation__quote">{affirmation.text}</p>
      <span className="daily-affirmation__source">{affirmation.source}</span>
    </motion.div>
  );
}
