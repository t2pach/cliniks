import { Check, Sparkles, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const features = [
  'Понимает разговорные формулировки и ошибки',
  'Рекомендует врачей, анализы и диагностику',
  'Сравнивает цены в клиниках рядом',
];

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function AISearch() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'user',
      text: 'болит голова постоянно',
    },
    {
      role: 'ai',
      text: 'При постоянных головных болях рекомендую:\n• Консультацию невролога — от 2 000 ₽\n• МРТ головного мозга — от 4 500 ₽\n• Общий анализ крови — от 500 ₽',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: inputValue }]);
    setInputValue('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Спасибо за обращение! На основе ваших симптомов я подобрал подходящих специалистов и исследования. Вы можете записаться прямо сейчас через наш сервис.',
        },
      ]);
    }, 1000);
  };

  return (
    <section
      className="w-full py-16 lg:py-20 px-4 lg:px-8"
      style={{ background: 'var(--clinics-gradient-hero)' }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left column */}
          <div className="flex-1 max-w-[520px]">
            {/* Tag */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'var(--clinics-accent-light)',
                color: 'var(--clinics-secondary)',
              }}
            >
              <Sparkles size={14} />
              AI-помощник
            </span>

            {/* Title */}
            <h2
              className="mt-4 text-2xl lg:text-3xl font-semibold leading-tight"
              style={{ color: 'var(--clinics-text)' }}
            >
              Опишите симптомы — мы подберём услуги
            </h2>

            {/* Description */}
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: 'var(--clinics-text-secondary)' }}
            >
              Наш AI понимает естественный язык: «болит голова», «проверить
              сердце», «сдать анализы на гормоны». Получите персональные
              рекомендации за секунды.
            </p>

            {/* Features list */}
            <ul className="mt-6 flex flex-col gap-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--clinics-success)' }}
                  >
                    <Check size={12} className="text-white" />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--clinics-text-secondary)' }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className="mt-8 px-7 py-3.5 rounded-xl text-base font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--clinics-primary)' }}
            >
              Попробовать AI-поиск
            </button>
          </div>

          {/* Right column — Chat interface */}
          <div className="flex-1 w-full max-w-[440px]">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--clinics-surface)',
                boxShadow:
                  '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Chat header */}
              <div
                className="px-5 py-4 flex items-center gap-3 border-b"
                style={{ borderColor: 'var(--clinics-border-light)' }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                >
                  <Sparkles size={16} style={{ color: 'var(--clinics-secondary)' }} />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  AI-помощник Клиникс
                </span>
                <span
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--clinics-success)' }}
                />
              </div>

              {/* Messages */}
              <div
                className="p-4 flex flex-col gap-3 min-h-[240px] max-h-[320px] overflow-y-auto"
                style={{ backgroundColor: 'var(--clinics-bg)' }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                        msg.role === 'user'
                          ? 'rounded-2xl rounded-br-sm'
                          : 'rounded-2xl rounded-bl-sm'
                      }`}
                      style={{
                        backgroundColor:
                          msg.role === 'user'
                            ? 'var(--clinics-primary)'
                            : 'var(--clinics-surface)',
                        color:
                          msg.role === 'user'
                            ? 'white'
                            : 'var(--clinics-text)',
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div
                className="p-3 border-t"
                style={{ borderColor: 'var(--clinics-border-light)' }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Опишите, что вас беспокоит..."
                    className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--clinics-text-muted)] px-3 py-2.5 rounded-xl border"
                    style={{
                      color: 'var(--clinics-text)',
                      borderColor: 'var(--clinics-border)',
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80 shrink-0"
                    style={{ backgroundColor: 'var(--clinics-primary)' }}
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
