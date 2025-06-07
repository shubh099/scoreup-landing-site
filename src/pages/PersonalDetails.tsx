
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, validateName, sanitizeInput } from "@/utils/validation";
import Header from "@/components/Header";

const PersonalDetails = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setFullName(sanitized);
    
    if (nameError) {
      setNameError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeInput(e.target.value);
    setEmail(sanitized);
    
    if (emailError) {
      setEmailError("");
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate name
    const nameValidation = validateName(fullName);
    if (!nameValidation.isValid) {
      setNameError(nameValidation.error || "Invalid name");
      isValid = false;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "Invalid email");
      isValid = false;
    }

    return isValid;
  };

  const handleStartJourney = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("Personal details collected:", { 
        fullName: sanitizeInput(fullName), 
        email: sanitizeInput(email) 
      });
      
      setLoading(false);
      navigate('/value-confirmation');
      
      toast({
        title: "Success",
        description: "Personal details saved successfully",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 max-w-md mx-auto w-full">
        {/* Headlines */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            <span className="text-foreground">Let's Personalize </span>
            <span className="text-primary">Your Plan to a </span>
            <span className="text-accent font-bold">750+ </span>
            <span className="text-primary font-bold">Credit Score</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Please provide your name and email to continue.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base font-medium text-foreground">
              Full Name (as per your PAN)
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleNameChange}
              className={`h-12 text-base ${
                nameError ? 'border-destructive focus-visible:ring-destructive' : ''
              }`}
              disabled={loading}
              maxLength={100}
            />
            {nameError && (
              <p className="text-xs text-destructive">{nameError}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`h-12 text-base ${
                emailError ? 'border-destructive focus-visible:ring-destructive' : ''
              }`}
              disabled={loading}
              maxLength={254}
            />
            {emailError && (
              <p className="text-xs text-destructive">{emailError}</p>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleStartJourney}
          size="lg" 
          disabled={loading || !fullName.trim() || !email.trim()}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300"
        >
          {loading ? "Processing..." : "Start My Journey"}
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
