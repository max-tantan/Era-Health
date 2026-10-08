import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkle, Ghost } from './StickerIllustration';
import fishingIllustration from '../assets/fishing-illustration.svg';
import './AuthLayout.css';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__left">
        <Link to="/" className="auth-layout__back-link">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          kembali
        </Link>
        {children}
      </div>

      <motion.div
        className="auth-layout__right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="auth-layout__illustration"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img src={fishingIllustration} alt="Ilustrasi orang memancing santai" />
        </motion.div>

        <div className="auth-layout__sticker-cluster">
          <Sparkle delay={0.7} />
          <Ghost delay={0.8} />
        </div>
      </motion.div>
    </div>
  );
}
