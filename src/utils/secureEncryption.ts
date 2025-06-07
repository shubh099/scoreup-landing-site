
import CryptoJS from 'crypto-js';

interface EncryptionConfig {
  encryptionKey: string;
  aesIv: string;
}

class SecureEncryptionService {
  private config: EncryptionConfig | null = null;

  setConfig(config: EncryptionConfig) {
    this.config = config;
  }

  private padKeyTo256Bits(key: string): string {
    const paddedKey = key.padEnd(32, key);
    return paddedKey.slice(0, 32);
  }

  private expandKeyTo256Bits(key: string): string {
    const paddedKey = key.repeat(8);
    return paddedKey.slice(0, 32);
  }

  encryptData(data: any): string | null {
    if (!this.config) {
      console.error('Encryption configuration not set');
      return null;
    }

    try {
      const expandedKey = this.padKeyTo256Bits(this.config.encryptionKey);
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data), 
        CryptoJS.enc.Utf8.parse(expandedKey), 
        {
          iv: CryptoJS.enc.Utf8.parse(this.config.aesIv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      ).toString();
      return encrypted;
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  }

  decryptData(encryptedData: string): any | null {
    if (!this.config) {
      console.error('Encryption configuration not set');
      return null;
    }

    try {
      const expandedKey = this.expandKeyTo256Bits(this.config.encryptionKey);
      const decrypted = CryptoJS.AES.decrypt(
        encryptedData, 
        CryptoJS.enc.Utf8.parse(expandedKey), 
        {
          iv: CryptoJS.enc.Utf8.parse(this.config.aesIv),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      );

      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error('Error decrypting data:', error);
      return null;
    }
  }

  isConfigured(): boolean {
    return this.config !== null;
  }

  clearConfig(): void {
    this.config = null;
  }
}

export const secureEncryption = new SecureEncryptionService();
