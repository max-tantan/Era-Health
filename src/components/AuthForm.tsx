import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PillActionButton from './PillActionButton';
import './AuthForm.css';

type AuthFormProps = {
  mode: 'login' | 'register';
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isLogin = mode === 'login';

  return (
    <motion.div
      className="auth-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="auth-form__title">
        {isLogin ? 'selamat datang kembali' : 'bergabung dengan erahaelth'}
      </h1>
      <p className="auth-form__subtitle">
        {isLogin
          ? 'senang lihat kamu lagi — yuk lanjutkan check-in-mu'
          : 'mulai catat perasaanmu, pelan-pelan'}
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        {!isLogin && (
          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="name">nama panggilan</label>
            <input
              className="auth-form__input"
              id="name"
              type="text"
              placeholder="cth: Rina"
            />
          </div>
        )}

        <div className="auth-form__group">
          <label className="auth-form__label" htmlFor="email">email</label>
          <input
            className="auth-form__input"
            id="email"
            type="email"
            placeholder="cth: rina@email.com"
          />
        </div>

        <div className="auth-form__group">
          <label className="auth-form__label" htmlFor="password">kata sandi</label>
          <input
            className="auth-form__input"
            id="password"
            type="password"
            placeholder={isLogin ? 'masukkan kata sandi' : 'buat kata sandi'}
          />
        </div>

        {!isLogin && (
          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="confirm-password">konfirmasi kata sandi</label>
            <input
              className="auth-form__input"
              id="confirm-password"
              type="password"
              placeholder="ketik ulang kata sandi"
            />
          </div>
        )}

        {isLogin && (
          <div className="auth-form__checkbox-group">
            <input className="auth-form__checkbox" id="remember" type="checkbox" />
            <label className="auth-form__checkbox-label" htmlFor="remember">
              ingat saya
            </label>
          </div>
        )}

        {!isLogin && (
          <div className="auth-form__checkbox-group">
            <input className="auth-form__checkbox" id="terms" type="checkbox" required />
            <label className="auth-form__checkbox-label" htmlFor="terms">
              saya setuju dengan syarat & ketentuan
            </label>
          </div>
        )}

        <div className="auth-form__actions">
          <PillActionButton type="submit">
            {isLogin ? 'masuk' : 'daftar'}
          </PillActionButton>

          {isLogin && (
            <a href="#" className="auth-form__link" style={{ textAlign: 'center', fontSize: 'var(--text-caption)' }}>
              lupa kata sandi?
            </a>
          )}
        </div>
      </form>

      <div className="auth-form__divider">atau</div>

      <button className="auth-form__social-btn" type="button">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {isLogin ? 'masuk dengan google' : 'daftar dengan google'}
      </button>

      <p className="auth-form__footer">
        {isLogin ? 'belum punya akun? ' : 'sudah punya akun? '}
        <Link
          to={isLogin ? '/register' : '/login'}
          className="auth-form__link"
        >
          {isLogin ? 'daftar' : 'masuk'}
        </Link>
      </p>
    </motion.div>
  );
}
