
interface ApiConfig {
  baseUrl: string;
  endpoints: {
    initiateOtp: string;
    verifyUser: string;
  };
}

class ApiSecurityManager {
  private allowedDomains = [
    // Add your production domains here
    'localhost',
    '127.0.0.1',
    // Add other allowed domains
  ];

  validateApiConfig(config: ApiConfig): { isValid: boolean; error?: string } {
    if (!config.baseUrl) {
      return { isValid: false, error: 'Base URL is required' };
    }

    try {
      const url = new URL(config.baseUrl);
      
      // Check if domain is allowed (you should configure this for your specific domains)
      const hostname = url.hostname;
      const isAllowed = this.allowedDomains.some(domain => 
        hostname === domain || hostname.endsWith(`.${domain}`)
      );

      if (!isAllowed && process.env.NODE_ENV === 'production') {
        return { isValid: false, error: 'Domain not in allowlist' };
      }

      // Ensure HTTPS in production
      if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') {
        return { isValid: false, error: 'HTTPS required in production' };
      }

    } catch {
      return { isValid: false, error: 'Invalid URL format' };
    }

    if (!config.endpoints.initiateOtp || !config.endpoints.verifyUser) {
      return { isValid: false, error: 'Required endpoints missing' };
    }

    return { isValid: true };
  }

  getSecureHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      // Add CSRF token if available
      ...(this.getCSRFToken() && { 'X-CSRF-Token': this.getCSRFToken() })
    };
  }

  private getCSRFToken(): string | null {
    // Implement CSRF token retrieval logic
    return null;
  }

  sanitizeApiResponse(data: any): any {
    // Remove potentially dangerous fields
    if (typeof data === 'object' && data !== null) {
      const sanitized = { ...data };
      
      // Remove any fields that might contain scripts or dangerous content
      delete sanitized.__proto__;
      delete sanitized.constructor;
      
      return sanitized;
    }
    
    return data;
  }

  validateResponseData(data: any): boolean {
    // Basic validation to ensure response structure is expected
    if (!data || typeof data !== 'object') {
      return false;
    }

    // Add specific validation rules based on your API responses
    return true;
  }
}

export const apiSecurityManager = new ApiSecurityManager();
