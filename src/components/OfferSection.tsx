import { Button } from "@/components/ui/button";
const OfferSection = () => {
  const handleCTAClick = () => {
    console.log("Offer CTA clicked - Yes! I Want My ScoreUp Plan for ₹99");
    // In a real app, this would handle payment/signup flow
  };
  const offerItems = [{
    item: "Full Multi-Bureau Credit Report",
    value: "₹400"
  }, {
    item: "Detailed Score Analysis",
    value: "Priceless"
  }, {
    item: "Error & Fake Loan Identification",
    value: "Can save you thousands"
  }, {
    item: "Personalized Action Plan",
    value: "₹1,500"
  }, {
    item: "One-on-One Expert Consultation Call",
    value: "₹2,000"
  }];
  return <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Everything You Need to Improve Your Score.{" "}
            <span className="text-accent">Today.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This comprehensive package normally costs thousands. But for our pilot program, you get everything for just ₹99.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl shadow-card border-2 border-accent/20 overflow-hidden animate-scale-in">
            {/* Offer Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Complete ScoreUp Package
              </h3>
              <p className="text-white/90">
                Everything you need to boost your credit score
              </p>
            </div>

            {/* Offer Content */}
            <div className="p-8">
              <div className="space-y-4 mb-8">
                {offerItems.map((item, index) => <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-success-foreground text-sm font-bold">✓</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground font-medium">{item.item}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        (Value: {item.value})
                      </span>
                    </div>
                  </div>)}
              </div>

              {/* Value Proposition */}
              <div className="text-center mb-8 p-6 bg-muted/50 rounded-lg">
                <p className="text-lg text-muted-foreground mb-2">Total Value:</p>
                <p className="text-3xl font-bold text-muted-foreground line-through">₹3,900</p>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">Improve your credit score at a single payment of just</p>
                  <p className="text-4xl md:text-5xl font-black text-accent">₹99</p>
                  <p className="text-sm text-muted-foreground mt-2">One-time payment • No recurring charges</p>
                </div>
              </div>

              {/* CTA Button */}
              <Button onClick={handleCTAClick} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 text-lg font-bold rounded-lg shadow-card transition-all duration-300 transform hover:scale-105">Get My Plan</Button>

              {/* Security & Guarantee */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">🔒 Secure checkout • Instant access</p>
                <p className="text-sm text-success font-medium">30-Day Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Urgency/Scarcity */}
        <div className="text-center mt-8">
          <div className="bg-accent/10 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-accent font-semibold text-sm">⚡ Limited Time Pricing</p>
            <p className="text-muted-foreground text-sm mt-1">
              This special price is only available for a limited time.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default OfferSection;