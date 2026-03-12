'use client';

import React from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  MoreVertical, 
  Users, 
  Calendar,
  ExternalLink,
  Mail,
  Phone,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const companies = [
  { 
    id: '1', 
    name: 'TechCorp Soluções', 
    cnpj: '12.345.678/0001-90', 
    employees: 156, 
    lastExam: '2024-03-10',
    email: 'rh@techcorp.com',
    phone: '(11) 5555-0123'
  },
  { 
    id: '2', 
    name: 'Manufatura Global', 
    cnpj: '98.765.432/0001-10', 
    employees: 432, 
    lastExam: '2024-03-12',
    email: 'seguranca@globalmfg.com',
    phone: '(11) 5555-0456'
  },
  { 
    id: '3', 
    name: 'Logística Urbana', 
    cnpj: '45.678.901/0001-22', 
    employees: 89, 
    lastExam: '2024-03-08',
    email: 'ops@citylog.com',
    phone: '(11) 5555-0789'
  },
];

export default function CompaniesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Empresas</h1>
          <p className="text-slate-500">Gerencie os clientes corporativos da sua clínica.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Cadastrar Empresa
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Cadastrar Empresa</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="Ex: TechCorp Soluções" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="00.000.000/0000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail de Contato</label>
                <input type="email" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="rh@empresa.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="(00) 0000-0000" />
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors mt-4">
                Salvar Empresa
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CNPJ..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500">
            <option>Todos os Status</option>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
          <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500">
            <option>Ordenar por Nome</option>
            <option>Ordenar por Funcionários</option>
            <option>Ordenar por Recentes</option>
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-emerald-200 transition-all group">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Building2 size={24} />
                </div>
                <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{company.name}</h3>
                <p className="text-sm text-slate-500 font-mono">{company.cnpj}</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Mail size={16} className="text-slate-400" />
                  {company.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Phone size={16} className="text-slate-400" />
                  {company.phone}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Funcionários</p>
                    <p className="text-sm font-semibold text-slate-900">{company.employees}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Último Exame</p>
                    <p className="text-sm font-semibold text-slate-900">{company.lastExam}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 flex items-center justify-between">
              <button className="text-sm font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1">
                Ver Funcionários
              </button>
              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                Detalhes
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
