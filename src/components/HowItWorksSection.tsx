
import { CreditCard, LayoutDashboard, PhoneCall } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: CreditCard,
      title: "Pay ₹99",
      description: "Secure one-time payment.",
      detail: "Quick and safe checkout process"
    },
    {
      icon: LayoutDashboard,
      title: "Instant Access", 
      description: "Immediately see your detailed credit analysis on your dashboard.",
      detail: "Complete report within minutes"
    },
    {
      icon: PhoneCall,
      title: "Expert Call",
      description: "We call you to walk you through your personalized plan.",
      detail: "Real human guidance, not bots"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Instant Clarity in the Next 5 Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From payment to personalized plan - here's exactly what happens next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Connection arrow for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-primary/30 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary/30 border-y-2 border-y-transparent"></div>
                </div>
              )}
              
              <div className="bg-card rounded-xl p-8 shadow-soft border border-border text-center hover:shadow-card transition-all duration-300 relative">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  {step.description}
                </p>
                
                <p className="text-sm text-primary font-medium">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-accent/10 rounded-lg p-6 max-w-xl mx-auto">
            <p className="text-accent font-semibold text-lg mb-2">
              ⚡ Lightning Fast Setup
            </p>
            <p className="text-muted-foreground">
              Most users complete the entire process in under 5 minutes and get their expert call within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
