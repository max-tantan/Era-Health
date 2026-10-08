import { motion } from 'framer-motion';

const rotations = [5, -10, 8, -5, 12];

function randomRotate() {
  return rotations[Math.floor(Math.random() * rotations.length)];
}

type StickerProps = {
  delay?: number;
};

export function LightningBolt({ delay = 0 }: StickerProps) {
  return (
    <motion.svg
      width="40"
      height="56"
      viewBox="0 0 40 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: randomRotate() }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M24 2L4 32h14l-2 22 20-30H22l2-22z"
        fill="var(--color-sky-sticker)"
        stroke="var(--color-charcoal)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function Bear({ delay = 0.1 }: StickerProps) {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: randomRotate() }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'inline-block' }}
    >
      <circle cx="16" cy="14" r="4" fill="var(--color-bubblegum-sticker)" stroke="var(--color-charcoal)" strokeWidth="2" />
      <circle cx="32" cy="14" r="4" fill="var(--color-bubblegum-sticker)" stroke="var(--color-charcoal)" strokeWidth="2" />
      <ellipse cx="24" cy="30" rx="14" ry="16" fill="var(--color-bubblegum-sticker)" stroke="var(--color-charcoal)" strokeWidth="2" />
      <circle cx="19" cy="26" r="2" fill="var(--color-charcoal)" />
      <circle cx="29" cy="26" r="2" fill="var(--color-charcoal)" />
      <ellipse cx="24" cy="32" rx="5" ry="3" fill="var(--color-bubblegum-sticker)" stroke="var(--color-charcoal)" strokeWidth="1.5" />
      <path d="M24 35v5" stroke="var(--color-charcoal)" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
}

export function Sparkle({ delay = 0.2 }: StickerProps) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: randomRotate() }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z"
        fill="var(--color-sky-sticker)"
        stroke="var(--color-charcoal)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function Ghost({ delay = 0.3 }: StickerProps) {
  return (
    <motion.svg
      width="40"
      height="48"
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: randomRotate() }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'inline-block' }}
    >
      <path
        d="M4 44V20c0-8.8 7.2-16 16-16s16 7.2 16 16v24l-5-4-5 4-6-4-5 4-5-4-6 4z"
        fill="var(--color-charcoal)"
        stroke="var(--color-charcoal)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="22" r="2" fill="white" />
      <circle cx="25" cy="22" r="2" fill="white" />
      <path d="M16 30c2 2 6 2 8 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
}
