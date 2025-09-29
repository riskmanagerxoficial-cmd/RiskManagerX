import React from 'react';
import { GenericPageLayout } from './GenericPageLayout';
import { CheckCircle } from 'lucide-react';

export const SystemStatusPage: React.FC = () => {
  return (
    <GenericPageLayout title="Status do Sistema">
      <div className="space-y-6">
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
          <span className="text-green-400 font-medium">Todos os sistemas operacionais.</span>
          <CheckCircle className="w-6 h-6 text-green-400" />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-dark-text mb-4">Status dos Componentes</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg">
              <span className="text-dark-text">Plataforma Web</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Operacional</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg">
              <span className="text-dark-text">API de Autenticação</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Operacional</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg">
              <span className="text-dark-text">Banco de Dados</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Operacional</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-dark-card rounded-lg">
              <span className="text-dark-text">API de Mercado (Externa)</span>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Operacional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GenericPageLayout>
  );
};
