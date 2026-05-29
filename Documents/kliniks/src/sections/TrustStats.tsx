import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50000, suffix: '+', label: 'Медицинских услуг' },
  { value: 2000, suffix: '+', label: 'Проверенных клиник' },
  { value: 15000, suffix: '+', label: 'Врачей всех специальностей' },
  { value: 1000000, suffix: '+', label: 'Записей в месяц' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setDisplay(value);
              clearInterval(timer);
            } else {
              setDisplay(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(0) + ' 000 000';
    if (num >= 1000) return num.toLocaleString('ru');
    return num.toString();
  };

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-bold" style={{ color: 'var(--clinics-primary)' }}>
      {formatNumber(display)}{suffix}
    </div>
  );
}

export default function TrustStats() {
  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-text)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p
                className="mt-2 text-sm"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
