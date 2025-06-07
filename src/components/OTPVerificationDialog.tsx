
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import { validatePhone, sanitizeInput } from '../utils/validation';
import { secureSession } from '../utils/secureSession';
import { secureEncryption } from '../utils/secureEncryption';
import { otpRateLimiter } from '../utils/rateLimiter';

interface OTPVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mobileNumber: string;
}

const OTPVerificationDialog = ({ 
  isOpen, 
  onClose, 
  mobileNumber
}: OTPVerificationDialogProps) => {
  const [otp, setOtp] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // API Configuration - You'll need to replace these with your actual values
  const BASE_URL = ""; // Add your base URL here
  const AUTHUSER = {
    initinatOtp: "/initiate-otp", // Add your endpoint here
    verifyUser: "/verify-user" // Add your verify endpoint here
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest', // CSRF protection
    // Add other headers as needed
  };

  useEffect(() => {
    setIsComplete(otp.length === 4);
  }, [otp]);

  useEffect(() => {
    // Clear OTP when dialog opens/closes
    if (!isOpen) {
      setOtp("");
      setIsComplete(false);
      setLoading(false);
    }
  }, [isOpen]);

  const handleOtpChange = (value: string) => {
    // Sanitize and validate OTP input
    const sanitized = sanitizeInput(value).replace(/[^0-9]/g, '');
    setOtp(sanitized);
    
    // Auto-verify when 4 digits are entered
    if (sanitized.length === 4) {
      handleVerify(sanitized);
    }
  };

  const handleGTM = (data: any) => {
    // GTM tracking function - implement based on your GTM setup
    console.log("GTM event triggered with data:", data);
  };

  const handleWebEngageEvent = (eventName: string, eventData: any) => {
    // WebEngage event tracking - implement based on your WebEngage setup
    console.log(`WebEngage event: ${eventName}`, eventData);
  };

  const handleVerify = (otpValue?: string) => {
    const otpToVerify = otpValue || otp;
    if (otpToVerify.length !== 4) return;

    // Validate API configuration
    if (!BASE_URL || !AUTHUSER.verifyUser) {
      toast({
        title: "Configuration Error",
        description: "API configuration is incomplete",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    const sessionData = secureSession.getSessionData();
    if (!sessionData?.transactionId) {
      toast({
        title: "Session Error",
        description: "No transaction ID found. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const payload = {
      transaction_id: sessionData.transactionId,
      otp: otpToVerify,
      mobile_no: mobileNumber,
      type: sessionData.authType,
      is_temp_otp: false
    };

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
        BASE_URL + AUTHUSER.verifyUser,
        payload,
        { headers: headers }
      )
      .then((response) => {
        clearTimeout(timeout);
        setLoading(false);

        if (response?.data?.message === 'success') {
          // Store authentication data securely
          if (response?.data?.data?.access_token) {
            localStorage.setItem('token', response.data.data.access_token);
          }
          if (response?.data?.data?.lead_profile_id) {
            localStorage.setItem('leadprofileid', response.data.data.lead_profile_id);
          }
          localStorage.setItem('auth_Otp', otpToVerify);

          // Handle GTM tracking
          handleGTM(response.data.data);

          // Handle WebEngage user attributes
          if (typeof window !== 'undefined' && (window as any).webengage) {
            const webengage = (window as any).webengage;
            const userData = response.data.data;
            
            if (userData.full_name) {
              const names = userData.full_name.split(' ');
              webengage.user.login(userData.lead_profile_id || '');
              webengage.user.setAttribute('we_email', userData.email || '');
              webengage.user.setAttribute('we_birth_date', userData.dob || '');
              webengage.user.setAttribute('we_phone', userData.mobile_no ? `+91${userData.mobile_no}` : "");
              webengage.user.setAttribute('we_gender', userData.gender?.toLowerCase() || '');
              webengage.user.setAttribute('we_first_name', names[0] || '');
              webengage.user.setAttribute('we_last_name', names[names.length - 1] || '');
              webengage.user.setAttribute('we_email_opt_in', true);
              webengage.user.setAttribute('we_sms_opt_in', true);
              webengage.user.setAttribute('we_whatsapp_opt_in', true);
              webengage.user.setAttribute('we_postal_code', userData.pin_code);
              webengage.user.setAttribute('we_city', userData.city);
              webengage.user.setAttribute('we_region', "");
              webengage.user.setAttribute('we_country', "");
              webengage.user.setAttribute('we_advisor_id', 15721);
            }
          }

          // Handle WebEngage event
          if (response.data.data.full_name) {
            const names = response.data.data.full_name.split(' ');
            handleWebEngageEvent('user_login', {
              user_id: response.data.data.lead_profile_id,
              first_name: names[0],
              last_name: names[names.length - 1],
              birth_date: response.data.data.dob,
              phone: `+91${mobileNumber}`,
              email: response.data.data.email,
              gender: response.data.data.gender,
              postal_code: response.data.data.pin_code,
              city: response.data.data.city,
              region: "",
              country: "",
              advisor_id: 15721,
              whatsapp_opt_in: true,
            });
          }

          toast({
            title: "Success",
            description: "OTP verified successfully",
          });

          // Navigate based on user status
          if (response.data.data.is_first_time_user === true) {
            navigate('/personal-details');
          } else {
            navigate('/value-confirmation');
          }
          
          onClose();
        }
      })
      .catch((error) => {
        clearTimeout(timeout);
        setLoading(false);
        
        console.error("OTP verification error");
        
        if (error?.response?.data?.message === 'failed') {
          toast({
            title: "Invalid OTP",
            description: "Please enter a valid OTP",
            variant: "destructive",
          });
        } else if (error?.response?.status === 500) {
          toast({
            title: "Server Error",
            description: "Internal server error. Please try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      });
  };

  const handleResendOTP = () => {
    // Validate phone number first
    const phoneValidation = validatePhone(mobileNumber);
    if (!phoneValidation.isValid) {
      toast({
        title: "Error",
        description: "Invalid mobile number",
        variant: "destructive",
      });
      return;
    }

    // Check rate limiting for resend
    const rateLimitCheck = otpRateLimiter.canMakeRequest(mobileNumber + '_resend');
    if (!rateLimitCheck.allowed) {
      toast({
        title: "Rate Limit Exceeded",
        description: rateLimitCheck.message,
        variant: "destructive",
      });
      return;
    }

    console.log("Resend OTP clicked for number:", mobileNumber);
    
    const sessionData = secureSession.getSessionData();
    if (sessionData) {
      console.log("Transaction ID:", sessionData.transactionId);
    }
    
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your mobile number",
    });
  };

  const handleClose = () => {
    // Clear sensitive data when closing
    setOtp("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-foreground">
            Verify Your Mobile Number
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <p className="text-center text-muted-foreground">
            We've sent a 4-digit OTP to +91 {mobileNumber}
          </p>
          
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={handleOtpChange}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="text-center">
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend OTP
            </button>
          </div>
          
          <Button
            onClick={() => handleVerify()}
            disabled={!isComplete || loading}
            className={`w-full h-12 text-base font-bold rounded-lg transition-all duration-300 ${
              isComplete && !loading
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {loading ? "Verifying..." : "Verify & Proceed"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationDialog;
