
export type UserRole = 'PATIENT' | 'PHYSICIAN' | 'ATTENDANT';
export type AppView = 'AUTH' | 'DASHBOARD' | 'PROFILE' | 'SEARCH';
// Added missing Language type
export type Language = 'pt-BR' | 'en';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Physician {
  id: string;
  name: string;
  specialty: string;
  city: string;
  plans: string[];
  avatar: string;
}

// Added missing Appointment interface
export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  whatsapp: string;
  time: string;
  physicianId: string;
  status: 'pending' | 'confirmed' | 'canceled';
}

export const MOCK_PHYSICIANS_MANAUS: Physician[] = [
  { id: 'm1', name: 'Dr. Arlindo Jr.', specialty: 'Cardiologia', city: 'Manaus', plans: ['Unimed', 'Bradesco', 'Particular'], avatar: 'https://i.pravatar.cc/150?u=arlindo' },
  { id: 'm2', name: 'Dra. Samara Lima', specialty: 'Dermatologia', city: 'Manaus', plans: ['Bradesco', 'SulAmérica', 'Particular'], avatar: 'https://i.pravatar.cc/150?u=samara' },
  { id: 'm3', name: 'Dr. Victor Quantum', specialty: 'Neurologia', city: 'Manaus', plans: ['Amil', 'Particular'], avatar: 'https://i.pravatar.cc/150?u=victor' }
];

// Added missing MOCK_PHYSICIANS export
export const MOCK_PHYSICIANS = MOCK_PHYSICIANS_MANAUS;

// Added missing MOCK_APPOINTMENTS export
export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '1', patientName: 'Maria Solimões', email: 'maria@example.com', whatsapp: '92999999999', time: '09:00', physicianId: 'm1', status: 'confirmed' },
  { id: '2', patientName: 'Francisco Rio', email: 'francisco@example.com', whatsapp: '92988888888', time: '14:00', physicianId: 'm1', status: 'pending' }
];

export const MOCK_DATA = {
  SPECIALTIES: ['Cardiologia', 'Dermatologia', 'Pediatria', 'Ortopedia', 'Ginecologia', 'Neurologia'],
  PLANS: ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Particular'],
  CITIES: ['Manaus', 'São Paulo', 'Rio de Janeiro']
};

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  read: boolean;
  createdAt: number;
}

// Added missing CONSTANTS export with required image URLs and links
export const CONSTANTS = {
  HERO_IMAGE: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070',
  P1_IMAGE: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070',
  P2_IMAGE: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=2070',
  P3_IMAGE: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
  TEST1_IMAGE: 'https://i.pravatar.cc/150?u=doc1',
  TEST2_IMAGE: 'https://i.pravatar.cc/150?u=doc2',
  QR_CODE_URL: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://acheimed.com.br',
  LINK_APP: 'https://apps.apple.com',
  LINK_DEMO: '#demo',
  LINK_WHATS: 'https://wa.me/5592999999999',
  PRIV_URL: '#privacy',
  TERMS_URL: '#terms'
};
