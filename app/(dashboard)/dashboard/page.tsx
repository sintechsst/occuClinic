'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  CalendarCheck, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CalendarDays,
  XCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Settings2,
  GripVertical,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Stat {
  id: string;
  name: string;
  value: string;
  icon: any;
  change: string;
  changeType: 'increase' | 'decrease';
  line: number;
  description?: string;
  visible: boolean;
}

const initialStats: Stat[] = [
  // Line 1
  { id: 'exames-hoje', name: 'Exames Hoje', value: '24', icon: CalendarCheck, change: '+12%', changeType: 'increase', line: 1, visible: true },
  { id: 'agenda-amanha', name: 'Agenda Amanhã', value: '18', icon: CalendarDays, change: '+5%', changeType: 'increase', line: 1, visible: true },
  { id: 'faltas-hoje', name: 'Faltas Hoje', value: '3', icon: XCircle, change: '+1', changeType: 'decrease', line: 1, visible: true },
  { id: 'exames-realizados', name: 'Exames Realizados', value: '21', icon: CheckCircle2, change: '87%', changeType: 'increase', line: 1, visible: true },
  
  // Line 2
  { id: 'empresas-ativas', name: 'Empresas Ativas', value: '42', icon: Building2, change: '+3', changeType: 'increase', line: 2, visible: true },
  { id: 'funcionarios', name: 'Funcionários', value: '1.240', icon: Users, change: '+18%', changeType: 'increase', line: 2, visible: true },
  { id: 'exames-mes', name: 'Exames no Mês', value: '456', icon: CalendarDays, change: '+5%', changeType: 'increase', line: 2, visible: true },
  { id: 'exames-vencidos', name: 'Exames Vencidos', value: '12', icon: AlertCircle, change: '-8%', changeType: 'decrease', line: 2, visible: true },
  { id: 'empresas-sem-exames', name: 'Empresas sem atendimento', value: '12', icon: Building2, change: 'Atenção', changeType: 'decrease', line: 2, description: 'Empresas sem exames este mês', visible: true },
];

const rankingEmpresas = [
  { name: 'TechCorp Solutions', count: 145, color: '#10b981' },
  { name: 'Global Manufacturing', count: 98, color: '#3b82f6' },
  { name: 'City Logistics', count: 76, color: '#f59e0b' },
  { name: 'Retail Giant', count: 54, color: '#8b5cf6' },
  { name: 'Health Systems', count: 32, color: '#f43f5e' },
];

const chartData = [
  { name: 'Seg', appointments: 12, revenue: 1200 },
  { name: 'Ter', appointments: 18, revenue: 1800 },
  { name: 'Qua', appointments: 15, revenue: 1500 },
  { name: 'Qui', appointments: 22, revenue: 2200 },
  { name: 'Sex', appointments: 20, revenue: 2000 },
  { name: 'Sáb', appointments: 8, revenue: 800 },
  { name: 'Dom', appointments: 2, revenue: 200 },
];

function SortableCard({ stat, isEditing, onToggleVisibility }: { stat: Stat, isEditing: boolean, onToggleVisibility: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: stat.id, disabled: !isEditing });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : stat.visible ? 1 : 0.4,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white p-6 rounded-3xl shadow-sm border border-slate-100 transition-all duration-300 overflow-hidden",
        !isEditing && "hover:shadow-md hover:border-emerald-100 cursor-pointer",
        isEditing && "ring-2 ring-slate-100"
      )}
    >
      {isEditing && (
        <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleVisibility(stat.id); }}
            className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
          >
            {stat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <div {...attributes} {...listeners} className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-400 cursor-grab active:cursor-grabbing">
            <GripVertical size={16} />
          </div>
        </div>
      )}

      <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div className={cn(
            "p-3 rounded-2xl transition-colors duration-300",
            stat.id === 'exames-vencidos' || stat.id === 'faltas-hoje' || stat.id === 'empresas-sem-exames' 
              ? "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" 
              : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
          )}>
            <stat.icon size={22} />
          </div>
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
            stat.changeType === 'increase' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {stat.change}
            {stat.changeType === 'increase' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-sm font-medium text-slate-500 mb-1">{stat.name}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            {stat.description ? (
              <span className="text-[10px] font-medium text-rose-400 italic">{stat.description}</span>
            ) : (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<Stat[]>(initialStats);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setStats((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleVisibility = (id: string) => {
    setStats(stats.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  const line1Stats = stats.filter(s => s.line === 1);
  const line2Stats = stats.filter(s => s.line === 2);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Bem-vindo de volta, aqui está o que está acontecendo hoje.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all",
            isEditing ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          )}
        >
          <Settings2 size={18} />
          {isEditing ? "Salvar Layout" : "Personalizar"}
        </button>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {/* Line 1 */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Resumo de Hoje</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SortableContext items={line1Stats.map(s => s.id)} strategy={rectSortingStrategy}>
              {line1Stats.map((stat) => (
                (stat.visible || isEditing) && (
                  <SortableCard 
                    key={stat.id} 
                    stat={stat} 
                    isEditing={isEditing} 
                    onToggleVisibility={toggleVisibility} 
                  />
                )
              ))}
            </SortableContext>
          </div>
        </div>

        {/* Line 2 */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gestão e Métricas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <SortableContext items={line2Stats.map(s => s.id)} strategy={rectSortingStrategy}>
              {line2Stats.map((stat) => (
                (stat.visible || isEditing) && (
                  <SortableCard 
                    key={stat.id} 
                    stat={stat} 
                    isEditing={isEditing} 
                    onToggleVisibility={toggleVisibility} 
                  />
                )
              ))}
            </SortableContext>
          </div>
        </div>
      </DndContext>

      {/* Line 3: Charts & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <BarChart3 size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Exames por Dia</h3>
            </div>
            <select className="text-xs font-bold text-slate-400 bg-slate-50 border-none rounded-lg px-3 py-1.5 focus:ring-0">
              <option>Últimos 7 dias</option>
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="appointments" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#059669' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ranking Empresas */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Ranking Empresas</h3>
          </div>
          
          <div className="space-y-6">
            {rankingEmpresas.map((empresa, i) => (
              <div key={empresa.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-slate-700 flex items-center gap-2">
                    <span className="text-xs text-slate-300">0{i+1}</span>
                    {empresa.name}
                  </span>
                  <span className="font-black text-slate-900">{empresa.count}</span>
                </div>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(empresa.count / rankingEmpresas[0].count) * 100}%`,
                      backgroundColor: empresa.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
            Ver Relatório Completo
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Agendamentos Recentes</h3>
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Exame</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Horário</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { employee: 'João Silva', company: 'TechCorp', exam: 'Admissional', status: 'Agendado', time: '09:00 AM' },
                { employee: 'Jane Miller', company: 'TechCorp', exam: 'Periódico', status: 'Concluído', time: '10:30 AM' },
                { employee: 'Mike Ross', company: 'Global Mfg', exam: 'Admissional', status: 'Agendado', time: '02:00 PM' },
                { employee: 'Sarah Connor', company: 'City Logistics', exam: 'Audiometria', status: 'Faltou', time: '04:15 PM' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{row.employee}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.company}</td>
                  <td className="px-6 py-4 text-slate-600">{row.exam}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      row.status === 'Concluído' ? "bg-emerald-100 text-emerald-800" :
                      row.status === 'Agendado' ? "bg-blue-100 text-blue-800" :
                      "bg-rose-100 text-rose-800"
                    )}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
