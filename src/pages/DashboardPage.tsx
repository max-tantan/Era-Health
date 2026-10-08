import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenLine, BookOpen, BarChart3, Smile, Frown, Moon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';

const MotionLink = motion(Link);
import DailyAffirmation from '../components/DailyAffirmation';
import QuickMoodSelector from '../components/QuickMoodSelector';
import StreakTracker from '../components/StreakTracker';
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
    { icon: Smile, text: 'hari ini cukup produktif, senang bisa menyelesaikan tugas', date: 'hari ini', tags: ['#produktif'] },
    { icon: Frown, text: 'merasa sedikit kewalahan dengan deadline', date: 'kemarin', tags: ['#lelah', '#sekolah'] },
    { icon: Moon, text: 'istirahat cukup, badan terasa lebih segar', date: '2 hari lalu', tags: ['#tenang'] },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard">
        <div className="dashboard__greeting">
          <h1>{greeting}, rina</h1>
          <p>bagaimana perasaanmu hari ini?</p>
        </div>

        <DailyAffirmation />

        <QuickMoodSelector />

        <StreakTracker />

        <div className="dashboard__quick-actions">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <MotionLink
                key={action.title}
                to={action.href}
                className="dashboard__card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Icon size={28} strokeWidth={1.5} className="dashboard__card-icon" />
                <span className="dashboard__card-title">{action.title}</span>
                <span className="dashboard__card-desc">{action.desc}</span>
              </MotionLink>
            );
          })}
        </div>

        <div className="dashboard__section">
          <h2 className="dashboard__section-title">mood minggu ini</h2>
          <div className="dashboard__chart">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={[
                  { label: 'senang', value: 65, color: 'var(--color-sprout-sticker)' },
                  { label: 'biasa aja', value: 45, color: 'var(--color-sky-sticker)' },
                  { label: 'lelah', value: 30, color: 'var(--color-marker-orange)' },
                ]}
                margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
              >
                <CartesianGrid vertical={false} stroke="var(--color-dew-drop)" />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontFamily: 'var(--font-geist)', fontSize: 12, fill: 'var(--color-charcoal)' }}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  cursor={{ fill: 'var(--color-dew-drop)' }}
                  contentStyle={{
                    fontFamily: 'var(--font-geist)',
                    fontSize: 12,
                    border: '1.5px solid var(--color-charcoal)',
                    borderRadius: 8,
                    backgroundColor: 'var(--color-cream-paper)',
                  }}
                  formatter={(v) => [`${v}%`, 'frekuensi']}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                  {[
                    { label: 'senang', value: 65, color: 'var(--color-sprout-sticker)' },
                    { label: 'biasa aja', value: 45, color: 'var(--color-sky-sticker)' },
                    { label: 'lelah', value: 30, color: 'var(--color-marker-orange)' },
                  ].map((m) => (
                    <Cell key={m.label} fill={m.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard__section">
          <h2 className="dashboard__section-title">entry terakhir</h2>
          <div className="dashboard__recent-entries">
            {entries.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={i}
                  className="dashboard__entry"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.85, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="dashboard__entry-left">
                    <Icon size={20} strokeWidth={1.5} className="dashboard__entry-icon" />
                    <div className="dashboard__entry-text-group">
                      <span className="dashboard__entry-text">{entry.text}</span>
                      <span className="dashboard__entry-tags">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="dashboard__entry-tag">{tag}</span>
                        ))}
                      </span>
                    </div>
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
