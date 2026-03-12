export const mockTenants = [
  { id: 't1', name: 'Main Street Clinic' },
  { id: 't2', name: 'Industrial Health Center' },
];

export const mockUsers = [
  { id: 'u1', name: 'Dr. Alice Smith', email: 'alice@example.com', role: 'doctor', tenantId: 't1' },
  { id: 'u2', name: 'Bob Receptionist', email: 'bob@example.com', role: 'reception', tenantId: 't1' },
  { id: 'u3', name: 'Admin User', email: 'admin@example.com', role: 'admin', tenantId: 't1' },
];

export const mockCompanies = [
  { id: 'c1', name: 'TechCorp Solutions', cnpj: '12.345.678/0001-90', tenantId: 't1' },
  { id: 'c2', name: 'Global Manufacturing', cnpj: '98.765.432/0001-10', tenantId: 't1' },
  { id: 'c3', name: 'City Logistics', cnpj: '45.678.901/0001-22', tenantId: 't1' },
];

export const mockEmployees = [
  { id: 'e1', name: 'John Doe', cpf: '123.456.789-00', companyId: 'c1' },
  { id: 'e2', name: 'Jane Miller', cpf: '234.567.890-11', companyId: 'c1' },
  { id: 'e3', name: 'Mike Ross', cpf: '345.678.901-22', companyId: 'c2' },
  { id: 'e4', name: 'Sarah Connor', cpf: '456.789.012-33', companyId: 'c3' },
];

export const mockExams = [
  { id: 'ex1', name: 'Admission Exam', price: 50, tenantId: 't1' },
  { id: 'ex2', name: 'Periodic Exam', price: 40, tenantId: 't1' },
  { id: 'ex3', name: 'Dismissal Exam', price: 50, tenantId: 't1' },
  { id: 'ex4', name: 'Audiometry', price: 30, tenantId: 't1' },
];

export const mockDoctors = [
  { id: 'd1', name: 'Dr. Alice Smith', crm: '12345-SP', specialty: 'Occupational Medicine', tenantId: 't1' },
  { id: 'd2', name: 'Dr. James Wilson', crm: '67890-SP', specialty: 'General Practitioner', tenantId: 't1' },
];

export const mockAppointments = [
  { 
    id: 'a1', 
    date: new Date().toISOString(), 
    status: 'scheduled', 
    employeeId: 'e1', 
    companyId: 'c1', 
    examId: 'ex1', 
    doctorId: 'd1' 
  },
  { 
    id: 'a2', 
    date: new Date(Date.now() + 3600000).toISOString(), 
    status: 'completed', 
    employeeId: 'e2', 
    companyId: 'c1', 
    examId: 'ex2', 
    doctorId: 'd1' 
  },
  { 
    id: 'a3', 
    date: new Date(Date.now() + 7200000).toISOString(), 
    status: 'scheduled', 
    employeeId: 'e3', 
    companyId: 'c2', 
    examId: 'ex1', 
    doctorId: 'd2' 
  },
];
