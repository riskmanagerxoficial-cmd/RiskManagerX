import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HeroSection } from './HeroSection'
import { BenefitsSection } from './BenefitsSection'
import { HowItWorksSection } from './HowItWorksSection'
import { ComparisonSection } from './ComparisonSection'
import { PricingSection } from './PricingSection'
import { TestimonialsSection } from './TestimonialsSection'
import { FinalCTASection } from './FinalCTASection'
import { Footer } from './Footer'
import { LandingHeader } from './LandingHeader'

export const LandingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      const element = document.getElementById(targetId);
      if (element) {
        // Timeout to ensure the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clean up the state to prevent re-scrolling on hot-reloads
          navigate(location.pathname, { replace: true, state: null });
        }, 100);
      }
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden">
      <LandingHeader />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <ComparisonSection />
      <PricingSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </div>
  )
}
