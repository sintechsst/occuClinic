'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus,
  Search,
  Filter,
  Clock,
  User,
  Building2,
  ClipboardList,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  GripVertical,
  CalendarDays
} from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { 
  startOfWeek, 
  addDays, 
  format, 
  isSameDay, 
  subWeeks, 
  addWeeks,
  startOfDay
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Appointment {
  id: string;
  time: string;
  employee: string;
  company: string;
  exam: string;
  doctor: string;
  status: 'scheduled' | 'completed' | 'missed';
}

const initialAppointments: Appointment[] = [
  { 
    id: '1', 
    time: '08:00', 
    employee: 'João Silva', 
    company: 'TechCorp Solutions', 
    exam: 'Exame Admissional', 
    doctor: 'Dra. Alice Silva',
    status: 'completed' 
  },
  { 
    id: '2', 
    time: '09:30', 
    employee: 'Jane Miller', 
    company: 'TechCorp Solutions', 
    exam: 'Exame Periódico', 
    doctor: 'Dra. Alice Silva',
    status: 'scheduled' 
  },
  { 
    id: '3', 
    time: '11:00', 
    employee: 'Mike Ross', 
    company: 'Global Manufacturing', 
    exam: 'Exame Admissional', 
    doctor: 'Dr. James Wilson',
    status: 'scheduled' 
  },
  { 
    id: '4', 
    time: '14:00', 
    employee: 'Sarah Connor', 
    company: 'City Logistics', 
    exam: 'Audiometria', 
    doctor: 'Dra. Alice Silva',
    status: 'missed' 
  },
  { 
    id: '5', 
    time: '15:30', 
    employee: 'Arthur Dent', 
    company: 'TechCorp Solutions', 
    exam: 'Exame Periódico', 
    doctor: 'Dr. James Wilson',
    status: 'scheduled' 
  },
];

const recalculateTimes = (items: Appointment[]) => {
  return items.map((item, index) => {
    // Começa às 08:00 com intervalos de 30 minutos
    const totalMinutes = 8 * 60 + index * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return { ...item, time: timeString };
  });
};

function SortableAppointment({ apt, onEdit, onComplete }: { apt: Appointment, onEdit: (id: string) => void, onComplete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: apt.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 hover:border-emerald-200 transition-colors group relative"
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing md:block hidden"
      >
        <GripVertical size={20} />
      </div>

      {/* Time */}
      <div className="flex items-center gap-3 md:w-32 shrink-0 md:ml-6">
        <div className="p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <Clock size={20} />
        </div>
        <span className="font-bold text-slate-900 text-lg">{apt.time}</span>
      </div>

      {/* Main Info */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
            <User size={20} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">{apt.employee}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Building2 size={14} />
              {apt.company}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
            <ClipboardList size={16} className="text-slate-400" />
            {apt.exam}
          </p>
          <p className="text-xs text-slate-500 mt-1">Médico: {apt.doctor}</p>
        </div>

        <div className="flex items-center justify-end">
          <span className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
            apt.status === 'completed' ? "bg-emerald-100 text-emerald-700" :
            apt.status === 'scheduled' ? "bg-blue-100 text-blue-700" :
            "bg-rose-100 text-rose-700"
          )}>
            {apt.status === 'completed' && <CheckCircle2 size={14} />}
            {apt.status === 'scheduled' && <AlertCircle size={14} />}
            {apt.status === 'missed' && <XCircle size={14} />}
            {apt.status === 'completed' ? 'Concluído' : apt.status === 'scheduled' ? 'Agendado' : 'Faltou'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:border-l border-slate-100 md:pl-6">
        <button 
          onClick={() => onEdit(apt.id)}
          className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
        >
          Editar
        </button>
        <button 
          onClick={() => onComplete(apt.id)}
          className="px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
        >
          Concluir
        </button>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(recalculateTimes(initialAppointments));
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [form, setForm] = useState({
    employee: '',
    company: '',
    date: '',
    time: '',
    exam: 'Exame Admissional',
    doctor: ''
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setAppointments((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        return recalculateTimes(newItems);
      });
    }
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || apt.doctor === doctorFilter;
    const matchesSearch = apt.employee.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         apt.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesDoctor && matchesSearch;
  });

  const doctors = [...new Set(appointments.map((a) => a.doctor))];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      time: form.time,
      employee: form.employee,
      company: form.company,
      exam: form.exam,
      doctor: form.doctor || 'Dra. Alice Silva',
      status: 'scheduled'
    };
    setAppointments(recalculateTimes([...appointments, newApt]));
    setForm({ employee: '', company: '', date: '', time: '', exam: 'Exame Admissional', doctor: '' });
    setIsModalOpen(false);
  };

  const handleComplete = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'completed' } : apt
    ));
  };

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));

  const handlePrevWeek = () => setSelectedDate(subWeeks(selectedDate, 1));
  const handleNextWeek = () => setSelectedDate(addWeeks(selectedDate, 1));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Agenda Diária</h1>
          <p className="text-slate-500">Gerencie e acompanhe os exames ocupacionais de hoje.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Novo Agendamento
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Novo Agendamento</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Funcionário</label>
                <input 
                  type="text" 
                  required
                  value={form.employee}
                  onChange={(e) => setForm({...form, employee: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" 
                  placeholder="Nome do funcionário" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                <input 
                  type="text" 
                  required
                  value={form.company}
                  onChange={(e) => setForm({...form, company: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" 
                  placeholder="Nome da empresa" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                  <input 
                    type="date" 
                    required
                    value={form.date}
                    onChange={(e) => setForm({...form, date: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Horário</label>
                  <input 
                    type="time" 
                    required
                    value={form.time}
                    onChange={(e) => setForm({...form, time: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Exame</label>
                <select 
                  value={form.exam}
                  onChange={(e) => setForm({...form, exam: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="Admissional">Admissional</option>
                  <option value="Periódico">Periódico</option>
                  <option value="Demissional">Demissional</option>
                  <option value="Retorno">Retorno</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Médico</label>
                <input 
                  type="text" 
                  value={form.doctor}
                  onChange={(e) => setForm({...form, doctor: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" 
                  placeholder="Nome do médico" 
                />
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors mt-4">
                Confirmar Agendamento
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Weekly Calendar View */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="text-emerald-600" size={24} />
            <h2 className="text-lg font-bold text-slate-900">
              {format(selectedDate, "MMMM yyyy", { locale: ptBR })}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
            <button 
              onClick={handlePrevWeek}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-xs font-bold text-emerald-600 hover:bg-white rounded-lg transition-all"
            >
              HOJE
            </button>
            <button 
              onClick={handleNextWeek}
              className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => {
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            
            return (
              <button
                key={day.toString()}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "flex flex-col items-center p-3 rounded-2xl transition-all border-2",
                  isSelected 
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105 z-10" 
                    : "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 hover:border-slate-200"
                )}
              >
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest mb-1",
                  isSelected ? "text-emerald-100" : "text-slate-400"
                )}>
                  {format(day, "eee", { locale: ptBR })}
                </span>
                <span className="text-xl font-black">
                  {format(day, "dd")}
                </span>
                {isToday && !isSelected && (
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Calendar Header & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <CalendarIcon size={20} className="text-slate-400" />
              {formatDate(selectedDate)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar agendamentos..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 w-full md:w-64 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filtros:</span>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 text-slate-600 font-medium"
          >
            <option value="all">Todos os Status</option>
            <option value="scheduled">Agendado</option>
            <option value="completed">Concluído</option>
            <option value="missed">Faltou</option>
          </select>
          <select 
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 text-slate-600 font-medium"
          >
            <option value="all">Todos os Médicos</option>
            {doctors.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule List with Drag & Drop */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          <SortableContext 
            items={filteredAppointments.map(a => a.id)}
            strategy={verticalListSortingStrategy}
          >
            {filteredAppointments.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center">
                <CalendarIcon size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500">Nenhum agendamento encontrado para os filtros selecionados.</p>
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <SortableAppointment 
                  key={apt.id} 
                  apt={apt} 
                  onEdit={(id) => console.log('Edit', id)}
                  onComplete={handleComplete}
                />
              ))
            )}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
