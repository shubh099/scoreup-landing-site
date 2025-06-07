
import { enhancedEncryption } from './enhancedEncryption';
import { securityMonitoring } from './securityMonitoring';

interface TokenData {
  accessToken?: string;
  leadProfileId?: string;
  authOtp?: string;
  tokenType?: string;
  expiresAt: number;
  sessionId: string;
}

class EnhancedTokenManager {
  private tokenData: TokenData | null = null;
  private readonly TOKEN_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours
  private readonly STORAGE_KEY = 'secure_session_v2';
  private encryptionKey: string | null = null;

  setEncryptionKey(key: string): void {
    this.encryptionKey = key;
  }

  setTokens(data: {
    accessToken?: string;
    leadProfileId?: string;
    authOtp?: string;
    tokenType?: string;
  }): boolean {
    if (!this.encryptionKey) {
      securityMonitoring.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'high',
        message: 'Attempted to set tokens without encryption key'
      });
      return false;
    }

    this.tokenData = {
      ...data,
      expiresAt: Date.now() + this.TOKEN_EXPIRY,
      sessionId: this.generateSessionId()
    };

    try {
      const encryptedData = enhancedEncryption.encryptSensitiveData(
        this.tokenData,
        this.encryptionKey
      );
      
      if (!encryptedData) {
        securityMonitoring.logSecurityEvent({
          type: 'suspicious_activity',
          severity: 'high',
          message: 'Failed to encrypt token data'
        });
        return false;
      }

      sessionStorage.setItem(this.STORAGE_KEY, encryptedData);
      return true;
    } catch (error) {
      securityMonitoring.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'high',
        message: 'Token encryption failed'
      });
      return false;
    }
  }

  private generateSessionId(): string {
    return Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  getAccessToken(): string | null {
    const data = this.getValidTokenData();
    return data?.accessToken || null;
  }

  getLeadProfileId(): string | null {
    const data = this.getValidTokenData();
    return data?.leadProfileId || null;
  }

  private getValidTokenData(): TokenData | null {
    if (this.tokenData && Date.now() < this.tokenData.expiresAt) {
      return this.tokenData;
    }

    if (!this.encryptionKey) {
      return null;
    }

    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const decrypted = enhancedEncryption.decryptSensitiveData(
          stored,
          this.encryptionKey
        );
        
        if (decrypted && Date.now() < decrypted.expiresAt) {
          this.tokenData = decrypted;
          return this.tokenData;
        }
      }
    } catch (error) {
      securityMonitoring.logSecurityEvent({
        type: 'suspicious_activity',
        severity: 'medium',
        message: 'Token decryption failed'
      });
    }

    this.clearTokens();
    return null;
  }

  clearTokens(): void {
    this.tokenData = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
    
    // Clear legacy items
    localStorage.removeItem('token');
    localStorage.removeItem('leadprofileid');
    localStorage.removeItem('auth_Otp');
  }

  isAuthenticated(): boolean {
    return this.getValidTokenData() !== null;
  }

  getSessionInfo(): { sessionId: string; expiresAt: number } | null {
    const data = this.getValidTokenData();
    if (data) {
      return {
        sessionId: data.sessionId,
        expiresAt: data.expiresAt
      };
    }
    return null;
  }
}

export const enhancedTokenManager = new EnhancedTokenManager();
