
import React, { useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import TrustIndicators from './TrustIndicators';
import UserSuccessCarousel from './UserSuccessCarousel';
import OTPVerificationDialog from './OTPVerificationDialog';

const HeroSection = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);

  const handleOTPSent = () => {
    setShowOTPDialog(true);
  };

  const handleSecurityConfigNeeded = () => {
    // Security config popup removed - handle this case differently if needed
    console.log("Security configuration needed");
  };

  return (
    <>
      <section className="relative bg-background py-16 md:py-24 overflow-hidden">
        {/* Background gradient decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Stop Guessing.{" "}
                  <span className="text-gradient">Start Improving.</span>
                  <br />
                  Your Clear Path to a{" "}
                  <span className="text-success font-extrabold">750+</span>{" "}
                  Credit Score.
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Deep Analysis • Expert Guidance • Personalized Plan
                </p>
              </div>

              {/* Desktop CTA Container */}
              <PhoneNumberInput
                onOTPSent={handleOTPSent}
                onSecurityConfigNeeded={handleSecurityConfigNeeded}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                className="hidden md:block"
              />

              {/* Trust indicators */}
              <TrustIndicators />
            </div>

            {/* Right Column - User Success Carousel */}
            <UserSuccessCarousel />
          </div>
        </div>
      </section>

      <OTPVerificationDialog
        isOpen={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        mobileNumber={mobileNumber}
      />
    </>
  );
};

export default HeroSection;
