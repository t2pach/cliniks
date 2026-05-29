import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Как записаться к врачу через Клиникс?',
    answer:
      'Введите название услуги или симптом в поисковую строку, выберите подходящую клинику и время приёма, затем нажмите «Записаться». Вы получите SMS и email с подтверждением.',
  },
  {
    question: 'Какие клиники представлены на платформе?',
    answer:
      'Мы сотрудничаем только с лицензированными клиниками, прошедшими проверку качества. В базе более 2 000 клиник в 100+ городах России.',
  },
  {
    question: 'Можно ли отменить или перенести запись?',
    answer:
      'Да, вы можете отменить или перенести запись через личный кабинет за 24 часа до приёма без штрафов.',
  },
  {
    question: 'Как формируются цены на услуги?',
    answer:
      'Цены устанавливаются клиниками напрямую. Мы не берём комиссию с пациентов — сервис бесплатен для пользователей.',
  },
  {
    question: 'Есть ли скидки и акции?',
    answer:
      'Да, многие клиники предлагают специальные цены при записи через Клиникс. Следите за разделом «Акции» или подпишитесь на рассылку.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ backgroundColor: 'var(--clinics-bg)' }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Title */}
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          style={{ color: 'var(--clinics-text)' }}
        >
          Часто задаваемые вопросы
        </h2>

        {/* Accordion */}
        <div className="mt-10 flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'var(--clinics-surface)',
                  borderColor: 'var(--clinics-border)',
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                >
                  <span
                    className="text-sm lg:text-base font-medium pr-4"
                    style={{ color: 'var(--clinics-text)' }}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      color: 'var(--clinics-text-muted)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  />
                </button>

                {/* Answer */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div
                    className="px-5 pb-4 text-sm leading-relaxed"
                    style={{ color: 'var(--clinics-text-secondary)' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
