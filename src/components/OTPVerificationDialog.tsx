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

interface OTPVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mobileNumber: string;
}

const OTPVerificationDialog = ({ isOpen, onClose, mobileNumber }: OTPVerificationDialogProps) => {
  const [otp, setOtp] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsComplete(otp.length === 4);
  }, [otp]);

  const handleVerify = () => {
    console.log("OTP verified successfully:", otp);
    console.log("Proceeding to personal details page...");
    onClose();
    navigate('/personal-details');
  };

  const handleResendOTP = () => {
    console.log("Resend OTP clicked for number:", mobileNumber);
    // In a real app, this would trigger OTP resend
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onChange={(value) => setOtp(value)}
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
              className="text-primary hover:text-primary/80 text-sm font-medium cursor-pointer"
            >
              Resend OTP
            </button>
          </div>
          
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className={`w-full h-12 text-base font-bold rounded-lg transition-all duration-300 ${
              isComplete 
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            Verify & Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerificationDialog;
