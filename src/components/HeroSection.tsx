import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import OTPVerificationDialog from './OTPVerificationDialog';

const HeroSection = () => {
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
      console.log("CTA clicked - Get My Plan with number:", mobileNumber);
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
              <div className="hidden md:block">
                <div className="flex gap-3 items-center max-w-md">
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
                    className="w-[40%] bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? "Loading..." : "Get My Plan"}
                  </Button>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Instant Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Expert Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative animate-scale-in">
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Your Credit Score Journey</h3>
                  <p className="text-sm text-muted-foreground">Watch your score climb with ScoreUp</p>
                </div>
                
                {/* Score visualization */}
                <div className="relative h-48 flex items-end justify-between space-x-2 mb-4">
                  {/* Score bars representing improvement */}
                  <div className="flex-1 bg-destructive/20 rounded-t h-16 relative">
                    <div className="absolute bottom-0 w-full bg-destructive rounded-t h-12"></div>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-destructive">520</span>
                  </div>
                  
                  <div className="flex-1 bg-accent/20 rounded-t h-24 relative">
                    <div className="absolute bottom-0 w-full bg-accent rounded-t h-20"></div>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-accent">650</span>
                  </div>
                  
                  <div className="flex-1 bg-success/20 rounded-t h-36 relative">
                    <div className="absolute bottom-0 w-full bg-success rounded-t h-32 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-success-foreground" />
                    </div>
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg font-bold text-success">750+</span>
                  </div>
                </div>
                
                {/* X-axis labels centered under each bar */}
                <div className="flex justify-between space-x-2 text-xs text-muted-foreground">
                  <div className="flex-1 text-center">Start</div>
                  <div className="flex-1 text-center">3 Months</div>
                  <div className="flex-1 text-center">6 Months</div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Join thousands who've improved their credit with ScoreUp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default HeroSection;
