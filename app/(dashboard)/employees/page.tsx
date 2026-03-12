'use client';

import React from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Building2, 
  History, 
  MoreVertical,
  ChevronRight,
  FileText,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const allEmployees = [
  { id: '1', name: 'John Doe', cpf: '123.456.789-00', company: 'TechCorp Solutions', status: 'active', lastExam: '2024-02-15', nextExam: '2025-02-15' },
  { id: '2', name: 'Jane Miller', cpf: '234.567.890-11', company: 'TechCorp Solutions', status: 'active', lastExam: '2024-03-01', nextExam: '2025-03-01' },
  { id: '3', name: 'Mike Ross', cpf: '345.678.901-22', company: 'Global Manufacturing', status: 'inactive', lastExam: '2023-11-20', nextExam: '-' },
  { id: '4', name: 'Sarah Connor', cpf: '456.789.012-33', company: 'City Logistics', status: 'active', lastExam: '2024-01-10', nextExam: '2025-01-10' },
  { id: '5', name: 'Arthur Dent', cpf: '567.890.123-44', company: 'TechCorp Solutions', status: 'active', lastExam: '2024-02-20', nextExam: '2025-02-20' },
  { id: '6', name: 'Ford Prefect', cpf: '678.901.234-55', company: 'Global Manufacturing', status: 'active', lastExam: '2024-03-05', nextExam: '2025-03-05' },
  { id: '7', name: 'Tricia McMillan', cpf: '789.012.345-66', company: 'City Logistics', status: 'active', lastExam: '2024-01-25', nextExam: '2025-01-25' },
  { id: '8', name: 'Zaphod Beeblebrox', cpf: '890.123.456-77', company: 'TechCorp Solutions', status: 'inactive', lastExam: '2023-12-15', nextExam: '-' },
  { id: '9', name: 'Marvin Android', cpf: '901.234.567-88', company: 'Global Manufacturing', status: 'active', lastExam: '2024-02-10', nextExam: '2025-02-10' },
  { id: '10', name: 'Slartibartfast', cpf: '012.345.678-99', company: 'City Logistics', status: 'active', lastExam: '2024-03-12', nextExam: '2025-03-12' },
  { id: '11', name: 'Alice Smith', cpf: '111.222.333-44', company: 'TechCorp Solutions', status: 'active', lastExam: '2024-02-18', nextExam: '2025-02-18' },
  { id: '12', name: 'Bob Johnson', cpf: '222.333.444-55', company: 'Global Manufacturing', status: 'active', lastExam: '2024-03-08', nextExam: '2025-03-08' },
];

export default function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(allEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = allEmployees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Funcionários</h1>
          <p className="text-slate-500">Gerencie e acompanhe o histórico de saúde ocupacional dos funcionários.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <Plus size={20} />
          Cadastrar Funcionário
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Cadastrar Funcionário</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="Ex: João da Silva" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">CPF</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="000.000.000-00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Empresa</label>
                <select className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm">
                  <option>Selecione uma empresa</option>
                  <option>TechCorp Solutions</option>
                  <option>Global Manufacturing</option>
                  <option>City Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Cargo</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm" placeholder="Ex: Analista de Sistemas" />
              </div>
              <button type="submit" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-colors mt-4">
                Salvar Funcionário
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome ou CPF..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors text-sm font-medium">
            <Building2 size={18} />
            Todas as Empresas
          </button>
          <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Funcionário</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Último Exame</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Próximo Vencimento</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{employee.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{employee.cpf}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 flex items-center gap-1.5">
                      <Building2 size={14} className="text-slate-400" />
                      {employee.company}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      employee.status === 'active' ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-800"
                    )}>
                      {employee.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{employee.lastExam}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className={cn(
                      employee.nextExam !== '-' && new Date(employee.nextExam) < new Date() ? "text-rose-600 font-medium" : ""
                    )}>
                      {employee.nextExam}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="Ver Histórico">
                        <History size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Relatório de Exame">
                        <FileText size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-semibold text-slate-900">{startIndex + 1}</span> a <span className="font-semibold text-slate-900">{Math.min(startIndex + itemsPerPage, allEmployees.length)}</span> de <span className="font-semibold text-slate-900">{allEmployees.length}</span> funcionários
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              Anterior
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "w-8 h-8 text-sm font-medium rounded-md transition-all",
                    currentPage === page 
                      ? "bg-emerald-600 text-white shadow-sm" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
