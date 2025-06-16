
import React from 'react';
import { Instagram, Linkedin, Youtube, Facebook, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/854e4b68-4eb3-494d-8363-a696f830bda8.png" 
              alt="ScoreUp Logo" 
              className="h-6 w-auto"
            />
          </div>
          
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <div className="flex items-center justify-center md:justify-end space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Phone Support</h3>
                <p className="text-muted-foreground">+91 7412933933</p>
                <p className="text-sm text-muted-foreground">Mon - Sat (9.30 AM - 6.00 PM)</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email Support</h3>
                <p className="text-muted-foreground">customer@banksathi.com</p>
              </div>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About Us
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms & Condition
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Refund Policy
            </a>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 ScoreUp. All rights reserved.
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
