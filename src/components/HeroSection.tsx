
import React, { useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import TrustIndicators from './TrustIndicators';
import ScoreVisualization from './ScoreVisualization';
import OTPVerificationDialog from './OTPVerificationDialog';
import SecurityConfig from './SecurityConfig';
import { secureEncryption } from '../utils/secureEncryption';

const HeroSection = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [showSecurityConfig, setShowSecurityConfig] = useState(false);

  const handleSecurityConfig = (config: { encryptionKey: string; aesIv: string }) => {
    secureEncryption.setConfig(config);
  };

  const handleOTPSent = () => {
    setShowOTPDialog(true);
  };

  const handleSecurityConfigNeeded = () => {
    setShowSecurityConfig(true);
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
                  Get your latest credit report from multiple bureaus, understand exactly what's hurting your score, and get a step-by-step expert plan to fix it.
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

            {/* Right Column - Visual */}
            <ScoreVisualization />
          </div>
        </div>
      </section>

      <OTPVerificationDialog
        isOpen={showOTPDialog}
        onClose={() => setShowOTPDialog(false)}
        mobileNumber={mobileNumber}
      />

      <SecurityConfig
        isOpen={showSecurityConfig}
        onClose={() => setShowSecurityConfig(false)}
        onConfigSaved={handleSecurityConfig}
      />
    </>
  );
};

export default HeroSection;
