
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { secureEncryption } from '../utils/secureEncryption';
import { validatePhone, sanitizeInput } from '../utils/validation';
import { secureSession } from '../utils/secureSession';
import { otpRateLimiter } from '../utils/rateLimiter';

interface PhoneNumberInputProps {
  onOTPSent: () => void;
  onSecurityConfigNeeded: () => void;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  className?: string;
}

const PhoneNumberInput = ({ 
  onOTPSent, 
  onSecurityConfigNeeded, 
  mobileNumber, 
  setMobileNumber,
  className = ""
}: PhoneNumberInputProps) => {
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

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setMobileNumber(sanitized);
    
    if (validationError) {
      setValidationError("");
    }
  };

  const errorHandling = (error: any) => {
    console.error("API Error occurred"); // Don't log sensitive details
    
    // Don't expose internal error details
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
      onSecurityConfigNeeded();
      return;
    }

    // Validate API configuration
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

    // Add request timeout
    const timeout = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Request Timeout",
        description: "Request took too long. Please try again.",
        variant: "destructive",
      });
    }, 10000); // 10 second timeout

    axios
      .post(
        BASE_URL + AUTHUSER.initinatOtp,
        { data: encryptedPayload },
        { headers: headers }
      )
      .then((response) => {
        clearTimeout(timeout);
        
        // Store session data securely (in memory only)
        secureSession.setSessionData({
          transactionId: response?.data?.transaction_id,
          authType: response?.data?.type
        });
        
        onOTPSent();
        
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
      console.log("CTA clicked - Get My Plan");
      callInitiateOtp();
    } else {
      setValidationError("Please enter a mobile number");
    }
  };

  return (
    <div className={className}>
      <div className="flex gap-3 items-center max-w-md">
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
          className="w-[40%] bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300 transform hover:scale-105"
        >
          {loading ? "Loading..." : "Get My Plan"}
        </Button>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
