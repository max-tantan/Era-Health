import { motion } from 'framer-motion';
import { PenLine, BookOpen, BarChart3, Smile, Frown, Moon } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import './DashboardPage.css';

export default function DashboardPage() {
  const today = new Date();
  const hour = today.getHours();
  const greeting =
    hour < 12 ? 'selamat pagi' : hour < 16 ? 'selamat siang' : hour < 19 ? 'selamat sore' : 'selamat malam';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.4 },
    }),
  };

  const quickActions = [
    {
      icon: PenLine,
      title: 'check-in hari ini',
      desc: 'catat perasaanmu sekarang — cuma 2 menit',
      href: '/dashboard/check-in',
    },
    {
      icon: BookOpen,
      title: 'jurnal perasaan',
      desc: 'lihat catatan dan perjalanan perasaanmu',
      href: '/dashboard/jurnal',
    },
    {
      icon: BarChart3,
      title: 'wawasan',
      desc: 'lihat pola dan tren perasaanmu',
      href: '/dashboard/wawasan',
    },
  ];

  const entries = [
    { icon: Smile, text: 'hari ini cukup produktif, senang bisa menyelesaikan tugas', date: 'hari ini' },
    { icon: Frown, text: 'merasa sedikit kewalahan dengan deadline', date: 'kemarin' },
    { icon: Moon, text: 'istirahat cukup, badan terasa lebih segar', date: '2 hari lalu' },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="dashboard__greeting">
          <h1>{greeting}, rina</h1>
          <p>bagaimana perasaanmu hari ini?</p>
        </div>

        <div className="dashboard__quick-actions">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.a
                key={action.title}
                href={action.href}
                className="dashboard__card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Icon size={28} strokeWidth={1.5} className="dashboard__card-icon" />
                <span className="dashboard__card-title">{action.title}</span>
                <span className="dashboard__card-desc">{action.desc}</span>
              </motion.a>
            );
          })}
        </div>

        <div>
          <h2 className="dashboard__section-title">mood minggu ini</h2>
          <div style={{ marginTop: 'var(--spacing-16)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
            <div className="dashboard__mood-row">
              <span className="dashboard__mood-label">senang</span>
              <div className="dashboard__mood-bar-bg">
                <motion.div
                  className="dashboard__mood-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  style={{ backgroundColor: 'var(--color-sprout-sticker)' }}
                />
              </div>
            </div>
            <div className="dashboard__mood-row">
              <span className="dashboard__mood-label">biasa aja</span>
              <div className="dashboard__mood-bar-bg">
                <motion.div
                  className="dashboard__mood-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  style={{ backgroundColor: 'var(--color-sky-sticker)' }}
                />
              </div>
            </div>
            <div className="dashboard__mood-row">
              <span className="dashboard__mood-label">lelah</span>
              <div className="dashboard__mood-bar-bg">
                <motion.div
                  className="dashboard__mood-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '30%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{ backgroundColor: 'var(--color-marker-orange)' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="dashboard__section-title">entry terakhir</h2>
          <div className="dashboard__recent-entries" style={{ marginTop: 'var(--spacing-16)' }}>
            {entries.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={i}
                  className="dashboard__entry"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="dashboard__entry-left">
                    <Icon size={20} strokeWidth={1.5} className="dashboard__entry-icon" />
                    <span className="dashboard__entry-text">{entry.text}</span>
                  </div>
                  <span className="dashboard__entry-date">{entry.date}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
