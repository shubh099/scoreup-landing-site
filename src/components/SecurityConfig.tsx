
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SecurityConfigProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigSaved: (config: { encryptionKey: string; aesIv: string }) => void;
}

const SecurityConfig = ({ isOpen, onClose, onConfigSaved }: SecurityConfigProps) => {
  const [encryptionKey, setEncryptionKey] = useState("");
  const [aesIv, setAesIv] = useState("");
  const { toast } = useToast();

  const validateKey = (key: string, type: 'key' | 'iv') => {
    if (!key) return false;
    if (type === 'key' && key.length < 16) return false;
    if (type === 'iv' && key.length < 16) return false;
    return true;
  };

  const handleSave = () => {
    if (!validateKey(encryptionKey, 'key')) {
      toast({
        title: "Invalid Encryption Key",
        description: "Encryption key must be at least 16 characters long",
        variant: "destructive",
      });
      return;
    }

    if (!validateKey(aesIv, 'iv')) {
      toast({
        title: "Invalid AES IV",
        description: "AES IV must be at least 16 characters long",
        variant: "destructive",
      });
      return;
    }

    onConfigSaved({ encryptionKey, aesIv });
    setEncryptionKey("");
    setAesIv("");
    onClose();
    
    toast({
      title: "Security Configuration Saved",
      description: "Encryption keys have been configured securely",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Security Configuration</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Please provide your encryption keys for secure data handling. Keys are stored in memory only.
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="encryptionKey">Encryption Key (min 16 chars)</Label>
            <Input
              id="encryptionKey"
              type="password"
              placeholder="Enter your encryption key"
              value={encryptionKey}
              onChange={(e) => setEncryptionKey(e.target.value)}
              className="h-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aesIv">AES IV (min 16 chars)</Label>
            <Input
              id="aesIv"
              type="password"
              placeholder="Enter your AES IV"
              value={aesIv}
              onChange={(e) => setAesIv(e.target.value)}
              className="h-10"
            />
          </div>
          
          <Button
            onClick={handleSave}
            disabled={!encryptionKey || !aesIv}
            className="w-full"
          >
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityConfig;
