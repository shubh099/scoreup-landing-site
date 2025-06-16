
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, User, Home } from "lucide-react";

type LoanType = 'car' | 'personal' | 'home';

interface LoanConfig {
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  termYears: number;
  lowerScoreRate: number;
  highScoreRate: number;
}

const loanConfigs: Record<LoanType, LoanConfig> = {
  car: {
    minAmount: 50000,
    maxAmount: 1000000,
    defaultAmount: 300000,
    termYears: 5,
    lowerScoreRate: 11.5,
    highScoreRate: 9.5,
  },
  personal: {
    minAmount: 50000,
    maxAmount: 1000000,
    defaultAmount: 300000,
    termYears: 5,
    lowerScoreRate: 14,
    highScoreRate: 11,
  },
  home: {
    minAmount: 1000000,
    maxAmount: 7500000,
    defaultAmount: 3000000,
    termYears: 20,
    lowerScoreRate: 9.2,
    highScoreRate: 8.4,
  },
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const calculateTotalInterest = (
  principal: number,
  annualRate: number,
  termYears: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = termYears * 12;
  
  if (monthlyRate === 0) {
    return 0;
  }
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalAmount = monthlyPayment * numberOfPayments;
  return totalAmount - principal;
};

const SavingsCalculator = () => {
  const [selectedLoan, setSelectedLoan] = useState<LoanType>('car');
  const [loanAmount, setLoanAmount] = useState<number[]>([loanConfigs.car.defaultAmount]);

  const currentConfig = loanConfigs[selectedLoan];
  const currentAmount = loanAmount[0];

  const lowerScoreInterest = calculateTotalInterest(
    currentAmount,
    currentConfig.lowerScoreRate,
    currentConfig.termYears
  );

  const highScoreInterest = calculateTotalInterest(
    currentAmount,
    currentConfig.highScoreRate,
    currentConfig.termYears
  );

  const savings = lowerScoreInterest - highScoreInterest;

  useEffect(() => {
    setLoanAmount([currentConfig.defaultAmount]);
  }, [selectedLoan]);

  const handleTabChange = (value: string) => {
    setSelectedLoan(value as LoanType);
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            See What a 750+ Score{" "}
            <span className="text-gradient">Actually Saves You</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Use the calculator below to see the real-world impact of a great credit score.
          </p>
        </div>

        {/* Calculator Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column - Controls */}
          <div className="space-y-8">
            {/* Loan Type Tabs */}
            <Tabs value={selectedLoan} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="car" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Car Loan
                </TabsTrigger>
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Loan
                </TabsTrigger>
                <TabsTrigger value="home" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home Loan
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Loan Amount Display */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Loan Amount</h3>
              <div className="text-4xl md:text-5xl font-bold text-primary">
                {formatCurrency(currentAmount)}
              </div>
            </div>

            {/* Loan Amount Slider */}
            <div className="space-y-4">
              <Slider
                value={loanAmount}
                onValueChange={setLoanAmount}
                max={currentConfig.maxAmount}
                min={currentConfig.minAmount}
                step={currentConfig.minAmount}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(currentConfig.minAmount)}</span>
                <span>{formatCurrency(currentConfig.maxAmount)}</span>
              </div>
            </div>

            {/* Savings Banner */}
            <div className="bg-success/10 border border-success/20 rounded-lg p-6 text-center">
              <div className="text-lg md:text-xl font-semibold text-success">
                You could save{" "}
                <span className="text-2xl md:text-3xl font-bold">
                  {formatCurrency(savings)}
                </span>{" "}
                in interest with a 750+ Score!
              </div>
            </div>
          </div>

          {/* Right Column - Comparison Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Lower Score Card */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-destructive">
                  With a Lower Score
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Credit Score: 680 (Fair)
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                  <div className="text-2xl font-bold text-destructive">
                    {currentConfig.lowerScoreRate}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Interest Paid</div>
                  <div className="text-xl font-bold text-foreground">
                    {formatCurrency(lowerScoreInterest)}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* High Score Card */}
            <Card className="border-success/20 bg-success/5">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-success">
                  With a 750+ Score
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Credit Score: 750+ (Excellent)
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Interest Rate</div>
                  <div className="text-2xl font-bold text-success">
                    {currentConfig.highScoreRate}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Interest Paid</div>
                  <div className="text-xl font-bold text-foreground">
                    {formatCurrency(highScoreInterest)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
