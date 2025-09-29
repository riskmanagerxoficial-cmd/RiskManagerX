import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingDown, Shield, AlertCircle, Activity, Target, BarChart2, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatsCard } from './StatsCard';
import { RiskCalculator } from './RiskCalculator';
import { DashboardProvider, useDashboard } from '../../contexts/DashboardContext';
import { ScenarioSimulatorModal } from './modals/ScenarioSimulatorModal';
import { IdealLotCalculatorModal } from './modals/IdealLotCalculatorModal';
import { HistoryModal } from './modals/HistoryModal';

type ModalType = 'scenario' | 'lot-calculator' | 'history' | null;

const DashboardContent: React.FC = () => {
  const { formData, calculation } = useDashboard();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent"
            >
              Dashboard de Risco
            </motion.h1>
            <p className="text-dark-muted text-lg max-w-2xl mx-auto">
              Monitore seu risco em tempo real e tome decisões inteligentes no trading de XAU/USD, Forex e CFDs
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Saldo da Conta"
              value={formatCurrency(formData.accountBalance)}
              prefix="$"
              icon={Wallet}
              glow="cyan"
            />
            
            <StatsCard
              title="Margem Usada"
              value={formatCurrency(calculation.marginRequired)}
              prefix="$"
              subtitle={`${calculation.riskPercentage.toFixed(2)}% do saldo`}
              icon={TrendingDown}
              trend="neutral"
              glow="blue"
            />
            
            <StatsCard
              title="Margem Livre"
              value={formatCurrency(calculation.freeMargin)}
              prefix="$"
              subtitle={`${formData.accountBalance > 0 ? (calculation.freeMargin / formData.accountBalance * 100).toFixed(0) : 0}% disponível`}
              icon={Shield}
              trend="up"
              glow="purple"
            />
            
            <StatsCard
              title="Nível de Margem"
              value={calculation.marginLevel.toFixed(2)}
              suffix="%"
              subtitle={calculation.marginLevel > 100 ? "Zona segura" : "Zona de risco"}
              icon={Activity}
              trend={calculation.marginLevel > 100 ? "up" : "down"}
              glow="cyan"
            />
            
            <StatsCard
              title="Stop Out em"
              value={formData.stopOutLevel.toString()}
              suffix="%"
              subtitle="Configuração da corretora"
              icon={AlertCircle}
              trend="neutral"
              glow="blue"
            />
            
            <StatsCard
              title="Risco Atual"
              value={calculation.riskPercentage.toFixed(2)}
              suffix="%"
              subtitle={calculation.riskPercentage <= 2 ? "Baixo risco" : calculation.riskPercentage <= 5 ? "Moderado" : "Alto risco"}
              icon={Target}
              trend={calculation.riskPercentage <= 2 ? "up" : "down"}
              glow="purple"
            />
          </div>

          {/* Risk Calculator */}
          <RiskCalculator />

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-neon-cyan/10 via-neon-blue/10 to-neon-purple/10 rounded-2xl p-6 border border-neon-cyan/20"
          >
            <h3 className="text-xl font-semibold text-dark-text mb-4">Ações Rápidas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <motion.button
                onClick={() => setActiveModal('scenario')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-dark-card rounded-xl border border-dark-border hover:border-neon-cyan/50 transition-all duration-200 text-left h-full"
              >
                <h4 className="font-medium text-dark-text">Simular Cenário</h4>
                <p className="text-sm text-dark-muted mt-1">Teste diferentes variações de preço</p>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveModal('lot-calculator')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-dark-card rounded-xl border border-dark-border hover:border-neon-blue/50 transition-all duration-200 text-left h-full"
              >
                <h4 className="font-medium text-dark-text">Calcular Lote Ideal</h4>
                <p className="text-sm text-dark-muted mt-1">Base no seu percentual de risco</p>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveModal('history')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-dark-card rounded-xl border border-dark-border hover:border-neon-purple/50 transition-all duration-200 text-left h-full"
              >
                <h4 className="font-medium text-dark-text">Histórico</h4>
                <p className="text-sm text-dark-muted mt-1">Ver simulações anteriores</p>
              </motion.button>

              <Link to="/journal" className="h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-dark-card rounded-xl border border-dark-border hover:border-neon-blue/50 transition-all duration-200 text-left h-full flex flex-col"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-neon-blue" />
                    <h4 className="font-medium text-dark-text">Diário de Trading</h4>
                  </div>
                  <p className="text-sm text-dark-muted mt-1 flex-grow">Analise seu desempenho.</p>
                </motion.div>
              </Link>

              <Link to="/growth-simulator" className="h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-dark-card rounded-xl border border-dark-border hover:border-gold-main/50 transition-all duration-200 text-left h-full flex flex-col"
                >
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="w-4 h-4 text-gold-main" />
                    <h4 className="font-medium text-dark-text">Simulador de Crescimento</h4>
                  </div>
                  <p className="text-sm text-dark-muted mt-1 flex-grow">Projete o poder do juro composto.</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <ScenarioSimulatorModal
        isOpen={activeModal === 'scenario'}
        onClose={() => setActiveModal(null)}
      />
      <IdealLotCalculatorModal
        isOpen={activeModal === 'lot-calculator'}
        onClose={() => setActiveModal(null)}
      />
      <HistoryModal
        isOpen={activeModal === 'history'}
        onClose={() => setActiveModal(null)}
      />
    </>
  )
}

export const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}
