import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Percent, Target, FileDown, Printer, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';
import { Link } from 'react-router-dom';

import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { AppFooter } from '../layout/AppFooter';
import { Header } from '../layout/Header';

interface ProjectionData {
  day: number;
  initialBalance: number;
  dailyProfit: number;
  finalBalance: number;
  growthPercentage: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export const GrowthSimulatorPage: React.FC = () => {
  const [initialCapital, setInitialCapital] = useState(1000);
  const [avgProfitPerTrade, setAvgProfitPerTrade] = useState(20);
  const [tradesPerDay, setTradesPerDay] = useState(2);
  const [projectionDays, setProjectionDays] = useState(30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projectionData = useMemo<ProjectionData[]>(() => {
    const data: ProjectionData[] = [];
    if (initialCapital <= 0 || projectionDays <= 0 || avgProfitPerTrade <= 0 || tradesPerDay <= 0) {
      return data;
    }

    const initialDailyProfit = avgProfitPerTrade * tradesPerDay;
    const dailyGrowthRate = initialDailyProfit / initialCapital;

    let currentBalance = initialCapital;

    for (let i = 1; i <= projectionDays; i++) {
      const initialDayBalance = currentBalance;
      
      const dailyProfit = initialDayBalance * dailyGrowthRate;
      
      const finalDayBalance = initialDayBalance + dailyProfit;
      const growthPercentage = (dailyProfit / initialDayBalance) * 100;

      data.push({
        day: i,
        initialBalance: initialDayBalance,
        dailyProfit: dailyProfit,
        finalBalance: finalDayBalance,
        growthPercentage: growthPercentage,
      });

      currentBalance = finalDayBalance;
    }

    return data;
  }, [initialCapital, avgProfitPerTrade, tradesPerDay, projectionDays]);

  const finalResults = useMemo(() => {
    if (projectionData.length === 0) {
      return { finalBalance: 0, totalProfit: 0, totalGrowth: 0 };
    }
    const lastDay = projectionData[projectionData.length - 1];
    const totalProfit = lastDay.finalBalance - initialCapital;
    const totalGrowth = initialCapital > 0 ? (totalProfit / initialCapital) * 100 : 0;
    return {
      finalBalance: lastDay.finalBalance,
      totalProfit,
      totalGrowth,
    };
  }, [projectionData, initialCapital]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Simulador de Crescimento - Resultados', 14, 16);
    (doc as any).autoTable({
      head: [['Dia', 'Saldo Inicial', 'Lucro Diário', 'Saldo Final', 'Crescimento (%)']],
      body: projectionData.map(d => [
        d.day,
        formatCurrency(d.initialBalance),
        formatCurrency(d.dailyProfit),
        formatCurrency(d.finalBalance),
        `${d.growthPercentage.toFixed(2)}%`
      ]),
      startY: 20,
    });
    doc.save('simulacao_crescimento.pdf');
  };

  const handleExportExcel = () => {
    const ws = utils.json_to_sheet(projectionData.map(d => ({
      'Dia': d.day,
      'Saldo Inicial (USD)': d.initialBalance,
      'Lucro Diário (USD)': d.dailyProfit,
      'Saldo Final (USD)': d.finalBalance,
      'Crescimento (%)': d.growthPercentage,
    })));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Simulação');
    writeFile(wb, 'simulacao_crescimento.xlsx');
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-dark-muted hover:text-gold-light">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gold-light via-gold-main to-gold-dark bg-clip-text text-transparent">
              Simulador de Crescimento Composto
            </h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto mt-4">
              Visualize o poder do juro composto diário e projete o crescimento potencial do seu capital de trading.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <Card glow="none" className="border-gold-dark/30 hover:border-gold-main/60 hover:shadow-glow-gold h-full">
                <h2 className="text-xl font-semibold text-gold-light mb-6">Parâmetros da Simulação</h2>
                <div className="space-y-6">
                  <Input label="Capital Inicial (USD)" type="number" value={initialCapital} onChange={e => setInitialCapital(Number(e.target.value))} className="bg-dark-bg border-gold-dark/50 focus:border-gold-main focus:ring-gold-main/50" />
                  <Input label="Lucro Médio por Operação (USD)" type="number" value={avgProfitPerTrade} onChange={e => setAvgProfitPerTrade(Number(e.target.value))} className="bg-dark-bg border-gold-dark/50 focus:border-gold-main focus:ring-gold-main/50" />
                  <Input label="Operações por Dia" type="number" value={tradesPerDay} onChange={e => setTradesPerDay(Number(e.target.value))} className="bg-dark-bg border-gold-dark/50 focus:border-gold-main focus:ring-gold-main/50" />
                  <Input label="Dias de Projeção" type="number" value={projectionDays} onChange={e => setProjectionDays(Number(e.target.value))} className="bg-dark-bg border-gold-dark/50 focus:border-gold-main focus:ring-gold-main/50" />
                </div>
              </Card>
            </motion.div>

            {/* Chart & Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card glow="none" className="border-gold-dark/30 hover:border-gold-main/60 hover:shadow-glow-gold h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gold-light">Projeção de Crescimento</h2>
                    <p className="text-sm text-dark-muted">Curva de balanço ao longo de {projectionDays} dias</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleExportPDF} variant="ghost" size="sm" className="text-gold-light hover:bg-gold-dark/20"><Printer className="w-4 h-4" /></Button>
                    <Button onClick={handleExportExcel} variant="ghost" size="sm" className="text-gold-light hover:bg-gold-dark/20"><FileDown className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="h-64 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
                      <XAxis dataKey="day" stroke="#666666" tick={{ fill: '#666666', fontSize: 12 }} />
                      <YAxis stroke="#666666" tickFormatter={(value) => formatCurrency(value as number)} tick={{ fill: '#666666', fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#111111', border: '1px solid #b8860b', color: '#ffffff' }}
                        labelStyle={{ color: '#fde68a' }}
                        formatter={(value: number) => [formatCurrency(value), 'Saldo']}
                      />
                      <Legend wrapperStyle={{ color: '#ffffff' }} />
                      <Line type="monotone" dataKey="finalBalance" name="Saldo" stroke="#d4af37" strokeWidth={2} dot={{ r: 2, fill: '#d4af37' }} activeDot={{ r: 6, fill: '#fde68a' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-dark-bg p-4 rounded-lg border border-gold-dark/30">
                    <Target className="mx-auto w-6 h-6 text-gold-main mb-2" />
                    <p className="text-sm text-dark-muted">Saldo Final</p>
                    <p className="text-lg font-bold text-gold-light font-mono">{formatCurrency(finalResults.finalBalance)}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-lg border border-gold-dark/30">
                    <DollarSign className="mx-auto w-6 h-6 text-gold-main mb-2" />
                    <p className="text-sm text-dark-muted">Lucro Total</p>
                    <p className="text-lg font-bold text-gold-light font-mono">{formatCurrency(finalResults.totalProfit)}</p>
                  </div>
                  <div className="bg-dark-bg p-4 rounded-lg border border-gold-dark/30">
                    <Percent className="mx-auto w-6 h-6 text-gold-main mb-2" />
                    <p className="text-sm text-dark-muted">Crescimento Total</p>
                    <p className="text-lg font-bold text-gold-light font-mono">{finalResults.totalGrowth.toFixed(2)}%</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card glow="none" className="border-gold-dark/30">
              <h2 className="text-xl font-semibold text-gold-light mb-4">Detalhes da Projeção Diária</h2>
              <div className="max-h-96 overflow-y-auto relative">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gold-light uppercase bg-dark-bg sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3">Dia</th>
                      <th scope="col" className="px-6 py-3">Saldo Inicial</th>
                      <th scope="col" className="px-6 py-3">Lucro Diário</th>
                      <th scope="col" className="px-6 py-3">Saldo Final</th>
                      <th scope="col" className="px-6 py-3">Crescimento</th>
                    </tr>
                  </thead>
                  <tbody className="text-dark-text">
                    {projectionData.map((d) => (
                      <tr key={d.day} className="border-b border-gold-dark/20 hover:bg-gold-dark/10">
                        <td className="px-6 py-4 font-medium">{d.day}</td>
                        <td className="px-6 py-4 font-mono text-dark-muted">{formatCurrency(d.initialBalance)}</td>
                        <td className="px-6 py-4 font-mono text-green-400">{formatCurrency(d.dailyProfit)}</td>
                        <td className="px-6 py-4 font-mono font-bold text-gold-light">{formatCurrency(d.finalBalance)}</td>
                        <td className="px-6 py-4 font-mono text-dark-muted">{d.growthPercentage.toFixed(2)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {projectionData.length === 0 && (
                  <div className="text-center py-8 text-dark-muted">
                    Nenhum dado para exibir. Por favor, insira valores válidos nos parâmetros.
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
};
