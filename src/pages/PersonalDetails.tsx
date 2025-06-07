
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

const PersonalDetails = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStartJourney = () => {
    if (fullName.trim() && email.trim()) {
      console.log("Personal details collected:", { fullName, email });
      navigate('/value-confirmation');
    } else {
      console.log("Please fill in all fields");
      // In a real app, you might show a validation message
    }
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
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 text-base"
            />
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
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={handleStartJourney}
          size="lg" 
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 text-base font-bold rounded-lg shadow-card transition-all duration-300"
        >
          Start My Journey
        </Button>
      </div>
    </div>
  );
};

export default PersonalDetails;
