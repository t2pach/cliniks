import {
  Stethoscope,
  Scan,
  FlaskConical,
  Heart,
  Smile,
  Baby,
  Sparkles,
  Video,
} from 'lucide-react';

const categories = [
  {
    icon: Stethoscope,
    title: 'Врачи и консультации',
    description: '15 000+ специалистов',
  },
  {
    icon: Scan,
    title: 'Диагностика',
    description: 'МРТ, КТ, УЗИ, рентген',
  },
  {
    icon: FlaskConical,
    title: 'Анализы и лаборатория',
    description: '8 000+ исследований',
  },
  {
    icon: Heart,
    title: 'Кардиология',
    description: 'Полное обследование',
  },
  {
    icon: Smile,
    title: 'Стоматология',
    description: '5 000+ услуг',
  },
  {
    icon: Baby,
    title: 'Репродуктивная медицина',
    description: 'ЭКО, беременность',
  },
  {
    icon: Sparkles,
    title: 'Косметология',
    description: 'Инъекции, лазер',
  },
  {
    icon: Video,
    title: 'Телемедицина',
    description: 'Онлайн-консультации',
  },
];

export default function ServiceCategories() {
  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-bg)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section title */}
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          style={{ color: 'var(--clinics-text)' }}
        >
          Популярные направления
        </h2>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <a
                key={i}
                href="#"
                className="group flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200 border hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--clinics-surface)',
                  borderColor: 'var(--clinics-border)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--clinics-primary)';
                  el.style.boxShadow = 'var(--clinics-shadow-md)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--clinics-border)';
                  el.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                >
                  <Icon
                    size={24}
                    className="transition-colors duration-200"
                    style={{ color: 'var(--clinics-primary)' }}
                  />
                </div>
                <h3
                  className="mt-3 text-sm lg:text-base font-medium"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  {cat.title}
                </h3>
                <p
                  className="mt-1 text-xs lg:text-sm"
                  style={{ color: 'var(--clinics-text-muted)' }}
                >
                  {cat.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
