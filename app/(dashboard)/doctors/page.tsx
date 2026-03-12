'use client';

import React, { useState, useMemo } from 'react';
import { 
  Stethoscope, 
  Plus, 
  Search, 
  Mail, 
  Phone,
  Calendar,
  Award,
  ArrowUpDown,
  Check,
  X as CloseIcon,
  Clock,
  User,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';

const initialDoctors = [
  { 
    id: '1', 
    name: 'Dra. Alice Silva', 
    crm: '12345-SP', 
    specialty: 'Medicina do Trabalho',
    email: 'alice.silva@clinic.com',
    phone: '(11) 98888-0001',
    appointmentsToday: 12,
    status: 'available'
  },
  { 
    id: '2', 
    name: 'Dr. James Wilson', 
    crm: '67890-SP', 
    specialty: 'Clínico Geral',
    email: 'james.wilson@clinic.com',
    phone: '(11) 98888-0002',
    appointmentsToday: 8,
    status: 'busy'
  },
  { 
    id: '3', 
    name: 'Dra. Elena Rodriguez', 
    crm: '24680-SP', 
    specialty: 'Otorrinolaringologista',
    email: 'elena.r@clinic.com',
    phone: '(11) 98888-0003',
    appointmentsToday: 5,
    status: 'available'
  },
];

const mockSchedules: Record<string, { time: string; patient: string; exam: string }[]> = {
  '1': [
    { time: '08:00', patient: 'João Silva', exam: 'Admissional' },
    { time: '08:30', patient: 'Maria Oliveira', exam: 'Periódico' },
    { time: '09:00', patient: 'Pedro Santos', exam: 'Retorno ao Trabalho' },
    { time: '09:30', patient: 'Ana Paula', exam: 'Admissional' },
    { time: '10:00', patient: 'Ricardo Souza', exam: 'Periódico' },
  ],
  '2': [
    { time: '10:00', patient: 'Ana Costa', exam: 'Admissional' },
    { time: '10:30', patient: 'Carlos Souza', exam: 'Periódico' },
    { time: '11:00', patient: 'Fernanda Lima', exam: 'Admissional' },
  ],
  '3': [
    { time: '14:00', patient: 'Lucia Lima', exam: 'Mudança de Função' },
    { time: '14:30', patient: 'Marcos Rocha', exam: 'Periódico' },
  ]
};

type SortField = 'name' | 'specialty' | 'appointmentsToday';
type SortOrder = 'asc' | 'desc';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [selectedDoctorForSchedule, setSelectedDoctorForSchedule] = useState<typeof initialDoctors[0] | null>(null);

  const handleToggleStatus = (id: string) => {
    setDoctors(prev => prev.map(doc => 
      doc.id === id 
        ? { ...doc, status: doc.status === 'available' ? 'busy' : 'available' }
        : doc
    ));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedDoctors = useMemo(() => {
    return doctors
      .filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.crm.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        return 0;
      });
  }, [doctors, searchTerm, sortField, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Médicos</h1>
          <p className="text-slate-500">Gerencie a equipe clínica e suas especialidades.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          <Plus size={20} />
          Cadastrar Médico
        </button>
      </div>

      {/* Search and Sort */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CRM..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <span className="text-sm text-slate-500 whitespace-nowrap">Ordenar por:</span>
          <button 
            onClick={() => handleSort('name')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
              sortField === 'name' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            Nome <ArrowUpDown size={14} />
          </button>
          <button 
            onClick={() => handleSort('specialty')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
              sortField === 'specialty' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            Especialidade <ArrowUpDown size={14} />
          </button>
          <button 
            onClick={() => handleSort('appointmentsToday')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1",
              sortField === 'appointmentsToday' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            Agendamentos <ArrowUpDown size={14} />
          </button>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 hover:border-emerald-200 transition-all group">
            <div className="flex flex-col items-center text-center sm:text-left sm:items-start gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <Stethoscope size={40} />
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                  doctor.status === 'available' ? "bg-emerald-500" : "bg-amber-500"
                )} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{doctor.name}</h3>
                <p className="text-sm text-emerald-600 font-medium">{doctor.specialty}</p>
                <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                  <Award size={12} />
                  CRM {doctor.crm}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  {doctor.phone}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Agendamentos de Hoje</span>
                </div>
                <span className="text-lg font-bold text-slate-900">{doctor.appointmentsToday}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Disponibilidade:</span>
                  <button 
                    onClick={() => handleToggleStatus(doctor.id)}
                    className={cn(
                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                      doctor.status === 'available' ? "bg-emerald-500" : "bg-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                        doctor.status === 'available' ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </button>
                  <span className={cn(
                    "text-xs font-bold uppercase tracking-wider",
                    doctor.status === 'available' ? "text-emerald-600" : "text-amber-600"
                  )}>
                    {doctor.status === 'available' ? 'Disponível' : 'Ocupado'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    Editar
                  </button>
                  <button 
                    onClick={() => setSelectedDoctorForSchedule(doctor)}
                    className="px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    Agenda
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {selectedDoctorForSchedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Stethoscope size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Agenda: {selectedDoctorForSchedule.name}</h2>
                  <p className="text-sm text-slate-500">{selectedDoctorForSchedule.specialty} • CRM {selectedDoctorForSchedule.crm}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoctorForSchedule(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
              >
                <CloseIcon size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {mockSchedules[selectedDoctorForSchedule.id]?.length > 0 ? (
                  mockSchedules[selectedDoctorForSchedule.id].map((apt, index) => (
                    <div key={index} className="flex items-center gap-6 p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                      <div className="flex items-center gap-3 w-24 shrink-0">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                          <Clock size={18} />
                        </div>
                        <span className="font-bold text-slate-900">{apt.time}</span>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <User size={16} />
                          </div>
                          <span className="text-sm font-semibold text-slate-900">{apt.patient}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <ClipboardList size={16} />
                          </div>
                          <span className="text-sm text-slate-600">{apt.exam}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                      <Calendar size={32} />
                    </div>
                    <p className="text-slate-500">Nenhum agendamento para hoje.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setSelectedDoctorForSchedule(null)}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
