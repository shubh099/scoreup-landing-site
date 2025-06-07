
import { Button } from "@/components/ui/button";

const MobileCTA = () => {
  const handleCTAClick = () => {
    console.log("Mobile CTA clicked - Start My ScoreUp Plan for ₹99");
    // In a real app, this would handle payment/signup flow
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
      <Button 
        onClick={handleCTAClick}
        size="lg" 
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 text-lg font-bold rounded-lg shadow-card transition-all duration-300"
      >
        Start My ScoreUp Plan for ₹99
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-2">
        🔒 Secure • One-time payment • Instant access
      </p>
    </div>
  );
};

export default MobileCTA;
