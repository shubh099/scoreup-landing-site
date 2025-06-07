
import { z } from 'zod';

// Phone number validation schema
export const phoneSchema = z.string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must not exceed 15 digits")
  .regex(/^[0-9]+$/, "Phone number must contain only digits");

// Email validation schema
export const emailSchema = z.string()
  .email("Please enter a valid email address")
  .min(5, "Email must be at least 5 characters")
  .max(254, "Email must not exceed 254 characters");

// Name validation schema
export const nameSchema = z.string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters")
  .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters, spaces, dots, apostrophes, and hyphens");

// OTP validation schema
export const otpSchema = z.string()
  .length(4, "OTP must be exactly 4 digits")
  .regex(/^[0-9]+$/, "OTP must contain only digits");

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>'"&]/g, '') // Remove potential XSS characters
    .trim(); // Remove leading/trailing whitespace
};

// Validation helper functions
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  try {
    phoneSchema.parse(phone);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid phone number" };
  }
};

export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  try {
    emailSchema.parse(email);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid email address" };
  }
};

export const validateName = (name: string): { isValid: boolean; error?: string } => {
  try {
    nameSchema.parse(name);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid name" };
  }
};
