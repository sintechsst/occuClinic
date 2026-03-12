'use client';

import React, { useState } from 'react';
import { 
  UserRound, 
  Plus, 
  Search, 
  Shield, 
  Mail, 
  MoreVertical,
  UserCog,
  UserMinus,
  CheckCircle2,
  XCircle,
  X,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'reception';
  status: 'active' | 'inactive';
  lastLogin: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Usuário Admin', email: 'admin@clinic.com', role: 'admin', status: 'active', lastLogin: 'Há 2 horas' },
  { id: '2', name: 'Dra. Alice Smith', email: 'alice@clinic.com', role: 'doctor', status: 'active', lastLogin: 'Há 1 dia' },
  { id: '3', name: 'Bob Recepcionista', email: 'bob@clinic.com', role: 'reception', status: 'active', lastLogin: 'Há 10 min' },
  { id: '4', name: 'Charlie Temp', email: 'charlie@clinic.com', role: 'reception', status: 'inactive', lastLogin: 'Há 2 semanas' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === 'active' ? 'inactive' : 'active' };
      }
      return user;
    }));
  };

  const handleEditPermissions = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSavePermissions = (role: 'admin' | 'doctor' | 'reception') => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role } : user
      ));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Usuários</h1>
          <p className="text-slate-500">Controle o acesso e os papéis da equipe da sua clínica.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
          <Plus size={20} />
          Convidar Usuário
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar usuários..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Papel</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Último Acesso</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Mail size={12} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield size={16} className={cn(
                        user.role === 'admin' ? "text-amber-500" :
                        user.role === 'doctor' ? "text-blue-500" :
                        "text-slate-400"
                      )} />
                      <span className="text-sm font-medium text-slate-700 capitalize">
                        {user.role === 'admin' ? 'Administrador' : user.role === 'doctor' ? 'Médico' : 'Recepção'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
                      user.status === 'active' ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    )}>
                      {user.status === 'active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditPermissions(user)}
                        className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                        title="Editar Permissões"
                      >
                        <UserCog size={18} />
                      </button>
                      <button 
                        onClick={() => handleToggleStatus(user.id)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          user.status === 'active' 
                            ? "text-slate-400 hover:text-rose-600 hover:bg-rose-50" 
                            : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                        )}
                        title={user.status === 'active' ? "Desativar Usuário" : "Ativar Usuário"}
                      >
                        {user.status === 'active' ? <UserMinus size={18} /> : <UserPlus size={18} />}
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
      </div>

      {/* Edit Permissions Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Shield size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Editar Permissões</h2>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-slate-500 mb-4">
                Alterando o papel de <span className="font-bold text-slate-900">{selectedUser.name}</span>. 
                Isso afetará as funcionalidades que o usuário pode acessar.
              </p>

              <div className="space-y-3">
                {[
                  { id: 'admin', label: 'Administrador', desc: 'Acesso total a todas as configurações e relatórios.', icon: ShieldCheck },
                  { id: 'doctor', label: 'Médico', desc: 'Acesso a prontuários, agenda e exames.', icon: Shield },
                  { id: 'reception', label: 'Recepção', desc: 'Acesso a agendamentos e cadastros básicos.', icon: UserRound },
                ].map((role) => (
                  <button
                    key={role.id}
                    onClick={() => handleSavePermissions(role.id as any)}
                    className={cn(
                      "w-full flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
                      selectedUser.role === role.id 
                        ? "border-emerald-600 bg-emerald-50" 
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      selectedUser.role === role.id ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                    )}>
                      <role.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{role.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{role.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
