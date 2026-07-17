import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, MousePointerClick, Users, FileText } from 'lucide-react';
import { AppClient } from '../types'; // Adjust based on where it's defined

const COLORS = ['#1f2937', '#FF7A00'];

export const AdminDashboard = ({ clients }: { clients: any[] }) => {
  const [analytics, setAnalytics] = useState<{ pageViews: any[], leads: any[] }>({ pageViews: [], leads: [] });
  
  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.pageViews) {
          setAnalytics(data);
        }
      })
      .catch(console.error);
  }, []);

  const totalAcessos = analytics.pageViews.length;
  const totalLeads = analytics.leads.length;
  const activeClients = clients.filter(c => c.active).length;

  // Process data for charts
  const viewsByDate = analytics.pageViews.reduce((acc: any, view: any) => {
    const date = new Date(view.timestamp).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit' });
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = Object.keys(viewsByDate).map(date => ({
    name: date,
    acessos: viewsByDate[date]
  }));

  if (lineChartData.length === 0) {
    lineChartData.push({ name: 'Hoje', acessos: 0 });
  }

  const pieData = [
    { name: 'Orgânico', value: totalAcessos > 0 ? 100 : 0 },
    { name: 'Ads', value: 0 }, // Without ad tracking, default to 0
  ];

  // Group by page path
  const pagesDataMap = analytics.pageViews.reduce((acc: any, view: any) => {
    acc[view.path] = (acc[view.path] || 0) + 1;
    return acc;
  }, {});

  const pagesData = Object.keys(pagesDataMap).map(path => ({
    name: path,
    acessos: pagesDataMap[path],
    leads: 0,
    status: 'Ativo'
  }));

  if (pagesData.length === 0) {
    pagesData.push({ name: 'Nenhuma página acessada ainda', acessos: 0, leads: 0, status: '-' });
  }

  return (
    <div className="space-y-6 animate-fade-in text-white w-full max-w-7xl mx-auto">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Receita Estimada */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-white/60 text-xs">Receita Estimada (Fictícia)</span>
            <div className="bg-[#FF7A00]/10 p-2 rounded-lg">
              <DollarSign className="w-4 h-4 text-[#FF7A00]" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-bold">R$ 0</h3>
            <p className="text-[10px] text-[#FF7A00] font-mono mt-1">~ Sem faturamento registrado</p>
          </div>
        </div>

        {/* Acessos nas Páginas */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-white/60 text-xs">Acessos nas Páginas</span>
            <div className="bg-[#FF7A00]/10 p-2 rounded-lg">
              <MousePointerClick className="w-4 h-4 text-[#FF7A00]" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-bold">{totalAcessos}</h3>
            <p className="text-[10px] text-[#FF7A00] font-mono mt-1">↗ Tempo real</p>
          </div>
        </div>

        {/* Novos Leads */}
        <div className="bg-[#0a0a0c] border border-[#FF7A00]/20 rounded-2xl p-5 flex flex-col justify-between h-32 relative overflow-hidden"
             style={{ boxShadow: '0 -10px 30px -15px rgba(255,122,0,0.2) inset' }}>
          <div className="flex justify-between items-start z-10">
            <span className="text-white/60 text-xs">Novos Leads</span>
            <div className="bg-[#FF7A00]/10 p-2 rounded-lg">
              <Users className="w-4 h-4 text-[#FF7A00]" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-bold">{totalLeads}</h3>
            <p className="text-[10px] text-[#FF7A00] font-mono mt-1">↗ Monitoramento ao vivo</p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-1 bg-gradient-to-l from-[#FF7A00] to-transparent"></div>
        </div>

        {/* Contratos Ativos */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <span className="text-white/60 text-xs">Clientes Ativos</span>
            <div className="bg-[#FF7A00]/10 p-2 rounded-lg">
              <FileText className="w-4 h-4 text-[#FF7A00]" />
            </div>
          </div>
          <div className="z-10">
            <h3 className="text-2xl font-bold">{activeClients}</h3>
            <p className="text-[10px] text-[#FF7A00] font-mono mt-1">✓ {clients.length} clientes total</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold">Dinâmica de Acessos</h3>
            <select className="bg-transparent border border-white/10 rounded-md text-xs text-white/70 px-2 py-1 outline-none">
              <option>Últimos 30 dias</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={{stroke: '#ffffff20'}} tickCount={5} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111116', borderColor: '#ffffff10', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#FF7A00' }}
                />
                <Line type="monotone" dataKey="acessos" stroke="#FF7A00" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#FF7A00', stroke: '#0a0a0c', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-sm font-bold mb-4">Origem dos Acessos</h3>
          <div className="flex-1 relative flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111116', borderColor: '#ffffff10', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#FF7A00' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-white">{totalAcessos}</span>
              <span className="text-[8px] text-white/40 tracking-widest font-mono">TOTAL</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
            <div className="text-center w-1/2 border-r border-white/5">
              <div className="text-sm font-bold text-white">{totalAcessos > 0 ? 100 : 0}%</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Orgânico</div>
            </div>
            <div className="text-center w-1/2">
              <div className="text-sm font-bold text-white">0%</div>
              <div className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Ads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold">Páginas em Monitoramento</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="pb-4 text-[10px] font-mono uppercase tracking-widest text-white/40 font-normal">Nome da Página</th>
                <th className="pb-4 text-[10px] font-mono uppercase tracking-widest text-white/40 font-normal text-right">Acessos</th>
                <th className="pb-4 text-[10px] font-mono uppercase tracking-widest text-white/40 font-normal text-right">Leads</th>
                <th className="pb-4 text-[10px] font-mono uppercase tracking-widest text-white/40 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {pagesData.map((page, idx) => (
                <tr key={idx} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 text-sm font-medium">{page.name}</td>
                  <td className="py-4 text-sm text-right">{page.acessos}</td>
                  <td className="py-4 text-sm text-[#FF7A00] text-right">{page.leads}</td>
                  <td className="py-4 text-right">
                    <span className="inline-block px-3 py-1 bg-[#FF7A00]/10 text-[#FF7A00] text-[10px] font-bold rounded-md">
                      {page.status}
                    </span>
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
