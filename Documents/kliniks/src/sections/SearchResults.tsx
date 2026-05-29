import { Star, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

interface SearchResult {
  id: string;
  type: 'service' | 'clinic';
  title: string;
  description?: string;
  clinic?: string;
  address?: string;
  price?: string;
  rating?: number;
  reviews?: number;
  specializations?: string[];
}

interface SearchResultsProps {
  query: string;
  onClose: () => void;
}

const mockClinics = [
  {
    id: 'c1',
    type: 'clinic' as const,
    title: 'Республиканская клиническая больница №1',
    address: 'ул. Удмуртская, 231',
    rating: 4.8,
    reviews: 892,
    specializations: ['МРТ', 'КТ', 'УЗИ', 'Анализы', 'Кардиология', 'Неврология'],
  },
  {
    id: 'c2',
    type: 'clinic' as const,
    title: 'Городская клиническая больница №6',
    address: 'ул. Кирова, 119',
    rating: 4.7,
    reviews: 1245,
    specializations: ['Хирургия', 'Терапия', 'Травматология', 'Урология'],
  },
  {
    id: 'c3',
    type: 'clinic' as const,
    title: 'Медицинский центр «Авиценна»',
    address: 'ул. Коммунаров, 241',
    rating: 4.9,
    reviews: 567,
    specializations: ['Стоматология', 'Косметология', 'Гинекология', 'Педиатрия'],
  },
  {
    id: 'c4',
    type: 'clinic' as const,
    title: 'Клиника «Здоровье плюс»',
    address: 'ул. М. Горького, 68',
    rating: 4.6,
    reviews: 423,
    specializations: ['Анализы', 'УЗИ', 'МРТ', 'Консультации'],
  },
  {
    id: 'c5',
    type: 'clinic' as const,
    title: 'Медицинский центр «Ижевск-Мед»',
    address: 'ул. Ленина, 52',
    rating: 4.8,
    reviews: 312,
    specializations: ['Кардиология', 'Неврология', 'Офтальмология', 'Эндокринология'],
  },
];

const mockServices = [
  {
    id: 's1',
    type: 'service' as const,
    title: 'МРТ головного мозга',
    description: 'Магнитно-резонансная томография на аппарате 1.5 Тесла',
    clinic: 'Республиканская клиническая больница №1',
    address: 'ул. Удмуртская, 231',
    price: '4 500',
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 's2',
    type: 'service' as const,
    title: 'Консультация кардиолога',
    description: 'Первичный приём, ЭКГ, рекомендации по лечению',
    clinic: 'Медицинский центр «Ижевск-Мед»',
    address: 'ул. Ленина, 52',
    price: '2 200',
    rating: 4.8,
    reviews: 289,
  },
  {
    id: 's3',
    type: 'service' as const,
    title: 'УЗИ брюшной полости',
    description: 'Комплексное УЗИ органов брюшной полости',
    clinic: 'Клиника «Здоровье плюс»',
    address: 'ул. М. Горького, 68',
    price: '2 800',
    rating: 4.6,
    reviews: 198,
  },
  {
    id: 's4',
    type: 'service' as const,
    title: 'Чистка зубов Air Flow',
    description: 'Профессиональная гигиена полости рта',
    clinic: 'Медицинский центр «Авиценна»',
    address: 'ул. Коммунаров, 241',
    price: '4 800',
    rating: 4.9,
    reviews: 345,
  },
  {
    id: 's5',
    type: 'service' as const,
    title: 'Анализ крови общий',
    description: 'Общий (клинический) анализ крови с лейкоцитарной формулой',
    clinic: 'Клиника «Здоровье плюс»',
    address: 'ул. М. Горького, 68',
    price: '520',
    rating: 4.6,
    reviews: 412,
  },
  {
    id: 's6',
    type: 'service' as const,
    title: 'Консультация хирурга',
    description: 'Первичный приём хирурга, осмотр, рекомендации',
    clinic: 'Городская клиническая больница №6',
    address: 'ул. Кирова, 119',
    price: '1 800',
    rating: 4.7,
    reviews: 267,
  },
  {
    id: 's7',
    type: 'service' as const,
    title: 'Консультация невролога',
    description: 'Приём невролога, диагностика, лечение',
    clinic: 'Республиканская клиническая больница №1',
    address: 'ул. Удмуртская, 231',
    price: '2 500',
    rating: 4.8,
    reviews: 178,
  },
  {
    id: 's8',
    type: 'service' as const,
    title: 'Консультация педиатра',
    description: 'Первичный приём педиатра, осмотр ребёнка',
    clinic: 'Медицинский центр «Авиценна»',
    address: 'ул. Коммунаров, 241',
    price: '1 900',
    rating: 4.9,
    reviews: 234,
  },
  {
    id: 's9',
    type: 'service' as const,
    title: 'Проверка зрения',
    description: 'Комплексная диагностика зрения',
    clinic: 'Медицинский центр «Ижевск-Мед»',
    address: 'ул. Ленина, 52',
    price: '2 100',
    rating: 4.8,
    reviews: 156,
  },
];

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  const searchLower = query.toLowerCase();

  const filteredClinics = mockClinics.filter(clinic =>
    clinic.title.toLowerCase().includes(searchLower) ||
    clinic.specializations?.some(spec => spec.toLowerCase().includes(searchLower))
  );

  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchLower) ||
    service.description?.toLowerCase().includes(searchLower) ||
    service.clinic?.toLowerCase().includes(searchLower)
  );

  const allResults: SearchResult[] = [...filteredClinics, ...filteredServices];

  if (!query) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--clinics-bg)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 lg:px-8 py-4"
        style={{
          backgroundColor: 'var(--clinics-surface)',
          borderBottom: '1px solid var(--clinics-border)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: 'var(--clinics-text-secondary)' }}
          >
            <ArrowRight size={20} className="rotate-180" />
          </button>
          <div className="flex-1">
            <h1
              className="text-xl font-semibold"
              style={{ color: 'var(--clinics-text)' }}
            >
              Результаты поиска: "{query}"
            </h1>
            <p
              className="text-sm"
              style={{ color: 'var(--clinics-text-secondary)' }}
            >
              Найдено {allResults.length} результатов
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {allResults.length === 0 ? (
          <Card
            className="p-12 text-center"
            style={{ boxShadow: 'var(--clinics-shadow-card)' }}
          >
            <p
              className="text-lg"
              style={{ color: 'var(--clinics-text-secondary)' }}
            >
              Ничего не найдено по запросу "{query}"
            </p>
            <p
              className="text-sm mt-2"
              style={{ color: 'var(--clinics-text-muted)' }}
            >
              Попробуйте изменить параметры поиска
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Clinics */}
            {filteredClinics.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  Клиники ({filteredClinics.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClinics.map((clinic) => (
                    <Card
                      key={clinic.id}
                      className="p-5"
                      style={{ boxShadow: 'var(--clinics-shadow-card)' }}
                    >
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{ color: 'var(--clinics-text)' }}
                      >
                        {clinic.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Star
                          size={16}
                          fill="var(--clinics-gold)"
                          style={{ color: 'var(--clinics-gold)' }}
                        />
                        <span
                          className="font-medium"
                          style={{ color: 'var(--clinics-text)' }}
                        >
                          {clinic.rating}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--clinics-text-muted)' }}
                        >
                          ({clinic.reviews} отзывов)
                        </span>
                      </div>
                      <p
                        className="flex items-center gap-1.5 text-sm mb-3"
                        style={{ color: 'var(--clinics-text-secondary)' }}
                      >
                        <MapPin size={14} />
                        {clinic.address}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {clinic.specializations?.slice(0, 3).map((spec) => (
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
                      <Button
                        className="w-full"
                        style={{ backgroundColor: 'var(--clinics-primary)' }}
                      >
                        Записаться
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {filteredServices.length > 0 && (
              <div>
                <h2
                  className="text-lg font-semibold mb-4"
                  style={{ color: 'var(--clinics-text)' }}
                >
                  Услуги ({filteredServices.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className="p-5"
                      style={{ boxShadow: 'var(--clinics-shadow-card)' }}
                    >
                      <h3
                        className="text-base font-semibold mb-2"
                        style={{ color: 'var(--clinics-text)' }}
                      >
                        {service.title}
                      </h3>
                      {service.description && (
                        <p
                          className="text-sm mb-3 line-clamp-2"
                          style={{ color: 'var(--clinics-text-secondary)' }}
                        >
                          {service.description}
                        </p>
                      )}
                      {service.clinic && (
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ color: 'var(--clinics-text)' }}
                        >
                          {service.clinic}
                        </p>
                      )}
                      {service.address && (
                        <p
                          className="flex items-center gap-1 text-xs mb-3"
                          style={{ color: 'var(--clinics-text-muted)' }}
                        >
                          <MapPin size={12} />
                          {service.address}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        {service.price && (
                          <span
                            className="text-xl font-semibold"
                            style={{ color: 'var(--clinics-text)' }}
                          >
                            {service.price} ₽
                          </span>
                        )}
                        {service.rating && (
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
                        )}
                      </div>
                      <Button
                        className="w-full"
                        style={{ backgroundColor: 'var(--clinics-primary)' }}
                      >
                        Записаться
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
