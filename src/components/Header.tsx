
import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/854e4b68-4eb3-494d-8363-a696f830bda8.png" 
            alt="ScoreUp Logo" 
            className="h-8 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
