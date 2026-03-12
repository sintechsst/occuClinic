import { 
  mockCompanies, 
  mockEmployees, 
  mockExams, 
  mockDoctors, 
  mockAppointments 
} from './mockData';

export const companyService = {
  getAll: async () => mockCompanies,
  getById: async (id: string) => mockCompanies.find(c => c.id === id),
};

export const employeeService = {
  getAll: async () => mockEmployees,
  getByCompany: async (companyId: string) => mockEmployees.filter(e => e.companyId === companyId),
};

export const examService = {
  getAll: async () => mockExams,
};

export const doctorService = {
  getAll: async () => mockDoctors,
};

export const appointmentService = {
  getAll: async () => mockAppointments.map(a => ({
    ...a,
    employee: mockEmployees.find(e => e.id === a.employeeId),
    company: mockCompanies.find(c => c.id === a.companyId),
    exam: mockExams.find(ex => ex.id === a.examId),
    doctor: mockDoctors.find(d => d.id === a.doctorId),
  })),
};
