
interface SessionData {
  transactionId?: string;
  authType?: string;
  timestamp: number;
}

class SecureSessionManager {
  private sessionData: SessionData | null = null;
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  setSessionData(data: Omit<SessionData, 'timestamp'>): void {
    this.sessionData = {
      ...data,
      timestamp: Date.now()
    };
  }

  getSessionData(): SessionData | null {
    if (!this.sessionData) return null;

    // Check if session has expired
    if (Date.now() - this.sessionData.timestamp > this.SESSION_TIMEOUT) {
      this.clearSession();
      return null;
    }

    return this.sessionData;
  }

  clearSession(): void {
    this.sessionData = null;
  }

  isSessionValid(): boolean {
    return this.getSessionData() !== null;
  }

  getTransactionId(): string | null {
    const session = this.getSessionData();
    return session?.transactionId || null;
  }

  getAuthType(): string | null {
    const session = this.getSessionData();
    return session?.authType || null;
  }
}

export const secureSession = new SecureSessionManager();
