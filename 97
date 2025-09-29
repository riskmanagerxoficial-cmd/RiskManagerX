import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LandingHeader } from '../landing/LandingHeader';
import { Footer } from '../landing/Footer';

interface GenericPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const GenericPageLayout: React.FC<GenericPageLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
      <LandingHeader />
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent">
              {title}
            </h1>
            <div className="prose prose-invert prose-lg max-w-none text-dark-muted space-y-6 prose-h2:text-neon-cyan prose-h3:text-neon-blue prose-a:text-neon-cyan hover:prose-a:text-neon-blue prose-strong:text-dark-text">
              {children}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
