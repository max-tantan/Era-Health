import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CheckinPage from './pages/CheckinPage';
import JournalPage from './pages/JournalPage';
import InsightsPage from './pages/InsightsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/check-in" element={<CheckinPage />} />
        <Route path="/dashboard/jurnal" element={<JournalPage />} />
        <Route path="/dashboard/wawasan" element={<InsightsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
