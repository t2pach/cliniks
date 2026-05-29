import { Star, MapPin, Train, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const clinics = [
  {
    id: 1,
    name: 'Республиканская клиническая больница №1',
    image: '/images/clinic-1.jpg',
    rating: 4.8,
    reviews: 892,
    verified: true,
    address: 'ул. Удмуртская, 231',
    metro: 'Центр',
    specializations: ['МРТ', 'КТ', 'УЗИ', 'Анализы', 'Кардиология', 'Неврология'],
    hours: 'Круглосуточно',
  },
  {
    id: 2,
    name: 'Городская клиническая больница №6',
    image: '/images/clinic-2.jpg',
    rating: 4.7,
    reviews: 1245,
    verified: true,
    address: 'ул. Кирова, 119',
    metro: 'Центр',
    specializations: ['Хирургия', 'Терапия', 'Травматология', 'Урология'],
    hours: '08:00–20:00',
  },
  {
    id: 3,
    name: 'Медицинский центр «Авиценна»',
    image: '/images/clinic-3.jpg',
    rating: 4.9,
    reviews: 567,
    verified: true,
    address: 'ул. Коммунаров, 241',
    metro: 'Юг',
    specializations: ['Стоматология', 'Косметология', 'Гинекология', 'Педиатрия'],
    hours: '09:00–21:00',
  },
  {
    id: 4,
    name: 'Клиника «Здоровье плюс»',
    image: '/images/clinic-4.jpg',
    rating: 4.6,
    reviews: 423,
    verified: true,
    address: 'ул. М. Горького, 68',
    metro: 'Север',
    specializations: ['Анализы', 'УЗИ', 'МРТ', 'Консультации'],
    hours: '08:00–19:00',
  },
  {
    id: 5,
    name: 'Медицинский центр «Ижевск-Мед»',
    image: '/images/clinic-5.jpg',
    rating: 4.8,
    reviews: 312,
    verified: true,
    address: 'ул. Ленина, 52',
    metro: 'Центр',
    specializations: ['Кардиология', 'Неврология', 'Офтальмология', 'Эндокринология'],
    hours: '09:00–20:00',
  },
];

export default function FeaturedClinics() {
  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-bg)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2
            className="text-2xl lg:text-3xl font-semibold"
            style={{ color: 'var(--clinics-text)' }}
          >
            Лучшие клиники рядом с вами
          </h2>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: 'var(--clinics-primary)' }}
          >
            Все клиники
            <ArrowRight size={16} />
          </a>
        </div>

        {/* Clinics grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="rounded-2xl border overflow-hidden transition-all duration-200 hover:-translate-y-1"
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
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Name + rating */}
                <div className="flex items-start justify-between">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {clinic.name}
                  </h3>
                </div>

                {/* Rating row */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      fill="var(--clinics-gold)"
                      style={{ color: 'var(--clinics-gold)' }}
                    />
                    <span
                      className="text-base font-semibold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      {clinic.rating}
                    </span>
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--clinics-text-muted)' }}
                  >
                    {clinic.reviews.toLocaleString('ru')} отзывов
                  </span>
                  {clinic.verified && (
                    <span
                      className="flex items-center gap-1 text-xs font-medium"
                      style={{ color: 'var(--clinics-success)' }}
                    >
                      <CheckCircle size={14} />
                      Проверено
                    </span>
                  )}
                </div>

                {/* Address */}
                <div className="mt-3 space-y-1.5">
                  <p
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: 'var(--clinics-text-secondary)' }}
                  >
                    <MapPin size={14} style={{ color: 'var(--clinics-text-muted)' }} />
                    {clinic.address}
                  </p>
                  <p
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: 'var(--clinics-text-muted)' }}
                  >
                    <Train size={14} />
                    м. {clinic.metro}
                  </p>
                  <p
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: 'var(--clinics-text-muted)' }}
                  >
                    <Clock size={14} />
                    {clinic.hours}
                  </p>
                </div>

                {/* Specializations */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {clinic.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'var(--clinics-accent-light)',
                        color: 'var(--clinics-secondary)',
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <button
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
                    style={{ backgroundColor: 'var(--clinics-primary)' }}
                  >
                    Записаться
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border hover:bg-gray-50"
                    style={{
                      borderColor: 'var(--clinics-border)',
                      color: 'var(--clinics-text-secondary)',
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
