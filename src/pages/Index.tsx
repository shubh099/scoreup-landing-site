
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SavingsCalculator from "@/components/SavingsCalculator";
import TrustSection from "@/components/TrustSection";
import OfferSection from "@/components/OfferSection";
import UserReviewsSection from "@/components/UserReviewsSection";
import FAQSection from "@/components/FAQSection";
import MobileCTA from "@/components/MobileCTA";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <SavingsCalculator />
        <TrustSection />
        <OfferSection />
        <UserReviewsSection />
        <FAQSection />
      </main>

      <Footer />
      
      {/* Mobile sticky CTA */}
      <MobileCTA />
      
      {/* Bottom padding for mobile to account for sticky CTA */}
      <div className="md:hidden h-20"></div>
    </div>
  );
};

export default Index;
