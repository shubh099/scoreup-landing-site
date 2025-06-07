
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
import { validatePhone, sanitizeInput } from '../utils/validation';
import { secureSession } from '../utils/secureSession';
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
  };

  const handleVerify = () => {
    if (!isComplete) return;

    setLoading(true);
    
    // Simulate OTP verification delay
    setTimeout(() => {
      console.log("OTP verified successfully:", otp);
      
      const sessionData = secureSession.getSessionData();
      if (sessionData) {
        console.log("Transaction ID:", sessionData.transactionId);
        console.log("Message Type:", sessionData.authType);
      }
      
      console.log("Proceeding to personal details page...");
      setLoading(false);
      onClose();
      navigate('/personal-details');
      
      toast({
        title: "Success",
        description: "OTP verified successfully",
      });
    }, 1000);
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
            onClick={handleVerify}
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
