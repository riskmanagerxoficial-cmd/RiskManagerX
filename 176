import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { PriceProvider } from './contexts/PriceContext'
import { LandingPage } from './components/landing/LandingPage'
import { AuthForm } from './components/auth/AuthForm'
import { Header } from './components/layout/Header'
import { Dashboard } from './components/dashboard/Dashboard'
import { AppFooter } from './components/layout/AppFooter'

// Import new pages
import { AboutPage } from './components/pages/AboutPage'
import { ContactPage } from './components/pages/ContactPage'
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage'
import { TermsOfServicePage } from './components/pages/TermsOfServicePage'
import { BlogPage } from './components/pages/BlogPage'
import { CareersPage } from './components/pages/CareersPage'
import { HelpCenterPage } from './components/pages/HelpCenterPage'
import { DocumentationPage } from './components/pages/DocumentationPage'
import { SystemStatusPage } from './components/pages/SystemStatusPage'
import { CommunityPage } from './components/pages/CommunityPage'
import { CookiesPage } from './components/pages/CookiesPage'
import { LGPDPage } from './components/pages/LGPDPage'
import { APIPage } from './components/pages/APIPage'
import { DisclaimerPage } from './components/pages/DisclaimerPage'
import { GrowthSimulatorPage } from './components/pages/GrowthSimulatorPage'
import { TradingJournalPage } from './components/pages/TradingJournalPage'

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-cyan mx-auto"></div>
          <p className="text-dark-muted">Carregando...</p>
        </div>
      </div>
    )
  }

  const DashboardLayout = (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Header />
      <main className="flex-grow">
        <Dashboard />
      </main>
      <AppFooter />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
      
      <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />} />
      
      <Route path="/dashboard" element={user ? DashboardLayout : <Navigate to="/auth" replace />} />

      <Route path="/growth-simulator" element={user ? <GrowthSimulatorPage /> : <Navigate to="/auth" replace />} />
      
      <Route path="/journal" element={user ? <TradingJournalPage /> : <Navigate to="/auth" replace />} />

      {/* Footer Pages Routes */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/help" element={<HelpCenterPage />} />
      <Route path="/docs" element={<DocumentationPage />} />
      <Route path="/status" element={<SystemStatusPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/cookies" element={<CookiesPage />} />
      <Route path="/lgpd" element={<LGPDPage />} />
      <Route path="/api-docs" element={<APIPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <PriceProvider>
            <AppContent />
          </PriceProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  )
}

export default App
