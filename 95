import React from 'react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/Card';
import { JournalStats } from '../../contexts/JournalContext';

interface ChartsSectionProps {
  equityCurve: { day: string; balance: number }[];
  stats: JournalStats;
}

const COLORS = ['#00C49F', '#FF8042', '#0088FE', '#FFBB28', '#AF19FF'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card/80 backdrop-blur-sm border border-dark-border p-3 rounded-lg">
        <p className="label text-neon-cyan">{`Data: ${label}`}</p>
        <p className="intro text-dark-text">{`Saldo: ${payload[0].value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</p>
      </div>
    );
  }
  return null;
};

export const ChartsSection: React.FC<ChartsSectionProps> = ({ equityCurve, stats }) => {
  const winLossData = [
    { name: 'Lucro', count: stats.totalWins, fill: '#22c55e' },
    { name: 'Prejuízo', count: stats.totalLosses, fill: '#ef4444' },
  ];

  const winrateByAssetData = Object.entries(stats.winrateByAsset).map(([asset, data]) => ({
    name: asset,
    value: data.winrate,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3">
        <Card glow="cyan" className="h-full">
          <h3 className="text-lg font-semibold text-dark-text mb-4">Curva de Capital</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equityCurve}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
                <XAxis dataKey="day" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} tickFormatter={(val) => `$${Number(val).toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="balance" stroke="#00ffff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        <Card glow="blue" className="h-full">
          <h3 className="text-lg font-semibold text-dark-text mb-4">Ganhos vs. Perdas</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={winLossData} layout="vertical">
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#666" fontSize={12} width={60} />
                <Tooltip cursor={{ fill: 'rgba(0, 128, 255, 0.1)' }} contentStyle={{ backgroundColor: '#111', border: '1px solid #0080ff' }} />
                <Bar dataKey="count" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card glow="purple" className="h-full">
          <h3 className="text-lg font-semibold text-dark-text mb-4">Winrate por Ativo</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={winrateByAssetData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {winrateByAssetData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #8000ff' }} formatter={(value) => `${Number(value).toFixed(2)}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
