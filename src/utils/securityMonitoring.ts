interface SecurityEvent {
  type: 'auth_failure' | 'rate_limit' | 'invalid_input' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: number;
  userAgent?: string;
  ip?: string;
  metadata?: Record<string, any>;
}

class SecurityMonitoringService {
  private events: SecurityEvent[] = [];
  private readonly MAX_EVENTS = 1000;
  private readonly ALERT_THRESHOLDS = {
    auth_failure: 5,
    rate_limit: 3,
    invalid_input: 10,
    suspicious_activity: 1
  };

  logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      ip: 'client-side' // In production, this would come from server
    };

    this.events.unshift(securityEvent);
    
    // Keep only recent events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(0, this.MAX_EVENTS);
    }

    // Check for alert conditions
    this.checkAlertThresholds(event.type);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Security Event [${event.severity}]:`, event.message);
    }
  }

  private checkAlertThresholds(eventType: SecurityEvent['type']): void {
    const recentEvents = this.getRecentEvents(5 * 60 * 1000); // Last 5 minutes
    const typeCount = recentEvents.filter(e => e.type === eventType).length;
    
    if (typeCount >= this.ALERT_THRESHOLDS[eventType]) {
      this.triggerAlert(eventType, typeCount);
    }
  }

  private triggerAlert(eventType: string, count: number): void {
    console.error(`SECURITY ALERT: ${count} ${eventType} events in the last 5 minutes`);
    
    // In production, this would send alerts to monitoring service
    // Example: send to external monitoring service, email, etc.
  }

  getRecentEvents(timeWindow: number = 60 * 60 * 1000): SecurityEvent[] {
    const cutoff = Date.now() - timeWindow;
    return this.events.filter(event => event.timestamp >= cutoff);
  }

  getEventSummary(): Record<string, number> {
    const summary: Record<string, number> = {};
    this.events.forEach(event => {
      summary[event.type] = (summary[event.type] || 0) + 1;
    });
    return summary;
  }

  clearEvents(): void {
    this.events = [];
  }
}

export const securityMonitoring = new SecurityMonitoringService();
