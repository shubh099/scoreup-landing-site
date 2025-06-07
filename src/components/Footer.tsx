
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/854e4b68-4eb3-494d-8363-a696f830bda8.png" 
              alt="ScoreUp Logo" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ScoreUp. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Your trusted partner for credit score improvement
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
