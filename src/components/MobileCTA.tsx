
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OTPVerificationDialog from './OTPVerificationDialog';

const MobileCTA = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);

  const handleCTAClick = () => {
    if (mobileNumber.trim()) {
      console.log("Mobile CTA clicked - Get My Plan with number:", mobileNumber);
      setShowOTPDialog(true);
    } else {
      console.log("Please enter a mobile number");
      // In a real app, you might show a validation message
    }
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
        <div className="flex gap-3 items-center">
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="flex-1 w-[60%] h-12 text-base placeholder:text-sm"
          />
          <Button 
            onClick={handleCTAClick}
            size="lg" 
            className="w-[40%] bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300"
          >
            Get My Plan
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          🔒 Secure • One-time payment • Instant access
        </p>
      </div>

      <OTPVerificationDialog
        isOpen={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        mobileNumber={mobileNumber}
      />
    </>
  );
};

export default MobileCTA;
