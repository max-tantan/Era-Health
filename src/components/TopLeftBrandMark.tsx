import { motion } from 'framer-motion';
import './TopLeftBrandMark.css';

export default function TopLeftBrandMark() {
  return (
    <motion.a
      href="/"
      className="top-left-brand-mark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      aria-label="EraHealth — Beranda"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="15" stroke="#171717" strokeWidth="2" />
        <path
          d="M11 20c0-2 1-4 5-4s5 2 5 4"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M19 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM15 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
          fill="#171717"
        />
        <path
          d="M9 14l3-2M23 14l-3-2"
          stroke="#171717"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.a>
  );
}
