import { Search, BarChart3, CalendarCheck } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Найдите услугу',
    description: 'Введите симптом, название процедуры или выберите из каталога',
  },
  {
    number: 2,
    icon: BarChart3,
    title: 'Сравните варианты',
    description: 'Сравните цены, рейтинги и отзывы о клиниках и врачах',
  },
  {
    number: 3,
    icon: CalendarCheck,
    title: 'Запишитесь онлайн',
    description: 'Выберите удобное время и получите подтверждение записи',
  },
];

export default function HowItWorks() {
  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-surface)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Title */}
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          style={{ color: 'var(--clinics-text)' }}
        >
          Как записаться — всего 3 шага
        </h2>
        <p
          className="mt-3 text-base text-center"
          style={{ color: 'var(--clinics-text-secondary)' }}
        >
          Найдите нужную услугу и запишитесь за 2 минуты
        </p>

        {/* Steps */}
        <div className="mt-12 flex flex-col lg:flex-row items-start gap-8 lg:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <div key={step.number} className="flex items-center flex-1">
                {/* Step content */}
                <div className="flex flex-col items-center text-center flex-1">
                  {/* Number circle with icon */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: 'var(--clinics-gradient-accent)',
                    }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Title */}
                  <h3
                    className="mt-5 text-lg font-semibold"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mt-2 text-sm max-w-[260px]"
                    style={{ color: 'var(--clinics-text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div
                    className="hidden lg:block w-16 border-t-2 border-dashed mx-4 mt-7 shrink-0"
                    style={{ borderColor: 'var(--clinics-border)' }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
