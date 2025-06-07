
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Headphones, Shield } from 'lucide-react';

const ValueConfirmation = () => {
  const handleProceedToPayment = () => {
    console.log("Proceed to Payment clicked");
    // In a real app, this would navigate to payment page
  };

  const valuePoints = [
    {
      icon: FileText,
      text: "Your Full Credit Report & Personalized Action Plan"
    },
    {
      icon: Headphones,
      text: "A 1-on-1 Call with a ScoreUp Expert"
    },
    {
      icon: Shield,
      text: "Tools & Guidance to Fix Errors & Improve Your Score"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        {/* Headlines */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            <span className="text-foreground">You're Ready. </span>
            <span className="text-primary">Let's Get Your Score to </span>
            <span className="text-accent font-extrabold">750+.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Here's the expert plan and guidance you'll use to get there:
          </p>
        </div>

        {/* Value Points */}
        <div className="space-y-6 mb-8">
          {valuePoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6 text-accent" />
                </div>
                <p className="text-foreground font-medium text-lg leading-relaxed pt-3">
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Price Line */}
        <div className="text-center">
          <p className="text-xl font-semibold text-foreground">
            <span className="text-accent">₹99</span>
          </p>
        </div>
      </div>

      {/* Sticky Footer CTA */}
      <div className="sticky bottom-0 bg-background border-t border-border p-4 shadow-lg">
        <Button 
          onClick={handleProceedToPayment}
          size="lg" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300"
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default ValueConfirmation;
