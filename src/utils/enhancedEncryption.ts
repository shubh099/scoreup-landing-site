
import CryptoJS from 'crypto-js';

interface EncryptionResult {
  encryptedData: string;
  iv: string;
  timestamp: number;
}

class EnhancedEncryptionService {
  private readonly ENCRYPTION_VERSION = 'v1';
  private readonly DATA_EXPIRY = 30 * 60 * 1000; // 30 minutes

  encryptSensitiveData(data: any, key: string): string | null {
    try {
      // Generate random IV for each encryption
      const iv = CryptoJS.lib.WordArray.random(16);
      
      // Add timestamp for expiry
      const dataWithTimestamp = {
        data,
        timestamp: Date.now(),
        version: this.ENCRYPTION_VERSION
      };

      // Encrypt with AES-256
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(dataWithTimestamp),
        CryptoJS.enc.Utf8.parse(this.padKey(key)),
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      // Combine IV and encrypted data
      const result: EncryptionResult = {
        encryptedData: encrypted.toString(),
        iv: iv.toString(),
        timestamp: Date.now()
      };

      return btoa(JSON.stringify(result));
    } catch (error) {
      console.error('Encryption failed');
      return null;
    }
  }

  decryptSensitiveData(encryptedPayload: string, key: string): any | null {
    try {
      const parsed: EncryptionResult = JSON.parse(atob(encryptedPayload));
      
      // Check if data has expired
      if (Date.now() - parsed.timestamp > this.DATA_EXPIRY) {
        return null;
      }

      // Decrypt data
      const decrypted = CryptoJS.AES.decrypt(
        parsed.encryptedData,
        CryptoJS.enc.Utf8.parse(this.padKey(key)),
        {
          iv: CryptoJS.enc.Hex.parse(parsed.iv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      const dataWithTimestamp = JSON.parse(decryptedText);

      // Validate version
      if (dataWithTimestamp.version !== this.ENCRYPTION_VERSION) {
        return null;
      }

      return dataWithTimestamp.data;
    } catch (error) {
      console.error('Decryption failed');
      return null;
    }
  }

  private padKey(key: string): string {
    // Ensure key is exactly 32 bytes for AES-256
    if (key.length >= 32) {
      return key.slice(0, 32);
    }
    return key.padEnd(32, key);
  }

  generateSecureKey(): string {
    return CryptoJS.lib.WordArray.random(32).toString();
  }
}

export const enhancedEncryption = new EnhancedEncryptionService();
