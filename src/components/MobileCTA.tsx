
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import OTPVerificationDialog from './OTPVerificationDialog';

const MobileCTA = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTPDialog, setShowOTPDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [messageType, setMessageType] = useState("");
  const [tempOtp, setTempOtp] = useState(false);
  const { toast } = useToast();

  // API Configuration - You'll need to replace these with your actual values
  const BASE_URL = ""; // Add your base URL here
  const AUTHUSER = {
    initinatOtp: "/initiate-otp" // Add your endpoint here
  };
  const headers = {
    'Content-Type': 'application/json',
    // Add other headers as needed
  };

  // Encryption function - You'll need to implement this based on your requirements
  const encryptData = (data: any) => {
    // Implement your encryption logic here
    // For now, returning the data as-is
    console.log("Data to encrypt:", data);
    return JSON.stringify(data);
  };

  // Error handling function
  const errorHandling = (error: any) => {
    console.error("API Error:", error);
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  };

  const callInitiateOtp = () => {
    if (!mobileNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const payload = {
      mobile_no: String(mobileNumber) || '',
      device_id: '',
      condition_accepted: true,
      whatsaap_consent: false
    };

    const encryptedPayload = encryptData(payload);

    if (!encryptedPayload) {
      setLoading(false);
      return;
    }

    axios
      .post(
        BASE_URL + AUTHUSER?.initinatOtp,
        {
          data: encryptedPayload,
        },
        { headers: headers }
      )
      .then((response) => {
        setShowOTPDialog(true);
        setTransactionId(response?.data?.transaction_id);
        setMessageType(response?.data?.type);
        setTempOtp(response?.data?.is_temp_otp);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('transaction_id', response?.data?.transaction_id);
          localStorage.setItem('auth_type', response?.data?.type);
        }
        
        toast({
          title: "Success",
          description: "OTP sent successfully",
        });
        
        setLoading(false);

        // Page tracker - implement based on your analytics needs
        console.log("Page tracker data:", {
          mobile_no: String(mobileNumber),
          send_otp_clicked: '1',
          // Add other tracking data as needed
        });
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.data?.detail?.[0]?.type === 'string_pattern_mismatch') {
          toast({
            title: "Error",
            description: "Please enter a valid mobile number",
            variant: "destructive",
          });
        } else {
          errorHandling(error);
        }
      });
  };

  const handleCTAClick = () => {
    if (mobileNumber.trim()) {
      console.log("Mobile CTA clicked - Get My Plan with number:", mobileNumber);
      callInitiateOtp();
    } else {
      toast({
        title: "Error",
        description: "Please enter a mobile number",
        variant: "destructive",
      });
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
            disabled={loading}
          />
          <Button 
            onClick={handleCTAClick}
            size="lg" 
            disabled={loading}
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
        transactionId={transactionId}
        messageType={messageType}
        tempOtp={tempOtp}
      />
    </>
  );
};

export default MobileCTA;
