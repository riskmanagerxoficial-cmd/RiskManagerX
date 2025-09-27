import React from 'react';
import { GenericPageLayout } from './GenericPageLayout';

export const TermsOfServicePage: React.FC = () => {
  return (
    <GenericPageLayout title="Termos de Serviço">
      <p>Última atualização: [Data]</p>
      <p>Ao acessar e usar o RiskManagerX, você concorda em cumprir e estar sujeito a estes Termos de Serviço.</p>
      
      <h2>1. Uso do Serviço</h2>
      <p>O RiskManagerX fornece uma ferramenta para cálculo e simulação de risco em operações de trading. As informações fornecidas são para fins educacionais e informativos e não constituem aconselhamento de investimento. Você é o único responsável por suas decisões de trading.</p>
      
      <h2>2. Contas de Usuário</h2>
      <p>Você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram sob sua conta.</p>
      
      <h2>3. Isenção de Responsabilidade</h2>
      <p>O trading envolve riscos significativos e não é adequado para todos os investidores. O RiskManagerX não garante a precisão das informações e não será responsável por quaisquer perdas ou danos resultantes do uso de nossa plataforma.</p>
      
      <h2>4. Modificações no Serviço</h2>
      <p>Reservamo-nos o direito de modificar ou descontinuar o serviço a qualquer momento, sem aviso prévio. Não seremos responsáveis por qualquer modificação, suspensão ou descontinuação do serviço.</p>
      
      <p>Ao usar nosso serviço, você reconhece que leu, entendeu e concorda em estar vinculado a estes Termos.</p>
    </GenericPageLayout>
  );
};
