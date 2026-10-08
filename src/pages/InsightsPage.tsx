import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import { getMood } from '../lib/moods';
import './InsightsPage.css';

const periods = ['7 hari', '30 hari', '3 bulan'];

const moodDistribution = [
  { mood: 'senang', count: 12 },
  { mood: 'tenang', count: 8 },
  { mood: 'biasa', count: 7 },
  { mood: 'capek', count: 6 },
  { mood: 'sedih', count: 3 },
  { mood: 'cemas', count: 2 },
];

const total = moodDistribution.reduce((a, b) => a + b.count, 0);

const weekData: { day: string; mood: string | null }[] = [
  { day: 'sen', mood: 'senang' },
  { day: 'sel', mood: 'capek' },
  { day: 'rab', mood: 'cemas' },
  { day: 'kam', mood: 'tenang' },
  { day: 'jum', mood: 'senang' },
  { day: 'sab', mood: 'tenang' },
  { day: 'min', mood: null },
];

const weekChartData = weekData.map((w) => ({
  day: w.day,
  mood: w.mood ? getMood(w.mood).label : 'belum check-in',
  value: w.mood ? 1 : 0,
  color: w.mood ? getMood(w.mood).color : 'var(--color-shadow-mist)',
}));

function DistributionTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { mood: string; count: number } }> }) {
  if (!active || !payload?.length) return null;
  const { mood, count } = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip__label">{getMood(mood).label}</span>
      <span className="chart-tooltip__value">{count} check-in</span>
    </div>
  );
}

function WeekTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { mood: string } }> }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip__label">{payload[0].payload.mood}</span>
    </div>
  );
}

export default function InsightsPage() {
  const [period, setPeriod] = useState('7 hari');

  const topMood = moodDistribution.reduce((a, b) => (a.count > b.count ? a : b));
  const positiveCount = moodDistribution
    .filter((m) => m.mood === 'senang' || m.mood === 'tenang')
    .reduce((a, b) => a + b.count, 0);
  const positiveDays = weekData.filter((w) => w.mood === 'senang' || w.mood === 'tenang').map((w) => w.day);

  return (
    <DashboardLayout>
      <div className="insights">
        <div className="insights__header">
          <h1>wawasan</h1>
          <p>lihat pola dan perjalanan perasaanmu</p>
        </div>

        <div className="insights__period">
          {periods.map((p) => (
            <button
              key={p}
              className={`insights__period-btn ${period === p ? 'insights__period-btn--active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="insights__grid">
          <motion.div
            className="insights__card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div>
              <h2 className="insights__card-title">sebaran mood</h2>
              <p className="insights__card-sub">{period} terakhir</p>
            </div>

            <div className="insights__chart">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={moodDistribution} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                  <CartesianGrid horizontal={false} stroke="var(--color-dew-drop)" />
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="mood"
                    tickLine={false}
                    axisLine={false}
                    width={56}
                    tick={{ fontFamily: 'var(--font-geist)', fontSize: 13, fill: 'var(--color-charcoal)' }}
                    tickFormatter={(v: string) => getMood(v).label}
                  />
                  <Tooltip content={<DistributionTooltip />} cursor={{ fill: 'var(--color-dew-drop)' }} />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={18}>
                    {moodDistribution.map((m) => (
                      <Cell key={m.mood} fill={getMood(m.mood).color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            className="insights__card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h2 className="insights__card-title">ringkasan</h2>
              <p className="insights__card-sub">pola & catatan</p>
            </div>

            <div className="insights__summary-row">
              <span className="insights__summary-badge">
                <Calendar size={14} strokeWidth={1.5} />
                {total} check-in
              </span>
              <span className="insights__summary-badge">
                <TrendingUp size={14} strokeWidth={1.5} />
                {Math.round((positiveCount / total) * 100)}% positif
              </span>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'var(--font-gelica)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-cocoa-ink)',
                marginBottom: 'var(--spacing-8)',
              }}>
                minggu ini
              </h3>
              <div className="insights__chart">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={weekChartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontFamily: 'var(--font-geist)', fontSize: 11, fill: 'var(--color-charcoal)', opacity: 0.5 }}
                    />
                    <YAxis hide domain={[0, 1]} />
                    <Tooltip content={<WeekTooltip />} cursor={{ fill: 'var(--color-dew-drop)' }} />
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={22}>
                      {weekChartData.map((d, i) => (
                        <Cell key={i} fill={d.color} fillOpacity={d.value ? 1 : 0.25} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="insights__card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h2 className="insights__card-title">catatan untukmu</h2>
            <p className="insights__card-sub">berdasarkan data check-in-mu</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
            <motion.div
              className="insights__insight-box"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Lightbulb size={18} strokeWidth={1.5} className="insights__insight-icon" />
              <p className="insights__insight-text">
                kamu paling sering merasa <strong>{getMood(topMood.mood).label}</strong> dalam 7 hari terakhir — {topMood.count} kali dari {total} check-in.
              </p>
            </motion.div>
            <motion.div
              className="insights__insight-box"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Lightbulb size={18} strokeWidth={1.5} className="insights__insight-icon" />
              <p className="insights__insight-text">
                hari {positiveDays.join(', ')} cenderung lebih positif untukmu.
              </p>
            </motion.div>
            <motion.div
              className="insights__insight-box"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Lightbulb size={18} strokeWidth={1.5} className="insights__insight-icon" />
              <p className="insights__insight-text">
                kamu sudah check-in <strong>{total} kali</strong> dalam periode ini. konsisten!
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
