interface UserData {
  leadProfileId?: string;
  email?: string;
  fullName?: string;
  dob?: string;
  mobileNo?: string;
  gender?: string;
  pinCode?: string;
  city?: string;
}

interface WebEngageEventData {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  birth_date?: string;
  phone?: string;
  email?: string;
  gender?: string;
  postal_code?: string;
  city?: string;
  region?: string;
  country?: string;
  advisor_id?: number;
  whatsapp_opt_in?: boolean;
}

class SecureWebEngageManager {
  private isWebEngageAvailable(): boolean {
    return typeof window !== 'undefined' && 
           window.webengage && 
           typeof window.webengage.user === 'object';
  }

  private sanitizeString(value: any): string {
    if (typeof value !== 'string') return '';
    
    // Remove potentially dangerous characters
    return value
      .replace(/[<>'"&]/g, '') // Remove XSS characters
      .replace(/javascript:/gi, '') // Remove javascript: URLs
      .replace(/data:/gi, '') // Remove data: URLs
      .trim()
      .slice(0, 255); // Limit length
  }

  private sanitizeEmail(email: any): string {
    if (typeof email !== 'string') return '';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitized = this.sanitizeString(email);
    
    return emailRegex.test(sanitized) ? sanitized : '';
  }

  private sanitizePhone(phone: any): string {
    if (typeof phone !== 'string') return '';
    
    // Only allow digits, +, and common separators
    const cleaned = phone.replace(/[^\d+\-\s()]/g, '');
    return cleaned.slice(0, 20); // Reasonable phone number length
  }

  setUserAttributes(userData: UserData): void {
    if (!this.isWebEngageAvailable()) {
      console.warn('WebEngage not available');
      return;
    }

    try {
      const webengage = window.webengage;
      if (!webengage) return;
      
      // Sanitize and validate all user data
      const sanitizedData = {
        leadProfileId: this.sanitizeString(userData.leadProfileId),
        email: this.sanitizeEmail(userData.email),
        fullName: this.sanitizeString(userData.fullName),
        dob: this.sanitizeString(userData.dob),
        mobileNo: this.sanitizePhone(userData.mobileNo),
        gender: this.sanitizeString(userData.gender).toLowerCase(),
        pinCode: this.sanitizeString(userData.pinCode),
        city: this.sanitizeString(userData.city)
      };

      if (sanitizedData.leadProfileId) {
        webengage.user.login(sanitizedData.leadProfileId);
      }

      if (sanitizedData.email) {
        webengage.user.setAttribute('we_email', sanitizedData.email);
      }

      if (sanitizedData.dob) {
        webengage.user.setAttribute('we_birth_date', sanitizedData.dob);
      }

      if (sanitizedData.mobileNo) {
        webengage.user.setAttribute('we_phone', `+91${sanitizedData.mobileNo}`);
      }

      if (sanitizedData.gender) {
        webengage.user.setAttribute('we_gender', sanitizedData.gender);
      }

      if (sanitizedData.fullName) {
        const names = sanitizedData.fullName.split(' ').map(name => this.sanitizeString(name));
        if (names.length > 0) {
          webengage.user.setAttribute('we_first_name', names[0]);
          webengage.user.setAttribute('we_last_name', names[names.length - 1]);
        }
      }

      // Set safe default values
      webengage.user.setAttribute('we_email_opt_in', true);
      webengage.user.setAttribute('we_sms_opt_in', true);
      webengage.user.setAttribute('we_whatsapp_opt_in', true);
      webengage.user.setAttribute('we_advisor_id', 15721);

      if (sanitizedData.pinCode) {
        webengage.user.setAttribute('we_postal_code', sanitizedData.pinCode);
      }

      if (sanitizedData.city) {
        webengage.user.setAttribute('we_city', sanitizedData.city);
      }

      webengage.user.setAttribute('we_region', '');
      webengage.user.setAttribute('we_country', '');

    } catch (error) {
      console.error('Error setting WebEngage user attributes:', error);
    }
  }

  trackEvent(eventName: string, eventData: WebEngageEventData): void {
    if (!this.isWebEngageAvailable()) {
      console.warn('WebEngage not available for event tracking');
      return;
    }

    try {
      // Sanitize event name
      const sanitizedEventName = this.sanitizeString(eventName);
      if (!sanitizedEventName) return;

      // Sanitize event data
      const sanitizedEventData: WebEngageEventData = {
        user_id: this.sanitizeString(eventData.user_id),
        first_name: this.sanitizeString(eventData.first_name),
        last_name: this.sanitizeString(eventData.last_name),
        birth_date: this.sanitizeString(eventData.birth_date),
        phone: this.sanitizePhone(eventData.phone),
        email: this.sanitizeEmail(eventData.email),
        gender: this.sanitizeString(eventData.gender),
        postal_code: this.sanitizeString(eventData.postal_code),
        city: this.sanitizeString(eventData.city),
        region: this.sanitizeString(eventData.region),
        country: this.sanitizeString(eventData.country),
        advisor_id: typeof eventData.advisor_id === 'number' ? eventData.advisor_id : 15721,
        whatsapp_opt_in: Boolean(eventData.whatsapp_opt_in)
      };

      // Remove empty values
      Object.keys(sanitizedEventData).forEach(key => {
        if (!sanitizedEventData[key as keyof WebEngageEventData]) {
          delete sanitizedEventData[key as keyof WebEngageEventData];
        }
      });

      console.log(`WebEngage event: ${sanitizedEventName}`, sanitizedEventData);
      
    } catch (error) {
      console.error('Error tracking WebEngage event:', error);
    }
  }
}

export const secureWebEngageManager = new SecureWebEngageManager();
