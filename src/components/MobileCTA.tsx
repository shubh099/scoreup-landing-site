
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { secureEncryption } from '../utils/secureEncryption';
import { validatePhone, sanitizeInput } from '../utils/validation';
import { secureSession } from '../utils/secureSession';
import { otpRateLimiter } from '../utils/rateLimiter';
import OTPVerificationDialog from './OTPVerificationDialog';
import SecurityConfig from './SecurityConfig';

const MobileCTA = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [showSecurityConfig, setShowSecurityConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const { toast } = useToast();

  // API Configuration - You'll need to replace these with your actual values
  const BASE_URL = ""; // Add your base URL here
  const AUTHUSER = {
    initinatOtp: "/initiate-otp" // Add your endpoint here
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // CSRF protection
    // Add other headers as needed
  };

  const handleSecurityConfig = (config: { encryptionKey: string; aesIv: string }) => {
    secureEncryption.setConfig(config);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setMobileNumber(sanitized);
    
    if (validationError) {
      setValidationError("");
    }
  };

  const errorHandling = (error: any) => {
    console.error("API Error occurred"); // Don't log sensitive details
    
    const errorMessage = error?.response?.status === 429 
      ? "Too many requests. Please try again later."
      : "Something went wrong. Please try again.";
      
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const callInitiateOtp = () => {
    // Validate phone number
    const phoneValidation = validatePhone(mobileNumber);
    if (!phoneValidation.isValid) {
      setValidationError(phoneValidation.error || "Invalid phone number");
      return;
    }

    // Check rate limiting
    const rateLimitCheck = otpRateLimiter.canMakeRequest(mobileNumber);
    if (!rateLimitCheck.allowed) {
      toast({
        title: "Rate Limit Exceeded",
        description: rateLimitCheck.message,
        variant: "destructive",
      });
      return;
    }

    // Check if encryption is configured
    if (!secureEncryption.isConfigured()) {
      setShowSecurityConfig(true);
      return;
    }

    if (!BASE_URL || !AUTHUSER.initinatOtp) {
      toast({
        title: "Configuration Error",
        description: "API configuration is incomplete",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const payload = {
      mobile_no: mobileNumber,
      device_id: '',
      condition_accepted: true,
      whatsaap_consent: false
    };

    const encryptedPayload = secureEncryption.encryptData(payload);

    if (!encryptedPayload) {
      setLoading(false);
      toast({
        title: "Encryption Error",
        description: "Failed to encrypt data",
        variant: "destructive",
      });
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Request Timeout",
        description: "Request took too long. Please try again.",
        variant: "destructive",
      });
    }, 10000);

    axios
      .post(
        BASE_URL + AUTHUSER.initinatOtp,
        { data: encryptedPayload },
        { headers: headers }
      )
      .then((response) => {
        clearTimeout(timeout);
        
        secureSession.setSessionData({
          transactionId: response?.data?.transaction_id,
          authType: response?.data?.type
        });
        
        setShowOTPDialog(true);
        
        toast({
          title: "Success",
          description: "OTP sent successfully",
        });
        
        setLoading(false);
      })
      .catch((error) => {
        clearTimeout(timeout);
        setLoading(false);
        
        if (error?.response?.data?.detail?.[0]?.type === 'string_pattern_mismatch') {
          setValidationError("Please enter a valid mobile number");
        } else {
          errorHandling(error);
        }
      });
  };

  const handleCTAClick = () => {
    const sanitized = sanitizeInput(mobileNumber);
    if (sanitized.trim()) {
      console.log("Mobile CTA clicked - Get My Plan");
      callInitiateOtp();
    } else {
      setValidationError("Please enter a mobile number");
    }
  };

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg z-50">
        <div className="flex gap-3 items-center">
          <div className="flex-1 w-[60%]">
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={mobileNumber}
              onChange={handleMobileChange}
              className={`h-12 text-base placeholder:text-sm ${
                validationError ? 'border-destructive focus-visible:ring-destructive' : ''
              }`}
              disabled={loading}
              maxLength={15}
            />
            {validationError && (
              <p className="text-xs text-destructive mt-1">{validationError}</p>
            )}
          </div>
          <Button 
            onClick={handleCTAClick}
            size="lg" 
            disabled={loading || !!validationError}
            className="w-[40%] bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300"
          >
            {loading ? "Loading..." : "Get My Plan"}
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

      <SecurityConfig
        isOpen={showSecurityConfig}
        onClose={() => setShowSecurityConfig(false)}
        onConfigSaved={handleSecurityConfig}
      />
    </>
  );
};

export default MobileCTA;
