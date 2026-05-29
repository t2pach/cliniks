import { useState, useEffect } from 'react';
import {
  Cross,
  Heart,
  User,
  MapPin,
  Phone,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthDialog from '../components/AuthDialog';

const navLinks = [
  'Услуги',
  'Врачи',
  'Клиники',
  'Анализы',
  'Диагностика',
  'Телемедицина',
];

interface NavigationProps {
  onNavigateToDashboard?: () => void;
}

export default function Navigation({ onNavigateToDashboard }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top bar */}
      <div
        className="w-full h-9 flex items-center justify-between px-4 lg:px-8 transition-all duration-300"
        style={{
          backgroundColor: 'var(--clinics-primary)',
          transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        <div className="flex items-center gap-4 text-white text-xs">
          <span className="hidden sm:inline">Более 50 000 услуг в 2 000+ клиниках</span>
          <button className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <MapPin size={12} />
            <span>Москва</span>
            <ChevronDown size={12} />
          </button>
        </div>
        <div className="flex items-center gap-4 text-white text-xs">
          <a href="#" className="hover:opacity-80 transition-opacity hidden sm:inline">Для клиник</a>
          <a href="#faq" className="hover:opacity-80 transition-opacity hidden sm:inline">Помощь</a>
          <a href="tel:88005553535" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <Phone size={12} />
            <span>8 (800) 555-35-35</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 w-full h-16 flex items-center justify-between px-4 lg:px-8 transition-all duration-300"
        style={{
          backgroundColor: 'var(--clinics-surface)',
          borderBottom: '1px solid var(--clinics-border)',
          boxShadow: scrolled ? 'var(--clinics-shadow-md)' : 'none',
        }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--clinics-primary)' }}
          >
            <Cross size={18} className="text-white" />
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: 'var(--clinics-text)' }}
          >
            Клиникс
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ color: 'var(--clinics-text-secondary)' }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--clinics-primary)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--clinics-text-secondary)';
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50 relative"
            aria-label="Избранное"
          >
            <Heart size={18} style={{ color: 'var(--clinics-text-secondary)' }} />
            <span
              className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-medium text-white flex items-center justify-center"
              style={{ backgroundColor: 'var(--clinics-red)' }}
            >
              2
            </span>
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToDashboard}
                className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  border: '1px solid var(--clinics-primary)',
                  color: 'var(--clinics-primary)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = 'var(--clinics-primary)';
                  el.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = 'transparent';
                  el.style.color = 'var(--clinics-primary)';
                }}
              >
                <User size={16} />
                <span>{user?.name || 'Кабинет'}</span>
              </button>
              <button
                onClick={logout}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-50"
                aria-label="Выйти"
                title="Выйти"
              >
                <LogOut size={18} style={{ color: 'var(--clinics-text-secondary)' }} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthDialogOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                border: '1px solid var(--clinics-primary)',
                color: 'var(--clinics-primary)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'var(--clinics-primary)';
                el.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = 'transparent';
                el.style.color = 'var(--clinics-primary)';
              }}
            >
              <User size={16} />
              <span>Войти</span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <X size={20} style={{ color: 'var(--clinics-text-secondary)' }} />
            ) : (
              <Menu size={20} style={{ color: 'var(--clinics-text-secondary)' }} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 z-40 p-4"
          style={{
            top: '64px',
            backgroundColor: 'var(--clinics-surface)',
            borderBottom: '1px solid var(--clinics-border)',
            boxShadow: 'var(--clinics-shadow-lg)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ color: 'var(--clinics-text-secondary)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <hr className="my-2" style={{ borderColor: 'var(--clinics-border-light)' }} />
            <a href="#" className="flex items-center gap-2 px-4 py-3 text-sm" style={{ color: 'var(--clinics-text-secondary)' }}>
              <HelpCircle size={16} />
              <span>Помощь</span>
            </a>
            <a href="tel:88005553535" className="flex items-center gap-2 px-4 py-3 text-sm" style={{ color: 'var(--clinics-text-secondary)' }}>
              <Phone size={16} />
              <span>8 (800) 555-35-35</span>
            </a>
          </nav>
        </div>
      )}

      {/* Auth Dialog */}
      <AuthDialog isOpen={authDialogOpen} onClose={() => setAuthDialogOpen(false)} />
    </>
  );
}
