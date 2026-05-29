import { useState } from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';

const tabs = ['Все', 'Диагностика', 'Анализы', 'Консультации', 'Стоматология', 'Косметология'];

const services = [
  {
    id: 1,
    category: 'Диагностика',
    title: 'МРТ головного мозга',
    description: 'Магнитно-резонансная томография на аппарате 1.5 Тесла',
    price: '4 500',
    oldPrice: '6 500',
    discount: '−31%',
    clinic: 'Республиканская клиническая больница №1',
    address: 'ул. Удмуртская, 231',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 2,
    category: 'Консультации',
    title: 'Консультация кардиолога',
    description: 'Первичный приём, ЭКГ, рекомендации по лечению',
    price: '2 200',
    oldPrice: '3 000',
    discount: '−27%',
    clinic: 'Медицинский центр «Ижевск-Мед»',
    address: 'ул. Ленина, 52',
    rating: 4.8,
    reviews: 289,
  },
  {
    id: 3,
    category: 'Диагностика',
    title: 'УЗИ брюшной полости',
    description: 'Комплексное УЗИ органов брюшной полости',
    price: '2 800',
    oldPrice: '4 000',
    discount: '−30%',
    clinic: 'Клиника «Здоровье плюс»',
    address: 'ул. М. Горького, 68',
    rating: 4.6,
    reviews: 198,
  },
  {
    id: 4,
    category: 'Стоматология',
    title: 'Чистка зубов Air Flow',
    description: 'Профессиональная гигиена полости рта',
    price: '4 800',
    oldPrice: '7 000',
    discount: '−31%',
    clinic: 'Медицинский центр «Авиценна»',
    address: 'ул. Коммунаров, 241',
    rating: 4.9,
    reviews: 345,
  },
  {
    id: 5,
    category: 'Анализы',
    title: 'Анализ крови общий',
    description: 'Общий (клинический) анализ крови с лейкоцитарной формулой',
    price: '520',
    oldPrice: '750',
    discount: '−31%',
    clinic: 'Клиника «Здоровье плюс»',
    address: 'ул. М. Горького, 68',
    rating: 4.6,
    reviews: 412,
  },
  {
    id: 6,
    category: 'Хирургия',
    title: 'Консультация хирурга',
    description: 'Первичный приём хирурга, осмотр, рекомендации',
    price: '1 800',
    oldPrice: '2 500',
    discount: '−28%',
    clinic: 'Городская клиническая больница №6',
    address: 'ул. Кирова, 119',
    rating: 4.7,
    reviews: 267,
  },
  {
    id: 7,
    category: 'Неврология',
    title: 'Консультация невролога',
    description: 'Приём невролога, диагностика, лечение',
    price: '2 500',
    oldPrice: '3 500',
    discount: '−29%',
    clinic: 'Республиканская клиническая больница №1',
    address: 'ул. Удмуртская, 231',
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 8,
    category: 'Педиатрия',
    title: 'Консультация педиатра',
    description: 'Первичный приём педиатра, осмотр ребёнка',
    price: '1 900',
    oldPrice: '2 700',
    discount: '−30%',
    clinic: 'Медицинский центр «Авиценна»',
    address: 'ул. Коммунаров, 241',
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 9,
    category: 'Офтальмология',
    title: 'Проверка зрения',
    description: 'Комплексная диагностика зрения',
    price: '2 100',
    oldPrice: '3 000',
    discount: '−30%',
    clinic: 'Медицинский центр «Ижевск-Мед»',
    address: 'ул. Ленина, 52',
    rating: 4.8,
    reviews: 156,
  },
];

export default function PopularServices() {
  const [activeTab, setActiveTab] = useState('Все');

  const filteredServices =
    activeTab === 'Все'
      ? services
      : services.filter((s) => s.category === activeTab);

  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-surface)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="text-2xl lg:text-3xl font-semibold"
            style={{ color: 'var(--clinics-text)' }}
          >
            Популярные услуги
          </h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: 'var(--clinics-primary)' }}
          >
            Все услуги
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0"
              style={{
                backgroundColor:
                  activeTab === tab ? 'var(--clinics-primary)' : 'transparent',
                color:
                  activeTab === tab
                    ? 'white'
                    : 'var(--clinics-text-secondary)',
                border:
                  activeTab === tab
                    ? '1px solid var(--clinics-primary)'
                    : '1px solid var(--clinics-border)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--clinics-surface)',
                borderColor: 'var(--clinics-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--clinics-shadow-card-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top section */}
              <div className="p-4">
                <span
                  className="inline-block text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--clinics-accent-light)',
                    color: 'var(--clinics-secondary)',
                  }}
                >
                  {service.category}
                </span>
                <h3
                  className="mt-2 text-base font-medium"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  {service.title}
                </h3>
                <p
                  className="mt-1 text-sm line-clamp-2"
                  style={{ color: 'var(--clinics-text-secondary)' }}
                >
                  {service.description}
                </p>
              </div>

              {/* Price section */}
              <div
                className="px-4 py-3 flex items-center gap-2 border-t"
                style={{ borderColor: 'var(--clinics-border-light)' }}
              >
                <span
                  className="text-xl font-semibold"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  {service.price} ₽
                </span>
                <span
                  className="text-sm line-through"
                  style={{ color: 'var(--clinics-red)' }}
                >
                  {service.oldPrice} ₽
                </span>
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: 'var(--clinics-red)' }}
                >
                  {service.discount}
                </span>
              </div>

              {/* Clinic section */}
              <div
                className="px-4 py-3 flex items-center justify-between border-t"
                style={{ borderColor: 'var(--clinics-border-light)' }}
              >
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {service.clinic}
                  </p>
                  <p
                    className="flex items-center gap-1 text-xs mt-0.5"
                    style={{ color: 'var(--clinics-text-muted)' }}
                  >
                    <MapPin size={12} />
                    {service.address}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star
                    size={14}
                    fill="var(--clinics-gold)"
                    style={{ color: 'var(--clinics-gold)' }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {service.rating}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="p-4 pt-0">
                <button
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                  style={{ backgroundColor: 'var(--clinics-primary)' }}
                >
                  Записаться
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
