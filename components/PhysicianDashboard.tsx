
import React, { useEffect, useRef } from 'react';
import { User, Notification } from '../types';

interface PhysicianDashboardProps {
  user: User;
  addNotification: (n: Notification) => void;
}

const PhysicianDashboard: React.FC<PhysicianDashboardProps> = ({ user, addNotification }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChart = () => {
      if (chartRef.current && (window as any).echarts) {
        const chart = (window as any).echarts.init(chartRef.current);
        chart.setOption({
          animationDuration: 1200,
          grid: { top: 20, right: 20, bottom: 40, left: 40 },
          xAxis: { type: 'category', data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'] },
          yAxis: { type: 'value' },
          series: [{
            data: [8, 15, 12, 18, 14, 6],
            type: 'line',
            smooth: true,
            color: '#0D9488',
            areaStyle: {
              color: {
                type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{ offset: 0, color: '#99F6E4' }, { offset: 1, color: '#FFFFFF' }]
              }
            }
          }]
        });
        
        const handleResize = () => chart.resize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    };

    // Pequeno delay para garantir que o container do gráfico tenha dimensões
    const timer = setTimeout(initChart, 300);
    return () => clearTimeout(timer);
  }, []);

  const appointments = [
    { id: '1', patient: 'Maria Solimões', time: '09:00', type: 'Consulta', status: 'CONFIRMED', plan: 'Unimed Manaus' },
    { id: '2', patient: 'Thiago Amazon', time: '10:30', type: 'Retorno', status: 'WAITING', plan: 'Particular' },
    { id: '3', patient: 'Francisco Rio', time: '14:00', type: 'Exame', status: 'CONFIRMED', plan: 'Bradesco' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Olá, {user.name}</h1>
          <p className="text-slate-500 font-medium">Gestão da Clínica Manaus Centro.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            Relatórios
          </button>
          <button className="px-6 py-3 rounded-2xl neo-gradient text-sm font-bold text-white shadow-lg shadow-babyBlue/40">
            Abrir Agenda
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Hoje', val: '15', icon: '📅', color: 'bg-babyBlue' },
              { label: 'Esperando', val: '3', icon: '🕒', color: 'bg-aqua' },
              { label: 'Cancelados', val: '0', icon: '❌', color: 'bg-red-50' },
              { label: 'Faturamento', val: 'R$ 1.8k', icon: '💰', color: 'bg-green-50' },
            ].map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{s.icon}</div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{s.label}</p>
                <p className="text-2xl font-display font-bold text-slate-900">{s.val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-display font-bold mb-6 text-slate-900">Demanda Semanal (Manaus)</h3>
            <div ref={chartRef} className="h-64 w-full"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-aqua/20 rounded-full blur-3xl"></div>
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
              Lista de Espera Ativa
            </h3>
            <div className="space-y-4">
              {[
                { name: 'João Batista', delay: '1 dia' },
                { name: 'Carla Nunes', delay: '3 dias' }
              ].map((w, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-sm">{w.name}</p>
                    <p className="text-[10px] text-white/60 uppercase font-black tracking-widest">Aguardando {w.delay}</p>
                  </div>
                  <button className="text-[10px] font-black uppercase text-aqua bg-aqua/10 px-3 py-1.5 rounded-lg">Encaixar</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h2 className="text-xl font-display font-bold text-slate-900">Pacientes Agendados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="px-8 py-5">Horário</th>
                <th className="px-8 py-5">Paciente</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6 font-display font-bold text-lg text-slate-900">{app.time}</td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-slate-800">{app.patient}</p>
                    <p className="text-xs text-slate-400">{app.plan}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${app.status === 'CONFIRMED' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-600 border-yellow-100'}`}>
                      {app.status === 'CONFIRMED' ? 'Confirmado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-deepAqua font-bold text-xs hover:underline">Iniciar Consulta</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PhysicianDashboard;
