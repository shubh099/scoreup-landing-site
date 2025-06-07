
interface TokenData {
  accessToken?: string;
  leadProfileId?: string;
  authOtp?: string;
  tokenType?: string;
  expiresAt: number;
}

class SecureTokenManager {
  private tokenData: TokenData | null = null;
  private readonly TOKEN_EXPIRY = 8 * 60 * 60 * 1000; // 8 hours
  private readonly STORAGE_KEY = 'secure_session';

  setTokens(data: {
    accessToken?: string;
    leadProfileId?: string;
    authOtp?: string;
    tokenType?: string;
  }): void {
    this.tokenData = {
      ...data,
      expiresAt: Date.now() + this.TOKEN_EXPIRY
    };

    // Use sessionStorage instead of localStorage for better security
    // Encrypt the data before storing
    try {
      const encryptedData = this.encryptSessionData(this.tokenData);
      sessionStorage.setItem(this.STORAGE_KEY, encryptedData);
    } catch (error) {
      console.error('Failed to store session data securely');
    }
  }

  getAccessToken(): string | null {
    const data = this.getValidTokenData();
    return data?.accessToken || null;
  }

  getLeadProfileId(): string | null {
    const data = this.getValidTokenData();
    return data?.leadProfileId || null;
  }

  getAuthOtp(): string | null {
    const data = this.getValidTokenData();
    return data?.authOtp || null;
  }

  getTokenType(): string | null {
    const data = this.getValidTokenData();
    return data?.tokenType || null;
  }

  private getValidTokenData(): TokenData | null {
    if (this.tokenData && Date.now() < this.tokenData.expiresAt) {
      return this.tokenData;
    }

    // Try to load from sessionStorage
    try {
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const decrypted = this.decryptSessionData(stored);
        if (decrypted && Date.now() < decrypted.expiresAt) {
          this.tokenData = decrypted;
          return this.tokenData;
        }
      }
    } catch (error) {
      console.error('Failed to retrieve session data');
    }

    this.clearTokens();
    return null;
  }

  clearTokens(): void {
    this.tokenData = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
    
    // Also clear any legacy localStorage items
    localStorage.removeItem('token');
    localStorage.removeItem('leadprofileid');
    localStorage.removeItem('auth_Otp');
  }

  isAuthenticated(): boolean {
    return this.getValidTokenData() !== null;
  }

  private encryptSessionData(data: TokenData): string {
    // Simple base64 encoding for now - in production, use proper encryption
    return btoa(JSON.stringify(data));
  }

  private decryptSessionData(encryptedData: string): TokenData | null {
    try {
      return JSON.parse(atob(encryptedData));
    } catch {
      return null;
    }
  }
}

export const secureTokenManager = new SecureTokenManager();
