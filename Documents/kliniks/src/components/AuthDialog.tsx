import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(email, password, name);
      }

      if (success) {
        onClose();
        setEmail('');
        setPassword('');
        setName('');
      } else {
        setError('Произошла ошибка. Попробуйте снова.');
      }
    } catch (err) {
      setError('Произошла ошибка. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-fade-in"
        style={{
          backgroundColor: 'var(--clinics-surface)',
          boxShadow: 'var(--clinics-shadow-card-hover)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100"
          style={{ color: 'var(--clinics-text-secondary)' }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2
            className="text-2xl font-bold"
            style={{ color: 'var(--clinics-text)' }}
          >
            {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: 'var(--clinics-text-secondary)' }}
          >
            {isLogin
              ? 'Войдите для доступа к личному кабинету'
              : 'Создайте аккаунт для доступа к личному кабинету'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--clinics-text-muted)' }}
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--clinics-text-muted)' }}
              />
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--clinics-text-muted)' }}
              />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--clinics-text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: '#FEF2F2',
                color: 'var(--clinics-red)',
                border: '1px solid #FECACA',
              }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            style={{
              backgroundColor: 'var(--clinics-primary)',
            }}
          >
            {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </form>

        {/* Toggle */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm"
            style={{ color: 'var(--clinics-primary)' }}
          >
            {isLogin
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}
