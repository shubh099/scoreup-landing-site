
interface SecurityHeaders {
  'Content-Security-Policy': string;
  'X-Frame-Options': string;
  'X-Content-Type-Options': string;
  'X-XSS-Protection': string;
  'Referrer-Policy': string;
  'Permissions-Policy': string;
}

class SecurityPolicyManager {
  private cspDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https:'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
  };

  getSecurityHeaders(): SecurityHeaders {
    return {
      'Content-Security-Policy': this.generateCSP(),
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    };
  }

  private generateCSP(): string {
    return Object.entries(this.cspDirectives)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');
  }

  validateOrigin(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      const allowedDomains = ['localhost', '127.0.0.1'];
      
      // Add your production domains here
      if (process.env.NODE_ENV === 'production') {
        // allowedDomains.push('yourdomain.com');
      }

      return allowedDomains.some(domain => 
        parsedUrl.hostname === domain || parsedUrl.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  }

  sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
    const sanitized: Record<string, string> = {};
    
    for (const [key, value] of Object.entries(headers)) {
      // Remove potentially dangerous characters
      const cleanKey = key.replace(/[^\w-]/g, '');
      const cleanValue = value.replace(/[\r\n]/g, '');
      
      if (cleanKey && cleanValue) {
        sanitized[cleanKey] = cleanValue;
      }
    }
    
    return sanitized;
  }
}

export const securityPolicyManager = new SecurityPolicyManager();
