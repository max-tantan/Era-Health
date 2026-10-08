import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import fishingIllustration from '../assets/fishing-illustration.svg';
import PillActionButton from './PillActionButton';
import HandwrittenCaption from './HandwrittenCaption';
import HelperInfoBlock from './HelperInfoBlock';
import TopLeftBrandMark from './TopLeftBrandMark';
import { LightningBolt, Bear, Sparkle } from './StickerIllustration';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <TopLeftBrandMark />

      <div className="hero__top-right-action">
        <Link to="/login">
          <PillActionButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            mulai check-in
          </PillActionButton>
        </Link>
      </div>

      <div className="hero__grid">
        <div className="hero__left">
          <motion.h1
            className="hero__headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            apa kabarmu hari ini?
          </motion.h1>

          <HandwrittenCaption>
            Hai, kamu yang lagi capek,
          </HandwrittenCaption>

          <motion.p
            className="hero__body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            EraHealth bantu kamu mencatat perasaan, mengenali pola stres, dan tahu kapan perlu cerita ke
            seseorang — semuanya bisa dilakukan{' '}
            <span className="hero__highlight">
              pelan-pelan!
              <span className="hero__highlight-underline" />
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/register">
              <PillActionButton>mulai check-in</PillActionButton>
            </Link>
            <HelperInfoBlock>Check-in cuma butuh 2 menit.</HelperInfoBlock>
          </motion.div>
        </div>

        <div className="hero__right">
          <motion.div
            className="hero__scene-wrapper"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <img
              src={fishingIllustration}
              alt="Ilustrasi orang memancing santai di atas perahu"
              className="hero__scene-image"
            />
          </motion.div>

          <div className="hero__stickers">
            <LightningBolt delay={0.9} />
            <Bear delay={1.0} />
          </div>

          <div className="hero__sparkle-right">
            <Sparkle delay={1.1} />
          </div>
        </div>
      </div>
    </section>
  );
}
