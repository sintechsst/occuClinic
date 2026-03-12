'use client';

import React from 'react';
import { 
  ClipboardList, 
  Plus, 
  Search, 
  DollarSign, 
  Clock, 
  MoreVertical,
  Edit2,
  Trash2
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const exams = [
  { id: '1', name: 'Exame Admissional', description: 'Exame de saúde ocupacional padrão para novos contratados.', price: 50, duration: '20 min' },
  { id: '2', name: 'Exame Periódico', description: 'Check-up de rotina para funcionários atuais.', price: 40, duration: '15 min' },
  { id: '3', name: 'Exame Demissional', description: 'Exame final de saúde ocupacional após o desligamento.', price: 50, duration: '20 min' },
  { id: '4', name: 'Audiometria', description: 'Teste de audição para funcionários em ambientes ruidosos.', price: 30, duration: '10 min' },
  { id: '5', name: 'Triagem de Visão', description: 'Teste básico de visão para trabalhadores de escritório e campo.', price: 25, duration: '10 min' },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Exames</h1>
          <p className="text-slate-500">Configure e gerencie os exames ocupacionais disponíveis.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          <Plus size={20} />
          Adicionar Novo Exame
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar exames..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-200 transition-all group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <ClipboardList size={24} />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                  <Edit2 size={16} />
                </button>
                <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">{exam.name}</h3>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{exam.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2 text-slate-600">
                <DollarSign size={16} className="text-emerald-500" />
                <span className="font-bold text-slate-900">{formatCurrency(exam.price)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Clock size={16} />
                {exam.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
