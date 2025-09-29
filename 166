import React from 'react';
import { TrendingUp, TrendingDown, Percent, Repeat, Target, DollarSign, BarChart } from 'lucide-react';
import { StatsCard } from '../dashboard/StatsCard';
import { JournalStats } from '../../contexts/JournalContext';

interface StatsGridProps {
  stats: JournalStats;
}

const formatCurrency = (value: number) => `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      <StatsCard title="Total de Trades" value={stats.totalTrades.toString()} icon={Repeat} glow="cyan" />
      <StatsCard title="Winrate" value={`${stats.winrate.toFixed(1)}%`} icon={Percent} trend={stats.winrate >= 50 ? 'up' : 'down'} glow="blue" />
      <StatsCard title="Lucro Líquido" value={formatCurrency(stats.netProfit)} prefix={stats.netProfit < 0 ? '-' : ''} icon={DollarSign} trend={stats.netProfit >= 0 ? 'up' : 'down'} glow="purple" />
      <StatsCard title="Payoff Ratio" value={stats.payoffRatio.toFixed(2)} icon={Target} glow="cyan" />
      <StatsCard title="Drawdown Máx." value={`${stats.maxDrawdown.toFixed(2)}%`} icon={TrendingDown} trend="down" glow="blue" />
      <StatsCard title="Expectativa" value={formatCurrency(stats.expectancy)} prefix={stats.expectancy < 0 ? '-' : ''} icon={BarChart} trend={stats.expectancy >= 0 ? 'up' : 'down'} glow="purple" />
      <StatsCard title="Média P/L" value={formatCurrency(stats.avgProfitLoss)} prefix={stats.avgProfitLoss < 0 ? '-' : ''} icon={TrendingUp} trend={stats.avgProfitLoss >= 0 ? 'up' : 'down'} glow="cyan" />
    </div>
  );
};
