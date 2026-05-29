import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const quickTags = [
  'МРТ',
  'КТ',
  'УЗИ',
  'Анализы',
  'Стоматология',
  'Гинеколог',
  'Кардиолог',
];

const searchSuggestions = [
  { type: 'service', text: 'МРТ головного мозга', category: 'Диагностика' },
  { type: 'service', text: 'УЗИ брюшной полости', category: 'Диагностика' },
  { type: 'service', text: 'Консультация кардиолога', category: 'Консультации' },
  { type: 'service', text: 'Общий анализ крови', category: 'Анализы' },
  { type: 'service', text: 'Чистка зубов Air Flow', category: 'Стоматология' },
  { type: 'service', text: 'Консультация хирурга', category: 'Консультации' },
  { type: 'doctor', text: 'Кардиолог', category: 'Врач' },
  { type: 'doctor', text: 'Невролог', category: 'Врач' },
  { type: 'doctor', text: 'Хирург', category: 'Врач' },
  { type: 'doctor', text: 'Педиатр', category: 'Врач' },
  { type: 'clinic', text: 'Республиканская клиническая больница №1', category: 'Клиника' },
  { type: 'clinic', text: 'Городская клиническая больница №6', category: 'Клиника' },
  { type: 'clinic', text: 'Медицинский центр «Авиценна»', category: 'Клиника' },
  { type: 'clinic', text: 'Клиника «Здоровье плюс»', category: 'Клиника' },
  { type: 'clinic', text: 'Медицинский центр «Ижевск-Мед»', category: 'Клиника' },
];

interface HeroProps {
  onSearch?: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof searchSuggestions>([]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      const filtered = searchSuggestions.filter((s) =>
        s.text.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <section
      className="w-full px-4 pt-16 pb-16 lg:pt-20 lg:pb-16"
      style={{ background: 'var(--clinics-gradient-hero)' }}
    >
      <div className="max-w-[800px] mx-auto text-center animate-fade-in-up">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
          style={{ color: 'var(--clinics-text)' }}
        >
          Найдите и запишитесь к{' '}
          <span className="text-gradient">лучшим врачам</span> и клиникам
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 text-base lg:text-lg max-w-[600px] mx-auto"
          style={{ color: 'var(--clinics-text-secondary)' }}
        >
          Более 50 000 медицинских услуг с ценами, отзывами и онлайн-записью
        </p>

        {/* Search panel */}
        <div className="mt-8 lg:mt-10 relative">
          <div
            className="rounded-2xl p-2 transition-all duration-200"
            style={{
              backgroundColor: 'var(--clinics-surface)',
              boxShadow: isSearchFocused
                ? '0 4px 30px rgba(14, 165, 233, 0.2), 0 2px 12px rgba(14, 165, 233, 0.12)'
                : 'var(--clinics-shadow-search)',
              border: isSearchFocused
                ? '2px solid var(--clinics-primary)'
                : '2px solid transparent',
            }}
          >
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Search input */}
              <div className="flex items-center flex-1 gap-2 px-3 py-2.5">
                <Search
                  size={20}
                  style={{ color: 'var(--clinics-text-muted)', flexShrink: 0 }}
                />
                <input
                  type="text"
                  placeholder="Поиск услуг, врачей, клиник, анализов..."
                  className="w-full bg-transparent outline-none text-sm lg:text-base placeholder:text-[var(--clinics-text-muted)]"
                  style={{ color: 'var(--clinics-text)' }}
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
              </div>

              {/* Divider */}
              <div
                className="hidden sm:block w-px h-8"
                style={{ backgroundColor: 'var(--clinics-border)' }}
              />

              {/* Location input */}
              <div className="flex items-center gap-2 px-3 py-2.5 sm:w-[200px]">
                <MapPin
                  size={18}
                  style={{ color: 'var(--clinics-text-muted)', flexShrink: 0 }}
                />
                <input
                  type="text"
                  placeholder="Город или метро"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-[var(--clinics-text-muted)]"
                  style={{ color: 'var(--clinics-text)' }}
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                />
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="gradient-accent text-white font-medium rounded-xl px-6 lg:px-7 py-3 text-sm transition-all duration-200 hover:opacity-90 active:translate-y-0 shrink-0"
              >
                Найти
              </button>
            </div>
          </div>

          {/* Autocomplete dropdown */}
          {isSearchFocused && suggestions.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full mt-2 rounded-xl overflow-hidden z-30 animate-fade-in"
              style={{
                backgroundColor: 'var(--clinics-surface)',
                boxShadow: 'var(--clinics-shadow-lg)',
                border: '1px solid var(--clinics-border)',
              }}
            >
              <div className="max-h-[300px] overflow-y-auto py-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                    onMouseDown={() => {
                      setSearchQuery(s.text);
                      setSuggestions([]);
                    }}
                  >
                    <span className="text-sm" style={{ color: 'var(--clinics-text)' }}>
                      {s.text}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--clinics-accent-light)',
                        color: 'var(--clinics-secondary)',
                      }}
                    >
                      {s.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {quickTags.map((tag) => (
            <button
              key={tag}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-150 border hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--clinics-surface)',
                borderColor: 'var(--clinics-border)',
                color: 'var(--clinics-text-secondary)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--clinics-primary)';
                el.style.color = 'var(--clinics-primary)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'var(--clinics-border)';
                el.style.color = 'var(--clinics-text-secondary)';
              }}
              onClick={() => handleSearchChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
