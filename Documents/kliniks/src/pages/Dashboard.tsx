import { useState } from 'react';
import { 
  Calendar, 
  FileText, 
  Clock, 
  Bell, 
  Download, 
  Plus,
  ChevronRight,
  Hospital,
  Stethoscope,
  Pill,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

interface DashboardProps {
  onNavigateToMain?: () => void;
}

interface Visit {
  id: string;
  clinic: string;
  doctor: string;
  specialty: string;
  date: string;
  diagnosis: string;
  status: 'completed' | 'upcoming';
}

interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
  attachments?: number;
}

const mockVisits: Visit[] = [
  {
    id: '1',
    clinic: 'СМ-Клиника',
    doctor: 'Др. Иванова А.С.',
    specialty: 'Кардиолог',
    date: '2024-01-15',
    diagnosis: 'Гипертония 1 степени',
    status: 'completed'
  },
  {
    id: '2',
    clinic: 'Медси',
    doctor: 'Др. Петров Б.В.',
    specialty: 'Терапевт',
    date: '2024-02-20',
    diagnosis: 'ОРВИ, осложненный бронхитом',
    status: 'completed'
  },
  {
    id: '3',
    clinic: 'Евромед',
    doctor: 'Др. Сидорова М.К.',
    specialty: 'Гинеколог',
    date: '2024-03-10',
    diagnosis: 'Профилактический осмотр',
    status: 'completed'
  },
  {
    id: '4',
    clinic: 'СМ-Клиника',
    doctor: 'Др. Козлов Д.А.',
    specialty: 'Невролог',
    date: '2024-04-05',
    diagnosis: 'Головные боли напряжения',
    status: 'completed'
  },
  {
    id: '5',
    clinic: 'Инвитро',
    doctor: 'Др. Николаева Е.П.',
    specialty: 'Эндокринолог',
    date: '2024-05-20',
    diagnosis: 'Консультация по результатам анализов',
    status: 'upcoming'
  }
];

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'Диагноз',
    description: 'Гипертония 1 степени, риск 2. Рекомендуется регулярный контроль АД',
    doctor: 'Др. Иванова А.С.',
    attachments: 2
  },
  {
    id: '2',
    date: '2024-01-15',
    type: 'Назначение',
    description: 'Лизиноприл 10мг 1 раз в день, мониторинг АД 2 раза в день',
    doctor: 'Др. Иванова А.С.',
    attachments: 1
  },
  {
    id: '3',
    date: '2024-02-20',
    type: 'Диагноз',
    description: 'ОРВИ, осложненный бронхитом. Рекомендовано обильное питье, постельный режим',
    doctor: 'Др. Петров Б.В.',
    attachments: 0
  },
  {
    id: '4',
    date: '2024-03-10',
    type: 'Осмотр',
    description: 'Профилактический гинекологический осмотр. Патологий не выявлено',
    doctor: 'Др. Сидорова М.К.',
    attachments: 1
  },
  {
    id: '5',
    date: '2024-04-05',
    type: 'Диагноз',
    description: 'Головные боли напряжения, связанные с стрессом. Рекомендована консультация психолога',
    doctor: 'Др. Козлов Д.А.',
    attachments: 0
  }
];

export default function Dashboard({ onNavigateToMain }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingVisits = mockVisits.filter(v => v.status === 'upcoming');
  const completedVisits = mockVisits.filter(v => v.status === 'completed');

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
            onClick={onNavigateToMain}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
            style={{ color: 'var(--clinics-text-secondary)' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: 'var(--clinics-text)' }}
            >
              Личный кабинет
            </h1>
            <p
              className="mt-1 text-sm"
              style={{ color: 'var(--clinics-text-secondary)' }}
            >
              Управляйте вашим здоровьем
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList
            className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1"
            style={{
              backgroundColor: 'var(--clinics-surface)',
              border: '1px solid var(--clinics-border)',
            }}
          >
            <TabsTrigger value="overview" className="data-[state=active]:text-white">
              Обзор
            </TabsTrigger>
            <TabsTrigger value="visits" className="data-[state=active]:text-white">
              Посещения
            </TabsTrigger>
            <TabsTrigger value="medical-card" className="data-[state=active]:text-white">
              Медкарта
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:text-white">
              Записи
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:text-white">
              Документы
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4" style={{ boxShadow: 'var(--clinics-shadow-card)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Hospital size={20} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      {completedVisits.length}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Посещений
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4" style={{ boxShadow: 'var(--clinics-shadow-card)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Calendar size={20} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      {upcomingVisits.length}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Предстоящих
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4" style={{ boxShadow: 'var(--clinics-shadow-card)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <FileText size={20} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      {mockMedicalRecords.length}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Записей
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4" style={{ boxShadow: 'var(--clinics-shadow-card)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Pill size={20} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      3
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Назначений
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Upcoming Visit */}
            {upcomingVisits.length > 0 && (
              <Card
                className="p-5"
                style={{ boxShadow: 'var(--clinics-shadow-card)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        style={{
                          backgroundColor: 'var(--clinics-accent-light)',
                          color: 'var(--clinics-primary)',
                        }}
                      >
                        Предстоящий прием
                      </Badge>
                    </div>
                    <h3
                      className="text-lg font-semibold mb-1"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      {upcomingVisits[0].doctor}
                    </h3>
                    <p
                      className="text-sm mb-3"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      {upcomingVisits[0].specialty} • {upcomingVisits[0].clinic}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--clinics-text-secondary)' }}>
                      <Calendar size={16} />
                      <span>{new Date(upcomingVisits[0].date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    style={{
                      borderColor: 'var(--clinics-primary)',
                      color: 'var(--clinics-primary)',
                    }}
                  >
                    <Clock size={16} />
                    Перенести
                  </Button>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card
                className="p-5 cursor-pointer transition-all hover:shadow-lg"
                style={{ boxShadow: 'var(--clinics-shadow-card)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Plus size={24} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      Записаться к врачу
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Найти и записаться на прием
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'var(--clinics-text-muted)' }} />
                </div>
              </Card>

              <Card
                className="p-5 cursor-pointer transition-all hover:shadow-lg"
                style={{ boxShadow: 'var(--clinics-shadow-card)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Activity size={24} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      Записаться на анализы
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Сдать анализы в ближайшей лаборатории
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'var(--clinics-text-muted)' }} />
                </div>
              </Card>

              <Card
                className="p-5 cursor-pointer transition-all hover:shadow-lg"
                style={{ boxShadow: 'var(--clinics-shadow-card)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--clinics-accent-light)' }}
                  >
                    <Bell size={24} style={{ color: 'var(--clinics-primary)' }} />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="font-semibold"
                      style={{ color: 'var(--clinics-text)' }}
                    >
                      Напоминания
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--clinics-text-secondary)' }}
                    >
                      Настроить напоминания о приемах
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'var(--clinics-text-muted)' }} />
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Visits Tab */}
          <TabsContent value="visits" className="space-y-4">
            <div className="space-y-4">
              {mockVisits.map((visit) => (
                <Card
                  key={visit.id}
                  className="p-5"
                  style={{ boxShadow: 'var(--clinics-shadow-card)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          style={{
                            backgroundColor: visit.status === 'upcoming'
                              ? 'var(--clinics-accent-light)'
                              : '#F1F5F9',
                            color: visit.status === 'upcoming'
                              ? 'var(--clinics-primary)'
                              : 'var(--clinics-text-secondary)',
                          }}
                        >
                          {visit.status === 'upcoming' ? 'Предстоящий' : 'Завершен'}
                        </Badge>
                      </div>
                      <h3
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--clinics-text)' }}
                      >
                        {visit.doctor}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{ color: 'var(--clinics-text-secondary)' }}
                      >
                        {visit.specialty} • {visit.clinic}
                      </p>
                      <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--clinics-text-secondary)' }}>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{new Date(visit.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </div>
                        {visit.status === 'completed' && (
                          <div className="flex items-center gap-1">
                            <Stethoscope size={16} />
                            <span>{visit.diagnosis}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {visit.status === 'upcoming' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        style={{
                          borderColor: 'var(--clinics-primary)',
                          color: 'var(--clinics-primary)',
                        }}
                      >
                        <Clock size={16} />
                        Перенести
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Medical Card Tab */}
          <TabsContent value="medical-card" className="space-y-4">
            <div className="space-y-4">
              {mockMedicalRecords.map((record) => (
                <Card
                  key={record.id}
                  className="p-5"
                  style={{ boxShadow: 'var(--clinics-shadow-card)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          style={{
                            backgroundColor: 'var(--clinics-accent-light)',
                            color: 'var(--clinics-primary)',
                          }}
                        >
                          {record.type}
                        </Badge>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--clinics-text-muted)' }}
                        >
                          {new Date(record.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <p
                        className="text-base mb-2"
                        style={{ color: 'var(--clinics-text)' }}
                      >
                        {record.description}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: 'var(--clinics-text-secondary)' }}
                      >
                        {record.doctor}
                      </p>
                    </div>
                    {record.attachments && record.attachments > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        style={{ color: 'var(--clinics-primary)' }}
                      >
                        <Download size={16} />
                        {record.attachments}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card
              className="p-8 text-center"
              style={{ boxShadow: 'var(--clinics-shadow-card)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--clinics-accent-light)' }}
              >
                <Calendar size={32} style={{ color: 'var(--clinics-primary)' }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--clinics-text)' }}
              >
                Записи на приемы
              </h3>
              <p
                className="text-sm mb-4 max-w-md mx-auto"
                style={{ color: 'var(--clinics-text-secondary)' }}
              >
                Здесь вы сможете управлять вашими записями к врачам, переносить приемы и получать напоминания
              </p>
              <Button
                className="gap-2"
                style={{ backgroundColor: 'var(--clinics-primary)' }}
              >
                <Plus size={16} />
                Записаться к врачу
              </Button>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card
              className="p-8 text-center"
              style={{ boxShadow: 'var(--clinics-shadow-card)' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--clinics-accent-light)' }}
              >
                <FileText size={32} style={{ color: 'var(--clinics-primary)' }} />
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--clinics-text)' }}
              >
                Медицинские документы
              </h3>
              <p
                className="text-sm mb-4 max-w-md mx-auto"
                style={{ color: 'var(--clinics-text-secondary)' }}
              >
                Здесь будут храниться ваши медицинские документы: результаты анализов, снимки, выписки и справки
              </p>
              <Button
                variant="outline"
                className="gap-2"
                style={{
                  borderColor: 'var(--clinics-primary)',
                  color: 'var(--clinics-primary)',
                }}
              >
                <Download size={16} />
                Загрузить документ
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
