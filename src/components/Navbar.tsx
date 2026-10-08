import { Link, useLocation } from 'react-router-dom';
import PillActionButton from './PillActionButton';
import './Navbar.css';

const menuItems = [
  { label: 'beranda', path: '/dashboard' },
  { label: 'check-in', path: '/dashboard/check-in' },
  { label: 'jurnal', path: '/dashboard/jurnal' },
  { label: 'wawasan', path: '/dashboard/wawasan' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/dashboard" className="navbar__brand">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar__brand-icon"
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
          <span className="navbar__brand-name">EraHealth</span>
        </Link>
      </div>

      <ul className="navbar__menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`navbar__menu-item ${location.pathname === item.path ? 'navbar__menu-item--active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar__right">
        <PillActionButton>+ check-in baru</PillActionButton>
        <div className="navbar__avatar" title="Profil">
          RN
        </div>
      </div>
    </nav>
  );
}
