import EnhancedNavbar from "@/components/enhanced-navbar"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import PortfolioSection from "@/components/portfolio-section"
import ContactSection from "@/components/contact-section"
import StatsSection from "@/components/stats-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import CursorEffects from "@/components/cursor-effects"
import PageTransition from "@/components/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <CustomCursor />
        <CursorEffects />
        <EnhancedNavbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <PortfolioSection />
        <TestimonialsSection /> 
        <ContactSection />
        <Footer />
      </main>
    </PageTransition>
  )
}

