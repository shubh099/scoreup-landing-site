
interface ApiEndpoints {
  initiateOtp: string;
  verifyUser: string;
}

interface SecurityConfig {
  apiBaseUrl: string;
  endpoints: ApiEndpoints;
  encryptionKey: string;
  aesIv: string;
  environment: 'development' | 'production';
}

class SecureConfigManager {
  private config: SecurityConfig | null = null;
  private readonly REQUIRED_CONFIG_KEYS = ['apiBaseUrl', 'endpoints', 'encryptionKey', 'aesIv'];

  setConfiguration(config: Partial<SecurityConfig>): { success: boolean; error?: string } {
    // Validate required fields
    if (!config.apiBaseUrl || !config.endpoints || !config.encryptionKey || !config.aesIv) {
      return { success: false, error: 'Missing required configuration fields' };
    }

    // Validate API base URL
    try {
      const url = new URL(config.apiBaseUrl);
      if (this.isProduction() && url.protocol !== 'https:') {
        return { success: false, error: 'HTTPS required in production' };
      }
    } catch {
      return { success: false, error: 'Invalid API base URL' };
    }

    // Validate encryption keys
    if (config.encryptionKey.length < 16 || config.aesIv.length < 16) {
      return { success: false, error: 'Encryption keys must be at least 16 characters' };
    }

    this.config = {
      apiBaseUrl: this.sanitizeUrl(config.apiBaseUrl),
      endpoints: {
        initiateOtp: this.sanitizeEndpoint(config.endpoints.initiateOtp),
        verifyUser: this.sanitizeEndpoint(config.endpoints.verifyUser)
      },
      encryptionKey: config.encryptionKey,
      aesIv: config.aesIv,
      environment: this.isProduction() ? 'production' : 'development'
    };

    return { success: true };
  }

  getConfig(): SecurityConfig | null {
    return this.config;
  }

  isConfigured(): boolean {
    return this.config !== null;
  }

  private isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  private sanitizeUrl(url: string): string {
    return url.replace(/[<>'"&]/g, '').trim();
  }

  private sanitizeEndpoint(endpoint: string): string {
    return endpoint.replace(/[<>'"&]/g, '').trim();
  }

  getFullUrl(endpoint: keyof ApiEndpoints): string | null {
    if (!this.config) return null;
    return this.config.apiBaseUrl + this.config.endpoints[endpoint];
  }

  clearConfig(): void {
    this.config = null;
  }
}

export const secureConfigManager = new SecureConfigManager();
