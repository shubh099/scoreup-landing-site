
interface RateLimitData {
  count: number;
  lastRequest: number;
  blocked: boolean;
  blockExpiry?: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitData> = new Map();
  private readonly MAX_REQUESTS = 3; // Max 3 OTP requests
  private readonly TIME_WINDOW = 15 * 60 * 1000; // 15 minutes
  private readonly BLOCK_DURATION = 60 * 60 * 1000; // 1 hour block

  canMakeRequest(identifier: string): { allowed: boolean; message?: string; retryAfter?: number } {
    const now = Date.now();
    const existing = this.requests.get(identifier);

    if (!existing) {
      this.requests.set(identifier, {
        count: 1,
        lastRequest: now,
        blocked: false
      });
      return { allowed: true };
    }

    // Check if user is currently blocked
    if (existing.blocked && existing.blockExpiry && now < existing.blockExpiry) {
      const retryAfter = Math.ceil((existing.blockExpiry - now) / 1000 / 60); // minutes
      return { 
        allowed: false, 
        message: `Too many requests. Try again in ${retryAfter} minutes.`,
        retryAfter 
      };
    }

    // Reset if time window has passed
    if (now - existing.lastRequest > this.TIME_WINDOW) {
      this.requests.set(identifier, {
        count: 1,
        lastRequest: now,
        blocked: false
      });
      return { allowed: true };
    }

    // Check if limit exceeded
    if (existing.count >= this.MAX_REQUESTS) {
      this.requests.set(identifier, {
        ...existing,
        blocked: true,
        blockExpiry: now + this.BLOCK_DURATION
      });
      return { 
        allowed: false, 
        message: "Too many OTP requests. Please try again later.",
        retryAfter: 60 // 1 hour in minutes
      };
    }

    // Increment count
    this.requests.set(identifier, {
      ...existing,
      count: existing.count + 1,
      lastRequest: now
    });

    return { allowed: true };
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

export const otpRateLimiter = new RateLimiter();
