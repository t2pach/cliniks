import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Анна М.',
    initials: 'АМ',
    service: 'МРТ головного мозга',
    text: 'Записалась через Клиникс за 2 минуты. В клинике ждали, всё прошло быстро. Результаты пришли в личный кабинет. Очень удобно!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Сергей К.',
    initials: 'СК',
    service: 'Консультация кардиолога',
    text: 'Сравнил цены в нескольких клиниках и выбрал лучший вариант. Врач был отличный, запись подтвердили сразу.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Елена В.',
    initials: 'ЕВ',
    service: 'УЗИ беременности',
    text: 'Благодаря фильтрам нашла клинику рядом с домом. Персонал вежливый, оборудование современное. Рекомендую!',
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-surface)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          style={{ color: 'var(--clinics-text)' }}
        >
          Что говорят пациенты
        </h2>
        <p
          className="mt-2 text-sm text-center"
          style={{ color: 'var(--clinics-text-muted)' }}
        >
          Реальные отзывы от реальных пациентов
        </p>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--clinics-bg)',
                borderColor: 'var(--clinics-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--clinics-shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < t.rating ? 'var(--clinics-gold)' : 'none'}
                    style={{
                      color:
                        i < t.rating ? 'var(--clinics-gold)' : 'var(--clinics-border)',
                    }}
                  />
                ))}
              </div>

              {/* Text */}
              <p
                className="mt-4 text-[15px] leading-relaxed italic"
                style={{ color: 'var(--clinics-text)' }}
              >
                «{t.text}»
              </p>

              {/* Divider */}
              <div
                className="mt-5 pt-4 border-t flex items-center gap-3"
                style={{ borderColor: 'var(--clinics-border-light)' }}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                  style={{ backgroundColor: 'var(--clinics-primary)' }}
                >
                  {t.initials}
                </div>

                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--clinics-text-muted)' }}
                  >
                    {t.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
