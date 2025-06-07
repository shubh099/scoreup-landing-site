
import React from 'react';

const TrustIndicators = () => {
  const indicators = [
    { text: "Secure Payment" },
    { text: "Instant Access" },
    { text: "Expert Guidance" }
  ];

  return (
    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
      {indicators.map((indicator, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>{indicator.text}</span>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;
