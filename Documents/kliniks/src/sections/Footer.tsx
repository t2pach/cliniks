import { useState } from 'react';
import { Cross, Send } from 'lucide-react';

const footerColumns = [
  {
    title: 'Пациентам',
    links: ['Услуги', 'Врачи', 'Клиники', 'Анализы', 'Диагностика', 'Телемедицина', 'Страхование'],
  },
  {
    title: 'Специализации',
    links: ['МРТ', 'КТ', 'УЗИ', 'Анализы крови', 'Стоматология', 'Косметология', 'Хирургия'],
  },
  {
    title: 'О сервисе',
    links: ['О Клиникс', 'Как это работает', 'Для клиник', 'Цены', 'Отзывы', 'Блог', 'Карьера'],
  },
  {
    title: 'Помощь',
    links: ['FAQ', 'Контакты', 'Политика конфиденциальности', 'Условия использования'],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{ backgroundColor: 'var(--clinics-text)' }}>
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">
              Получайте лучшие предложения
            </h4>
            <p
              className="text-sm mb-4"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              Подпишитесь на рассылку и узнавайте об акциях первыми
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-3 py-2.5 rounded-lg text-sm outline-none placeholder:text-[var(--clinics-text-muted)]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-opacity hover:opacity-80 shrink-0"
                style={{ backgroundColor: 'var(--clinics-primary)' }}
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo + copyright */}
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ backgroundColor: 'var(--clinics-primary)' }}
            >
              <Cross size={14} className="text-white" />
            </div>
            <span
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              © 2025 Клиникс. Все права защищены.
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              VK
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Telegram
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
