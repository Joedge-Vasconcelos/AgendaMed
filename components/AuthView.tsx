
import React, { useState } from 'react';
import { UserRole, User } from '../types';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess }) => {
  const [role, setRole] = useState<UserRole>('PATIENT');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const demoPersonas = {
    arlindo: {
      name: 'Dr. Arlindo Jr.',
      email: 'arlindo@acheimed.com.br',
      role: 'PHYSICIAN' as UserRole,
      avatar: 'https://i.pravatar.cc/150?u=arlindo'
    },
    thiago: {
      name: 'Thiago Amazon',
      email: 'thiago@paciente.com.br',
      role: 'PATIENT' as UserRole,
      avatar: 'https://i.pravatar.cc/150?u=thiago'
    }
  };

  const handleQuickAccess = (persona: 'arlindo' | 'thiago') => {
    setIsLoading(true);
    setTimeout(() => {
      onAuthSuccess({
        id: persona === 'arlindo' ? 'm1' : 'p1',
        ...demoPersonas[persona]
      });
      setIsLoading(false);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulação de login real com credenciais
    setTimeout(() => {
      const isManausPhysician = formData.email.includes('arlindo') || formData.email.includes('samara');
      const isManausPatient = formData.email.includes('thiago') || formData.email.includes('maria');

      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name || (isManausPhysician ? 'Dr. Arlindo Jr.' : 'Paciente Manaus'),
        email: formData.email,
        role: isManausPhysician ? 'PHYSICIAN' : 'PATIENT',
        avatar: undefined
      };
      setIsLoading(false);
      onAuthSuccess(mockUser);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-slate-50">
      <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-babyBlue/30 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-aqua/30 rounded-full blur-[120px] animate-pulse"></div>

      <div className="w-full max-w-xl glass-card rounded-[3rem] p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 neo-gradient rounded-2xl items-center justify-center text-white text-3xl font-bold shadow-xl shadow-babyBlue/40 mb-4">
            AM
          </div>
          <h1 className="text-4xl font-display font-bold text-slate-900 tracking-tight">Achei Med</h1>
          <p className="text-slate-500 font-medium mt-2">Manaus: Central de Saúde Inteligente</p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">E-mail</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="exemplo@manaus.com.br"
              className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-2">Senha</label>
            <input 
              required
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              className="w-full bg-white/50 border border-slate-100 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-aqua/20 outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full neo-gradient py-4 rounded-2xl font-bold text-white shadow-xl shadow-babyBlue/30 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            {isLoading ? <div className="loader !border-white !border-t-transparent"></div> : 'Entrar Agora'}
          </button>
        </form>

        {/* QUICK ACCESS BUTTONS (PASSWORDLESS) */}
        <div className="pt-8 border-t border-slate-100">
          <p className="text-center text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Acesso Rápido (Somente Testes)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleQuickAccess('arlindo')}
              className="group p-5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl">👨‍⚕️</div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-none">Ambiente Médico</p>
                  <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Dr. Arlindo (Manaus)</p>
                </div>
              </div>
            </button>

            <button 
              onClick={() => handleQuickAccess('thiago')}
              className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-aqua text-slate-900 transition-all shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-babyBlue/20 flex items-center justify-center text-xl">👤</div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-none">Ambiente Paciente</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Thiago (Manaus)</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Sistema de demonstração Achei Med © 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
