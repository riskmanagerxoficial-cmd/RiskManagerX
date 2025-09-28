import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Loader2, ServerCrash } from 'lucide-react';
import { JournalProvider, useJournal } from '../../contexts/JournalContext';
import { Header } from '../layout/Header';
import { AppFooter } from '../layout/AppFooter';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { AddTradeModal } from '../journal/AddTradeModal';
import { StatsGrid } from '../journal/StatsGrid';
import { ChartsSection } from '../journal/ChartsSection';
import { TradesTable } from '../journal/TradesTable';

const JournalContent: React.FC = () => {
  const { trades, stats, equityCurve, loading, error, addTrade } = useJournal();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-dark-muted h-96">
          <Loader2 className="w-12 h-12 animate-spin mb-4 text-neon-cyan" />
          <p>Carregando seu diário de operações...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-red-400 h-96">
          <ServerCrash className="w-12 h-12 mb-4" />
          <p>{error}</p>
        </div>
      );
    }

    if (trades.length === 0) {
      return (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold text-dark-text mb-4">Seu diário está vazio</h3>
          <p className="text-dark-muted mb-6">Comece a registrar suas operações para analisar seu desempenho.</p>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="w-5 h-5 mr-2" />
            Registrar Primeira Operação
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <StatsGrid stats={stats} />
        <ChartsSection equityCurve={equityCurve} stats={stats} />
        <Card glow="none">
          <TradesTable trades={trades} />
        </Card>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent">
                Diário de Trading
              </h1>
              <p className="text-dark-muted text-lg mt-2">
                Registre, analise e aprimore seu desempenho.
              </p>
            </div>
            {trades.length > 0 && (
              <Button onClick={() => setIsModalOpen(true)}>
                <PlusCircle className="w-5 h-5 mr-2" />
                Adicionar Operação
              </Button>
            )}
          </div>
          {renderBody()}
        </motion.div>
      </div>
      <AddTradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTrade={addTrade}
      />
    </>
  );
};

export const TradingJournalPage: React.FC = () => {
  return (
    <JournalProvider>
      <div className="min-h-screen bg-dark-bg flex flex-col">
        <Header />
        <main className="flex-grow">
          <JournalContent />
        </main>
        <AppFooter />
      </div>
    </JournalProvider>
  );
};
